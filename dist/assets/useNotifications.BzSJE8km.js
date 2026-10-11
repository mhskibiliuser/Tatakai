import { u as useQueryClient, a as useQuery, b as useMutation } from "./tanstack.DPr3OB19.js";
import { u as useAuth, a2 as supabase } from "./index.C6yfkT5T.js";
import { bf as ue, b6 as Capacitor, bz as LocalNotifications } from "./vendor.CJyRs4QS.js";
import { r as reactExports } from "./react-vendor.CAo4XUiA.js";
async function showNativeNotification(notification) {
  var _a, _b;
  if (!Capacitor.isNativePlatform()) return;
  try {
    const { display } = await LocalNotifications.checkPermissions();
    if (display !== "granted") {
      await LocalNotifications.requestPermissions();
    }
    await LocalNotifications.schedule({
      notifications: [{
        title: notification.title,
        body: notification.body,
        id: Math.abs(((_b = (_a = notification.id).hashCode) == null ? void 0 : _b.call(_a)) || Date.now()) % 2147483647,
        smallIcon: "ic_notification",
        largeIcon: "ic_notification_large",
        sound: "default"
      }]
    });
  } catch (error) {
    console.warn("Failed to show native notification:", error);
  }
}
function showDesktopNotification(notification) {
  try {
    if (Capacitor.isNativePlatform()) return;
    ue(notification.title, { description: notification.body });
  } catch (error) {
    console.warn("Failed to show desktop notification:", error);
  }
}
String.prototype.hashCode = function() {
  let hash = 0;
  for (let i = 0; i < this.length; i++) {
    const char = this.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
};
function useNotifications() {
  var _a;
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const channelRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a2, _b;
    if (!user) return;
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }
    const channelId = ((_b = (_a2 = globalThis.crypto) == null ? void 0 : _a2.randomUUID) == null ? void 0 : _b.call(_a2)) ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const channel = supabase.channel(`notifications-${user.id}-${channelId}`).on("postgres_changes", {
      event: "INSERT",
      schema: "public",
      table: "notifications",
      filter: `user_id=eq.${user.id}`
    }, (payload) => {
      queryClient.invalidateQueries({ queryKey: ["notifications", user.id] });
      if (payload.new) {
        showNativeNotification(payload.new);
        showDesktopNotification(payload.new);
      }
    }).on("postgres_changes", {
      event: "UPDATE",
      schema: "public",
      table: "notifications",
      filter: `user_id=eq.${user.id}`
    }, () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", user.id] });
    });
    channelRef.current = channel;
    channel.subscribe();
    return () => {
      if (channelRef.current === channel) {
        channelRef.current = null;
      }
      supabase.removeChannel(channel);
    };
  }, [user, queryClient]);
  const query = useQuery({
    queryKey: ["notifications", user == null ? void 0 : user.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase.from("notifications").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });
  const markAsRead = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("notifications").update({ read: true }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    }
  });
  const markAllAsRead = useMutation({
    mutationFn: async () => {
      if (!user) return;
      const { error } = await supabase.from("notifications").update({ read: true }).eq("user_id", user.id).eq("read", false);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    }
  });
  const deleteNotification = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("notifications").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      ue.success("Notification deleted");
    }
  });
  return {
    ...query,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    unreadCount: ((_a = query.data) == null ? void 0 : _a.filter((n) => !n.read).length) || 0
  };
}
export {
  useNotifications as u
};
