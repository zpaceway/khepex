type TVariant = "primary" | "secondary";

type Props = {
  children: React.ReactNode;
  variant?: TVariant;
} & React.HTMLAttributes<HTMLDivElement>;

type TProperties = "background" | "text";

const variantColorsMap: Record<TVariant, Record<TProperties, string>> = {
  primary: {
    background: "bg-purple-500",
    text: "text-white",
  },
  secondary: {
    background: "bg-zinc-600",
    text: "text-white",
  },
};

const Button = ({ variant = "primary", children, ...rest }: Props) => {
  return (
    <div
      className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm py-2 pl-4 pr-16 shadow-md hover:brightness-[98%] active:hover:brightness-95 ${variantColorsMap[variant].background} ${variantColorsMap[variant].text}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Button;
