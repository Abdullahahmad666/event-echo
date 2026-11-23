# Decor by Connecting the Dotss — Event Planning Website

Website for **Decor by Connecting the Dotss**, a luxury event planning and design studio in Milton, Ontario, covering weddings (mehndi, nikah, barat), birthdays and anniversaries.

**Live:** https://www.decorbyconnectingthedotss.ca

## Features
- Service pages for full-service planning, event management and bespoke décor
- Filterable portfolio of past events by occasion
- Testimonials with video and screenshots
- Multi-step enquiry form (event type, date, guest count, décor budget) that emails the studio through a serverless function (`api/send-email.ts`, Nodemailer)

## Tech stack
React · TypeScript · Vite · Tailwind CSS · shadcn/ui · Framer Motion · React Hook Form + Zod · Nodemailer · Vercel

## Run locally
```bash
git clone https://github.com/Abdullahahmad666/event-echo.git
cd event-echo
npm install
cp .env.example .env   # SMTP settings for the enquiry form
npm run dev
```

---

**Built by [Abdullah Ahmad](https://abdullah-ahmad-portfolio.vercel.app)**, Full Stack Software Engineer in Lahore, Pakistan · [GitHub](https://github.com/Abdullahahmad666) · [LinkedIn](https://www.linkedin.com/in/abdullah-ahmad-a00913259/)
