"use client";
import { Card, Metric, Text, Color, Button } from "@tremor/react";

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
      console.log("hi");
    } else {
      throw new Error("Error bro");
    }
  } catch (error) {
    console.error("Error deleting eggs:", error);
  }
};

function EggCard({ eggCount }: Props) {
  return (
    <Card
      className="bg-sky-200/100 max-w-3xl flex flex-col gap-2"
      decorationColor="teal"
      decoration="top"
    >
      <Text>Date: {new Date(eggCount.date).toLocaleDateString()}</Text>
      <Metric className="font-thin text-green-600">
        Total Count: {eggCount.totalCount}
      </Metric>
      {eggCount.eggs.map((egg) => (
        <Text className="font-bold text-lg" key={egg.id}>
          {egg.color === "speckled" ? (
            <>
              <span className="text-white">S</span>
              <span className="text-sky-300/100">pe</span>
              <span className="text-[#bc8154]">ckl</span>
              <span className="text-emerald-400">ed</span>
            </>
          ) : (
            <span className={`eggColor-${egg.color}`}>
              {egg.color.charAt(0).toUpperCase() + egg.color.slice(1)}
            </span>
          )}
          : {egg.count}
        </Text>
      ))}
      <div className="mt-3 flex justify-end items-end">
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
