"use client";

import "./globals.css";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter, usePathname } from "next/navigation";

function ThemeToggle(){
  const [theme, setTheme] = useState<string>(()=> (typeof window !== "undefined" && localStorage.getItem("theme")) || "light");
  useEffect(()=>{
    if (typeof document !== "undefined"){
      const root = document.documentElement;
      if (theme === "dark") root.classList.add("dark"); else root.classList.remove("dark");
      localStorage.setItem("theme", theme);
    }
  },[theme]);
  return (
    <button
      onClick={()=>setTheme(theme === "dark" ? "light" : "dark")}
      className="px-3 py-2 rounded-xl text-sm bg-gray-200 dark:bg-gray-800"
      title="Toggle theme"
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}

function LogoutButton(){
  const supabase = createClientComponentClient();
  const router = useRouter();
  return (
    <button
      onClick={async()=>{ await supabase.auth.signOut(); try{sessionStorage.clear();}catch{} try{localStorage.removeItem("persist");}catch{} router.push("/login"); }}
      className="px-3 py-2 rounded-xl text-sm bg-red-600 text-white hover:bg-red-700"
      title="Logout"
    >
      Logout
    </button>
  );
}

function PersistSync(){
  // Move Supabase auth token to sessionStorage when persist=false
  useEffect(()=>{
    if (typeof window === "undefined") return;
    const persist = localStorage.getItem("persist") || "true";
    if (persist === "false"){
      for (let i=0;i<localStorage.length;i++){
        const k = localStorage.key(i);
        if (!k) continue;
        if (k.startsWith("sb-") && k.includes("-auth-token")){
          try{
            sessionStorage.setItem(k, localStorage.getItem(k)!);
            // defer removal after copy to avoid index shift issues
          }catch{}
        }
      }
      const keysToRemove: string[] = [];
      for (let i=0;i<localStorage.length;i++){
        const k = localStorage.key(i);
        if (k && k.startsWith("sb-") && k.includes("-auth-token")) keysToRemove.push(k);
      }
      keysToRemove.forEach(k => localStorage.removeItem(k));
    }
  },[]);
  return null;
}

export const metadata = {
  title: "Alliance Partner Spotlight",
  description: "Dashboard, Projects and Add Project"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <PersistSync />
        <header className="w-full border-b bg-white/70 dark:bg-gray-900/70 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/dashboard" className="text-lg font-semibold">Zenardy Projects</Link>
            <nav className="flex items-center gap-3 text-sm">
              <Link href="/dashboard" className="hover:underline">Dashboard</Link>
              <Link href="/projects" className="hover:underline">Projects</Link>
              <Link href="/new-project" className="hover:underline">Add Project</Link>
              <Link href="/projects/search" className="hover:underline">Search</Link>
              <ThemeToggle />
              <LogoutButton />
            </nav>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
