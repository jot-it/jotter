import { getSession } from "@/config/auth-options";
import env from "@/config/env-server";
import { SignJWT } from "jose";

async function getToken(scopes: string[]) {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const secret = new TextEncoder().encode(env.NEXTAUTH_SECRET);
  const jwt = await new SignJWT({
    scp: scopes.join(" "),
  })
    .setSubject(session.user.id)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(env.NEXTAUTH_URL)
    .setExpirationTime("2h")
    .sign(secret);

  return jwt;
}

export { getToken };
