"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NA</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                NextAuth Pro
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              {session ? (
                <>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {session.user?.name?.charAt(0) ||
                          session.user?.email?.charAt(0)}
                      </span>
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium text-gray-700">
                        {session.user?.name || session.user?.email}
                      </p>
                      <p className="text-xs text-gray-500">
                        {session.user?.role === "admin"
                          ? "👑 Admin"
                          : "👤 User"}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => signOut()}
                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    Çıkış Yap
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => signIn("auth0")}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                >
                  🚀 Giriş Yap
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {session ? (
          /* Logged In State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            {/* Welcome Header */}
            <div className="space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto flex items-center justify-center"
              >
                <span className="text-white text-2xl">✅</span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Hoş Geldiniz!
              </h1>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Auth0 + NextAuth.js ile güvenli kimlik doğrulama sistemi aktif
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">🔐</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  JWT Authentication
                </h3>
                <p className="text-gray-600 text-sm">
                  Güvenli token tabanlı oturum yönetimi
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">🛡️</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Middleware Protection
                </h3>
                <p className="text-gray-600 text-sm">
                  Sayfa bazlı erişim kontrolü
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">👥</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Role-Based Access
                </h3>
                <p className="text-gray-600 text-sm">
                  Admin ve user rol yetkilendirmesi
                </p>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/dashboard">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  📊 Dashboard
                </motion.div>
              </Link>

              {session.user?.role === "admin" && (
                <Link href="/admin">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    👑 Admin Panel
                  </motion.div>
                </Link>
              )}
            </motion.div>

            {/* Session Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-white/40 backdrop-blur-md rounded-2xl p-6 max-w-2xl mx-auto border border-white/20"
            >
              <h4 className="font-semibold mb-4 text-gray-800">
                🔍 Session Bilgileri
              </h4>
              <div className="bg-gray-900 rounded-lg p-4 overflow-auto">
                <pre className="text-xs text-green-400 text-left">
                  {JSON.stringify(
                    {
                      user: session.user?.email,
                      role: session.user?.role,
                      permissions: session.user?.permissions,
                      provider: "auth0",
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* Logged Out State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-12"
          >
            {/* Hero Section */}
            <div className="space-y-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center"
              >
                <span className="text-white text-3xl">🔐</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Auth0 NextAuth
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Modern, güvenli ve ölçeklenebilir kimlik doğrulama sistemi
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: "🔐",
                  title: "Auth0 OAuth",
                  desc: "Endüstri standardı OAuth 2.0 + OpenID Connect",
                },
                {
                  icon: "🎯",
                  title: "JWT Tokens",
                  desc: "Güvenli JSON Web Token tabanlı oturum yönetimi",
                },
                {
                  icon: "🛡️",
                  title: "Middleware",
                  desc: "Next.js middleware ile otomatik sayfa koruması",
                },
                {
                  icon: "👥",
                  title: "Role System",
                  desc: "Admin ve user rolü ile yetki kontrolü",
                },
                {
                  icon: "⚡",
                  title: "SOLID Design",
                  desc: "Temiz kod prensipleri ve modüler yapı",
                },
                {
                  icon: "🏗️",
                  title: "12Factor App",
                  desc: "Modern uygulama geliştirme standartları",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-600">
                Hemen başlamak için Auth0 ile giriş yapın
              </p>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => signIn("auth0")}
                className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white px-12 py-4 rounded-2xl text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                🚀 Auth0 ile Giriş Yap
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 text-center text-gray-500 text-sm border-t border-gray-200/50">
        <p>© 2025 NextAuth Pro - Auth0 + NextAuth.js Integration</p>
      </footer>
    </div>
  );
}
