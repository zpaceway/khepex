import { GiPopcorn } from "react-icons/gi";

const Logo = () => {
  return (
    <div className="flex flex-col items-end text-4xl font-black">
      <div className="h-6 text-purple-500 drop-shadow-md">KHÉ</div>
      <div className="flex h-7 items-center text-2xl text-white drop-shadow-md">
        <div>pex</div>
        <div>
          <GiPopcorn className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Logo;
