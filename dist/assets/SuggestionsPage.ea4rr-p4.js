import { r as reactExports, j as jsxRuntimeExports, e as useNavigate } from "./react-vendor.CAo4XUiA.js";
import { az as Input, B as Button, K as useIsDesktopApp, u as useAuth, Q as Background, S as Sidebar, aV as Select, aW as SelectTrigger, aX as SelectValue, aY as SelectContent, aZ as SelectItem, aA as Textarea, bz as TurnstileWidget, bA as Badge, bB as isTurnstileEnabled, bC as verifyTurnstileToken, a2 as supabase } from "./index.C6yfkT5T.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { u as useUserSuggestions, a as useCreateSuggestion } from "./useSuggestions.BtvuvrYw.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card.B8b1Uf1m.js";
import { R as RefreshCw, u as ArrowLeft, ci as Lightbulb, aa as Upload, X, Q as LoaderCircle, cj as Send } from "./icons.C2gBBarQ.js";
import { bp as formatDistanceToNow, bf as ue } from "./vendor.CJyRs4QS.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
function SimpleCaptcha({ onValidate }) {
  const [num1, setNum1] = reactExports.useState(0);
  const [num2, setNum2] = reactExports.useState(0);
  const [userAnswer, setUserAnswer] = reactExports.useState("");
  const [isValid, setIsValid] = reactExports.useState(false);
  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;
    setNum1(n1);
    setNum2(n2);
    setUserAnswer("");
    setIsValid(false);
    onValidate(false);
  };
  reactExports.useEffect(() => {
    generateCaptcha();
  }, []);
  reactExports.useEffect(() => {
    const correctAnswer = num1 + num2;
    const valid = parseInt(userAnswer) === correctAnswer;
    setIsValid(valid);
    onValidate(valid);
  }, [userAnswer, num1, num2]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Verify you're human" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-muted select-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-mono font-bold", children: [
        num1,
        " + ",
        num2,
        " ="
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          type: "number",
          value: userAnswer,
          onChange: (e) => setUserAnswer(e.target.value),
          placeholder: "?",
          className: `w-20 text-center ${isValid ? "border-green-500" : ""}`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: generateCaptcha,
          className: "gap-2",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" })
        }
      )
    ] }),
    userAnswer && !isValid && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "Incorrect answer" }),
    isValid && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-green-500", children: "✓ Verified" })
  ] });
}
const STATUS_COLORS = {
  pending: "bg-yellow-500/20 text-yellow-500 border-yellow-500/20",
  reviewing: "bg-blue-500/20 text-blue-500 border-blue-500/20",
  approved: "bg-green-500/20 text-green-500 border-green-500/20",
  rejected: "bg-red-500/20 text-red-500 border-red-500/20",
  implemented: "bg-purple-500/20 text-purple-500 border-purple-500/20"
};
function SuggestionsPage() {
  const navigate = useNavigate();
  const isDesktopApp = useIsDesktopApp();
  const { user } = useAuth();
  const [title, setTitle] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("feature");
  const [imageFile, setImageFile] = reactExports.useState(null);
  const [imagePreview, setImagePreview] = reactExports.useState(null);
  const [isUploading, setIsUploading] = reactExports.useState(false);
  const [captchaValid, setCaptchaValid] = reactExports.useState(false);
  const [captchaToken, setCaptchaToken] = reactExports.useState(null);
  const turnstileRef = reactExports.useRef(null);
  const turnstileEnabled = isTurnstileEnabled();
  const { data: suggestions = [], isLoading } = useUserSuggestions();
  const createSuggestion = useCreateSuggestion();
  const handleImageSelect = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        ue.error("Image must be less than 5MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };
  const uploadImage = async () => {
    if (!imageFile || !user) return null;
    try {
      setIsUploading(true);
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `suggestions/${fileName}`;
      const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, imageFile);
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      console.error("Upload error:", error);
      ue.error("Failed to upload image");
      return null;
    } finally {
      setIsUploading(false);
    }
  };
  const handleSubmit = async (e) => {
    var _a, _b;
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      ue.error("Please fill in all fields");
      return;
    }
    if (turnstileEnabled) {
      if (!captchaToken) {
        ue.error("Please complete the verification challenge");
        return;
      }
      const ok = await verifyTurnstileToken(captchaToken);
      if (!ok) {
        ue.error("Verification failed. Please try again.");
        (_a = turnstileRef.current) == null ? void 0 : _a.reset();
        setCaptchaToken(null);
        return;
      }
    } else if (!captchaValid) {
      ue.error("Please complete the captcha");
      return;
    }
    let imageUrl = null;
    if (imageFile) {
      imageUrl = await uploadImage();
    }
    await createSuggestion.mutateAsync({
      title,
      description,
      category,
      ...imageUrl && { image_url: imageUrl }
    });
    setTitle("");
    setDescription("");
    setCategory("feature");
    removeImage();
    (_b = turnstileRef.current) == null ? void 0 : _b.reset();
    setCaptchaToken(null);
  };
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background text-foreground flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mb-2", children: "Sign In Required" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Please sign in to submit suggestions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate("/auth"), children: "Sign In" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: `relative z-10 ${isDesktopApp ? "pl-6" : "pl-6 md:pl-32"} pr-6 py-6 max-w-[1400px] mx-auto pb-24 md:pb-6`, children: [
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-8 h-8 text-primary" }),
          "Suggestions"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Help us improve Tatakai by sharing your ideas and feedback" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Submit a Suggestion" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Share your ideas for new features, improvements, or report bugs" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Title *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: title,
                  onChange: (e) => setTitle(e.target.value),
                  placeholder: "Brief title for your suggestion",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Category *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: category, onValueChange: (value) => setCategory(value), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "feature", children: "Feature Request" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "bug", children: "Bug Report" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "improvement", children: "Improvement" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "content", children: "Content Request" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "other", children: "Other" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Description *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: description,
                  onChange: (e) => setDescription(e.target.value),
                  placeholder: "Describe your suggestion in detail...",
                  rows: 6,
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Attach Image (optional)" }),
              !imagePreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-2 border-dashed border-muted rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "file",
                    accept: "image/*",
                    onChange: handleImageSelect,
                    className: "hidden",
                    id: "image-upload"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "image-upload", className: "cursor-pointer", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-8 h-8 mx-auto mb-2 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Click to upload an image (max 5MB)" })
                ] })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-lg overflow-hidden border border-muted", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: imagePreview, alt: "Preview", className: "w-full max-h-48 object-contain bg-muted/20" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "destructive",
                    size: "sm",
                    className: "absolute top-2 right-2",
                    onClick: removeImage,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] }),
            turnstileEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              TurnstileWidget,
              {
                ref: turnstileRef,
                action: "suggestion",
                onToken: setCaptchaToken,
                onExpire: () => setCaptchaToken(null),
                onError: () => setCaptchaToken(null)
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(SimpleCaptcha, { onValidate: setCaptchaValid }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                disabled: createSuggestion.isPending || isUploading || (turnstileEnabled ? !captchaToken : !captchaValid),
                className: "w-full gap-2",
                children: [
                  createSuggestion.isPending || isUploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" }),
                  isUploading ? "Uploading..." : "Submit Suggestion"
                ]
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-4", children: "Your Suggestions" }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin mx-auto mb-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Loading suggestions..." })
          ] }) : suggestions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-12 text-center text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-12 h-12 mx-auto mb-4 opacity-50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "You haven't submitted any suggestions yet" })
          ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: suggestions.map((suggestion) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: suggestion.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "mt-1", children: formatDistanceToNow(new Date(suggestion.created_at), { addSuffix: true }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: STATUS_COLORS[suggestion.status], children: suggestion.status })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: suggestion.description }),
              suggestion.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: suggestion.image_url, alt: "Suggestion attachment", className: "w-full max-h-48 object-contain rounded-lg border border-muted/20" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs mt-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: suggestion.category }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: suggestion.priority })
              ] }),
              suggestion.admin_notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 p-3 rounded-lg bg-muted/50 border border-border/50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium mb-1", children: "Admin Response:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: suggestion.admin_notes })
              ] })
            ] })
          ] }, suggestion.id)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  SuggestionsPage as default
};
