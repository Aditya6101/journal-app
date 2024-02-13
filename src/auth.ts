import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import WorkOS, { User } from "@workos-inc/node";
import { jwtVerify } from "jose";

// Initialize the WorkOS client
export const workos = new WorkOS(process.env.WORKOS_API_KEY);

export function getClientId() {
  const clientId = process.env.WORKOS_CLIENT_ID;

  if (!clientId) {
    throw new Error("WORKOS_CLIENT_ID is not set");
  }

  return clientId;
}

export async function getAuthorizationUrl() {
  const redirectUri = process.env.WORKOS_REDIRECT_URI;

  if (!redirectUri) {
    throw new Error("WORKOS_REDIRECT_URI is not set");
  }

  const authorizationUrl = workos.userManagement.getAuthorizationUrl({
    provider: "authkit",
    clientId: getClientId(),
    // The endpoint that WorkOS will redirect to after a user authenticates
    redirectUri,
  });

  return authorizationUrl;
}

export function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET_KEY;

  if (!secret) {
    throw new Error("JWT_SECRET_KEY is not set");
  }

  return new Uint8Array(Buffer.from(secret, "base64"));
}

export async function verifyJwtToken(token: string) {
  try {
    let { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getUser(): Promise<{
  isAuthenticated: boolean;
  user?: User | null;
}> {
  let token = cookies().get("token")?.value;

  if (!token) return { isAuthenticated: false };

  let verifiedToken = await verifyJwtToken(token);

  if (verifiedToken?.user) {
    return {
      isAuthenticated: true,
      user: verifiedToken.user as User,
    };
  }

  return { isAuthenticated: false };
}

export async function clearCookie() {
  cookies().delete("token");
  redirect("/login");
}

export const getUserId = async () => {
  const user = await getUser();

  return user.user?.id;
};
