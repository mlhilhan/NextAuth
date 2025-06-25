# 🚀 NextAuth + Auth0 Integration

A modern, secure authentication system built with **Next.js 14**, **Auth0**, and **NextAuth.js**. Features JWT-based session management, role-based authorization, and middleware protection.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Auth0](https://img.shields.io/badge/Auth0-EB5424?style=for-the-badge&logo=auth0&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### 🔐 Authentication & Security
- **Auth0 OAuth 2.0** integration with social providers
- **JWT (JSON Web Token)** session management  
- **Next.js Middleware** for automatic route protection
- **Role-based authorization** (Admin/User)
- Secure logout with complete session cleanup

### 🎨 Modern UI/UX
- **Responsive design** with TailwindCSS
- **Framer Motion** animations and transitions
- **Glassmorphism** design with gradient themes
- **Loading states** and user feedback
- **Dark/Light mode** support

### ⚡ Developer Experience
- **TypeScript** for type safety
- **SOLID principles** and clean architecture
- **12-Factor App** methodology
- **Environment-based configuration**
- **Comprehensive error handling**

## 🏗️ Architecture

```
src/
├── app/
│   ├── api/auth/[...nextauth]/     # NextAuth.js API routes
│   ├── dashboard/                  # Protected user pages
│   ├── admin/                      # Admin-only pages
│   └── page.tsx                    # Homepage
├── lib/
│   └── auth/
│       └── config.ts               # Authentication configuration
├── components/
│   ├── ui/                         # Reusable UI components
│   └── AuthProvider.tsx            # Session provider wrapper
├── types/
│   └── auth.ts                     # TypeScript type definitions
└── middleware.ts                   # Route protection middleware
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Auth0 account

### 1. Clone the Repository

```bash
git clone https://github.com/mlhilhan/NextAuth
cd NextAuth
npm install
```

### 2. Auth0 Setup

1. Create an Auth0 application at [auth0.com](https://auth0.com)
2. Set **Application Type** to "Regular Web Applications"
3. Configure **Allowed Callback URLs**:
   ```
   http://localhost:3000/api/auth/callback/auth0
   ```
4. Configure **Allowed Logout URLs**:
   ```
   http://localhost:3000
   ```

### 3. Environment Configuration

Create `.env.local` file:

```bash
# Auth0 Configuration
AUTH0_SECRET=your-auth0-secret
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret

# NextAuth Configuration  
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Environment
NODE_ENV=development
```

### 4. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🔑 Role-Based Access Control

### Admin Users

Add admin emails in `src/lib/auth/config.ts`:

```typescript
const adminEmails = [
  'admin@example.com',
  'your-admin@email.com'
]
```

### Route Protection

- **Public Routes**: `/`, `/auth/*`
- **User Routes**: `/dashboard/*` (requires authentication)
- **Admin Routes**: `/admin/*` (requires admin role)

## 📁 Key Files Explained

### `src/lib/auth/config.ts`
Core authentication configuration with Auth0 provider setup, JWT callbacks, and role management.

### `middleware.ts`
Route protection middleware that automatically redirects unauthorized users and enforces role-based access control.

### `src/app/api/auth/[...nextauth]/route.ts`
NextAuth.js API routes handler for authentication endpoints.

### `src/types/auth.ts`
TypeScript type definitions for enhanced type safety across the application.

## 🛡️ Security Features

- **JWT Token Validation**: Automatic token verification on each request
- **Route Protection**: Middleware-based access control
- **Role Authorization**: Fine-grained permission system
- **Secure Sessions**: HTTP-only cookies with proper expiration
- **CSRF Protection**: Built-in NextAuth.js security measures

## 🎨 UI Components

### Authentication States
- **Loading State**: Animated spinner during authentication
- **Logged Out**: Clean landing page with Auth0 login
- **Logged In**: Dashboard with user info and role-based navigation

### Responsive Design
- **Mobile-first** approach with TailwindCSS
- **Glassmorphism** cards and modern gradients
- **Smooth animations** with Framer Motion
- **Accessible** design with proper contrast and focus states

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Update Auth0 URLs to production domain

### Environment Variables for Production

```bash
AUTH0_BASE_URL=https://your-domain.vercel.app
NEXTAUTH_URL=https://your-domain.vercel.app
```

Update Auth0 application settings with production URLs.

## 🔧 Customization

### Adding New Roles

1. Update `UserRole` enum in `src/types/auth.ts`
2. Modify `getUserRole` function in `src/lib/auth/config.ts`
3. Add route protection rules in `middleware.ts`

### Custom UI Themes

Modify TailwindCSS configuration and update gradient colors in components.

### Additional Auth Providers

Add more providers in the NextAuth configuration:

```typescript
providers: [
  Auth0Provider({...}),
  GoogleProvider({...}),
  GitHubProvider({...}),
]
```

## 📊 Testing

### Manual Testing Checklist

- [ ] User can sign in with Auth0
- [ ] JWT tokens are properly generated
- [ ] Role-based access control works
- [ ] Middleware protects routes correctly
- [ ] User can sign out completely
- [ ] Admin features are restricted to admin users

### Test Users

Create test users in Auth0 dashboard:
- **Admin**: `admin@test.com`
- **User**: `user@test.com`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [NextAuth.js](https://next-auth.js.org/) - Authentication library
- [Auth0](https://auth0.com/) - Identity platform
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library

## 📞 Support

If you have any questions or need help, please open an issue in this repository.

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ and ☕ 

</div>
