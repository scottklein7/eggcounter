"use client";

import { Card, LineChart, Title } from "@tremor/react";

interface Props {
  data: { totalCount: number; date: Date }[];
}

function EggChart({ data }: Props) {
  console.log(data);

  const dataFormatter = (number: number) =>
    `${Intl.NumberFormat("us").format(number).toString()}`;

  return (
    <Card className="bg-emerald-200">
      <Title>Total Egg Count</Title>
      <LineChart
        className="mt-6"
        data={data}
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
