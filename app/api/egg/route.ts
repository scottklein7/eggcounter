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

    const id = request.url.substring(request.url.lastIndexOf("=") + 1);

    const eggCount = await prisma.eggCount.findUnique({
        where: { id: id },
        include: {
            eggs: {
                include: {
                    egg: true,
                },
            },
        },
    })


    return NextResponse.json({
        eggCount: eggCount,
    });
}