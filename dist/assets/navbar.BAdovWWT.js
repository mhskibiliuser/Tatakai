import { r as reactExports, e as useNavigate, j as jsxRuntimeExports, L as Link, a as reactDomExports } from "./react-vendor.CAo4XUiA.js";
import { u as useAuth, a8 as Avatar, a9 as AvatarImage, aa as AvatarFallback, B as Button } from "./index.C6yfkT5T.js";
import { ah as LogOut, X, cd as Menu } from "./icons.C2gBBarQ.js";
const navLinks = [
  { name: "Browse", href: "/browse" },
  { name: "Favorites", href: "/favorites" },
  { name: "Community", href: "/community" },
  { name: "Calendar", href: "/calendar" },
  { name: "Download", href: "/download" }
];
function Navigation() {
  var _a;
  const [isScrolled, setIsScrolled] = reactExports.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = reactExports.useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  reactExports.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);
  const handleSignOut = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
    navigate("/welcome");
  };
  const renderMobileMenu = () => {
    const overlay = /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `md:hidden fixed inset-0 z-[55] bg-background overflow-hidden transition-all duration-500 ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-0 left-0 right-0 flex items-center justify-between px-6 h-20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: user ? "/browse" : "/welcome",
                onClick: () => setIsMobileMenuOpen(false),
                className: "flex items-center gap-2 group",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display tracking-tight text-2xl text-foreground", children: "TATAKAI" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs mt-1 text-muted-foreground", children: "ANIME" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setIsMobileMenuOpen(false),
                className: "p-2 text-foreground",
                "aria-label": "Close menu",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full px-8 pt-28 pb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex flex-col justify-center gap-6", children: navLinks.map((link, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: link.href,
                onClick: () => setIsMobileMenuOpen(false),
                className: `text-4xl font-display text-foreground hover:text-muted-foreground transition-all duration-500 ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`,
                style: { transitionDelay: isMobileMenuOpen ? `${i * 60}ms` : "0ms" },
                children: link.name
              },
              link.name
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `flex gap-4 pt-8 border-t border-foreground/10 transition-all duration-500 ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`,
                style: { transitionDelay: isMobileMenuOpen ? "250ms" : "0ms" },
                children: [
                  user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      className: "flex-1 rounded-full h-14 text-base gap-2",
                      onClick: handleSignOut,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
                        "Sign Out"
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      className: "flex-1 rounded-full h-14 text-base",
                      onClick: () => {
                        setIsMobileMenuOpen(false);
                        navigate("/auth");
                      },
                      children: "Sign in"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      className: "flex-1 bg-foreground text-background rounded-full h-14 text-base",
                      onClick: () => {
                        setIsMobileMenuOpen(false);
                        navigate(user ? "/browse" : "/auth");
                      },
                      children: user ? "Watch Now" : "Get Started"
                    }
                  )
                ]
              }
            )
          ] })
        ]
      }
    );
    return typeof document !== "undefined" ? reactDomExports.createPortal(overlay, document.body) : overlay;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    renderMobileMenu(),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "header",
      {
        className: `fixed z-50 transition-all duration-500 ${isScrolled ? "top-4 left-4 right-4" : "top-0 left-0 right-0"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "nav",
          {
            className: `mx-auto transition-all duration-500 ${isScrolled || isMobileMenuOpen ? "bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-lg max-w-[1200px]" : "bg-transparent max-w-[1400px]"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `flex items-center justify-between transition-all duration-500 px-6 lg:px-8 ${isScrolled ? "h-14" : "h-20"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: user ? "/browse" : "/welcome", className: "flex items-center gap-2 group", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-display tracking-tight transition-all duration-500 ${isScrolled ? "text-xl text-foreground" : "text-2xl text-white"}`, children: "TATAKAI" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-mono transition-all duration-500 ${isScrolled ? "text-[10px] mt-0.5 text-muted-foreground" : "text-xs mt-1 text-white/60"}`, children: "ANIME" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:flex items-center gap-8 lg:gap-10", children: navLinks.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: link.href,
                      className: `text-sm transition-colors duration-300 relative group ${isScrolled ? "text-foreground/70 hover:text-foreground" : "text-white/70 hover:text-white"}`,
                      children: [
                        link.name,
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${isScrolled ? "bg-foreground" : "bg-white"}` })
                      ]
                    },
                    link.name
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-4", children: [
                    user ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Link,
                        {
                          to: "/profile",
                          className: `flex items-center gap-2 text-sm transition-all duration-500 ${isScrolled ? "text-foreground/80 hover:text-foreground" : "text-white/80 hover:text-white"}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-7 w-7 border border-white/20", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: (profile == null ? void 0 : profile.avatar_url) || void 0 }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "text-xs bg-primary text-primary-foreground", children: ((profile == null ? void 0 : profile.display_name) || user.email || "U")[0].toUpperCase() })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-xs max-w-[100px] truncate", children: (profile == null ? void 0 : profile.display_name) || ((_a = user.email) == null ? void 0 : _a.split("@")[0]) })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          variant: "ghost",
                          size: "icon",
                          onClick: handleSignOut,
                          className: `h-8 w-8 rounded-full ${isScrolled ? "text-foreground/70 hover:text-foreground hover:bg-foreground/10" : "text-white/70 hover:text-white hover:bg-white/10"}`,
                          title: "Sign out",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" })
                        }
                      )
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Link,
                      {
                        to: "/auth",
                        className: `transition-all duration-500 font-medium ${isScrolled ? "text-xs text-foreground/70 hover:text-foreground" : "text-sm text-white/70 hover:text-white"}`,
                        children: "Sign in"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        onClick: () => navigate(user ? "/browse" : "/auth"),
                        className: `rounded-full transition-all duration-500 font-medium ${isScrolled ? "bg-foreground hover:bg-foreground/90 text-background px-4 h-8 text-xs" : "bg-white hover:bg-white/90 text-black px-6"}`,
                        children: user ? "Watch Now" : "Get Started"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
                      className: `md:hidden p-2 transition-colors duration-500 relative z-[60] ${isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"}`,
                      "aria-label": "Toggle menu",
                      children: isMobileMenuOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-6 h-6" })
                    }
                  )
                ]
              }
            )
          }
        )
      }
    )
  ] });
}
export {
  Navigation as N
};
