import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock, KeyRound, Loader2, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { sendResetOtp, resetPassword } from "../features/auth/authService";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Step 1: enter email, Step 2: enter OTP + new password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSendOtp(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await sendResetOtp(email);
      setSuccess("OTP sent! Check your inbox.");
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResetPassword(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await resetPassword(email, otp, newPassword);
      setSuccess("Password reset successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-cta/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="bg-bg-card w-full max-w-md rounded-2xl shadow-xl overflow-hidden z-10 border border-white/50">
        <div className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cta/10 border border-cta/20 mb-4">
              <KeyRound className="w-8 h-8 text-cta" />
            </div>
            <h1 className="text-3xl font-bold text-primary tracking-tight mb-2">
              {step === 1 ? "Forgot Password?" : "Reset Password"}
            </h1>
            <p className="text-secondary text-sm">
              {step === 1
                ? "Enter your email address and we'll send you a reset OTP."
                : `Enter the OTP sent to ${email} and your new password.`}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-xl bg-accent/10 border border-accent/20 flex items-start text-accent-dark">
              <AlertCircle className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-3 rounded-xl bg-green-50 border border-green-200 flex items-start text-green-700">
              <ShieldCheck className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{success}</p>
            </div>
          )}

          {/* Step 1: Enter Email */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-secondary-light" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="block w-full pl-10 pr-3 py-2.5 border border-bg-dark rounded-xl focus:ring-2 focus:ring-cta/50 focus:border-cta bg-gray-50/50 hover:bg-gray-50 text-primary placeholder-secondary-light transition-all outline-none"
                    autoFocus
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center py-3 px-4 rounded-xl shadow-sm text-sm font-medium text-white bg-cta hover:bg-cta-hover disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
              >
                {isLoading ? (
                  <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Sending OTP...</>
                ) : (
                  <>Send OTP <ArrowRight className="ml-2 h-4 w-4" /></>
                )}
              </button>
            </form>
          )}

          {/* Step 2: Enter OTP + New Password */}
          {step === 2 && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Enter OTP</label>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="123456"
                  className="block w-full px-4 py-3 border border-bg-dark rounded-xl focus:ring-2 focus:ring-cta/50 focus:border-cta bg-gray-50/50 text-primary text-center text-2xl font-bold tracking-[0.5em] placeholder-secondary-light transition-all outline-none"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">New Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-secondary-light" />
                  </div>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-3 py-2.5 border border-bg-dark rounded-xl focus:ring-2 focus:ring-cta/50 focus:border-cta bg-gray-50/50 hover:bg-gray-50 text-primary placeholder-secondary-light transition-all outline-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading || otp.length < 6 || !newPassword}
                className="w-full flex items-center justify-center py-3 px-4 rounded-xl shadow-sm text-sm font-medium text-white bg-cta hover:bg-cta-hover disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
              >
                {isLoading ? (
                  <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Resetting...</>
                ) : (
                  <><ShieldCheck className="mr-2 h-4 w-4" /> Reset Password</>
                )}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/login")}
              className="text-sm font-semibold text-cta hover:text-cta-hover transition-colors"
            >
              ← Back to Login
            </button>
          </div>
        </div>
        <div className="h-1.5 w-full bg-gradient-to-r from-primary via-cta to-accent"></div>
      </div>
    </div>
  );
}
