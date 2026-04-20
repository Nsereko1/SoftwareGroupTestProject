"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [token, setToken] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUserData = useCallback(async () => {
    if (!token) return;
    const response = await fetch("/api/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setUser(data.user);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchUserData();
    }
  }, [token, fetchUserData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    const payload = isLogin ? { email, password } : { email, password, name };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setMessage(isLogin ? "✅ Login successful!" : "✅ Registration successful!");
        if (!isLogin) setName("");
        setEmail("");
        setPassword("");
      } else {
        setMessage(`❌ Error: ${data.error || "Something went wrong"}`);
      }
    } catch {
      setMessage("❌ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken("");
    setUser(null);
    setMessage("👋 Logged out successfully");
  };

  const updateProfile = async () => {
    const newName = prompt("Enter your new name:", user?.name);
    if (!newName) return;

    const response = await fetch("/api/users/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: newName }),
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data.user);
      setMessage("✅ Profile updated successfully!");
    } else {
      setMessage("❌ Failed to update profile");
    }
  };

  const deleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;

    const response = await fetch("/api/users/me", {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      setMessage("🗑️ Account deleted successfully");
      handleLogout();
    } else {
      setMessage("❌ Failed to delete account");
    }
  };

  if (token && user) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen">
        <main className="flex w-full max-w-2xl flex-col items-center justify-between py-16 px-8 bg-white dark:bg-black rounded-2xl border border-black/[.08] dark:border-white/[.145] shadow-sm">
          <div className="w-full">
            <div className="flex items-center justify-between mb-8">
              <Image
                className="dark:invert"
                src="/next.svg"
                alt="Next.js logo"
                width={100}
                height={20}
                priority
              />
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full border border-black/[.08] dark:border-white/[.145] text-sm font-medium hover:bg-black/[.04] dark:hover:bg-white/[.08] transition-colors"
              >
                Logout →
              </button>
            </div>

            <div className="space-y-6">
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                  Welcome back, {user.name}!
                </h1>
                <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
                  You&apos;re successfully authenticated with JWT.
                </p>
              </div>

              <div className="border-t border-black/[.08] dark:border-white/[.145] pt-6 space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">User Information</p>
                  <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 space-y-2">
                    <p className="text-black dark:text-zinc-200">
                      <span className="font-medium">Email:</span> {user.email}
                    </p>
                    <p className="text-black dark:text-zinc-200">
                      <span className="font-medium">Name:</span> {user.name}
                    </p>
                    <p className="text-black dark:text-zinc-200">
                      <span className="font-medium">User ID:</span> {user.id}
                    </p>
                    <p className="text-black dark:text-zinc-200 text-sm">
                      <span className="font-medium">Member since:</span> {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 flex-wrap">
                  <button
                    onClick={updateProfile}
                    className="px-6 py-2 rounded-full bg-foreground text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm font-medium"
                  >
                    Update Profile
                  </button>
                  <button
                    onClick={deleteAccount}
                    className="px-6 py-2 rounded-full border border-red-500 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors text-sm font-medium"
                  >
                    Delete Account
                  </button>
                </div>
              </div>

              {message && (
                <div className="text-sm text-center text-zinc-600 dark:text-zinc-400">
                  {message}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen">
      <main className="flex w-full max-w-md flex-col items-center justify-between py-12 px-8 bg-white dark:bg-black rounded-2xl border border-black/[.08] dark:border-white/[.145] shadow-sm">
        <div className="w-full">
          <div className="flex justify-center mb-8">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={120}
              height={24}
              priority
            />
          </div>

          <div className="flex gap-4 mb-8 border-b border-black/[.08] dark:border-white/[.145]">
            <button
              onClick={() => setIsLogin(true)}
              className={`pb-2 text-sm font-medium transition-colors ${
                isLogin
                  ? "text-black dark:text-zinc-50 border-b-2 border-black dark:border-zinc-50"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-300"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`pb-2 text-sm font-medium transition-colors ${
                !isLogin
                  ? "text-black dark:text-zinc-50 border-b-2 border-black dark:border-zinc-50"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-300"
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                  className="w-full px-4 py-2 rounded-lg border border-black/[.08] dark:border-white/[.145] bg-transparent text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-zinc-500"
                  placeholder="Your name"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-black/[.08] dark:border-white/[.145] bg-transparent text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-zinc-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-black/[.08] dark:border-white/[.145] bg-transparent text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-zinc-500"
                placeholder={isLogin ? "Enter your password" : "At least 6 characters"}
                minLength={isLogin ? undefined : 6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 px-6 py-2 rounded-full bg-foreground text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : isLogin ? "Login →" : "Register →"}
            </button>
          </form>

          {message && (
            <div className="mt-6 text-sm text-center text-zinc-600 dark:text-zinc-400">
              {message}
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-black/[.08] dark:border-white/[.145] text-center">
            <p className="text-xs text-zinc-500 dark:text-zinc-500">
              Secure authentication with JWT tokens
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
