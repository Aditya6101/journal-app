"use server";

import { getJwtSecretKey, getUser, workos } from "@/auth";
import { prisma } from "@/db";
import { Category } from "@prisma/client";
import assert from "assert";
import { SignJWT } from "jose";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// USER
export async function register(prevState: any, formData: FormData) {
  let data = Object.fromEntries(formData);
  const cookiesStore = cookies();

  assert.ok(typeof data.email === "string");
  assert.ok(typeof data.firstName === "string");
  assert.ok(typeof data.lastName === "string");
  assert.ok(typeof data.password === "string");

  let user;

  try {
    user = await workos.userManagement.createUser({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      emailVerified: true,
    });

    let dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email: data.email,
        firstName: data.firstName,
        lastname: data.lastName,
      },
    });
  } catch (error) {
    return {
      error: error?.message || "Something went wrong, Please try again",
    };
  }

  let token = await new SignJWT({
    user,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(getJwtSecretKey());

  cookiesStore.set({
    name: "token",
    value: token,
    path: "/",
    httpOnly: true,
  });

  return redirect("/");
}

export async function login(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData);
  const cookiesStore = cookies();

  assert.ok(typeof data.email === "string");
  assert.ok(typeof data.password === "string");
  assert.ok(typeof process.env.WORKOS_CLIENT_ID === "string");

  let user;
  try {
    user = await workos.userManagement.authenticateWithPassword({
      email: data.email,
      password: data.password,
      clientId: process.env.WORKOS_CLIENT_ID,
    });
  } catch (error) {
    return {
      error: error?.rawData?.message || "Please enter valid credentials",
    };
  }

  const token = await new SignJWT({
    user: user.user,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(getJwtSecretKey());

  cookiesStore.set({
    name: "token",
    value: token,
    path: "/",
    httpOnly: true,
  });

  return redirect("/");
}

// ENTRIES
export async function getEntries() {
  let { user } = await getUser();

  let entries = await prisma.entry.findMany({
    where: { userId: user?.id },
    orderBy: { createdAt: "desc" },
  });

  return entries;
}

export async function createEntry(formData: FormData) {
  "use server";
  let data = Object.fromEntries(formData);

  assert.ok(typeof data.title === "string");
  assert.ok(typeof data.body === "string");
  assert.ok(
    data.category === "Work" ||
      data.category === "Learning" ||
      data.category === "Interesting" ||
      data.category === "Personal"
  );

  let title = data.title;
  let body = data.body;
  let category: Category = data.category;
  let { user } = await getUser();

  if (!user) return { error: "User not found" };

  let { firstName, email } = user;

  firstName = firstName || "";

  await prisma.entry.create({
    data: {
      title,
      body,
      category,
      user: {
        connect: {
          email,
        },
      },
    },
  });

  return revalidatePath("/");
}

export async function deleteEntry(formData: FormData) {
  let data = Object.fromEntries(formData);
  let { user } = await getUser();

  assert.ok(typeof data.id === "string");

  await prisma.entry.delete({
    where: { id: data.id, userId: user?.id },
  });

  return revalidatePath("/");
}
