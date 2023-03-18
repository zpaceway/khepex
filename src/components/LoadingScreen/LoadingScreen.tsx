import Logo from "../Logo";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-zinc-900">
      <div className="animate-bounce">
        <Logo />
      </div>
    </div>
  );
};

export default LoadingScreen;
