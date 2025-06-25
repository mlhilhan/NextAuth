"use client";

import { useSession } from "next-auth/react";
import { ExtendedSession, UserRole } from "@/types/auth";
import Link from "next/link";

export default function AdminPage() {
  const { data: session, status } = useSession() as {
    data: ExtendedSession | null;
    status: string;
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!session || session.user?.role !== UserRole.ADMIN) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Yetkisiz Erişim</h1>
          <p className="mt-2 text-gray-600">
            Bu sayfaya erişim yetkiniz bulunmamaktadır.
          </p>
          <Link
            href="/dashboard"
            className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
          >
            Dashboard'a Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-red-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-white">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-white hover:text-gray-200"
              >
                Dashboard
              </Link>
              <span className="text-red-200">
                {session.user?.name || session.user?.email}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Yönetici Dashboard
            </h2>
            <p className="mt-1 text-gray-600">
              Sistem yönetimi ve kullanıcı kontrolü
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sistem Bilgileri */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">
                  Sistem Bilgileri
                </h3>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Node.js:</span>{" "}
                    {process.version}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Ortam:</span>{" "}
                    {process.env.NODE_ENV}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Auth Provider:</span> Auth0
                  </p>
                </div>
              </div>
            </div>

            {/* Kullanıcı Yönetimi */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">
                  Kullanıcı Yönetimi
                </h3>
                <div className="mt-4 space-y-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                    Kullanıcıları Listele
                  </button>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                    Yeni Kullanıcı Ekle
                  </button>
                  <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                    Rol Yönetimi
                  </button>
                </div>
              </div>
            </div>

            {/* Güvenlik */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">Güvenlik</h3>
                <div className="mt-4 space-y-3">
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                    Aktif Oturumlar
                  </button>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                    Güvenlik Logları
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Yetkiler Tablosu */}
          <div className="mt-8 bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Admin Yetkileri
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Yetki
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Açıklama
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Durum
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {session.user?.permissions?.map((permission, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {permission}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {getPermissionDescription(permission)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Aktif
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function getPermissionDescription(permission: string): string {
  const descriptions: Record<string, string> = {
    read: "Veri okuma yetkisi",
    write: "Veri yazma yetkisi",
    delete: "Veri silme yetkisi",
    admin: "Tam yönetici yetkisi",
  };
  return descriptions[permission] || "Bilinmeyen yetki";
}
