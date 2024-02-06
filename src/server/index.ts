"use server";

import { getUser, getUserId, workos } from "@/auth";
import { prisma } from "@/db";

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
