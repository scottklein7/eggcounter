import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/prisma/prisma";

interface SelectedEgg {
    id: string;
    eggId: string;
    color: string;
    count: number;
    egg: any; // Replace 'any' with the appropriate type for the 'egg' property
  }

export async function PUT(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse(JSON.stringify({ error: "unauthorized" }), {
            status: 401,
        });
    }

    const id = request.url.substring(request.url.lastIndexOf("=") + 1);
    console.log(id)

    const body = await request.json();
    const { selectedEggs, selectedDate } = body;

    try {
        await Promise.all(
            selectedEggs.map(async (egg: SelectedEgg) => {
                await prisma.eggInfo.update({
                    where: { id: egg.id },
                    data: { count: egg.count },
                });
            })
        );

        const totalCount = selectedEggs.reduce((total:number, egg:SelectedEgg) => total + egg.count, 0);

        await prisma.eggCount.update({
            where: { id },
            data: {
                totalCount,
                date: selectedDate,
            },
        });

        return new NextResponse(
            JSON.stringify({ message: "Egg data updated successfully" }),
            {
                status: 200,
            }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ error: "Failed to update egg data" }),
            {
                status: 500,
            }
        );
    }
}
