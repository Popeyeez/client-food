import { ReactNode } from "react";
import { Header } from "./Header";

export const AdminLayout = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const customStyle = className + " w-full";
  return (
    <div className="flex">
      <div className={customStyle}>
        <Header />
        {children}
      </div>
    </div>
  );
};
