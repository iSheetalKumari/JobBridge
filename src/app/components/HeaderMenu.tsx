"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type Props = {
  user: any | null;
  signInUrl?: string;
  signUpUrl?: string;
};

export default function HeaderMenu({ user, signInUrl = "/login", signUpUrl = "/signup" }: Props) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [menuStyle, setMenuStyle] = useState<{ top: number; left: number; width?: number } | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!buttonRef.current) return;
      const btn = buttonRef.current;
      if (btn.contains(e.target as Node)) return;
      // If click outside button and menu, close
      const menu = document.getElementById("header-menu-dropdown");
      if (menu && menu.contains(e.target as Node)) return;
      setOpen(false);
    }

    function onScroll() {
      // close on scroll to avoid misposition
      setOpen(false);
    }

    window.addEventListener("click", onDoc);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("click", onDoc);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open || !buttonRef.current) {
      setMenuStyle(null);
      return;
    }
    const rect = buttonRef.current.getBoundingClientRect();
    const top = rect.bottom + 8; // 8px gap
    const left = Math.max(8, rect.right - 192); // align right, ensure some left margin
    setMenuStyle({ top, left, width: 192 });
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 bg-white text-sm hover:shadow focus:outline-none"
      >
        {user ? (
          <span className="font-medium text-gray-700">{user.firstName || user.email}</span>
        ) : (
          <span className="text-gray-700">Account</span>
        )}
        <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 011.1 1.02l-4.25 4.656a.75.75 0 01-1.1 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {open && menuStyle && (
        <div
          id="header-menu-dropdown"
          style={{ position: "fixed", top: menuStyle.top, left: menuStyle.left, width: menuStyle.width }}
          className="bg-white border border-gray-200 rounded-md shadow-lg z-50"
        >
          <ul className="py-1">
            {!user && (
              <>
                <li>
                  <Link href={signInUrl} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setOpen(false)}>
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link href={signUpUrl} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setOpen(false)}>
                    Create account
                  </Link>
                </li>
              </>
            )}

            {user && (
              <>
                <li>
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setOpen(false)}>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link href="/new-listing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setOpen(false)}>
                    Post a job
                  </Link>
                </li>
                <li>
                  <form action="/api/logout" method="post">
                    <button type="submit" className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Sign out
                    </button>
                  </form>
                </li>
              </>
            )}

            <li>
              <Link href="/jobs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setOpen(false)}>
                Browse jobs
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
