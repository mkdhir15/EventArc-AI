import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CLOUDS from "vanta/dist/vanta.clouds.min";
import * as THREE from "three";

const GlassCard = () => {
  const vantaRef = useRef<HTMLDivElement | null>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        CLOUDS({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          skyColor: 0x020617,      // dark navy (same as before)
          cloudColor: 0x4f46e5,    // indigo clouds
          cloudShadowColor: 0x000000,
          sunColor: 0xffffff,
          speed: 0.6,
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <section
      ref={vantaRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Glass Card */}
      <div className="relative z-10 max-w-lg w-full px-6">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10 text-center text-white">
          <h1 className="text-4xl font-extrabold text-indigo-400 mb-4">
            EventArc AI
          </h1>

          <p className="text-white/80 text-lg mb-6 leading-relaxed">
            “Transforming events into intelligent experiences —
            plan smarter, analyze deeper, succeed faster.”
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-4 px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition-transform"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default GlassCard;
