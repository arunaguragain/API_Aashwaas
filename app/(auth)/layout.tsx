"use client";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Shield, Users, Heart, ArrowLeft } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname();
  
  const getPageConfig = () => {
    // Check for login pages
    if (pathname?.includes('admin')) {
      return {
        userType: 'admin' as const,
        title: 'Administrative Control',
        subtitle: 'Secure Portal',
        description: 'Manage the donation ecosystem with comprehensive oversight and control.',
        features: [
          { text: 'Complete NGO management', icon: '⛫' },
          { text: 'Real-time analytics dashboard', icon: '📈' },
          { text: 'Advanced security protocols', icon: '⛉' }
        ]
      };
    }
    
    if (pathname?.includes('volunteer')) {
      return {
        userType: 'volunteer' as const,
        title: 'Welcome Back, Volunteer!',
        subtitle: 'Make an Impact',
        description: 'Join our community of dedicated volunteers making real change happen.',
        features: [
          { text: 'Flexible task management', icon: '🗒' },
          { text: 'Track volunteer hours & impact', icon: '⏱' },
          { text: 'Community recognition', icon: '𐃯' }
        ]
      };
    }
    
    if (pathname?.includes('donor')) {
      return {
        userType: 'donor' as const,
        title: 'Welcome Back, Donor!',
        subtitle: 'Give with Confidence',
        description: 'Transform lives through your generous donations to verified organizations.',
        features: [
          { text: 'Easy donation tracking', icon: '♡' },
          { text: 'Verified NGO network', icon: '✓' },
          { text: 'Impact visualization', icon: '📈' }
        ]
      };
    }
    
    return {
      userType: 'admin' as const,
      title: 'Welcome',
      subtitle: 'Access Portal',
      description: 'Secure access to your account',
      features: []
    };
  };

  const config = getPageConfig();
  
  const colorSchemes = {
    admin: {
      gradient: "from-purple-600 via-violet-600 to-indigo-700",
      softGradient: "from-purple-200 via-purple-300 to-purple-100",
      accentGradient: "from-purple-500 to-violet-600",
      darkGradient: "from-purple-900 via-violet-900 to-indigo-900",
      textAccent: "text-purple-300",
      leftHeadingColor: "text-purple-900",
      leftBodyColor: "text-purple-800",
      featureText: "text-purple-700",
      featureBorder: "border-purple-200",
      featureIconColor: "text-purple-600",
      icon: Shield,
      pattern: "opacity-6"
    },
    volunteer: {
      gradient: "from-green-600 via-emerald-600 to-teal-700",
      softGradient: "from-green-100 via-emerald-100 to-teal-100",
      accentGradient: "from-green-500 to-emerald-600",
      darkGradient: "from-green-900 via-emerald-900 to-teal-900",
      textAccent: "text-green-300",
      leftHeadingColor: "text-emerald-900",
      leftBodyColor: "text-emerald-800",
      featureText: "text-emerald-700",
      featureBorder: "border-emerald-200",
      featureIconColor: "text-emerald-600",
      icon: Users,
      pattern: "opacity-6"
    },
    donor: {
      gradient: "from-blue-600 via-cyan-600 to-sky-700",
      softGradient: "from-sky-100 via-cyan-100 to-blue-100",
      accentGradient: "from-blue-500 to-cyan-600",
      darkGradient: "from-blue-900 via-cyan-900 to-sky-900",
      textAccent: "text-blue-300",
      leftHeadingColor: "text-sky-900",
      leftBodyColor: "text-sky-800",
      featureText: "text-sky-700",
      featureBorder: "border-sky-200",
      featureIconColor: "text-sky-600",
      icon: Heart,
      pattern: "opacity-6"
    }
  };

  const scheme = colorSchemes[config.userType];

  return (
    <div className="min-h-screen flex bg-linear-to-br from-gray-50 to-gray-100">
      <div className={`hidden lg:flex lg:w-1/2 xl:w-[45%] bg-linear-to-br ${scheme.softGradient} relative overflow-hidden`}>
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)',
            backgroundSize: '56px 56px'
          }}></div>
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

    
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  width={250}
                  height={40}
                  className="object-contain drop-shadow-sm"
                  priority
                />
              </div>
            </div>
          </div>
          <div className="space-y-8 max-w-md">
            <div>
              <h1 className={`text-5xl font-bold leading-tight mb-4 tracking-tight ${scheme.leftHeadingColor}`}>
                {config.title}
              </h1>
              <p className={`text-lg leading-relaxed ${scheme.leftBodyColor}`}>
                {config.description}
              </p>
            </div>
            {config.features.length > 0 && (
              <div className="space-y-4">
                {config.features.map((feature, i) => (
                  <div 
                    key={i} 
                    className={`flex items-center gap-4 rounded-2xl p-4 border ${scheme.featureBorder} bg-white/95 hover:shadow-lg transition-all group`}
                  >
                    <div className={`text-3xl shrink-0 transform group-hover:scale-110 transition-transform ${scheme.featureIconColor}`}>
                      {feature.icon}
                    </div>
                    <span className={`${scheme.featureText} font-medium`}>{feature.text}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
              <div>
                <div className={`text-3xl font-bold ${scheme.leftHeadingColor}`}>50K+</div>
                <div className={`text-xs ${scheme.leftBodyColor} uppercase tracking-wider`}>Active Users</div>
              </div>
              <div>
                <div className={`text-3xl font-bold ${scheme.leftHeadingColor}`}>1000+ </div>
                <div className={`text-xs ${scheme.leftBodyColor} uppercase tracking-wider`}> items Donated</div>
              </div>
              <div>
                <div className={`text-3xl font-bold ${scheme.leftHeadingColor}`}>50+</div>
                <div className={`text-xs ${scheme.leftBodyColor} uppercase tracking-wider`}>NGOS</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-black/60">
            <span>© 2025 आश्वास</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-black transition-colors">Privacy</a>
              <a href="#" className="hover:text-black transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-screen">
        <div className="p-6 lg:p-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-all group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-12">  {/* form container lai center ma rakhcha yesle*/}
          {children}
        </div>

      </div>
    </div>
  );
}