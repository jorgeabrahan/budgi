import supabase from "@/config/supabase";
import { useEffect } from "react";

export const PageHome = () => {
  useEffect(() => {
    console.log(supabase);
  }, []);
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};
