# Rebecca Aaland Portfolio

Personal portfolio for Rebecca Aaland, Frontend Developer & Web Designer.

## Technology

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- CSS animations and Intersection Observer motion

## Run locally

Install [Node.js](https://nodejs.org/) if it is not already installed. Then open
this folder in VS Code and run:

```powershell
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Quality checks

```powershell
npm run lint
npm run build
```

## Main content locations

- `app/page.tsx` — homepage content and sections
- `app/globals.css` — colors, layout, responsiveness, and animation
- `app/work/` — project index and case studies
- `app/services/` — service descriptions
- `app/about/` — professional story
- `app/resume/` — résumé overview
- `app/contact/` — contact page and email-preparation form
- `components/` — shared navigation, footer, and animation behavior

## Contact behavior

The contact form opens the visitor's email application with a prepared message.
It does not store or transmit form data through a database or third-party form
service.

## Deployment

This repository is a standard Next.js project and can be imported directly into
Vercel. No payment, database, authentication, Stripe account, or environment
variable is required for the current site.

## Create the GitHub repository

After reviewing the site locally, stop the development server with `Ctrl+C` and
run these commands from this folder:

```powershell
git init
git add .
git commit -m "Create Rebecca Aaland portfolio"
gh repo create rebecca-aaland-portfolio --public --source=. --remote=origin --push
```

The final command creates and pushes the repository to the currently signed-in
GitHub account.

## Deploy on Vercel

In Vercel, choose **Add New → Project**, import the
`rebecca-aaland-portfolio` GitHub repository, and select **Deploy**. Vercel will
detect Next.js automatically. Leave the environment-variable section empty.

The `.vercel` folder that may be created on your computer is intentionally
ignored by Git and will not be added to the repository.
