import { j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { u as useAuth, B as Button } from "./index.C6yfkT5T.js";
import { C as Card, d as CardContent } from "./card.B8b1Uf1m.js";
import { S as StatusVideoBackground } from "./StatusVideoBackground.B0c-3W3u.js";
import { m as motion } from "./motion.DVGLRFCH.js";
import { dj as ShieldX, _ as Ban, g as User, T as TriangleAlert, ae as Mail } from "./icons.C2gBBarQ.js";
import "./vendor.CJyRs4QS.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
const BannedPage = () => {
  const { banReason, signOut, user, profile } = useAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex items-center justify-center p-4 overflow-hidden relative bg-gradient-to-br from-red-950/30 via-background to-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusVideoBackground, { overlayColor: "from-destructive/20 via-background/90 to-background" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "absolute top-[5%] left-[5%] text-[12rem] font-bold text-red-500/[0.03] select-none leading-none",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 2 },
          children: "禁"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "absolute bottom-[5%] right-[5%] text-[12rem] font-bold text-red-500/[0.03] select-none leading-none",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 2, delay: 0.5 },
          children: "止"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent",
          initial: { scaleX: 0 },
          animate: { scaleX: 1 },
          transition: { duration: 1.5, delay: 0.3 }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4 w-16 h-16 border-2 border-red-500/20 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500/30 text-2xl font-bold", children: "禁" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4 w-16 h-16 border-2 border-red-500/20 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500/30 text-2xl font-bold rotate-12", children: "印" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5 },
        className: "relative z-10 w-full max-w-md",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-red-500/30 bg-black/40 backdrop-blur-xl shadow-2xl shadow-red-500/10 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-8 pb-8 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { scale: 0, rotate: -180 },
                animate: { scale: 1, rotate: 0 },
                transition: { type: "spring", stiffness: 200, delay: 0.2 },
                className: "mb-6 inline-flex flex-col items-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldX, { className: "w-12 h-12 text-red-500" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        className: "absolute -top-1 -right-1",
                        animate: { rotate: [0, 10, -10, 0] },
                        transition: { duration: 0.5, repeat: Infinity, repeatDelay: 2 },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "w-8 h-8 text-red-500" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.p,
                    {
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      transition: { delay: 0.5 },
                      className: "mt-4 text-3xl font-bold text-red-500/60 tracking-[0.2em]",
                      children: "禁止"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground tracking-[0.15em] uppercase", children: "Kinshi - Prohibited" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.3 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-display font-bold text-destructive mb-2", children: "Account Suspended" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Your access to this platform has been restricted." })
                ]
              }
            ),
            (user || profile) && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.4 },
                className: "mt-4 p-3 bg-red-500/5 border border-red-500/20 rounded-lg",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5 text-red-400" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: (profile == null ? void 0 : profile.display_name) || "User" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: user == null ? void 0 : user.email })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold tracking-wider", children: "禁止" }) })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.5 },
                className: "mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 text-left", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-red-400 shrink-0 mt-0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground mb-1 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400/60 text-xs", children: "理由:" }),
                      "Reason for suspension"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: banReason || "Violation of our Terms of Service. This action was taken after careful review." })
                  ] })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 0.7 },
                className: "mt-6 grid grid-cols-2 gap-4 text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-500/5 border border-red-500/10 rounded-lg p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mb-1", children: "ステータス" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-red-400", children: "Permanent" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 border border-border/50 rounded-lg p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mb-1", children: "日付" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: (/* @__PURE__ */ new Date()).toLocaleDateString() })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.9 },
                className: "mt-8 space-y-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400/60 mr-1", children: "異議申し立て:" }),
                    "If you believe this is a mistake, you can submit an appeal."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "outline",
                        size: "lg",
                        className: "w-full gap-2 border-red-500/30 hover:bg-red-500/10 text-red-400 hover:text-red-300",
                        onClick: () => window.open("mailto:appeals@example.com?subject=Ban Appeal"),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-5 h-5" }),
                          "Submit Appeal"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "lg",
                        className: "w-full text-muted-foreground hover:text-foreground",
                        onClick: () => signOut(),
                        children: "Sign Out"
                      }
                    )
                  ] })
                ]
              }
            )
          ] })
        ] })
      }
    )
  ] });
};
export {
  BannedPage as default
};
