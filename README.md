# Ma Cuisine - Restaurant Menu Management System

A modern restaurant management system built with Next.js and Supabase.

## Features

- Menu management with categories and dietary tags
- Admin authentication and authorization
- Order management and booking system
- Responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Authentication**: Custom auth system with bcrypt
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- Supabase account and project

### Environment Setup

For local development, create `.env.local` with:
```env
NEXTAUTH_SECRET=your-local-secret-key
NODE_ENV=development
```

For production, all database variables are automatically provided by Vercel Supabase integration.

### Database Setup

1. Run the database schema in your Supabase SQL editor:
```sql
-- Copy and paste the contents of database-schema.sql
```

### Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment

### Vercel Deployment with Supabase Integration

1. **Push to GitHub**:
```bash
git add .
git commit -m "Ready for Vercel deployment with Supabase"
git push origin main
```

2. **Deploy to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Click "Add to Project" → "Database" → "Supabase"
   - Follow the prompts to connect your Supabase account
   - Vercel will automatically set up the required environment variables

3. **Add Manual Environment Variables**:
   - `NEXTAUTH_SECRET` - A random secret string
   - `NEXTAUTH_URL` - Your Vercel deployment URL

### Supabase Setup

1. **During Vercel Deployment**:
   - Click "Add to Project" → "Database" → "Supabase"
   - Connect your Supabase account
   - Vercel automatically creates and configures the database

2. **After Deployment**:
   - Run the `database-schema.sql` in your Supabase SQL editor
   - Your app will be connected automatically

### Vercel Supabase Integration Benefits

- **Automatic Environment Variables**: `POSTGRES_URL` and `SUPABASE_SERVICE_ROLE_KEY`
- **Zero Configuration**: No manual database setup required
- **Secure Connection**: SSL automatically configured
- **Easy Management**: Database management through Vercel dashboard

## Project Structure

```
├── app/                 # Next.js app router
├── lib/                 # Shared utilities (auth, database)
├── public/              # Static assets
└── database-schema.sql  # Database schema
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
