import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="py-4 bg-white shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 flex items-center justify-between">
          <div>
            <Image src="/images/logo.png" alt="Aashwaas" width={140} height={40} className="object-contain" />
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <Link href="/how-it-works" className="hover:text-gray-900">How It Works</Link>
            <Link href="/categories" className="hover:text-gray-900">Categories</Link>
            <Link href="/admin_login" aria-label="Admin portal" className="ml-2 inline-flex items-center gap-2 text-sm text-purple-600 group transition px-2 py-1 hover:bg-purple-50">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-current transition-colors duration-200" aria-hidden="true">
                <path d="M12 2l7 4v5c0 5-3.2 9.7-7 11-3.8-1.3-7-6-7-11V6l7-4z" />
              </svg>
              <span className="hidden sm:inline text-current transition-colors duration-200">Admin Portal</span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="bg-gradient-to-br from-blue-50 via-blue-150 to-white">
        <div className="max-w-[1600px] mx-auto px-18">
          <div className="grid md:grid-cols-2 gap-8 items-center pt-8 pb-12">
          <div className="max-w-2xl">
            <span className="inline-block mb-4 rounded-full bg-blue-100 text-blue-700 px-4 py-2 text-sm font-medium">Connecting Generosity with Need</span>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-gray-900">
              Transform Donations into
              <br />
              <span className="block text-blue-600">Real Impact</span>
            </h1>

            <p className="text-gray-700 mb-4 max-w-xl text-lg">Aashwaas bridges donors, volunteers, and NGOs to reduce waste and maximize the impact of every contribution. Donate goods, volunteer your time, or manage charitable operations—all in one transparent platform.</p>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Link href="/donor_login" className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow">Donate Now</Link>
              <Link href="/volunteer_login" className="inline-flex items-center gap-3 border border-blue-600 text-blue-600 px-5 py-3 rounded-full hover:bg-blue-50">Become a Volunteer</Link>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <rect x="7" y="2" width="10" height="20" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 18h.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Mobile & Web App</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 2l7 4v5c0 5-3.2 9.7-7 11-3.8-1.3-7-6-7-11V6l7-4z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.5 12.5l1.75 1.75L15 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>100% Transparent</span>
                </div>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="rounded-3xl overflow-hidden shadow-2xl w-full max-w-[760px] h-[420px] md:h-[520px] bg-white">
              <Image src="/images/landingpage.png" alt="Hero" fill className="w-full h-full object-cover object-center rounded-3xl" />
            </div>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
}