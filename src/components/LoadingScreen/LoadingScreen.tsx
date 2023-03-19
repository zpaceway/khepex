import { isLoadingScreenVisibleAtom } from "@/atoms";
import { useAtom } from "jotai";
import Logo from "../Logo";

const LoadingScreen = () => {
  const [isVisible] = useAtom(isLoadingScreenVisibleAtom);

  if (!isVisible) {
    return <></>;
  }

  return (
    <div className="fixed inset-0 z-[99999999999999] flex items-center justify-center bg-zinc-900">
      <div className="animate-bounce">
        <Logo size="large" />
      </div>
    </div>
  );
};

export default LoadingScreen;
