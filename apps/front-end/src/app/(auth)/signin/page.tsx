"use client";
import Button from "@/components/Button";
import { GithubIcon } from "@/components/Icons";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import Typography from "@/components/Typography";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

function LoginScreen() {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/";
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4 p-8">
      <div className="w-full max-w-sm space-y-2">
        <div className="space-y-2 text-center">
          <Typography as="h1" variant="h4">
            Welcome back
          </Typography>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="john.snow@email.com"
              required
              type="email"
            />
          </div>
          <Button className="w-full">Login</Button>
          <Button
            className="w-full"
            variant="secondary"
            onClick={async () => signIn("github", { callbackUrl })}
          >
            <GithubIcon className="mr-1" /> Login with Github
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
