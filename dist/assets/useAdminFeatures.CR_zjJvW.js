import { a as useQuery, u as useQueryClient, b as useMutation } from "./tanstack.DPr3OB19.js";
import { u as useAuth, a2 as supabase, dO as TATAKAI_API_URL, gi as withAdminSecretHeader } from "./index.C6yfkT5T.js";
async function sendStatusIncidentWebhook(payload) {
  try {
    const colorBySeverity = {
      minor: 16436245,
      major: 16347926,
      critical: 15680580
    };
    const endpoint = `${TATAKAI_API_URL}/webhooks/discord`;
    const affected = (payload.affectedServices || []).filter(Boolean);
    await fetch(endpoint, {
      method: "POST",
      headers: withAdminSecretHeader({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        channel: "status",
        username: "Tatakai Status Bot",
        embeds: [
          {
            title: `Status Incident ${payload.action === "created" ? "Created" : "Updated"}`,
            description: payload.message || payload.title,
            color: colorBySeverity[payload.severity],
            fields: [
              { name: "Title", value: payload.title || "Untitled", inline: false },
              { name: "Severity", value: payload.severity, inline: true },
              { name: "Status", value: payload.status, inline: true },
              { name: "Affected Services", value: affected.length > 0 ? affected.join(", ") : "N/A", inline: false }
            ],
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          }
        ]
      }),
      signal: AbortSignal.timeout(1e4)
    });
  } catch {
  }
}
function useStatusIncidents(activeOnly = true) {
  return useQuery({
    queryKey: ["status_incidents", activeOnly],
    queryFn: async () => {
      let query = supabase.from("status_incidents").select("*").order("created_at", { ascending: false });
      if (activeOnly) {
        query = query.eq("is_active", true);
      }
      const { data, error } = await query;
      if (error) throw error;
      if (data && data.length > 0) {
        const { data: updates } = await supabase.from("status_incident_updates").select("*").in("incident_id", data.map((i) => i.id)).order("created_at", { ascending: false });
        const updatesMap = /* @__PURE__ */ new Map();
        updates == null ? void 0 : updates.forEach((u) => {
          if (!updatesMap.has(u.incident_id)) {
            updatesMap.set(u.incident_id, []);
          }
          updatesMap.get(u.incident_id).push(u);
        });
        return data.map((incident) => ({
          ...incident,
          updates: updatesMap.get(incident.id) || []
        }));
      }
      return data;
    }
  });
}
function useCreateIncident() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (incident) => {
      if (!user) throw new Error("Must be logged in");
      const { data, error } = await supabase.from("status_incidents").insert({
        ...incident,
        created_by: user.id
      }).select().single();
      if (error) throw error;
      void sendStatusIncidentWebhook({
        action: "created",
        title: incident.title,
        status: incident.status,
        severity: incident.severity,
        affectedServices: incident.affected_services || [],
        message: incident.description
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["status_incidents"] });
    }
  });
}
function useUpdateIncident() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async ({
      incidentId,
      updates,
      updateMessage
    }) => {
      if (!user) throw new Error("Must be logged in");
      const { error: updateError } = await supabase.from("status_incidents").update({
        ...updates,
        updated_at: (/* @__PURE__ */ new Date()).toISOString(),
        resolved_at: updates.status === "resolved" ? (/* @__PURE__ */ new Date()).toISOString() : void 0,
        is_active: updates.status !== "resolved"
      }).eq("id", incidentId);
      if (updateError) throw updateError;
      const resolvedStatus = updates.status || "investigating";
      const resolvedSeverity = updates.severity || "minor";
      if (updateMessage && updates.status) {
        const { error: msgError } = await supabase.from("status_incident_updates").insert({
          incident_id: incidentId,
          message: updateMessage,
          status: updates.status,
          created_by: user.id
        });
        if (msgError) throw msgError;
      }
      void sendStatusIncidentWebhook({
        action: "updated",
        title: `Incident ${incidentId}`,
        status: resolvedStatus,
        severity: resolvedSeverity,
        affectedServices: updates.affected_services || [],
        message: updateMessage || `Incident ${incidentId} updated to ${resolvedStatus}`
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["status_incidents"] });
    }
  });
}
function useAdminPopups() {
  return useQuery({
    queryKey: ["admin_popups"],
    queryFn: async () => {
      const { data, error } = await supabase.from("popups").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    }
  });
}
function useCreatePopup() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (popup) => {
      if (!user) throw new Error("Must be logged in");
      const { data, error } = await supabase.from("popups").insert({
        ...popup,
        use_theme_colors: popup.use_theme_colors || false,
        created_by: user.id
      }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_popups"] });
      queryClient.invalidateQueries({ queryKey: ["active_popups"] });
    }
  });
}
function useUpdatePopup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updates }) => {
      const { error } = await supabase.from("popups").update({
        ...updates,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_popups"] });
      queryClient.invalidateQueries({ queryKey: ["active_popups"] });
    }
  });
}
function useDeletePopup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("popups").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_popups"] });
      queryClient.invalidateQueries({ queryKey: ["active_popups"] });
    }
  });
}
function useAdminChangelog() {
  return useQuery({
    queryKey: ["admin_changelog"],
    queryFn: async () => {
      const { data, error } = await supabase.from("changelog").select("*").order("release_date", { ascending: false });
      if (error) throw error;
      return data;
    }
  });
}
function useCreateChangelog() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (changelog) => {
      if (!user) throw new Error("Must be logged in");
      const { data, error } = await supabase.from("changelog").insert({
        ...changelog,
        created_by: user.id
      }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["changelog"] });
      queryClient.invalidateQueries({ queryKey: ["admin_changelog"] });
    }
  });
}
function useUpdateChangelog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updates }) => {
      const { error } = await supabase.from("changelog").update({
        ...updates,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["changelog"] });
      queryClient.invalidateQueries({ queryKey: ["admin_changelog"] });
    }
  });
}
function useDeleteChangelog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("changelog").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["changelog"] });
      queryClient.invalidateQueries({ queryKey: ["admin_changelog"] });
    }
  });
}
export {
  useCreateIncident as a,
  useUpdateIncident as b,
  useAdminPopups as c,
  useCreatePopup as d,
  useUpdatePopup as e,
  useDeletePopup as f,
  useAdminChangelog as g,
  useCreateChangelog as h,
  useUpdateChangelog as i,
  useDeleteChangelog as j,
  useStatusIncidents as u
};
