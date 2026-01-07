type Props = {
  onGetStarted: () => void;
};

const GlassCard = ({ onGetStarted }: Props) => {
  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20
      rounded-3xl shadow-2xl p-10 max-w-xl text-white text-center">

      <h1 className="text-4xl font-bold mb-4">EventArc AI</h1>

      <p className="text-white/80 mb-8">
        We aren't just managing events, we are architecting the future of campus life. Let us show you how.
      </p>

      <button
        onClick={onGetStarted}
        className="px-8 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition"
      >
        Get Started
      </button>
    </div>
  );
};

export default GlassCard;
