import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/prisma/prisma";

type EggInfo = {
  color: string;
  count: string;
};

type RequestBody = EggInfo[];

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
    });
  }

  const body = (await request.json()) as RequestBody;

  const eggs = body.map((egg) => {
    return { color: egg.color, count: parseInt(egg.count) };
  });

  const totalCount = Number(
    eggs.reduce((acc, egg) => acc + Number(egg.count), 0)
  );

  console.log(eggs);

  if (request.body) {
    const eggCount = await prisma.eggCount.create({
      data: {
        user: {
          connect: {
            //@ts-ignore
            id: session.user?.id,
          },
        },
        eggs: {
          create: eggs,
        },
        date: new Date(),
        totalCount: totalCount,
      },
    });
    return new NextResponse(JSON.stringify(eggCount), { status: 201 });
  } else {
    return new NextResponse(
      JSON.stringify({ error: "No request body attached" }),
      {
        status: 401,
      }
    );
  }
}
