import { e as useNavigate, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { K as useIsDesktopApp, Q as Background, S as Sidebar, B as Button } from "./index.C6yfkT5T.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card.B8b1Uf1m.js";
import { u as ArrowLeft, aV as Shield, T as TriangleAlert, ae as Mail } from "./icons.C2gBBarQ.js";
import "./vendor.CJyRs4QS.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
function DMCAPage() {
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-8 h-8 text-primary" }),
          "DMCA & Copyright Notice"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Digital Millennium Copyright Act Policy" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-yellow-500/20 bg-yellow-500/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-yellow-500", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5" }),
            "Important Educational Disclaimer"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "This entire project is created strictly for EDUCATIONAL PURPOSES ONLY." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Tatakai is a frontend demonstration project showcasing modern web development practices, API integration, and user interface design. We are NOT a commercial anime streaming service." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-lg bg-background/50 border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mb-2", children: "Key Points:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 ml-4 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "We DO NOT host any anime content on our servers" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "We DO NOT own any of the anime content displayed" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "All content is sourced from third-party platforms via web scraping and public APIs" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "We are merely a frontend interface demonstrating technical capabilities" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "This is a non-commercial, educational project" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Copyright Respect Policy" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Tatakai respects the intellectual property rights of others and expects its users to do the same. We comply with the provisions of the Digital Millennium Copyright Act (DMCA) and other applicable copyright laws." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "All anime content, videos, images, and related materials displayed on this platform are:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 ml-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Sourced from third-party platforms and APIs" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Property of their respective copyright holders" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Not hosted or stored on our servers" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Displayed for educational and demonstration purposes only" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "How We Aggregate Content" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Tatakai functions as a frontend aggregator that:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 ml-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Uses public APIs from services like HiAnime, Jikan (MyAnimeList API), and others" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Scrapes publicly available data from various anime platforms" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Embeds video players from external sources" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Acts as a search and discovery interface" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4", children: "We DO NOT:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 ml-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Upload anime episodes or movies to our servers" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Store video files or copyrighted content" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Claim ownership of any anime content" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Monetize copyrighted content" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Bypass any DRM or content protection systems" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Takedown Requests" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "If you are a copyright owner or an agent thereof and believe that any content on Tatakai infringes upon your copyrights, you may submit a takedown notification." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Please note:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 ml-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "We can only remove links to external content, as we do not host the content itself" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "For content removal, you should contact the original hosting platform" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "We will cooperate fully with valid DMCA requests" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 p-4 rounded-lg bg-muted/50 border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-3", children: "DMCA Notice Requirements" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mb-2", children: "Your notice must include:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "list-decimal list-inside space-y-2 ml-4 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "A physical or electronic signature of the copyright owner or authorized representative" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Identification of the copyrighted work claimed to have been infringed" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Identification of the material that is claimed to be infringing (URL on our site)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Contact information (address, telephone number, email address)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "A statement of good faith belief that use is not authorized" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "A statement that the information is accurate and you are authorized to act" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-6 h-6 text-primary shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Contact for DMCA Notices:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Please submit DMCA notices through our suggestions/contact page or community forums. We will respond to legitimate requests within a reasonable time frame." })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Counter-Notice" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "If you believe that content was removed or access was disabled as a result of mistake or misidentification, you may file a counter-notice containing:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 ml-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Your physical or electronic signature" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Identification of the removed content and its location before removal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "A statement under penalty of perjury that you have a good faith belief the content was removed by mistake" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Your name, address, and telephone number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "A statement consenting to jurisdiction in your location" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Repeat Infringer Policy" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Tatakai will terminate user accounts of repeat copyright infringers in appropriate circumstances. Users who repeatedly upload copyrighted material or post infringing links may have their accounts suspended or permanently banned." }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Good Faith Statement" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We operate in good faith as an educational project. If any copyright holder finds their content improperly linked or displayed:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 ml-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "We will promptly investigate the claim" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "We will remove links to infringing content upon valid request" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "We encourage rights holders to contact the original hosting platforms" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "We maintain no copies of copyrighted video content" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/20 bg-primary/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Support Legal Anime Streaming" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We encourage all users to support the anime industry by using official, licensed streaming services such as:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 ml-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Crunchyroll" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Funimation" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Netflix" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Hulu" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Amazon Prime Video" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "HIDIVE" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4", children: "These services directly support anime creators, studios, and the industry as a whole." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => navigate("/suggestions"),
            className: "gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }),
              "Submit a DMCA Notice"
            ]
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  DMCAPage as default
};
