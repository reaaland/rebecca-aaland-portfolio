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
    size = 9.7,
    x = 54,
    lineHeight = 11.5,
    font = "F1",
    color = black,
  ) {
    lines.forEach((value, index) =>
      text(x, y - index * lineHeight, size, value, font, color),
    );
    return y - lines.length * lineHeight;
  }

  function bullet(y: number, lines: string[], size = 9.6, lineHeight = 11.4) {
    text(58, y, size, "-", "F1", black);
    lines.forEach((value, index) =>
      text(70, y - index * lineHeight, size, value, "F1", black),
    );
    return y - lines.length * lineHeight;
  }

  function heading(y: number, value: string) {
    text(54, y, 11.3, value.toUpperCase(), "F2", blue);
    return y - 15;
  }

  text(193, 753, 20, "REBECCA AALAND", "F2", navy);
  text(
    125,
    733,
    11.2,
    "Frontend Developer  |  React  |  JavaScript  |  Next.js  |  Supabase",
    "F2",
    blue,
  );
  text(
    73,
    714,
    9.3,
    "Rochester, Minnesota  |  Open to remote work  |  (507) 990-4627  |  reaaland@gmail.com",
    "F1",
    gray,
  );
  text(
    151,
    699,
    9.1,
    "rebeccaiaaland.com  |  github.com/reaaland  |  linkedin.com/in/rebecca-aaland-494169411",
    "F1",
    gray,
  );
  line(54, 687, 558, 687, 0.7);

  let y = 670;

  y = heading(y, "Professional Summary");
  y = paragraph(y, [
    "Frontend developer with hands-on experience building and launching responsive web applications using React,",
    "JavaScript, Next.js, Supabase, and modern web tools. Experienced with API integration, authentication,",
    "databases, payments, responsive interfaces, and troubleshooting production issues. Background in education,",
    "small-business ownership, technical writing, and customer support with a focus on clear communication and",
    "practical problem-solving.",
  ]);
  y -= 5;

  y = heading(y, "Technical Skills");
  y = paragraph(y, [
    "Programming: JavaScript, TypeScript, HTML5, CSS3",
    "Frameworks & technologies: React, Next.js, Tailwind CSS, Supabase, PostgreSQL, REST APIs",
    "Tools & platforms: Git, GitHub, Vercel, Vite, Stripe, Figma, VS Code",
  ], 9.5, 54, 11.2);
  y -= 5;

  y = heading(y, "Professional Experience");
  text(54, y, 10.8, "Founder & Owner - PawCircle LLC", "F2", navy);
  text(446, y, 9.2, "Oct 2023-Present", "F1", gray);
  y -= 13;
  y = bullet(y, [
    "Founded and operate an independent pet-care business with approximately 95% repeat business through",
    "dependable service, referrals, and long-term client relationships.",
  ]);
  y -= 2;
  y = bullet(y, [
    "Designed, built, launched, and maintained PawCircle Membership, a React application with authentication,",
    "protected areas, role-based profiles, local discovery, messaging, privacy controls, and Stripe payments.",
  ]);
  y -= 2;
  y = bullet(y, [
    "Troubleshot production issues across registration, routing, profiles, notifications, data, and payments;",
    "the closed paid membership product is now maintained as an interactive portfolio demonstration.",
  ]);
  y -= 5;

  text(54, y, 10.8, "Science Teacher - Rochester Public Schools & Adrian Public Schools", "F2", navy);
  text(455, y, 9.2, "2012-2023", "F1", gray);
  y -= 13;
  y = bullet(y, [
    "Explained complex scientific and technical concepts to varied audiences, created curriculum and training",
    "materials, managed concurrent projects and deadlines, and adjusted approaches based on results.",
  ]);
  y -= 5;

  text(54, y, 10.8, "Technical Writer - TransCore", "F2", navy);
  text(461, y, 9.2, "2000-2002", "F1", gray);
  y -= 13;
  y = bullet(y, [
    "Edited, formatted, distributed, and maintained technical documentation supporting engineering teams and",
    "operational workflows while keeping technical information accurate, organized, and accessible.",
  ]);
  y -= 5;

  y = heading(y, "Selected Development Work");
  text(54, y, 10.8, "PawCircle Membership", "F2", navy);
  y -= 13;
  text(54, y, 9.2, "React, JavaScript, Supabase/PostgreSQL, Stripe, Vercel", "F1", gray);
  y -= 12;
  y = bullet(y, [
    "Built a responsive membership application with three role-based profile paths, protected routes, local",
    "discovery, privacy controls, introductory messaging, and payment workflows.",
  ]);
  y -= 4;

  text(54, y, 10.8, "Ultraverse NFT Marketplace", "F2", navy);
  y -= 13;
  text(54, y, 9.2, "React, JavaScript, Axios, React Router, react-slick", "F1", gray);
  y -= 12;
  y = bullet(y, [
    "Built API-driven marketplace experiences with loading skeletons, live countdowns, filtering and sorting,",
    "incremental load-more behavior, routed detail views, and responsive carousels adapting 4 to 2 to 1 cards.",
  ]);
  y -= 5;

  y = heading(y, "Education");
  text(54, y, 9.8, "Frontend Simplified - Frontend Development Program  |  2026-Present", "F2", navy);
  y -= 12;
  text(54, y, 9.5, "B.S., Elementary Education, Summa Cum Laude - St. Cloud State University");
  y -= 11;
  text(54, y, 9.5, "M.S., Women's Studies - Minnesota State University, Mankato");
  y -= 11;
  text(54, y, 9.5, "B.S., Sociology & Women's Studies - Minnesota State University, Mankato");

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
        'attachment; filename="Rebecca_Aaland_Frontend_Developer_Resume.pdf"',
      "Cache-Control": "public, max-age=86400",
    },
  });
}
