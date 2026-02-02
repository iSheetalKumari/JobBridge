"use client";

export default function LoginPage() {
  const login = () => {
    window.location.href = "/api/auth/login";
  };

  return (
    <button onClick={login}>
      Login with WorkOS
    </button>
  );
}
