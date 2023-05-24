"use client";
import { Card, Metric, Text, Color, Button } from "@tremor/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  eggCount: {
    id: string;
    userId: string;
    date: string;
    totalCount: number;
    eggs: {
      id: string;
      eggId: string;
      color: string;
      count: number;
      egg: {
        id: string;
        userId: string;
        date: string;
        totalCount: number;
      };
    }[];
  };
}

const handleDeleteEggs = async (eggCountId: string) => {
  try {
    const response = await fetch(`/api/deleteEgg?eggCountId=${eggCountId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      window.location.reload();
    } else {
      throw new Error("Error bro");
    }
  } catch (error) {
    console.error("Error deleting eggs:", error);
  }
};

function EggCard({ eggCount }: Props) {
  const router = useRouter()
  return (
    <Card className="bg-sky-200/100 max-w-3xl flex flex-col gap-2" decorationColor="teal" decoration="top">
      <Text>Date: {eggCount.date}</Text>
      <Metric className="font-thin text-green-600">Total Count: {eggCount.totalCount}</Metric>
      {eggCount.eggs.map((egg) => {
        if (egg.count === 0) {
          return null; // Skip rendering the entry if the count is zero
        }
        return (
          <Text className="font-bold text-lg" key={egg.id}>
            {egg.color === "speckled" ? (
              <>
                <span className="text-white">S</span>
                <span className="text-sky-300/100">pe</span>
                <span className="text-[#bc8154]">ckl</span>
                <span className="text-emerald-400">ed</span>
              </>
            ) : (
              <span className={`eggColor-${egg.color.toLowerCase().replace(/\s+/g, "-")}`}>
                {egg.color.charAt(0).toUpperCase() + egg.color.slice(1)}
              </span>
            )}
            : {egg.count}
          </Text>
        );
      })}
      <div className="mt-3 flex justify-end items-end gap-3">
        <Button
          className="w-24"
          color="blue"
          variant="secondary"
          size="xs"
          onClick={() => router.push(`/egg/${eggCount.id}`)}
        >
          Edit
        </Button>
        <Button
          className="w-24"
          color="red"
          variant="primary"
          size="xs"
          onClick={() => handleDeleteEggs(eggCount.id)}
        >
          Delete
        </Button>
      </div>
    </Card>

  );
}

export default EggCard;
