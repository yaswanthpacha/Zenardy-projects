"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

export default function LoginPage(){
  const supabase = createClientComponentClient();
  const [persist, setPersist] = useState(true);
  const signIn = async () => {
    try{
      localStorage.setItem("persist", persist ? "true" : "false");
    }catch{}
    await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : undefined } });
  };
  return (
    <div className="min-h-[70vh] grid place-items-center">
      <div className="w-full max-w-md rounded-2xl border bg-white dark:bg-gray-900 shadow p-6">
        <h1 className="text-lg font-semibold mb-2">Welcome to Zenardy Projects</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Sign in to continue</p>
        <label className="flex items-center gap-2 mb-4">
          <input type="checkbox" checked={persist} onChange={(e)=>setPersist(e.target.checked)} />
          <span className="text-sm">Stay signed in</span>
        </label>
        <button onClick={signIn} className="w-full px-3 py-2 rounded-xl text-sm bg-blue-600 text-white hover:bg-blue-700">Continue with Google</button>
      </div>
    </div>
  );
}