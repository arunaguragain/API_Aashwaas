import Link from 'next/link';
import { Heart, Shield, Users, Package, CheckCircle, Clock, Award, ArrowRight, Sparkles } from 'lucide-react';
import Image from "next/image";

const data = {
  stats: [
    { value: '10K+', label: 'Donations', color: 'blue' },
    { value: '500+', label: 'Volunteers', color: 'green' },
    { value: '50+', label: 'NGOs', color: 'purple' }
  ],
  detailedStats: [
    { icon: Package, value: '10,000+', label: 'Items Donated', gradient: 'from-blue-500 to-blue-600' },
    { icon: Heart, value: '2,500+', label: 'Active Donors', gradient: 'from-red-500 to-red-600' },
    { icon: Users, value: '500+', label: 'Volunteers', gradient: 'from-green-500 to-green-600' },
    { icon: Award, value: '50+', label: 'NGO Partners', gradient: 'from-purple-500 to-purple-600' }
  ],
  roles: [
    {
      type: 'Donor', icon: Heart, description: 'Donate items like clothes, books, toys, and more to help those in need.',
      features: ['Upload items with photos', 'Track donation status', 'View impact dashboard'],
      registerLink: '/donor_register', loginLink: '/donor_login', color: 'blue', gradient: 'from-blue-600 to-blue-700', image: 'donor.jpg'
    },
    {
      type: 'Volunteer', icon: Users, description: 'Help collect and deliver donations. Manage tasks and earn recognition.',
      features: ['Accept pickup tasks', 'Manage your schedule', 'Earn badges & rewards'],
      registerLink: '/volunteer_register', loginLink: '/volunteer_login', color: 'green', gradient: 'from-green-600 to-green-700', image: 'volunteer.jpg'
    }
  ],
  steps: [
    { step: '01', title: 'Create Account', desc: 'Sign up in less than 2 minutes', icon: CheckCircle, color: 'blue' },
    { step: '02', title: 'List or Accept', desc: 'Donors list, volunteers accept', icon: Package, color: 'green' },
    { step: '03', title: 'Coordinate', desc: 'Schedule pickup conveniently', icon: Clock, color: 'purple' },
    { step: '04', title: 'Make Impact', desc: 'Items reach those in need', icon: Heart, color: 'pink' }
  ]
};

