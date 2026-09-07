import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, ShieldCheck, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { sendVerifyOtp, verifyEmail } from "../features/auth/authService";
import { useAuth } from "../features/auth/useAuth";

export default function VerifyEmail() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleVerify(e) {
    e.preventDefault();
    if (!otp.trim()) return;
    setIsLoading(true);
    setError("");
    try {
      await verifyEmail(user?.email, otp);
      setSuccess("Email verified successfully! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResend() {
    setIsResending(true);
    setError("");
    setSuccess("");
    try {
      await sendVerifyOtp();
      setSuccess("A new OTP has been sent to your email!");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsResending(false);
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
              <ShieldCheck className="w-8 h-8 text-cta" />
            </div>
            <h1 className="text-3xl font-bold text-primary tracking-tight mb-2">Verify Your Email</h1>
            <p className="text-secondary text-sm">
              We sent a 6-digit OTP to <strong>{user?.email}</strong>. Enter it below to verify your account.
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

          <form onSubmit={handleVerify} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">
                Enter OTP
              </label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="123456"
                className="block w-full px-4 py-3 border border-bg-dark rounded-xl focus:ring-2 focus:ring-cta/50 focus:border-cta bg-gray-50/50 hover:bg-gray-50 text-primary text-center text-2xl font-bold tracking-[0.5em] placeholder-secondary-light transition-all outline-none"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.length < 6}
              className="w-full flex items-center justify-center py-3 px-4 rounded-xl shadow-sm text-sm font-medium text-white bg-cta hover:bg-cta-hover disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Verifying...</>
              ) : (
                <><ShieldCheck className="mr-2 h-4 w-4" /> Verify Email</>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-secondary">
              Didn't receive the email?{" "}
              <button
                onClick={handleResend}
                disabled={isResending}
                className="font-semibold text-cta hover:text-cta-hover transition-colors inline-flex items-center gap-1 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isResending ? "animate-spin" : ""}`} />
                {isResending ? "Sending..." : "Resend OTP"}
              </button>
            </p>
            <button
              onClick={() => navigate("/login")}
              className="mt-3 text-sm font-semibold text-cta hover:text-cta-hover transition-colors"
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
