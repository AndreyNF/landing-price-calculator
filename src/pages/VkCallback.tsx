import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useVkAuth } from "@/components/extensions/vk-auth/useVkAuth";
import Icon from "@/components/ui/icon";

const VK_AUTH_URL = "https://functions.poehali.dev/86f3f05d-2e0a-462a-aa06-2c00d428c502";
const AUTH_URL = "https://functions.poehali.dev/cf442b6d-1511-4826-a129-d63da8e9dfa0";

export default function VkCallback() {
  const navigate = useNavigate();
  const handled = useRef(false);

  const vkAuth = useVkAuth({
    apiUrls: {
      authUrl: `${VK_AUTH_URL}?action=auth-url`,
      callback: `${VK_AUTH_URL}?action=callback`,
      refresh: `${VK_AUTH_URL}?action=refresh`,
      logout: `${VK_AUTH_URL}?action=logout`,
    },
  });

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    vkAuth.handleCallback().then(async (success) => {
      if (success && vkAuth.user) {
        // Создаём совместимую сессию через основной auth
        try {
          const res = await fetch(AUTH_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "vk_login",
              vk_id: vkAuth.user.vk_id,
              login: vkAuth.user.name ? `vk_${vkAuth.user.vk_id}` : undefined,
            }),
          });
          const data = await res.json();
          if (data.session_id) {
            localStorage.setItem("session_id", data.session_id);
            localStorage.setItem("user", JSON.stringify(data.user));
          }
        } catch {
          // даже если не удалось — пускаем дальше
        }
        navigate("/cabinet");
      } else {
        navigate("/login");
      }
    });
  }, [vkAuth.user]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <Icon name="LoaderCircle" size={36} className="animate-spin" style={{ color: "var(--blue)" }} />
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>Выполняется вход через VK...</p>
    </div>
  );
}
