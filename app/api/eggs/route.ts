import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/prisma/prisma";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      //@ts-ignore
      id: session.user?.id
    },
  });

  const eggCounts = await prisma.eggCount.findMany({
    where: { userId: user?.id },
    include: {
      eggs: {
        include: {
          egg: true,
        },
      },
    },
  });

  return NextResponse.json({
    eggCount: eggCounts,
  });
}
