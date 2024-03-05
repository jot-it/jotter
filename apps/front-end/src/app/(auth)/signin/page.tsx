"use client";
import Button, { buttonVariants } from "@/components/Button";
import { DiscordIcon, GithubIcon, GoogleIcon } from "@/components/Icons";
import Typography from "@/components/Typography";
import { OAuthProviderType } from "next-auth/providers/oauth-types";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { IconType } from "react-icons";

type OAuthProvider = {
  name: OAuthProviderType;
  Icon: IconType;
};

const providers: OAuthProvider[] = [
  {
    name: "google",
    Icon: GoogleIcon,
  },
  {
    name: "github",
    Icon: GithubIcon,
  },
  {
    name: "discord",
    Icon: DiscordIcon,
  },
];

function LoginScreen() {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/";
  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="mb-8 space-y-2 text-center">
        <Typography as="h1" variant="h4">
          Welcome back
        </Typography>
        <p className="text-gray-500 dark:text-gray-400">
          Use any of the providers below to sign in
        </p>
      </div>
      <div className="space-y-4">
        {providers.map(({ name, Icon }) => (
          <Button
            key={name}
            className="w-full"
            variant="secondary"
            onClick={async () => signIn(name, { callbackUrl })}
          >
            <Icon className="mr-1" /> Sign in with{" "}
            <span className="capitalize">{name}</span>
          </Button>
        ))}
        <Link className={buttonVariants({ variant: "secondary" })} href="/demo">
          Try it out
        </Link>
      </div>
    </div>
  );
}

export default LoginScreen;
