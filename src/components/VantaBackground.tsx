import { useEffect, useRef } from "react";
import CLOUDS from "vanta/dist/vanta.clouds.min";
import * as THREE from "three";

type Props = {
  children: React.ReactNode;
};

const VantaBackground = ({ children }: Props) => {
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vantaRef.current) return;

    const effect = CLOUDS({
      el: vantaRef.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      skyColor: 0x0f172a,
      cloudColor: 0x6366f1,
      cloudShadowColor: 0x020617,
      sunColor: 0xffffff,
      speed: 1,
    });

    return () => effect.destroy();
  }, []);

  return (
    <div
      ref={vantaRef}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Page content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        {children}
      </div>
    </div>
  );
};

export default VantaBackground;
