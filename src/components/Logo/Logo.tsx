import Image from "next/image";

type TLogoSize = "small" | "normal" | "large";

type Props = {
  size?: TLogoSize;
};

const sizePixelsMap: Record<TLogoSize, number> = {
  small: 40,
  normal: 80,
  large: 160,
};

const Logo = ({ size = "normal" }: Props) => {
  return (
    <div className={`flex flex-col items-end font-black`}>
      <Image
        src="/logo-transparent.svg"
        width={sizePixelsMap[size]}
        height={sizePixelsMap[size]}
        alt="logo"
      />
    </div>
  );
};

export default Logo;
