import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#f3f4f6]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(230, 57, 70, 0.14), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(100, 116, 139, 0.1), transparent 50%), linear-gradient(165deg, #f8fafc 0%, #f1f5f9 45%, #e2e8f0 100%)",
        }}
      />

      <header className="relative z-10 flex items-center justify-end px-6 py-5 md:px-10">
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-sm font-medium text-[#475569] transition-colors hover:text-[#e63946] md:text-base"
        >
          Log in
        </button>
      </header>

      <main className="relative z-10 flex min-h-[calc(100dvh-4.5rem)] flex-col items-center justify-center px-6 pb-20 text-center">
        <img
          src={logo}
          alt="Linracy"
          className="mb-8 h-auto w-[min(88vw,440px)] object-contain animate-[fadeUp_0.7s_ease-out_both]"
        />

        <h1 className="max-w-xl text-2xl font-semibold tracking-tight text-[#0f172a] animate-[fadeUp_0.7s_ease-out_0.12s_both] md:text-3xl">
          Connect with people who matter
        </h1>

        <p className="mt-4 max-w-md text-base leading-relaxed text-[#64748b] animate-[fadeUp_0.7s_ease-out_0.22s_both] md:text-lg">
          Share posts, discover profiles, and stay close to your community on
          Linracy.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 animate-[fadeUp_0.7s_ease-out_0.32s_both] sm:flex-row sm:gap-4">
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="min-w-[180px] rounded-md bg-[#e63946] px-8 py-3 text-base font-medium text-white transition-all hover:bg-[#e24a57] hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Started
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="min-w-[180px] rounded-md border border-[#cbd5e1] bg-white/70 px-8 py-3 text-base font-medium text-[#334155] transition-colors hover:border-[#94a3b8] hover:bg-white"
          >
            Log in
          </button>
        </div>
      </main>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
