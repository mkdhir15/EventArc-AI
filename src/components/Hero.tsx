type HeroProps = {
  onGetStarted: () => void;
};

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={onGetStarted}
        className="px-8 py-3 rounded-xl bg-indigo-500 text-white"
      >
        Get Started
      </button>
    </div>
  );
};

export default Hero;
