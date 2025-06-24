"use client";

import { useSession, signOut } from "next-auth/react";
import { ExtendedSession } from "@/types/auth";
import Link from "next/link";

export default function Dashboard() {
  const { data: session, status } = useSession() as {
    data: ExtendedSession | null;
    status: string;
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Erişim Reddedildi
          </h1>
          <p className="mt-2 text-gray-600">
            Bu sayfayı görüntülemek için giriş yapmalısınız.
          </p>
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
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Hoşgeldin, {session.user?.name || session.user?.email}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Kullanıcı Bilgileri */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">
                  Kullanıcı Bilgileri
                </h3>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Email:</span>{" "}
                    {session.user?.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Rol:</span>{" "}
                    {session.user?.role}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Yetkiler:</span>{" "}
                    {session.user?.permissions?.join(", ")}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">
                  Hızlı İşlemler
                </h3>
                <div className="mt-4 space-y-3">
                  <Link
                    href="/profile"
                    className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Profil Görüntüle
                  </Link>
                  {session.user?.role === "admin" && (
                    <Link
                      href="/admin"
                      className="block w-full text-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Admin Panel
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Session Info */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">
                  Oturum Bilgileri
                </h3>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    JWT Token mevcut: {session.accessToken ? "Evet" : "Hayır"}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Son giriş: {new Date().toLocaleString("tr-TR")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
