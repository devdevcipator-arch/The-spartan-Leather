"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { KeyRound, HelpCircle, Eye, EyeOff, CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import BrandCrest from "@/components/BrandCrest";

export default function ResetPasswordPage() {
  const [checkingSession, setCheckingSession] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // The recovery link lands here only after /auth/callback exchanged the
  // code for a session. If there is no session, redirect home to request a
  // fresh recovery link.
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setCheckingSession(false);
      } else {
        window.location.replace("/forgot-password");
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (newPassword.length < 6) {
      setErrorMsg("Password must contain at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match. Please verify both entries.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });

      if (error) {
        setErrorMsg(error.message);
      } else {
        setIsSuccess(true);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("An unexpected error occurred while resetting the password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#0B0B0B] text-[#E5DFD3] selection:bg-[#C29B38] selection:text-black py-12 px-4 sm:px-6">
      {/* Authentic Textured Black Pebble Leather Background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-90"
        style={{
          backgroundImage: "url('/images/auth/auth-leather-backdrop.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />

      {/* Atmospheric Dark Vignette Gradient Overlays */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(5,5,5,0.75)_70%,_#050505_100%)]" />
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#0B0B0B]/80" />

      {/* Top Brand Access Link */}
      <div className="relative z-10 mb-6 flex items-center justify-center">
        <Link
          href="/"
          className="group flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#7A5C22]/30 bg-[#121110]/80 backdrop-blur-md text-[11px] font-medium uppercase tracking-[0.24em] text-[#CCA855]/90 hover:text-[#E0C681] hover:border-[#CCA855]/60 hover:bg-[#1A1918] transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
        >
          <span className="text-[#C29B38] transition-transform group-hover:-translate-x-1">←</span>
          <span>The Spartan Leather</span>
        </Link>
      </div>

      {/* Centered Luxury Atelier Password Reset Card */}
      <div className="relative z-10 w-full max-w-[500px] rounded-lg border border-[#7A5C22]/45 bg-[#171615]/95 backdrop-blur-md px-7 sm:px-11 py-9 sm:py-12 shadow-[0_25px_70px_rgba(0,0,0,0.95),_0_0_50px_rgba(194,155,56,0.06)] ring-1 ring-white/5">

        {/* Card Header: Brand Crest Emblem */}
        <div className="flex flex-col items-center text-center">
          <div className="relative flex items-center justify-center mb-4">
            <BrandCrest
              size={48}
              className="w-12 h-12 object-contain drop-shadow-[0_0_12px_rgba(204,168,85,0.35)] select-none"
            />
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-2xl sm:text-[28px] font-normal uppercase tracking-[0.26em] text-[#CCA855] leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            New Credentials
          </h1>

          {/* Subtitle */}
          <p className="mt-2 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.26em] text-[#8E8B85]">
            Reset Atelier Password
          </p>
        </div>

        {checkingSession || isSuccess ? (
          <div className="mt-8 text-center py-6 px-3 space-y-4 animate-fadeIn">
            {isSuccess && (
              <>
                <div className="w-14 h-14 mx-auto rounded-full bg-[#1A1918] border border-[#CCA855]/50 flex items-center justify-center text-[#CCA855] shadow-[0_0_20px_rgba(204,168,85,0.25)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="font-serif text-xl uppercase tracking-[0.18em] text-[#CCA855]">
                  Password Updated
                </h2>
                <p className="text-xs text-[#A8A49C] leading-relaxed max-w-sm mx-auto font-light">
                  Your new credentials have been sealed. Use them to access the atelier.
                </p>
                <div className="pt-4">
                  <Link
                    href="/login"
                    className="btn-spartan inline-flex items-center justify-center gap-2 w-full py-3.5 rounded bg-gradient-to-r from-[#C29B38] via-[#DEBA64] to-[#C29B38] text-[#141312] font-serif font-bold text-xs uppercase tracking-[0.2em] shadow-[0_8px_25px_rgba(194,155,56,0.3)] hover:brightness-105 transition-all"
                  >
                    Return to Secure Login <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {errorMsg && (
              <div className="flex items-start gap-2.5 p-3 rounded bg-red-950/40 border border-red-800/50 text-red-300 text-xs tracking-wide">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />
                <span className="flex-1 leading-snug">{errorMsg}</span>
              </div>
            )}

            {/* New Password */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#CCA855] mb-2"
              >
                New Password
              </label>
              <div className="relative flex items-center">
                <KeyRound className="absolute left-3.5 w-4 h-4 text-[#7A756D] pointer-events-none" />
                <input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                  disabled={loading}
                  className="w-full bg-[#242321] text-[#E5DFD3] text-xs sm:text-[13px] placeholder-[#5E5A54] pl-10 pr-11 py-3.5 rounded border border-[#3A3835] focus:border-[#C29B38] focus:ring-1 focus:ring-[#C29B38]/40 focus:bg-[#2A2926] outline-none transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  aria-label={showNewPassword ? "Hide new password" : "Show new password"}
                  className="absolute right-3.5 p-1 text-[#7A756D] hover:text-[#CCA855] transition-colors focus:outline-none"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmResetPassword"
                className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#CCA855] mb-2"
              >
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <HelpCircle className="absolute left-3.5 w-4 h-4 text-[#7A756D] pointer-events-none" />
                <input
                  id="confirmResetPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  disabled={loading}
                  className="w-full bg-[#242321] text-[#E5DFD3] text-xs sm:text-[13px] placeholder-[#5E5A54] pl-10 pr-11 py-3.5 rounded border border-[#3A3835] focus:border-[#C29B38] focus:ring-1 focus:ring-[#C29B38]/40 focus:bg-[#2A2926] outline-none transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  className="absolute right-3.5 p-1 text-[#7A756D] hover:text-[#CCA855] transition-colors focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-spartan group w-full py-4 rounded bg-gradient-to-r from-[#C29B38] via-[#DEBA64] to-[#C29B38] text-[#141312] font-serif font-bold text-xs sm:text-[13px] uppercase tracking-[0.22em] shadow-[0_8px_25px_rgba(194,155,56,0.32)] hover:shadow-[0_12px_32px_rgba(194,155,56,0.5)] active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#141312]" />
                    <span>Sealing Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Set New Password</span>
                    <span className="text-base font-normal transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
