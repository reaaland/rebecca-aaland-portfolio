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

  function paragraph(
    y: number,
    lines: string[],
    size = 8.8,
    x = 50,
    lineHeight = 10.2,
    font = "F1",
    color = black,
  ) {
    lines.forEach((value, index) =>
      text(x, y - index * lineHeight, size, value, font, color),
    );
    return y - lines.length * lineHeight;
  }

  function bullet(y: number, lines: string[], size = 8.6, lineHeight = 10) {
    text(54, y, size, "-", "F1", black);
    lines.forEach((value, index) =>
      text(66, y - index * lineHeight, size, value, "F1", black),
    );
    return y - lines.length * lineHeight;
  }

  function heading(y: number, value: string) {
    text(50, y, 10.7, value.toUpperCase(), "F2", blue);
    return y - 14;
  }

  text(190, 754, 19, "REBECCA AALAND", "F2", navy);
  text(217, 735, 10.8, "Junior Frontend Developer", "F2", blue);
  text(
    72,
    717,
    8.8,
    "Rochester, Minnesota  |  (507) 990-4627  |  reaaland@gmail.com",
    "F1",
    gray,
  );
  text(
    124,
    703,
    8.6,
    "rebeccaiaaland.com  |  github.com/reaaland  |  linkedin.com/in/rebecca-aaland-494169411",
    "F1",
    gray,
  );
  line(50, 690, 562, 690, 0.7);

  let y = 674;

  y = heading(y, "Professional Summary");
  y = paragraph(y, [
    "Junior frontend developer who builds and ships responsive web applications from requirements through deployment.",
    "Recent work includes a production React/Supabase application and a paid Next.js/TypeScript internship.",
    "Practical experience includes APIs, authentication, databases, payments, testing, debugging, responsive design,",
    "technical writing, teaching, and small-business ownership.",
  ]);
  y -= 3;

  y = heading(y, "Technical Skills");
  y = paragraph(y, [
    "JavaScript | TypeScript | React | Next.js | HTML5 | CSS3 | Tailwind CSS | React Router | Redux Toolkit",
    "REST APIs | Axios | Supabase | PostgreSQL | Firebase | Firestore | Stripe",
    "Git | GitHub | Vercel | Vite | Figma | Responsive Design | Accessibility | Functional Testing",
  ], 8.45, 50, 9.8);
  y -= 3;

  y = heading(y, "Selected Development Projects");

  text(50, y, 9.9, "PawCircle Membership", "F2", navy);
  text(390, y, 8.3, "React / Supabase / Stripe", "F1", gray);
  y -= 12;
  y = bullet(y, [
    "Identified the need for a direct local pet-care membership product, mapped the core user flows, and built and",
    "launched a responsive React application with Supabase/PostgreSQL, Stripe, and Vercel.",
  ]);
  y -= 1;
  y = bullet(y, [
    "Implemented authentication, role-based profiles, protected directories, messaging, privacy controls, and payment",
    "workflows; tested failures across the interface, data layer, and third-party services and verified fixes before release.",
  ]);
  y -= 3;

  text(50, y, 9.9, "Skinstric - Paid Frontend Internship", "F2", navy);
  text(423, y, 8.3, "Next.js / TypeScript", "F1", gray);
  y -= 12;
  y = bullet(y, [
    "Turned supplied Figma designs and API requirements into a responsive skin-analysis flow with validated intake,",
    "camera/gallery capture, Base64 conversion, browser permissions, editable results, responsive testing, and",
    "Vercel deployment.",
  ]);
  y -= 3;

  text(50, y, 9.9, "Ultraverse NFT Marketplace", "F2", navy);
  text(426, y, 8.3, "React / API Project", "F1", gray);
  y -= 12;
  y = bullet(y, [
    "Built reusable API-driven marketplace views with loading skeletons, responsive carousels, countdown timers,",
    "sorting/filtering, incremental loading, and React Router navigation for a complete responsive browsing experience.",
  ]);
  y -= 3;

  text(50, y, 9.9, "Summarist", "F2", navy);
  text(423, y, 8.3, "Next.js / Firebase Project", "F1", gray);
  y -= 12;
  y = bullet(y, [
    "Completed a multi-route book-summary application with Firebase Authentication, Firestore persistence, Redux Toolkit",
    "state, debounced search, protected and premium states, dynamic routes, and an audio player.",
  ]);
  y -= 4;

  y = heading(y, "Professional Experience");

  text(50, y, 9.9, "Frontend Developer Intern - Skinstric", "F2", navy);
  text(495, y, 8.3, "2026", "F1", gray);
  y -= 12;
  y = bullet(y, [
    "Completed a paid frontend internship by carrying Skinstric from supplied requirements and designs through",
    "implementation, Git/GitHub workflow, testing, debugging, and deployment.",
  ]);
  y -= 3;

  text(50, y, 9.9, "Founder & Owner - PawCircle LLC", "F2", navy);
  text(459, y, 8.3, "2023-Present", "F1", gray);
  y -= 12;
  y = bullet(y, [
    "Run an independent service business with approximately 95% repeat business, managing client communication,",
    "scheduling, changing requirements, and day-to-day problem solving.",
  ]);
  y -= 3;

  text(50, y, 9.9, "Earlier Professional Experience", "F2", navy);
  y -= 12;
  y = bullet(y, [
    "Eleven years as a science educator plus earlier technical writing/document control and Tier 1 internet support built",
    "strong documentation, training, communication, and technical troubleshooting skills.",
  ]);
  y -= 4;

  y = heading(y, "Education");
  text(50, y, 8.9, "Frontend Simplified | Frontend Development Program - Completed 2026", "F2", navy);
  y -= 11;
  text(50, y, 8.7, "B.S., Elementary Education, Summa Cum Laude - St. Cloud State University");
  y -= 10;
  text(50, y, 8.7, "M.S., Women's Studies; B.S., Sociology & Women's Studies - Minnesota State University, Mankato");

  const stream = `${commands.join("\n")}\n`;
  const objects: string[] = [];
  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[2] = "<< /Type /Pages /Kids [3 0 R] /Count 1 >>";
  objects[3] =
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>";
  objects[4] = `<< /Length ${stream.length} >>\nstream\n${stream}endstream`;
  objects[5] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
  objects[6] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";

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
        'inline; filename="Rebecca_Aaland_Frontend_Developer_STAR_Resume.pdf"',
      "Cache-Control": "public, max-age=86400",
    },
  });
}
