"use server";

import { getJwtSecretKey, getUserId, workos } from "@/auth";
import { prisma } from "@/db";
import assert from "assert";
import { SignJWT } from "jose";
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

// ENTRIES
export const newEntry = () => {
  const entry = prisma.entry.create({
    data: {
      title: "My first entry!",
      body: "I am learning RSC today",
      category: "Learning",
      user: {
        connectOrCreate: {
          create: workos.userManagement.getUser(getUserId()),
          where: { id: getUserId() },
        },
      },
    },
  });
};
