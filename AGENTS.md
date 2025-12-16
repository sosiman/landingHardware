# AGENTS.md

## Project Overview
**LOCKTHARD - AI Tools Landing Page**

Modern landing page showcasing top AI and developer tools. Features interactive CLI windows, 3D visualizations, authentication system, and a curated collection of AI tools and resources.

- **Live Site:** https://ia.lockthard.es
- **Backend API:** https://chat.lockthard.es
- **Tech Stack:** React 19, Vite, Tailwind CSS, Three.js, Firebase, Supabase

## Project Structure

```
LANDINGIASTOP/
├── backend/                 # FastAPI backend for Abacus AI integration
│   ├── main.py             # API endpoints for GLM-4.6 chat
│   ├── Dockerfile          # Docker configuration
│   └── requirements.txt    # Python dependencies
├── src/
│   ├── components/         # React components
│   │   ├── three/         # 3D components (Silk.jsx)
│   │   ├── *Card.jsx      # Category cards (Academia, Cybersecurity, etc.)
│   │   ├── *CLIWindow.jsx # Interactive CLI components
│   │   ├── ChatWindow.jsx # GLM-4.6 AI chat interface
│   │   ├── Hero.jsx       # Landing page hero section
│   │   ├── NavBar.jsx     # Navigation with auth
│   │   ├── magic-loader.tsx # Animated logo component
│   │   └── globe.tsx      # 3D globe visualization
│   ├── config/
│   │   ├── firebase.js    # Firebase configuration
│   │   └── supabase.js    # Supabase client
│   ├── context/
│   │   └── AuthContext.jsx # Authentication state management
│   └── data/
│       └── all-tools.json  # Tools database
├── scripts/
│   └── migrate-to-dynamodb.js # AWS DynamoDB migration script
└── .env                    # Environment variables (not in git)
```

## Key Features

1. **Authentication System**
   - Google OAuth via Firebase
   - Email authorization via Supabase
   - Row Level Security (RLS) for user access control

2. **Interactive Components**
   - CLI-style windows for developer tools
   - 3D globe with Cobe library
   - Animated particle logo (MagicLoader)
   - Framer Motion animations

3. **AI Integration**
   - GLM-4.6 chat via Abacus AI
   - Backend API for chat functionality
   - CORS-protected endpoints

4. **Tool Categories**
   - Academia & Research
   - Cybersecurity
   - Web Development
   - Automation
   - Free APIs & Hosting
   - CLI Tools

## Environment Variables

Required in `.env`:
```
VITE_API_URL=https://chat.lockthard.es
VITE_SUPABASE_URL=https://ggumixecwcufquqrisdq.supabase.co
VITE_SUPABASE_ANON_KEY=<supabase-anon-key>
```

Backend `.env`:
```
ABACUS_API_KEY=<abacus-api-key>
PORT=8000
```

## Development

### Frontend
```bash
npm install
npm run dev          # Start dev server at localhost:3000
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## Deployment

- **Frontend:** Deployed via Dokploy at https://ia.lockthard.es
- **Backend:** Deployed via Dokploy at https://chat.lockthard.es
- **DNS:** Configured via GoDaddy/Cloudflare
- **SSL:** Let's Encrypt via Traefik

## Important Notes

### Security
- ✅ `.env` files are in `.gitignore`
- ✅ Only `.env.example` files in repository
- ✅ Supabase uses RLS for data protection
- ✅ Firebase API keys are public (protected by Firebase rules)
- ⚠️ Service Role Keys should NEVER be exposed in frontend

### Critical: Protecting Secrets in Git
**ALWAYS verify `.gitignore` includes:**
```
.env
.env.local
backend/.env
```

**NEVER commit files containing:**
- `VITE_SUPABASE_ANON_KEY` - Supabase authentication key
- `ABACUS_API_KEY` - Abacus AI API key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase admin key (if used)
- Any other API keys or secrets

**Before committing, check:**
```bash
git status  # Verify .env is NOT listed
git diff    # Review changes before commit
```

**If secrets were accidentally committed:**
1. Rotate/regenerate ALL exposed keys immediately
2. Update keys in Dokploy environment variables
3. Update local `.env` files
4. Consider cleaning Git history with `git filter-repo`

### Common Issues
1. **Globe not rendering in dev:** Normal behavior due to HMR, works in production
2. **Nested `<a>` tags warning:** Known issue in tool cards, doesn't affect functionality
3. **Canvas/WebGL errors:** Ensure browser supports WebGL 2.0

## Code Style

- **React:** Functional components with hooks
- **Styling:** Tailwind CSS utility classes
- **Animations:** Framer Motion for page transitions
- **State:** Context API for global state (auth, favorites)
- **File naming:** PascalCase for components, camelCase for utilities

## Dependencies

### Frontend
- React 19.2.0
- Vite 5.4.20
- Tailwind CSS
- Three.js (@react-three/fiber)
- Framer Motion
- Firebase (auth)
- Supabase (database)
- Lucide React (icons)

### Backend
- FastAPI
- uvicorn
- httpx
- python-dotenv

## Git Workflow

```bash
git add .
git commit -m "descriptive message"
git push origin main
```

Dokploy auto-deploys on push to main branch.

## Contact & Support

- **Author:** sosiman (albertotplaza@gmail.com)
- **GitHub:** https://github.com/sosiman/ia
- **Issues:** Report via GitHub Issues