const Section = ({ title, subtitle, children, className = "" }: any) => (
  <div className={`py-20 ${className}`}>
    {title && (
      <div className="text-center mb-20">
        <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{title}</h2>
        {subtitle && <p className="text-xl font-semibold" style={{color: '#000000'}}>{subtitle}</p>}
      </div>
    )}
    {children}
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
      <header className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-5 flex items-center justify-between">
          <Image src="/images/logo.png" alt="logo" width={150} height={40} className="object-contain" />
          <Link href="/admin_login" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-5 py-3 rounded-xl transition-all font-semibold">
            <Shield className="w-5 h-5" />Admin Portal
          </Link>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-20 items-center py-24">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-3 rounded-full mb-8 shadow-md">
              <Sparkles className="w-5 h-5" /><span className="font-bold">Nepal's Trusted Donation Platform</span>
            </div>
            <h1 className="text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">Welcome to<br />आश्वास</span>
            </h1>
            <p className="text-xl mb-12 leading-relaxed font-semibold" style={{color: '#575555'}}>Connecting generous hearts with those in need. Make a lasting difference by donating items or volunteering your time.</p>
            <div className="flex flex-wrap gap-5 mb-16">
              <Link href="/donor_register" className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-10 py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all text-lg transform hover:scale-105">
                Start Donating<ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/volunteer_register" className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-green-600 font-bold px-10 py-5 rounded-2xl border-2 border-green-600 transition-all shadow-lg text-lg transform hover:scale-105">Become a Volunteer</Link>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {data.stats.map((s, i) => {
                const colorClass = i === 0 ? 'text-blue-600' : i === 1 ? 'text-green-600' : 'text-purple-600';
                return (
                  <div key={i} className="text-center p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                    <div className={`text-3xl font-bold ${colorClass} mb-1`}>{s.value}</div>
                    <div className="text-xs font-medium" style={{color: '#000000'}}>{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <Image src="/images/hero.jpg" alt="Donation Hero" width={700} height={500} className="w-full h-[500px] object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            {[{icon: Heart, value: '10,000+', label: 'Items Donated', pos: '-bottom-8 -left-8', bg: 'blue'}, 
              {icon: Users, value: '500+', label: 'Volunteers', pos: '-top-8 -right-8', bg: 'green'}].map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={i} className={`absolute ${c.pos} bg-white rounded-2xl shadow-2xl p-6 border-2 border-${c.bg}-100 transform hover:scale-110 transition-transform`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${c.bg}-500 to-${c.bg}-600 flex items-center justify-center shadow-xl`}>
                      <Icon className="w-7 h-7 text-white" {...(i === 0 && {fill: "currentColor"})} />
                    </div>
                    <div><div className="text-3xl font-bold">{c.value}</div><div className="text-gray-600 text-sm font-medium">{c.label}</div></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-20">
          {data.detailedStats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="group bg-white rounded-3xl p-6 text-center shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-3 duration-300">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{s.value}</div>
                <div className="font-semibold text-gray-600 text-sm">{s.label}</div>
              </div>
            );
          })}
        </div>

        <Section title="Choose Your Journey" subtitle="Join our community as a donor or volunteer">
          <div className="grid md:grid-cols-2 gap-12">
            {data.roles.map((r, i) => {
              const Icon = r.icon;
              const overlayClass = i === 0 
                ? 'bg-gradient-to-t from-blue-600/90 to-transparent' 
                : 'bg-gradient-to-t from-green-600/90 to-transparent';
              return (
                <div key={i} className="group bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all overflow-hidden transform hover:-translate-y-4 duration-300">
                  <div className="h-56 overflow-hidden relative">
                    <Image 
                      src={`/images/${r.image}`} 
                      alt={r.type} 
                      width={600} 
                      height={224} 
                      className="w-full h-full object-cover" 
                      priority={i === 0}
                      unoptimized
                    />
                    <div className={`absolute inset-0 ${overlayClass}`} />
                    <div className="absolute bottom-6 left-8">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-2xl group-hover:scale-125 transition-transform">
                        <Icon className="w-9 h-9 text-gray-700" />
                      </div>
                    </div>
                  </div>
                  <div className="p-12">
                    <h2 className="text-5xl font-bold mb-6" style={{color: '#000000'}}>I'm a {r.type}</h2>
                    <p className="text-gray-600 text-lg mb-10 leading-relaxed">{r.description}</p>
                    <ul className="space-y-5 mb-12">
                      {r.features.map((f: string, j: number) => (
                        <li key={j} className="flex items-center gap-4 text-gray-700 text-base">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <span className="font-medium">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="space-y-4">
                      <Link href={r.registerLink} className={`group/btn flex items-center justify-center gap-3 w-full bg-gradient-to-r ${r.gradient} hover:opacity-90 text-white font-bold py-5 rounded-2xl shadow-xl transition-all text-lg transform hover:scale-105`}>
                        Sign Up as {r.type}<ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                      <Link href={r.loginLink} className={`block w-full text-center bg-white hover:bg-${r.color}-50 text-${r.color}-600 font-bold py-5 rounded-2xl border-2 border-${r.color}-300 transition-all text-lg`}>Login</Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        <Section title="How It Works" subtitle="Simple steps to make a difference">
          <div className="grid md:grid-cols-4 gap-10">
            {data.steps.map((s, i) => {
              const Icon = s.icon;
              const iconBg = i === 0 ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                           i === 1 ? 'bg-gradient-to-br from-green-500 to-green-600' :
                           i === 2 ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                           'bg-gradient-to-br from-pink-500 to-pink-600';
              return (
                <div key={i} className="relative">
                  <div className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all text-center transform hover:-translate-y-3 h-full">
                    <div className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">{s.step}</div>
                    <div className={`w-14 h-14 rounded-xl ${iconBg} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3" style={{color: '#000000'}}>{s.title}</h3>
                    <p className="text-gray-600 text-base leading-relaxed">{s.desc}</p>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-5 transform -translate-y-1/2 z-10">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shadow-md">
                        <ArrowRight className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Section>

        <div className="py-20">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-3xl p-20 text-center text-white shadow-2xl transform hover:scale-105 transition-transform">
            <h2 className="text-6xl font-bold mb-8">Ready to Make a Difference?</h2>
            <p className="text-2xl mb-14 opacity-95 max-w-3xl mx-auto leading-relaxed">Join thousands of donors and volunteers changing lives every day</p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link href="/donor_register" className="inline-flex items-center gap-3 bg-white text-blue-600 hover:bg-gray-100 font-bold px-12 py-6 rounded-2xl shadow-xl text-xl transition-all transform hover:scale-105">
                Get Started as Donor<ArrowRight className="w-6 h-6" />
              </Link>
              <Link href="/volunteer_register" className="inline-flex items-center gap-3 border-2 border-white text-white hover:bg-white/20 font-bold px-12 py-6 rounded-2xl text-xl transition-all transform hover:scale-105">Join as Volunteer</Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t bg-white/90 backdrop-blur-md mt-20">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-16">
          <div className=" pt-10 text-center text-gray-600 text-lg">
            <p>© 2025 आश्वास. All rights reserved. Built with ❤️ for a better tomorrow.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}