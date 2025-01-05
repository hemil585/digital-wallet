"use client";

import { Button } from "@repo/ui/button";

interface NavbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: () => void;
}

const Navbar = ({ user, onSignin }: NavbarProps) => {
  const onSignout = () => {
    window.location.href = "/api/auth/signout?callbackUrl=/api/auth/signin";
  };
  return (
    <div className="flex justify-between border-b px-4">
      <div className="text-2xl font-bold flex flex-col justify-center">
        PayTM
      </div>
      <div className="flex flex-col justify-center pt-2">
        <Button screen="lg" onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
