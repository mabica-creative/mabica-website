import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  [
    // Layout styles
    "inline-flex items-center justify-center whitespace-nowrap rounded-full",

    // Typography styles
    "text-base font-semibold",

    // Border and ring styles
    "ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",

    // State and interaction styles
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      // Variants for different button types
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border border-2 border-input hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },

      // Variants for different button sizes
      size: {
        default: "h-10 px-4 py-2",
        lg: "h-11 px-8 text-xl",
        icon: "h-10 w-10",
      },
    },

    // Default variants if none are provided
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// interface but idk i make like this
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
}

const Button = ({ children, className, variant, size, ...props } : ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button, buttonVariants };
