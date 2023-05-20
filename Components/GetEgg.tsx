"use client";
import React, { useEffect, useState } from "react";
import EggCard from "./EggCard";
import EggChart from "./EggChart";

type EggCount = {
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

function GetEggs() {
  const [data, setData] = useState<EggCount[]>([]);

  useEffect(() => {
    async function fetchEggs() {
      const res = await fetch("/api/eggs");
      const data = await res.json();
      console.log(data.eggCount, data);
      setData(data.eggCount);
    }
    fetchEggs();
  }, []);

  const eggChartTotal = data.map((egg) => {
    return {
      date: egg.date,
      "totalEgg": egg.totalCount,
    };
  });



  return (
    <div>
      <div className="p-10">
        <EggChart data={eggChartTotal} />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 p-10 gap-5">
        {data?.map((eggCount) => (
          <div key={eggCount.id} className="flex ">
            <EggCard eggCount={eggCount} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetEggs;
