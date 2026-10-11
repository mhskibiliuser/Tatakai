import { e as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { u as useAuth, D as useIsNativeApp, K as useIsDesktopApp, U as useIsMobileApp, j as cn, bZ as OtpCodeInput, B as Button, ay as Label, az as Input, bz as TurnstileWidget, bB as isTurnstileEnabled } from "./index.C6yfkT5T.js";
import { bf as ue, bD as stringType } from "./vendor.CJyRs4QS.js";
import { u as ArrowLeft, ag as ShieldCheck, g as User, ae as Mail, a6 as Lock, af as EyeOff, m as Eye, R as RefreshCw } from "./icons.C2gBBarQ.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
const emailSchema = stringType().email("Please enter a valid email");
const passwordSchema = stringType().min(6, "Password must be at least 6 characters");
const VIDEO_SOURCES = [
  "./assets/video/1.mp4",
  "./assets/video/2.webm",
  "./assets/video/3.mp4",
  "./assets/video/5.mp4",
  "./assets/video/6.mp4",
  `${window.location.origin}/assets/video/5.mp4`,
  `${window.location.origin}/assets/video/6.mp4`
];
function AuthPage() {
  const navigate = useNavigate();
  const {
    signIn,
    signUp,
    user,
    verifySignupCode,
    resendSignupCode
  } = useAuth();
  const [isLogin, setIsLogin] = reactExports.useState(true);
  const [step, setStep] = reactExports.useState("form");
  const [otp, setOtp] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [displayName, setDisplayName] = reactExports.useState("");
  const [errors, setErrors] = reactExports.useState({});
  const [captchaToken, setCaptchaToken] = reactExports.useState(null);
  const [challengeError, setChallengeError] = reactExports.useState(false);
  const turnstileRef = reactExports.useRef(null);
  const turnstileEnabled = isTurnstileEnabled();
  const randomVideoSrc = reactExports.useMemo(() => {
    return VIDEO_SOURCES[Math.floor(Math.random() * VIDEO_SOURCES.length)];
  }, []);
  const isNative = useIsNativeApp();
  useIsDesktopApp();
  const isMobileApp = useIsMobileApp();
  reactExports.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  if (user) {
    return null;
  }
  const resetCaptcha = () => {
    var _a;
    (_a = turnstileRef.current) == null ? void 0 : _a.reset();
    setCaptchaToken(null);
    setChallengeError(false);
  };
  const handleChallengeToken = (token) => {
    setCaptchaToken(token);
    setChallengeError(false);
  };
  const handleChallengeError = () => {
    setCaptchaToken(null);
    setChallengeError(true);
  };
  const retryChallenge = () => {
    var _a;
    setChallengeError(false);
    setCaptchaToken(null);
    (_a = turnstileRef.current) == null ? void 0 : _a.reset();
  };
  const validateForm = () => {
    const newErrors = {};
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      newErrors.password = passwordResult.error.errors[0].message;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const goToVerify = () => {
    setOtp("");
    setStep("verify");
    resetCaptcha();
  };
  const backToForm = () => {
    setStep("form");
    setOtp("");
    resetCaptcha();
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (turnstileEnabled && !captchaToken) {
      ue.error("Please complete the verification challenge");
      return;
    }
    setIsLoading(true);
    try {
      if (isLogin) {
        const { error } = await signIn(email, password, captchaToken ?? void 0);
        if (error) {
          ue.error(error.message.includes("Invalid login credentials") ? "Invalid email or password" : error.message);
          resetCaptcha();
        } else {
          ue.success("Welcome back!");
          navigate("/");
        }
      } else {
        const { error } = await signUp(email, password, displayName, captchaToken ?? void 0);
        if (error) {
          ue.error(error.message.includes("already registered") ? "This email is already registered" : error.message);
          resetCaptcha();
        } else {
          ue.success(`Almost there — we sent a 6-digit code to ${email}`);
          goToVerify();
        }
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleVerify = async (codeOverride) => {
    const code = (codeOverride ?? otp).trim();
    if (code.length !== 6) {
      ue.error("Enter the 6-digit code");
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await verifySignupCode(email, code);
      if (error) {
        ue.error(error.message.toLowerCase().includes("expired") ? "That code expired — request a new one." : "Invalid code. Please try again.");
        setOtp("");
      } else {
        ue.success("Email verified — welcome to Tatakai!");
        navigate("/onboarding");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleResend = async () => {
    if (turnstileEnabled) {
      ue.info("Head back and complete the challenge to get a fresh code.");
      backToForm();
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await resendSignupCode(email);
      if (error) ue.error(error.message);
      else ue.success(`New code sent to ${email}`);
    } finally {
      setIsLoading(false);
    }
  };
  const switchAuthMode = () => {
    setIsLogin((prev) => !prev);
    setStep("form");
    setOtp("");
    setPassword("");
    setErrors({});
    resetCaptcha();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col lg:flex-row", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(
      "w-full lg:w-1/2 min-h-screen bg-background flex flex-col justify-center items-center p-6 lg:p-12 relative",
      isMobileApp && "lg:w-full"
    ), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => step === "verify" ? backToForm() : navigate("/"),
          className: cn(
            "absolute top-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group",
            isNative ? "left-4" : "left-6"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5 group-hover:-translate-x-1 transition-transform" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: step === "verify" ? "Back" : "Back to Home" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `${"/"}assets/logo/tatakai-logo-square.png`, alt: "Tatakai logo", className: "w-full h-full object-cover" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold gradient-text", children: "Tatakai" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl lg:text-3xl font-bold text-foreground mb-2", children: step === "verify" ? "Enter your code" : isLogin ? "Welcome back!" : "Create your account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: step === "verify" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "We sent a 6-digit code to ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: email }),
            ". Enter it below."
          ] }) : isLogin ? "Enter your credentials to access your account." : "Join thousands of anime lovers today." })
        ] }),
        step === "verify" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            OtpCodeInput,
            {
              value: otp,
              onChange: setOtp,
              onComplete: (code) => handleVerify(code),
              disabled: isLoading,
              autoFocus: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: () => handleVerify(),
              disabled: isLoading || otp.length !== 6,
              className: "w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 font-semibold text-lg shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30",
              children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5" }),
                " Verify"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: backToForm, className: "text-muted-foreground hover:text-foreground transition-colors", children: "Use a different email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleResend, disabled: isLoading, className: "text-primary hover:underline font-medium disabled:opacity-50", children: "Resend code" })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleFormSubmit, className: "space-y-5", children: [
          !isLogin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "displayName", className: "text-foreground font-medium", children: "Display Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "displayName",
                  type: "text",
                  value: displayName,
                  onChange: (e) => setDisplayName(e.target.value),
                  placeholder: "Your display name",
                  className: "h-12 pl-12 bg-muted/30 border-border hover:border-primary/50 focus:border-primary transition-colors"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", className: "text-foreground font-medium", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "email",
                  type: "email",
                  value: email,
                  onChange: (e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: void 0 }));
                  },
                  placeholder: "you@example.com",
                  className: `h-12 pl-12 bg-muted/30 border-border hover:border-primary/50 focus:border-primary transition-colors ${errors.email ? "border-destructive" : ""}`
                }
              )
            ] }),
            errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.email })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", className: "text-foreground font-medium", children: "Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "password",
                  type: showPassword ? "text" : "password",
                  value: password,
                  onChange: (e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: void 0 }));
                  },
                  placeholder: "••••••••",
                  className: `h-12 pl-12 pr-12 bg-muted/30 border-border hover:border-primary/50 focus:border-primary transition-colors ${errors.password ? "border-destructive" : ""}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setShowPassword(!showPassword),
                  className: "absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                  children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-5 h-5" })
                }
              )
            ] }),
            errors.password && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: errors.password }),
            isLogin && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => navigate("/reset-password"), className: "text-sm text-primary hover:underline", children: "Forgot password?" }) })
          ] }),
          turnstileEnabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TurnstileWidget,
              {
                ref: turnstileRef,
                action: isLogin ? "login" : "signup",
                onToken: handleChallengeToken,
                onExpire: () => setCaptchaToken(null),
                onError: handleChallengeError,
                onTimeout: handleChallengeError,
                className: "flex justify-center"
              }
            ),
            challengeError && !captchaToken && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium", children: "Verification didn't load correctly." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "On iPhone this is usually iCloud Private Relay, a VPN, or a Safari content blocker interfering with the check. Disable them for this site, or try Safari." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: retryChallenge,
                  className: "mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
                    " Retry verification"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              disabled: isLoading || turnstileEnabled && !captchaToken,
              className: "w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 font-semibold text-lg shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30",
              children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" }) : isLogin ? "Sign In" : "Create Account"
            }
          )
        ] }),
        step !== "verify" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
          isLogin ? "Don't have an account?" : "Already have an account?",
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: switchAuthMode, className: "ml-2 text-primary hover:underline font-semibold", children: isLogin ? "Sign Up" : "Sign In" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 pt-8 border-t border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center", children: [
          "By continuing, you agree to our",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/terms"), className: "text-primary hover:underline", children: "Terms of Service" }),
          ",",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/privacy"), className: "text-primary hover:underline", children: "Privacy Policy" }),
          ",",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/dmca"), className: "text-primary hover:underline", children: "DMCA Policy" }),
          ", and",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/community-guidelines"), className: "text-primary hover:underline", children: "Community Guidelines" }),
          "."
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(
      "hidden lg:block w-1/2 h-screen relative overflow-hidden",
      isMobileApp && "lg:hidden"
    ), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("video", { autoPlay: true, muted: true, loop: true, playsInline: true, className: "absolute inset-0 w-full h-full object-cover", children: /* @__PURE__ */ jsxRuntimeExports.jsx("source", { src: randomVideoSrc, type: randomVideoSrc.endsWith(".webm") ? "video/webm" : "video/mp4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex flex-col justify-end p-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-3xl font-bold text-white mb-4 drop-shadow-lg", children: "Your Gateway to Anime" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-lg drop-shadow-md", children: "Stream thousands of anime titles, track your progress, and join a community of passionate fans." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" })
    ] })
  ] });
}
export {
  AuthPage as default
};
