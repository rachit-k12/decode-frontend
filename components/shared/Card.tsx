import { type ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { children, className, hoverable = false, clickable = false, onClick },
    ref
  ) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          "rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm transition-all",
          hoverable && "hover:shadow-md",
          clickable && "cursor-pointer hover:border-foreground/20",
          className
        )}
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}
        onKeyDown={
          clickable
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onClick?.();
                }
              }
            : undefined
        }
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export function CardHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("mb-4 space-y-1.5", className)}>{children}</div>;
}

export function CardTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "text-xl font-semibold leading-none tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
}

export function CardContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("space-y-4", className)}>{children}</div>;
}

export function CardFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mt-6 flex items-center justify-between", className)}>
      {children}
    </div>
  );
}
