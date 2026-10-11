import { r as reactExports, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { u as useAuth, G as GlassPanel, B as Button, a2 as supabase, ao as notifyReviewPopup } from "./index.C6yfkT5T.js";
import { bf as ue } from "./vendor.CJyRs4QS.js";
import { A as AnimatePresence, m as motion } from "./motion.DVGLRFCH.js";
import { X, H as Heart, aI as Star, b_ as ThumbsUp } from "./icons.C2gBBarQ.js";
function ReviewPopup({ isOpen: propIsOpen, onClose, animeId, animeName, userId }) {
  const { user: authUser } = useAuth();
  const user = userId ? { id: userId } : authUser;
  const [internalIsOpen, setInternalIsOpen] = reactExports.useState(false);
  const isOpen = propIsOpen !== void 0 ? propIsOpen : internalIsOpen;
  const handleClose = onClose || (() => {
    setInternalIsOpen(false);
    localStorage.setItem("tatakai_review_shown", "true");
  });
  const [step, setStep] = reactExports.useState("invite");
  const [rating, setRating] = reactExports.useState(0);
  const [feedback, setFeedback] = reactExports.useState("");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const hasShown = localStorage.getItem("tatakai_review_shown");
    if (hasShown || propIsOpen !== void 0 || !authUser) return;
    const timer = setTimeout(() => {
      setInternalIsOpen(true);
    }, 18e4);
    return () => clearTimeout(timer);
  }, [propIsOpen, authUser]);
  const handleSubmit = async () => {
    var _a, _b;
    setIsSubmitting(true);
    try {
      if (user == null ? void 0 : user.id) {
        await supabase.from("user_suggestions").insert({
          user_id: user.id,
          title: "App Review",
          description: `Rating: ${rating}/5

${feedback}`,
          category: "feedback",
          priority: "normal",
          status: "pending",
          created_at: (/* @__PURE__ */ new Date()).toISOString()
        });
      }
      notifyReviewPopup({
        userId: user == null ? void 0 : user.id,
        userName: ((_a = authUser == null ? void 0 : authUser.user_metadata) == null ? void 0 : _a.display_name) || ((_b = authUser == null ? void 0 : authUser.email) == null ? void 0 : _b.split("@")[0]),
        animeId,
        animeName,
        rating,
        feedback
      });
      setStep("thanks");
      localStorage.setItem("tatakai_review_shown", "true");
      ue.success("Thank you for your feedback!");
    } catch (error) {
      ue.error("Failed to submit review");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => handleClose(), 3e3);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 50, scale: 0.9 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: 50, scale: 0.9 },
      className: "fixed bottom-6 right-6 z-[100] w-full max-w-sm",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6 shadow-2xl border-primary/20 bg-card/95 backdrop-blur-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleClose,
            className: "absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        ),
        step === "invite" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-6 h-6 text-primary fill-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold", children: "Enjoying Tatakai?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Your feedback helps us build the best anime experience." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setStep("rating"), className: "flex-1", children: "Sure!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: handleClose, children: "Maybe later" })
          ] })
        ] }),
        step === "rating" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold", children: "Rate your experience" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-2", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onMouseEnter: () => setRating(s),
              onClick: () => {
                setRating(s);
                setStep("feedback");
              },
              className: "transition-transform hover:scale-125",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Star,
                {
                  className: `w-8 h-8 ${s <= rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground"}`
                }
              )
            },
            s
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Select a star to continue" })
        ] }),
        step === "feedback" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold", children: "Anything else?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: feedback,
              onChange: (e) => setFeedback(e.target.value),
              placeholder: "Suggestions, bugs, or things you love...",
              className: "w-full h-24 bg-muted/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleSubmit,
              disabled: isSubmitting,
              className: "w-full",
              children: isSubmitting ? "Submitting..." : "Submit Feedback"
            }
          )
        ] }),
        step === "thanks" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8 text-center space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "w-8 h-8 text-emerald-500" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold", children: "Arigato!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Your feedback has been received." })
        ] })
      ] })
    }
  ) });
}
export {
  ReviewPopup as R
};
