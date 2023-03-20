type TVariant = "primary" | "secondary";

type Props = {
  children: React.ReactNode;
  variant?: TVariant;
} & React.HTMLAttributes<HTMLDivElement>;

type TProperties = "background" | "text" | "backgroundOpacity";

const variantColorsMap: Record<TVariant, Record<TProperties, string>> = {
  primary: {
    background: "bg-purple-500",
    text: "text-white",
    backgroundOpacity: "bg-opacity-100",
  },
  secondary: {
    background: "bg-zinc-600",
    text: "text-white",
    backgroundOpacity: "bg-opacity-60",
  },
};

const Button = ({ variant = "primary", children, ...rest }: Props) => {
  return (
    <div
      className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm py-2 px-4 shadow-md hover:brightness-[98%] active:hover:brightness-95 ${variantColorsMap[variant].background} ${variantColorsMap[variant].text} ${variantColorsMap[variant].backgroundOpacity}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Button;
