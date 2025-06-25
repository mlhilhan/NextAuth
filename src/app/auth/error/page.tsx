"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  const errorMessages: Record<string, string> = {
    Configuration:
      "Auth0 konfigürasyon hatası - CLIENT_ID, CLIENT_SECRET veya DOMAIN kontrol edin",
    AccessDenied: "Erişim reddedildi - Kullanıcı girişi iptal etti",
    Verification: "E-posta doğrulama gerekli",
    OAuthSignin: "OAuth sağlayıcısına bağlanırken hata oluştu",
    OAuthCallback: "OAuth callback hatası - Redirect URI kontrol edin",
    Default: "Kimlik doğrulama sırasında bir hata oluştu",
  };

  const errorMessage =
    errorMessages[error || "Default"] || errorMessages.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Giriş Hatası
          </h1>
          <p className="mt-2 text-gray-600">{errorMessage}</p>

          {/* Debug Bilgileri */}
          {error && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg text-left">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Hata Detayları:
              </h3>
              <p className="text-xs text-gray-600">
                <strong>Error:</strong> {error}
              </p>
              {errorDescription && (
                <p className="text-xs text-gray-600 mt-1">
                  <strong>Description:</strong> {errorDescription}
                </p>
              )}

              <div className="mt-3 text-xs text-gray-500">
                <p>
                  <strong>Kontrol Edilecekler:</strong>
                </p>
                <ul className="mt-1 space-y-1 list-disc list-inside">
                  <li>.env.local dosyasındaki AUTH0_* değişkenleri</li>
                  <li>Auth0 Dashboard'daki Callback URLs</li>
                  <li>Auth0 Application türü (Regular Web App)</li>
                  <li>Domain ve Client ID doğruluğu</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Link
            href="/auth/signin"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Tekrar Dene
          </Link>

          <Link
            href="/"
            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Ana Sayfaya Git
          </Link>
        </div>

        <div className="mt-8 text-xs text-gray-500">
          <p>Sorun devam ederse lütfen .env.local dosyasını kontrol edin.</p>
        </div>
      </div>
    </div>
  );
}
