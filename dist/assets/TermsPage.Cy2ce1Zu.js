import { e as useNavigate, j as jsxRuntimeExports, L as Link } from "./react-vendor.CAo4XUiA.js";
import { K as useIsDesktopApp, Q as Background, S as Sidebar } from "./index.C6yfkT5T.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card.B8b1Uf1m.js";
import { u as ArrowLeft, bh as FileText } from "./icons.C2gBBarQ.js";
import "./vendor.CJyRs4QS.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
function TermsPage() {
  const navigate = useNavigate();
  const isDesktopApp = useIsDesktopApp();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: `relative z-10 ${isDesktopApp ? "pl-6" : "pl-6 md:pl-32"} pr-6 py-6 max-w-[1000px] mx-auto pb-24 md:pb-6`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => navigate(-1),
          className: "flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Back" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl md:text-4xl font-black tracking-tight mb-2 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-8 h-8 text-primary" }),
          "Terms and Conditions"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Last updated: September 28, 2026" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "1. Acceptance of Terms" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "By accessing and using Tatakai, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "Any content you post, comment, rate, or otherwise contribute is additionally governed by our",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/community-guidelines", className: "text-primary hover:underline", children: "Community Guidelines" }),
              ", which form part of these Terms."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "2. Educational Purpose Disclaimer" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-yellow-500", children: "IMPORTANT: This project is created strictly for educational purposes only." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Tatakai is a frontend web application demonstration that aggregates anime content from various third-party sources through web scraping and public APIs. We do not host, store, or own any of the anime content displayed on this platform." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "This platform demonstrates:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 ml-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Modern web development practices and technologies" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "API integration and data aggregation techniques" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "User interface and experience design" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Real-time features and interactive components" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "3. Use License" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Permission is granted to temporarily access the materials on Tatakai for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Under this license you may not:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 ml-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Modify or copy the materials" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Use the materials for any commercial purpose or for any public display" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Attempt to reverse engineer any software contained on Tatakai" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Remove any copyright or other proprietary notations from the materials" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: 'Transfer the materials to another person or "mirror" the materials on any other server' })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "4. Content and Copyright" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "All anime content, including but not limited to videos, images, and descriptions, are sourced from third-party platforms and are the property of their respective copyright holders." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Tatakai does not claim ownership of any third-party content. All trademarks, service marks, trade names, and logos are the property of their respective owners." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "5. User Conduct" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "You agree not to:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 ml-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Use the service for any unlawful purpose" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Harass, abuse, or harm another person" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Post or transmit any content that is offensive, obscene, or objectionable" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Attempt to gain unauthorized access to any portion of the service" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Interfere with or disrupt the service or servers" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "All posts, comments, and other community contributions must also follow our",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/community-guidelines", className: "text-primary hover:underline", children: "Community Guidelines" }),
              ". Before your first post or comment you will be asked to confirm that you have read and agree to them. Violations may result in content removal, warnings, suspension, or a permanent ban."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "6. Privacy and Data Collection" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We collect minimal personal information necessary to provide our services. This includes:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 ml-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Email address and display name (if you create an account)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Watch history and preferences (stored locally and optionally in our database)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Comments and ratings you submit" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We do not sell, trade, or share your personal information with third parties without your consent, except as required by law." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "7. Disclaimer" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: 'The materials on Tatakai are provided "as is". Tatakai makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties. Further, Tatakai does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.' }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "8. Limitations" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "In no event shall Tatakai or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Tatakai, even if Tatakai or a Tatakai authorized representative has been notified orally or in writing of the possibility of such damage." }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "9. Revisions" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Tatakai may revise these terms of service at any time without notice. By using this platform, you are agreeing to be bound by the then current version of these Terms and Conditions." }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "10. Contact Information" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "If you have any questions about these Terms and Conditions, please contact us through our suggestions page or community forums." }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  TermsPage as default
};
