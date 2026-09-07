import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../features/auth/useAuth";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();
  const { login, register, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    try {
      if (isLogin) {
        await login(email, password);
        navigate("/dashboard");
      } else {
        await register(name, email, password);
        // Navigate directly to dashboard so they aren't forced to verify immediately
        navigate("/dashboard");
      }
    } catch (err) {
      setLocalError(err.message || "Authentication failed");
    }
  };

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient decorations */}
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-cta/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="bg-bg-card w-full max-w-md rounded-2xl shadow-xl overflow-hidden z-10 animate-fadeIn border border-white/50">
        <div className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary tracking-tight mb-2">
              {isLogin ? "Welcome back" : "Create an account"}
            </h1>
            <p className="text-secondary text-sm">
              {isLogin
                ? "Enter your details to access your account"
                : "Sign up to get started with Lunchpad"}
            </p>
          </div>

          {localError && (
            <div className="mb-6 p-3 rounded-xl bg-accent/10 border border-accent/20 flex items-start text-accent-dark animate-fadeIn">
              <AlertCircle className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{localError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div
              className={`space-y-5 transition-all duration-300 overflow-hidden ${isLogin ? "max-h-0 opacity-0" : "max-h-24 opacity-100"}`}
            >
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-primary mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-secondary-light" />
                    </div>
                    <input
                      type="text"
                      required={!isLogin}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 border border-bg-dark rounded-xl focus:ring-2 focus:ring-cta/50 focus:border-cta bg-gray-50/50 hover:bg-gray-50 text-primary placeholder-secondary-light transition-all outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-secondary-light" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-bg-dark rounded-xl focus:ring-2 focus:ring-cta/50 focus:border-cta bg-gray-50/50 hover:bg-gray-50 text-primary placeholder-secondary-light transition-all outline-none"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-primary">
                  Password
                </label>
                {isLogin && (
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-xs font-medium text-cta hover:text-cta-hover transition-colors"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-secondary-light" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-bg-dark rounded-xl focus:ring-2 focus:ring-cta/50 focus:border-cta bg-gray-50/50 hover:bg-gray-50 text-primary placeholder-secondary-light transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-cta hover:bg-cta-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cta transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Please wait...
                </>
              ) : (
                <>
                  {isLogin ? "Sign in" : "Create account"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-secondary">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="font-semibold text-cta hover:text-cta-hover transition-colors"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>
        </div>

        {/* Decorative bottom bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-primary via-cta to-accent"></div>
      </div>
    </div>
  );
}
