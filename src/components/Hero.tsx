import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CLOUDS from "vanta/dist/vanta.clouds.min";
import * as THREE from "three";
import GlassCard from "./GlassCard";

const Hero = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!vantaRef.current) return;

    const effect = CLOUDS({
      el: vantaRef.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      skyColor: 0x020617,
      cloudColor: 0x4f46e5,
      cloudShadowColor: 0x000000,
      sunColor: 0xffffff,
      speed: 0.6,
    });

    return () => effect.destroy();
  }, []);

  return (
    <section
      ref={vantaRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Hero Content */}
      <div className="relative z-10 px-6">
        <GlassCard onGetStarted={() => navigate("/login")} />
      </div>
    </section>
  );
};

export default Hero;
