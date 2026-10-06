import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";

const SITE_URL = "https://www.rebeccaiaaland.com";
const HOST = "www.rebeccaiaaland.com";

const keyFile = readdirSync("public").find((name) =>
  /^[A-Za-z0-9-]{8,128}\.txt$/.test(name),
);

if (!keyFile) {
  throw new Error("IndexNow key file was not found in public/.");
}

const key = keyFile.slice(0, -4);
const keyContents = readFileSync(`public/${keyFile}`, "utf8").trim();

if (keyContents !== key) {
  throw new Error("IndexNow key file contents do not match its filename.");
}

function getChangedFiles() {
  const before = process.env.INDEXNOW_BEFORE_SHA;
  const after = process.env.GITHUB_SHA || "HEAD";

  if (before && !/^0+$/.test(before)) {
    try {
      return execFileSync("git", ["diff", "--name-only", before, after], {
        encoding: "utf8",
      })
        .split("\n")
        .map((value) => value.trim())
        .filter(Boolean);
    } catch {
      // Fall back to the files contained in the current commit.
    }
  }

  return execFileSync("git", ["show", "--pretty=", "--name-only", after], {
    encoding: "utf8",
  })
    .split("\n")
    .map((value) => value.trim())
    .filter(Boolean);
}

function pageFileToUrl(file) {
  const parts = file.split("/");
  const fileName = parts.at(-1);

  if (parts[0] !== "app" || !/^page\.(tsx|ts|jsx|js)$/.test(fileName || "")) {
    return null;
  }

  const routeParts = parts
    .slice(1, -1)
    .filter((part) => !(part.startsWith("(") && part.endsWith(")")));

  if (routeParts.some((part) => part.startsWith("[") && part.endsWith("]"))) {
    return null;
  }

  return routeParts.length
    ? `${SITE_URL}/${routeParts.join("/")}`
    : `${SITE_URL}/`;
}

const changedFiles = getChangedFiles();
const sitemapResponse = await fetch(`${SITE_URL}/sitemap.xml`, {
  headers: { "User-Agent": "Aaland-IndexNow/1.0" },
});

if (!sitemapResponse.ok) {
  throw new Error(`Could not load sitemap.xml (${sitemapResponse.status}).`);
}

const sitemapXml = await sitemapResponse.text();
const sitemapUrls = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => match[1],
);
const sitemapSet = new Set(sitemapUrls);

const sitewideChange = changedFiles.some(
  (file) =>
    file === "app/layout.tsx" ||
    file.startsWith("components/") ||
    file.startsWith("lib/"),
);

const urls = new Set(sitewideChange ? sitemapUrls : []);

for (const file of changedFiles) {
  const url = pageFileToUrl(file);
  if (url && sitemapSet.has(url)) {
    urls.add(url);
  }
}

// On the first IndexNow deployment, submit the homepage so the key is verified.
if (changedFiles.includes(`public/${keyFile}`)) {
  urls.add(`${SITE_URL}/`);
}

if (urls.size === 0) {
  console.log("IndexNow: no public indexed URLs changed; nothing to submit.");
  process.exit(0);
}

const payload = {
  host: HOST,
  key,
  keyLocation: `${SITE_URL}/${keyFile}`,
  urlList: [...urls],
};

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "User-Agent": "Aaland-IndexNow/1.0",
  },
  body: JSON.stringify(payload),
});

const responseBody = await response.text();
console.log(`IndexNow: submitted ${urls.size} URL(s); HTTP ${response.status}.`);
if (responseBody) {
  console.log(responseBody);
}

if (![200, 202].includes(response.status)) {
  throw new Error(`IndexNow submission failed with HTTP ${response.status}.`);
}
