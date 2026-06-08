# شُغلَة (Shughla / SoHighla) - Connecting Craftsmen with Clients

An Arabic platform that connects skilled craftsmen and tradespeople directly with clients, enabling faster job opportunities and trusted services in gypsum, decoration, home maintenance, and more across Arab cities.

**Website:** [sohighla.vercel.app](https://sohighla.vercel.app)

---

## 📋 About

Shughla is a marketplace/directory platform (not a service provider) that enables:

- **Clients** to browse, search, and connect with available craftsmen
- **Craftsmen** to create professional portfolios showcasing their work, skills, and experience
- Direct communication between both parties with no intermediary

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16.2.5 (App Router) |
| **Language** | TypeScript 5 |
| **UI Library** | React 19.2.4 |
| **Styling** | Tailwind CSS v4 |
| **State Management** | Zustand v5 (with encrypted persist) |
| **Server State** | TanStack React Query v5 |
| **Authentication** | NextAuth.js v4 (Google + Facebook) + custom JWT |
| **Forms** | react-hook-form v7 |
| **HTTP Client** | Axios v1.16 with interceptors |
| **Notifications** | react-hot-toast v2 |
| **Icons** | react-icons v5 |
| **Animation** | framer-motion v12 |
| **Encryption** | crypto-js v4 |
| **Fonts** | Google Fonts (Tajawal, Lemonada) |

---

## ✨ Features

### Authentication & User Management
- Sign in via email/password or Google/Facebook OAuth
- Role selection (client / craftsman)
- Email verification via OTP
- Password reset flow (forgot password → verify OTP → reset)
- Encrypted session storage using Zustand + AES

### Public Pages
- **Homepage** - Hero section with search, feature cards, service categories, featured craftsmen
- **Craftsmen Directory** (`/craftsmen`) - Browse all craftsmen with category filtering
- **Craftsman Detail** (`/craftsmen/[id]`) - Full profile (images, video, skills, reviews)
- **About Us** (`/about-us`)
- **How It Works** (`/how-it-works`)
- **Terms & Conditions** (`/terms`)
- **Privacy Policy** (`/privacy-policy`)
- **Delete Account** (`/delete-account`)

### Client Dashboard (`/dashboard-client`)
- View latest contact request
- Manage all previous requests (pending / completed / cancelled)
- Rate craftsmen after work completion
- Client profile page

### Craftsman Dashboard (`/dashboard-craftsman`)
- Stats overview (views, contact requests, profile completion, rating)
- Create / update portfolio (images, video, skills, experience)
- Work gallery management (add/delete images)
- Update phone number
- Collapsible sidebar navigation

---

## 📁 Project Structure

```
my-app/
├── app/                          # Next.js App Router pages
│   ├── (auth)/auth/              # Authentication pages
│   ├── (protected)/              # Protected pages (require auth)
│   ├── craftsmen/                # Public craftsmen pages
│   └── api/auth/                 # NextAuth API route
├── components/
│   ├── layout/                   # Layout components (Header, Navbar, Hero, etc.)
│   ├── features/auth/            # Auth feature components
│   ├── features/craftsman/       # Craftsman feature components
│   └── ui/                       # Reusable UI components
├── hooks/                        # Custom hooks (useAuth, useCraftsman, useClient)
├── services/                     # API service layer
├── lib/                          # Configuration (axios, nextAuth, queryClient)
├── providers/                    # React providers (NextAuth, React Query)
├── store/                        # Zustand store
├── types/                        # TypeScript type definitions
└── utils/                        # Helper utilities
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Environment Variables

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=https://tasklyqu.runasp.net/
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret
```

---

## 🌐 API

The platform connects to an external API (`tasklyqu.runasp.net`) for all data operations:

- **Auth:** Registration, login, email verification, password reset
- **Craftsmen:** Create/update portfolio, list craftsmen, show phone number
- **Clients:** View contact requests, update request status
- **Control:** Skills and categories management

---

## 📄 License

This is a private project.
