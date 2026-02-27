"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface Props {
  userType: "Admin" | "Donor" | "Volunteer";
}

export default function GoogleSignIn({ userType }: Props) {
  const router = useRouter();
  const { setIsAuthenticated, setUser } = useAuth();
  const [gsiStatus, setGsiStatus] = React.useState<string>("loading");

  useEffect(() => {
    const id = "google-client-script";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.src = "https://accounts.google.com/gsi/client";
      s.async = true;
      s.defer = true;
      s.id = id;
      document.head.appendChild(s);
      s.onload = () => initClient();
    } else {
      initClient();
    }

    function initClient() {
      // @ts-ignore
      const googleObj = window.google;
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      if (!googleObj || !clientId) return;

      try {
        // @ts-ignore
        googleObj.accounts.id.initialize({
          client_id: clientId,
          callback: (response: any) => {
            if (!response?.credential) return;
            // POST to relative path so Next dev server rewrite/proxy handles it (avoids CORS)
            (async () => {
              try {
                const r = await fetch(`/api/auth/google`, {
                  method: "POST",
                  credentials: "include",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ idToken: response.credential }),
                });
                try {                 
                  const headers: Record<string,string> = {};
                  r.headers.forEach((v,k) => { headers[k]=v });
                } catch(e) {
                }
                const data = await r.json().catch((e)=>{ console.error('invalid json body', e); return null});
                if (data?.success) {
                  if (data.token) {
                    try { localStorage.setItem("auth_token", data.token); } catch(e){}
                  }
                  if (data.data) {
                    try { localStorage.setItem("user_data", JSON.stringify(data.data)); } catch(e){}
                    setUser && setUser(data.data);
                  }
                  // Also set cookies so code that reads `document.cookie` or server-side
                  // cookie APIs see the auth immediately. Keep SameSite=Lax for dev.
                  try {
                    if (typeof document !== 'undefined' && data.token) {
                      const maxAge = 60 * 60 * 24 * 30; // 30 days
                      document.cookie = `auth_token=${encodeURIComponent(data.token)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
                    }
                    if (typeof document !== 'undefined' && data.data) {
                      const ud = encodeURIComponent(JSON.stringify(data.data));
                      const maxAge = 60 * 60 * 24 * 30;
                      document.cookie = `user_data=${ud}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
                    }
                    // cookies set for client-side checks
                  } catch (e) {
                    console.error('Could not set cookies in client', e);
                  }
                  setIsAuthenticated && setIsAuthenticated(true);
                  const userRole = data.data?.role?.toLowerCase();
                  let redirectPath = "/auth/dashboard";
                  if (userRole === "donor") redirectPath = "/user/donor/dashboard";
                  else if (userRole === "volunteer") redirectPath = "/user/volunteer/dashboard";
                  else if (userRole === "admin") redirectPath = "/admin/dashboard";
                  try {
                    // attempt client-side navigation
                    const pushResult = (router.push as any)(redirectPath);
                    // Normalize to a promise for awaiting if possible
                    const pushPromise = pushResult && typeof pushResult.then === 'function'
                      ? pushResult
                      : Promise.resolve(pushResult);

                    // Wait briefly for router to perform navigation
                    let navigated = false;
                    try {
                      await Promise.race([
                        pushPromise,
                        new Promise((res) => setTimeout(res, 600)),
                      ]);
                      // check location after attempt
                      navigated = window.location.pathname === redirectPath;
                    } catch (e) {
                      console.error('router.push promise rejected', e);
                    }

                    if (!navigated) {
                      // fallback to full redirect
                      window.location.href = redirectPath;
                    }
                  } catch (e) {
                    console.error('Redirect failed', e);
                    try {
                      window.location.href = redirectPath;
                    } catch (_) {}
                  }
                } else {
                  alert(data?.message || "Google sign-in failed");
                }
              } catch (err) {
                console.error("Google sign-in request failed", err);
                alert("Google sign-in failed");
              }
            })();
          },
        });

        // Always render Google's popup button (avoids FedCM/prompt flow which may be disabled)
        try {
          const renderWhenReady = (attempts = 0) => {
            const container = document.getElementById("googleBtn");
            if (container) {
              try {
                // @ts-ignore
                googleObj.accounts.id.renderButton(container, { theme: "outline", size: "large" });
                setGsiStatus("button-rendered");
                return;
              } catch (e) {
                // If renderButton fails, try again after a delay
                setTimeout(() => renderWhenReady(attempts + 1), 200);
                return;
              }
            }
            setGsiStatus("no-container");
          };
          renderWhenReady(0);
        } catch (e) {
          console.error("GSI render error", e);
          setGsiStatus("render-error");
        }

        setGsiStatus((s) => (s === "loading" ? "initialized" : s));
      } catch (err) {
        console.error("GSI initialize error", err);
        setGsiStatus("init-error");
      }
    }
  }, [router]);

  const handleClick = () => {
    // The visible Google button rendered by `renderButton` handles clicks.
    // If it's not present, inform the user.
    const btn = document.getElementById("googleBtn")?.querySelector("button, div[role=button]");
    if (!btn) {
      alert("Google sign-in not ready. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center">
        <div id="googleBtn" className="inline-flex items-center justify-center bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm" />
      </div>
    </div>
  );
}
