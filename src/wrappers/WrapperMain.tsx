import { NavBar } from "@/components/global/NavBar";

// wrapper to display pages for logged in users
interface WrapperMainProps {
  children: React.ReactNode;
}
export const WrapperMain = ({ children }: WrapperMainProps) => {
  return (
    <>
      {children}
      <NavBar />
    </>
  );
};
