This is a [Next.js](https://nextjs.org) project.

## Local development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

Build and run locally in production mode:

```bash
npm ci
npm run build
npm run start
```

## Docker deployment

Build the optimized production image:

```bash
docker build -t portfolio:latest .
```

Run it:

```bash
docker run --rm -p 3000:3000 --name portfolio portfolio:latest
```

The image uses a multi-stage build and runs the Next.js standalone production server.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## CI for GitHub

A GitHub Actions workflow is included at `.github/workflows/ci.yml` and runs:

- `npm ci`
- `npm run build`
- `docker build`

This keeps future live deployments safer by validating production readiness on each PR/push.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for additional platforms.
