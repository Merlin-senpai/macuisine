# Supabase Environment Variables - Where to Find Them

## 1. Go to your Supabase Project Dashboard

Navigate to: https://supabase.com/dashboard

## 2. Get DATABASE_URL

**Path**: Project Settings → Database → Connection string → URI

1. Select your project from the dashboard
2. Go to **Settings** (gear icon) → **Database**
3. Scroll down to **Connection string** section
4. Copy the **URI** connection string
5. Replace `[YOUR-PASSWORD]` with your database password

**Format**: `postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres`

## 3. Get SUPABASE_SERVICE_ROLE_KEY

**Path**: Project Settings → API → service_role (secret)

1. In your project, go to **Settings** → **API**
2. Scroll down to **Project API keys**
3. Copy the **service_role** key (this is the secret key)
4. ⚠️ **Never expose this key in client-side code**

## 4. Get Database Password

**Path**: Project Settings → Database → Database password

1. Go to **Settings** → **Database**
2. Scroll down to **Database password** section
3. Click **Reset Database Password** if you don't remember it
4. Set a new password and save it securely

## 5. Get Project Reference

**Path**: Project Settings → General → Project URL

Your project reference is in the URL: `https://[PROJECT-REF].supabase.co`

## 4. Generate NEXTAUTH_SECRET

**Method 1: Using OpenSSL (Recommended)**
```bash
openssl rand -base64 32
```

**Method 2: Online Generator**
- Go to: https://generate-secret.vercel.app/32
- Copy the generated secret

**Method 3: Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## 5. Get NEXTAUTH_URL

**For Vercel Deployment**:
- After deploying to Vercel, your URL will be: `https://your-project-name.vercel.app`

**For Local Development**:
- Use: `http://localhost:3000`

**To find your Vercel URL**:
1. Go to your Vercel dashboard
2. Click on your project
3. Copy the domain from the project overview

## Complete Environment Variables for Vercel

```env
# From Supabase Connection string → URI
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.abc123.supabase.co:5432/postgres

# From Supabase API → service_role
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Generate this yourself
NEXTAUTH_SECRET=your-generated-32-byte-secret-here

# Your Vercel deployment URL
NEXTAUTH_URL=https://your-project-name.vercel.app
```

## Quick Copy-Paste Template

Replace the placeholders with your actual values:

```
DATABASE_URL=postgresql://postgres:[YOUR_PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres
SUPABASE_SERVICE_ROLE_KEY=[COPY_FROM_API_SETTINGS]
NEXTAUTH_SECRET=[GENERATE_RANDOM_STRING]
NEXTAUTH_URL=[YOUR_VERCEL_APP_URL]
```

## Security Notes

- **service_role key** gives full database access - keep it secret
- **DATABASE_URL** contains your database password - never commit to Git
- **NEXTAUTH_SECRET** should be a random string - use `openssl rand -base64 32`
