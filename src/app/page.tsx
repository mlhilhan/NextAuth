"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-cyan-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center min-h-screen text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
            Next.js Auth0
            <span className="text-indigo-600"> Entegrasyonu</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-2xl">
            NextAuth.js ve Auth0 ile güvenli kimlik doğrulama sistemi. JWT
            tabanlı oturum yönetimi ve rol bazlı yetkilendirme.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            {status === "loading" ? (
              <div className="animate-pulse bg-gray-200 h-12 w-32 rounded-md"></div>
            ) : session ? (
              <Link
                href="/dashboard"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-md text-lg font-medium"
              >
                Dashboard'a Git
              </Link>
            ) : (
              <Link
                href="/auth/signin"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-md text-lg font-medium"
              >
                Giriş Yap
              </Link>
            )}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🔐 Güvenli Auth
              </h3>
              <p className="text-gray-600">
                Auth0 ile endüstri standardı OAuth 2.0 kimlik doğrulama
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🎯 JWT Tabanlı
              </h3>
              <p className="text-gray-600">
                Stateless JWT token'ları ile ölçeklenebilir oturum yönetimi
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                👥 Rol Yönetimi
              </h3>
              <p className="text-gray-600">
                Admin ve kullanıcı rolleri ile granüler yetki kontrolü
              </p>
            </div>
          </div>

          {session && (
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Hoşgeldin, {session.user?.name || session.user?.email}!
              </h3>
              <p className="text-gray-600">
                Rol:{" "}
                <span className="font-medium">
                  {session.user?.role || "Kullanıcı"}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
