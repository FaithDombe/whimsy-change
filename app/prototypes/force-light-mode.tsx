"use client";

import { useEffect } from "react";

export function ForceLightMode() {
  useEffect(() => {
    // Force light theme attribute on <html>
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.style.colorScheme = "light";
    document.documentElement.classList.remove("dark");
    if (document.body) {
      document.body.classList.remove("dark");
    }

    try {
      localStorage.setItem("ziki-theme", "light");
      document.cookie = "theme=light; path=/; max-age=31536000; SameSite=Lax";
    } catch {
      // ignore storage access errors
    }
  }, []);

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){
          try {
            document.documentElement.setAttribute('data-theme', 'light');
            document.documentElement.style.colorScheme = 'light';
            if (document.documentElement.classList) document.documentElement.classList.remove('dark');
            if (document.body && document.body.classList) document.body.classList.remove('dark');
          } catch(e){}
        })()`,
      }}
    />
  );
}
