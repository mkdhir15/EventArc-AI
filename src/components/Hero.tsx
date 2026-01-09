import { useNavigate } from "react-router-dom";
import VantaBackground from "./VantaBackground";
import GlassCard from "./GlassCard";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <VantaBackground>
      <GlassCard
        onGetStarted={() => navigate("/login")}
      />
    </VantaBackground>
  );
};

export default Hero;
