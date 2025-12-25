import Link from 'next/link';
import { Heart, Gift, TrendingUp } from 'lucide-react';
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={150}
            height={150}
            className="object-contain"
          />
          <Link
            href="/admin_login"
            className="text-gray-700 hover:text-gray-900 font-medium"
          >
            Admin Portal
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-blue-600">Welcome to आश्वास</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Connecting generous donors with those in need. Make a difference by
            donating items or volunteering your time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Heart className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              I'm a Donor
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Donate items like clothes, books, toys, and more to help those in need.
              Track your donation and see your impact.
            </p>
            <div className="space-y-3">
              <Link
                href="/donor_register"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
              >
                Sign Up as Donor
              </Link>
              <Link
                href="/donor_login"
                className="block w-full bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-6 rounded-lg text-center border-2 border-blue-600 transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Gift className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              I'm a Volunteer
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Help collect and deliver donations to those who need them.
              Manage tasks and track your volunteer hours.
            </p>
            <div className="space-y-3">
              <Link
                href="/volunteer_register"
                className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
              >
                Sign Up as Volunteer
              </Link>
              <Link
                href="/volunteer_login"
                className="block w-full bg-white hover:bg-gray-50 text-green-600 font-semibold py-3 px-6 rounded-lg text-center border-2 border-green-600 transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Heart className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Easy Donations</h3>
            <p className="text-gray-600">
              List items you want to donate with just a few clicks
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Gift className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Trusted Volunteers</h3>
            <p className="text-gray-600">
              Verified volunteers handle pickup and delivery
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Track Impact</h3>
            <p className="text-gray-600">
              See the real impact of your donations and volunteer work
            </p>
          </div>

        </div>
      </main>
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600">
            © 2025 आश्वास. Nurturing Compassion, Inspiring Change.
          </p>
        </div>
      </footer>

    </div>
  );
}
