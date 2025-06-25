"use client";

import { useSession } from "next-auth/react";
import { ExtendedSession } from "@/types/auth";
import Link from "next/link";
import { useState } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession() as {
    data: ExtendedSession | null;
    status: string;
  };
  const [showToken, setShowToken] = useState(false);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Erişim Reddedildi
          </h1>
          <p className="mt-2 text-gray-600">
            Bu sayfayı görüntülemek için giriş yapmalısınız.
          </p>
          <Link
            href="/auth/signin"
            className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
          >
            Giriş Yap
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Profil</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-gray-900"
              >
                Dashboard
              </Link>
              {session.user?.role === "admin" && (
                <Link href="/admin" className="text-red-600 hover:text-red-700">
                  Admin
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Kullanıcı Profili
            </h2>
            <p className="mt-1 text-gray-600">
              Hesap bilgilerinizi ve oturum detaylarınızı görüntüleyin
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Temel Bilgiler */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Temel Bilgiler
                </h3>
              </div>
              <div className="px-6 py-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ad Soyad
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {session.user?.name || "Belirtilmemiş"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    E-posta
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {session.user?.email}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Profil Resmi
                  </label>
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt="Profil"
                      className="mt-1 h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="mt-1 h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-500 text-xl">
                        {session.user?.name?.charAt(0) ||
                          session.user?.email?.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Yetki ve Roller */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Yetki ve Roller
                </h3>
              </div>
              <div className="px-6 py-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Kullanıcı Rolü
                  </label>
                  <span
                    className={`mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      session.user?.role === "admin"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {session.user?.role === "admin" ? "Yönetici" : "Kullanıcı"}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Yetkiler
                  </label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {session.user?.permissions?.map((permission) => (
                      <span
                        key={permission}
                        className="inline-flex px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Oturum Bilgileri */}
            <div className="bg-white shadow rounded-lg lg:col-span-2">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Oturum Bilgileri
                </h3>
              </div>
              <div className="px-6 py-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Oturum Durumu
                    </label>
                    <span className="mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Aktif
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      JWT Token
                    </label>
                    <span
                      className={`mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        session.accessToken
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {session.accessToken ? "Mevcut" : "Mevcut Değil"}
                    </span>
                  </div>
                </div>

                {session.accessToken && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Access Token
                    </label>
                    <div className="relative">
                      <textarea
                        readOnly
                        className="w-full p-3 border border-gray-300 rounded-md text-xs font-mono bg-gray-50"
                        rows={showToken ? 6 : 3}
                        value={
                          showToken
                            ? session.accessToken
                            : "•".repeat(50) + "..."
                        }
                      />
                      <button
                        onClick={() => setShowToken(!showToken)}
                        className="absolute top-2 right-2 px-3 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700"
                      >
                        {showToken ? "Gizle" : "Göster"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
