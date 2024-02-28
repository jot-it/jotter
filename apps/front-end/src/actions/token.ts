import { getSession } from "@/config/auth-options";
import env from "@/config/env-server";
import { SignJWT } from "jose";

const HOUR_TO_MILLISECONDS = 3_600_000;
const TOKEN_LIFETIME = 1 * HOUR_TO_MILLISECONDS;

export type Token = {
  value: string;
  expiresAt: number;
};

async function getToken(scopes: string[]): Promise<Token> {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const secret = new TextEncoder().encode(env.NEXTAUTH_SECRET);

  const now = new Date().getTime();
  const expirationTime = now + TOKEN_LIFETIME;
  const jwt = await new SignJWT({
    scp: scopes.join(" "),
  })
    .setSubject(session.user.id)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(env.NEXTAUTH_URL)
    .setExpirationTime(expirationTime)
    .sign(secret);

  return {
    value: jwt,
    expiresAt: expirationTime,
  };
}

export { getToken };
