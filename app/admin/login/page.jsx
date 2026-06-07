"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Leaf, Lock, User } from "lucide-react";

function DebugPanel({ debug }) {
  if (!debug) return null;

  return (
    <div className="rounded-2xl border border-[#B47B59]/30 bg-[#FFF8EF] p-4 text-left" dir="ltr">
      <p className="mb-2 text-right text-xs font-bold text-[#1A2F23]" dir="rtl">جزئیات دیباگ ورود</p>
      <pre className="max-h-64 overflow-auto whitespace-pre-wrap break-words text-xs leading-5 text-[#1A2F23]/80">{JSON.stringify(debug, null, 2)}</pre>
    </div>
  );
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "admin", password: "admin" });
  const [error, setError] = useState("");
  const [debug, setDebug] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setDebug(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.message || `ورود ناموفق بود (HTTP ${res.status})`);
        setDebug({ phase: "login", status: res.status, response: data });
        return;
      }

      const verifyRes = await fetch("/api/admin/content", { credentials: "same-origin", cache: "no-store" });
      const verifyData = await verifyRes.json().catch(() => ({}));

      if (!verifyRes.ok) {
        setError(
          verifyRes.status === 401
            ? "ورود در سرور موفق بود، اما کوکی سشن در مرورگر ذخیره یا ارسال نشده است."
            : `ورود موفق بود، اما بررسی سشن خطا داد (HTTP ${verifyRes.status}).`
        );
        setDebug({ phase: "session-check", loginStatus: res.status, loginResponse: data, sessionStatus: verifyRes.status, sessionResponse: verifyData });
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (caughtError) {
      setError("درخواست ورود به سرور نرسید یا پاسخ نامعتبر بود.");
      setDebug({ phase: "network", message: caughtError.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F6F2] flex items-center justify-center p-6" dir="rtl">
      <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(circle at 20% 20%, rgba(180,123,89,.25), transparent 28%), radial-gradient(circle at 80% 70%, rgba(26,47,35,.2), transparent 30%)" }} />
      <form onSubmit={submit} className="relative w-full max-w-md rounded-[2rem] bg-white/85 backdrop-blur-xl border border-[#1A2F23]/10 shadow-2xl p-8 space-y-6">
        <div className="flex justify-center"><div className="w-16 h-16 rounded-2xl bg-[#1A2F23] text-[#D7B46A] flex items-center justify-center"><Leaf size={34} /></div></div>
        <div className="text-center"><h1 className="text-2xl font-black text-[#1A2F23]">ورود به پنل مدیریت</h1><p className="text-sm text-[#1A2F23]/55 mt-2">چای املش؛ مدیریت محتوای سایت</p></div>
        <label className="block"><span className="text-sm text-[#1A2F23]/70">نام کاربری</span><div className="mt-2 flex items-center gap-2 rounded-2xl border border-[#1A2F23]/10 bg-[#F7F6F2] px-4"><User size={18} className="text-[#B47B59]" /><input className="h-12 flex-1 bg-transparent outline-none text-left" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} /></div></label>
        <label className="block"><span className="text-sm text-[#1A2F23]/70">رمز عبور</span><div className="mt-2 flex items-center gap-2 rounded-2xl border border-[#1A2F23]/10 bg-[#F7F6F2] px-4"><Lock size={18} className="text-[#B47B59]" /><input type="password" className="h-12 flex-1 bg-transparent outline-none text-left" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div></label>
        {error && <p className="rounded-2xl bg-red-50 text-red-700 text-sm p-3">{error}</p>}
        <DebugPanel debug={debug} />
        <button disabled={loading} className="w-full h-12 rounded-2xl bg-[#466332] text-white font-bold shadow-lg shadow-[#466332]/20 disabled:opacity-60">{loading ? "در حال ورود..." : "ورود"}</button>
        <p className="text-xs text-center text-[#1A2F23]/45">کاربر پیش‌فرض دیتابیس: admin / admin</p>
      </form>
    </main>
  );
}
