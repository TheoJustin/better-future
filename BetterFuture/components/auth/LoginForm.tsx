'use client'

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useActiveAccount } from "panna-sdk";
import { LoginButton, liskSepolia } from "panna-sdk";

import { AuthButton } from "./AuthButton";
import { WalletLoginButton } from "./WalletLoginButton";

interface LoginFormProps {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

export function LoginForm({ onLoginClick, onRegisterClick }: LoginFormProps) {
  const router = useRouter();
  const activeAccount = useActiveAccount();
  const isConnected = !!activeAccount;
  const hasRedirected = useRef(false);

  // Redirect to home page when wallet is connected
  // This handles the case when user successfully logs in through the button
  useEffect(() => {
    // Prevent multiple redirects
    if (hasRedirected.current) return;

    if (isConnected) {
      hasRedirected.current = true;
      // Redirect to home after successful login
      router.replace("/home");
    }
  }, [isConnected, router]);

  function handleRegister() {
    onRegisterClick?.();
    router.push("/register");
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <WalletLoginButton />

      {/* <AuthButton type="button" onClick={handleRegister}>
        <LoginButton chain={liskSepolia} />
      </AuthButton> */}
      {/* <AuthButton type="button" onClick={handleRegister}>
        Register
      </AuthButton> */}
    </div>
  );
}

