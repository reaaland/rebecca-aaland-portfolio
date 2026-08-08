function escapePdfText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function buildResumePdf() {
  const navy = "0.086 0.125 0.200 rg";
  const blue = "0.141 0.369 0.710 rg";
  const gray = "0.310 0.369 0.451 rg";
  const black = navy;
  const commands: string[] = [];

  function text(
    x: number,
    y: number,
    size: number,
    value: string,
    font = "F1",
    color = black,
  ) {
    commands.push(
      `${color}\nBT /${font} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${escapePdfText(value)}) Tj ET`,
    );
  }

  function line(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    width = 0.6,
    color = "0.72 0.78 0.84 RG",
  ) {
    commands.push(`${color}\n${width} w\n${x1} ${y1} m ${x2} ${y2} l S`);
  }

  function bullet(y: number, lines: string[]) {
    text(58, y, 8.6, "-", "F1", black);
    lines.forEach((value, index) =>
      text(70, y - index * 10.5, 8.6, value, "F1", black),
    );
    return y - lines.length * 10.5;
  }

  function heading(y: number, value: string) {
    text(54, y, 10.2, value.toUpperCase(), "F2", blue);
    return y - 14;
  }

  text(183, 750, 20, "REBECCA AALAND", "F2", navy);
  text(
    142,
    731,
    10.3,
    "Web Developer  |  Frontend Developer  |  Technical Problem Solver",
    "F2",
    blue,
  );
  text(
    92,
    714,
    8.3,
    "Rochester, Minnesota  |  Open to remote work  |  (507) 990-4627  |  reaaland@gmail.com",
    "F1",
    gray,
  );
  text(
    171,
    701,
    8.1,
    "rebeccaiaaland.com  |  github.com/reaaland  |  linkedin.com/in/rebecca-aaland-494169411",
    "F1",
    gray,
  );
  line(54, 691, 558, 691, 0.7);

  let y = 676;
  y = heading(y, "Professional Summary");
  text(
    54,
    y,
    8.8,
    "Frontend developer and web designer with hands-on experience building and launching responsive web applications,",
  );
  y -= 10.5;
  text(
    54,
    y,
    8.8,
    "implementing supplied designs and requirements, and integrating APIs, authentication, databases, payments, and browser",
  );
  y -= 10.5;
  text(
    54,
    y,
    8.8,
    "media. Former science teacher and small-business owner with earlier Tier 1 technical support and technical writing",
  );
  y -= 10.5;
  text(
    54,
    y,
    8.8,
    "experience, bringing clear communication, customer perspective, and practical problem-solving to technical work.",
  );
  y -= 16;

  y = heading(y, "Technical Skills");
  text(
    54,
    y,
    8.7,
    "Frontend: HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Tailwind CSS, responsive UI, accessibility",
  );
  y -= 10.5;
  text(
    54,
    y,
    8.7,
    "Data & integrations: REST APIs, Supabase, PostgreSQL, Firebase, Stripe, authentication/authorization",
  );
  y -= 10.5;
  text(
    54,
    y,
    8.7,
    "Workflow: Git, GitHub, Vercel, debugging, functional testing, AI-assisted development",
  );
  y -= 16;

  y = heading(y, "Selected Development Work");
  text(54, y, 9.2, "PawCircle Membership", "F2", navy);
  text(
    167,
    y,
    8.1,
    "React, JavaScript, Supabase/PostgreSQL, Stripe, Vercel",
    "F1",
    gray,
  );
  y -= 11;
  y = bullet(y, [
    "Planned, designed, built, and launched a responsive pet-care membership application with authentication, protected",
    "areas, role-based profiles, local discovery, privacy controls, introductory messaging, and payment workflows.",
  ]);
  y = bullet(y - 1, [
    "Troubleshot production issues across registration, routing, profiles, messaging notifications, data, and payments;",
    "later converted the closed paid product into a fictional interactive portfolio demo.",
  ]);
  y -= 2;

  text(
    54,
    y,
    9.2,
    "Skinstric - Frontend Simplified Internship Project",
    "F2",
    navy,
  );
  text(
    294,
    y,
    8.1,
    "Next.js, React, TypeScript, Tailwind CSS, Browser Media APIs",
    "F1",
    gray,
  );
  y -= 11;
  y = bullet(y, [
    "Implemented a responsive multi-step skin-analysis flow from supplied designs, assets, APIs, and phased requirements.",
  ]);
  y = bullet(y - 1, [
    "Built validated inputs, asynchronous API states, gallery upload/Base64 conversion, camera permission and capture flows,",
    "and interactive demographic results with correction/reset behavior.",
  ]);
  y -= 2;

  text(
    54,
    y,
    9.2,
    "Ultraverse NFT Marketplace - Frontend Simplified Internship Project",
    "F2",
    navy,
  );
  y -= 10.5;
  text(
    54,
    y,
    8.1,
    "React, JavaScript, Axios, React Router, react-slick",
    "F1",
    gray,
  );
  y -= 11;
  y = bullet(y, [
    "Implemented API-driven marketplace sections with loading skeletons, responsive carousels, live countdowns,",
    "sorting/filtering, incremental load-more behavior, and routed author/item detail views.",
  ]);
  y -= 2;

  y = heading(y, "Professional Experience");
  text(
    54,
    y,
    9.1,
    "Founder & Owner - PawCircle LLC / Bow Wows & Meows Pet Services",
    "F2",
    navy,
  );
  text(394, y, 8.1, "Oct 2023-Present", "F1", gray);
  y -= 11;
  y = bullet(y, [
    "Built and operated a service business with approximately 95% repeat business, managing client communication,",
    "scheduling, changing requirements, problem resolution, and day-to-day operations.",
  ]);
  y -= 2;

  text(
    54,
    y,
    9.1,
    "Science Teacher - Rochester Public Schools & Adrian Public Schools",
    "F2",
    navy,
  );
  text(391, y, 8.1, "2012-2023", "F1", gray);
  y -= 11;
  y = bullet(y, [
    "Explained complex concepts to varied audiences, created curriculum and training materials, managed concurrent",
    "projects and deadlines, and adjusted approaches when people or processes were not working as expected.",
  ]);
  y -= 2;

  y = heading(y, "Education & Development");
  text(
    54,
    y,
    8.9,
    "Frontend Simplified - Frontend Development Program  |  2026-Present",
    "F2",
    navy,
  );
  y -= 10.5;
  text(
    54,
    y,
    8.6,
    "B.S., Elementary Education, Summa Cum Laude - St. Cloud State University",
  );
  y -= 10.5;
  text(
    54,
    y,
    8.6,
    "M.S., Women's Studies; B.S., Sociology & Women's Studies - Minnesota State University, Mankato",
  );

  const stream = `${commands.join("\n")}\n`;
  const objects: string[] = [];
  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[2] = "<< /Type /Pages /Kids [3 0 R] /Count 1 >>";
  objects[3] =
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>";
  objects[4] = `<< /Length ${stream.length} >>\nstream\n${stream}endstream`;
  objects[5] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
  objects[6] =
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  for (let index = 1; index < objects.length; index += 1) {
    offsets[index] = pdf.length;
    pdf += `${index} 0 obj\n${objects[index]}\nendobj\n`;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
  for (let index = 1; index < objects.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return new TextEncoder().encode(pdf);
}

export function GET() {
  return new Response(buildResumePdf(), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'attachment; filename="Rebecca_Aaland_Web_Frontend_Resume.pdf"',
      "Cache-Control": "public, max-age=86400",
    },
  });
}
