import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/prisma/prisma";

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
    });
  }

  const id = request.url.substring(request.url.lastIndexOf("d") + 2);

  if (!id) {
    return new NextResponse("Invalid ID", { status: 400 });
  }

  const eggCount = await prisma.eggCount.findUnique({
    where: { id: id },
    include: { eggs: true }, // Include the associated eggs
  });

  if (!eggCount) {
    return new NextResponse(
      JSON.stringify({ error: "EggCount instance not found" }),
      {
        status: 404,
      }
    );
  }

  const deleteEggs = await prisma.eggInfo.deleteMany({
    where: { eggId: id },
  });

  const deleteEgg = await prisma.eggCount.delete({
    where: { id: id },
  });

  return new NextResponse(
    JSON.stringify({ deleteEgg: deleteEgg, deleteEggs: deleteEggs }),
    {
      status: 201,
    }
  );
}
