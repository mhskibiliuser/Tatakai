import { e as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { u as useAuth, Q as Background, B as Button, G as GlassPanel, ay as Label, az as Input, bz as TurnstileWidget, bZ as OtpCodeInput, bB as isTurnstileEnabled, a2 as supabase } from "./index.C6yfkT5T.js";
import { bf as ue, bD as stringType } from "./vendor.CJyRs4QS.js";
import { u as ArrowLeft, ae as Mail, R as RefreshCw, Q as LoaderCircle, ag as ShieldCheck, a6 as Lock, af as EyeOff, m as Eye, co as KeyRound } from "./icons.C2gBBarQ.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
const emailSchema = stringType().email("Please enter a valid email");
const passwordSchema = stringType().min(6, "Password must be at least 6 characters");
function ResetPasswordPage() {
  const navigate = useNavigate();
  const { sendPasswordResetCode, verifyPasswordResetCode } = useAuth();
  const [step, setStep] = reactExports.useState("email");
  const [email, setEmail] = reactExports.useState("");
  const [otp, setOtp] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [captchaToken, setCaptchaToken] = reactExports.useState(null);
  const [challengeError, setChallengeError] = reactExports.useState(false);
  const turnstileRef = reactExports.useRef(null);
  const turnstileEnabled = isTurnstileEnabled();
  const resetCaptcha = () => {
    var _a;
    (_a = turnstileRef.current) == null ? void 0 : _a.reset();
    setCaptchaToken(null);
    setChallengeError(false);
  };
  const retryChallenge = () => {
    var _a;
    setChallengeError(false);
    setCaptchaToken(null);
    (_a = turnstileRef.current) == null ? void 0 : _a.reset();
  };
  const handleSendCode = async (e) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      ue.error(parsed.error.errors[0].message);
      return;
    }
    if (turnstileEnabled && !captchaToken) {
      ue.error("Please complete the verification challenge");
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await sendPasswordResetCode(email, captchaToken ?? void 0);
      if (error) {
        ue.error(error.message);
        resetCaptcha();
      } else {
        ue.success(`We sent a 6-digit code to ${email}`);
        setOtp("");
        setStep("code");
        resetCaptcha();
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleVerifyCode = async (codeOverride) => {
    const code = (codeOverride ?? otp).trim();
    if (code.length !== 6) {
      ue.error("Enter the 6-digit code");
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await verifyPasswordResetCode(email, code);
      if (error) {
        ue.error(error.message.toLowerCase().includes("expired") ? "That code expired — request a new one." : "Invalid code. Please try again.");
        setOtp("");
      } else {
        setStep("password");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const parsed = passwordSchema.safeParse(password);
    if (!parsed.success) {
      ue.error(parsed.error.errors[0].message);
      return;
    }
    if (password !== confirmPassword) {
      ue.error("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        ue.error(error.message);
      } else {
        ue.success("Password updated — you are signed in.");
        navigate("/");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleResend = async () => {
    if (turnstileEnabled) {
      ue.info("Head back and complete the challenge to get a fresh code.");
      setStep("email");
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await sendPasswordResetCode(email);
      if (error) ue.error(error.message);
      else ue.success(`New code sent to ${email}`);
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen relative z-10 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => step === "code" ? setStep("email") : navigate("/auth"),
          className: "gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            step === "code" ? "Back" : "Back to Login"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `${"/"}assets/logo/tatakai-logo.png`, alt: "Tatakai Logo", className: "mx-auto h-52 w-282 transition-transform duration-300 hover:scale-105 hover:drop-shadow-lg" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6 md:p-8", children: [
        step === "email" && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSendCode, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-semibold", children: "Forgot Password?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Enter your email address and we'll send you a 6-digit code to reset your password." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "email",
                  type: "email",
                  placeholder: "your@email.com",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  className: "pl-10",
                  required: true,
                  disabled: isLoading
                }
              )
            ] })
          ] }),
          turnstileEnabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TurnstileWidget,
              {
                ref: turnstileRef,
                action: "password_reset",
                onToken: (token) => {
                  setCaptchaToken(token);
                  setChallengeError(false);
                },
                onExpire: () => setCaptchaToken(null),
                onError: () => {
                  setCaptchaToken(null);
                  setChallengeError(true);
                },
                onTimeout: () => {
                  setCaptchaToken(null);
                  setChallengeError(true);
                },
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", disabled: isLoading || !email || turnstileEnabled && !captchaToken, children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
            " Sending..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4 mr-2" }),
            " Send me a code"
          ] }) })
        ] }),
        step === "code" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-semibold", children: "Enter your code" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "We sent a 6-digit code to ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: email }),
              ". Enter it below."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            OtpCodeInput,
            {
              value: otp,
              onChange: setOtp,
              onComplete: (code) => handleVerifyCode(code),
              disabled: isLoading,
              autoFocus: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: () => handleVerifyCode(),
              className: "w-full",
              disabled: isLoading || otp.length !== 6,
              children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                " Verifying..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 mr-2" }),
                " Verify code"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setStep("email"), className: "text-muted-foreground hover:text-foreground transition-colors", children: "Use a different email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleResend, disabled: isLoading, className: "text-primary hover:underline font-medium disabled:opacity-50", children: "Resend code" })
          ] })
        ] }),
        step === "password" && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleUpdatePassword, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-semibold", children: "Set a new password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "Choose a new password for ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: email }),
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "new-password", children: "New Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "new-password",
                  type: showPassword ? "text" : "password",
                  placeholder: "••••••••",
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  className: "pl-10 pr-10",
                  required: true,
                  disabled: isLoading
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setShowPassword(!showPassword),
                  className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                  children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-5 h-5" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "confirm-password", children: "Confirm Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "confirm-password",
                  type: showPassword ? "text" : "password",
                  placeholder: "••••••••",
                  value: confirmPassword,
                  onChange: (e) => setConfirmPassword(e.target.value),
                  className: "pl-10",
                  required: true,
                  disabled: isLoading
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", disabled: isLoading || !password || !confirmPassword, children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
            " Updating..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-4 h-4 mr-2" }),
            " Update password"
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-sm text-muted-foreground space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Didn't receive the email? Check your spam folder." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Still need help?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => window.open("https://discord.gg/Vr5GZFJszp", "_blank"),
              className: "text-primary hover:underline",
              children: "Contact Support"
            }
          ),
          " or submit a",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => window.open("/suggestions", "_blank"),
              className: "text-primary hover:underline",
              children: " Ticket"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  ResetPasswordPage as default
};
