"use client";

import { Card, LineChart, Title } from "@tremor/react";

interface Props {
  data: { totalCount: number; date: Date }[];
}

function EggChart({ data }: Props) {

  const sortedData = data.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
  });



  const dataFormatter = (number: number) =>
    `${Intl.NumberFormat("us").format(number).toString()}`;

  return (
    <Card className="bg-emerald-200">
      <Title>Total Egg Count</Title>
      <LineChart
        className="mt-6"
        data={sortedData}
        index="date"
        categories={["totalEgg"]}
        colors={["sky"]}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
}

export default EggChart;
