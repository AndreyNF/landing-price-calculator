import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useVkAuth } from "@/components/extensions/vk-auth/useVkAuth";
import Icon from "@/components/ui/icon";

const VK_AUTH_URL = "https://functions.poehali.dev/86f3f05d-2e0a-462a-aa06-2c00d428c502";

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

    vkAuth.handleCallback().then((success) => {
      if (success) {
        navigate("/cabinet");
      } else {
        navigate("/login");
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <Icon name="LoaderCircle" size={36} className="animate-spin" style={{ color: "var(--blue)" }} />
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>Выполняется вход через VK...</p>
    </div>
  );
}
