import Link from "next/link";

type Props = { href: string; variant?: "solid" | "line"; children: React.ReactNode };

export function ButtonLink({ href, variant = "solid", children }: Props) {
  return (
    <Link className={variant === "line" ? "btn line" : "btn"} href={href}>
      {children}
    </Link>
  );
}
