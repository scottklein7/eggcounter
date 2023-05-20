"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
interface EggInfo {
  color: string;
  count: number;
}

const eggColors = [
  "Brown",
  "White",
  "Cream/Pink",
  "Blue Sky",
  "Green (olive)",
  "Chocolate Brown",
  "Purple",
];

function NewEgg() {
  const [selectedEggs, setSelectedEggs] = useState<EggInfo[]>([]);
  const [selectedDate, setSelectedDate] = useState("");

  const router = useRouter();

  async function postEggInfo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const res = await fetch("/api/addEgg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectedEggs, selectedDate }),
    });

    if (!res.ok) {
      throw new Error(`Failed to post egg info. Status: ${res.status}`);
    }

    const data = await res.json();
    router.push("/eggs");
  }

  function handleCountChange(
    event: React.ChangeEvent<HTMLInputElement>,
    color: string
  ) {
    const { value } = event.target;
    const count = parseInt(value, 10);

    setSelectedEggs((prevSelectedEggs) => {
      const updatedSelectedEggs = [...prevSelectedEggs];
      const existingEgg = updatedSelectedEggs.find((egg) => egg.color === color);

      if (existingEgg) {
        existingEgg.count = count;
      } else {
        updatedSelectedEggs.push({ color, count });
      }

      return updatedSelectedEggs;
    });
  }

  function handleDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedDate(event.target.value);
  }

  return (
    <div>
      <h3 className="text-center pb-10 text-4xl font-extrabold text-emerald-500 drop-shadow-sm">
        {"Add Today's Eggs"}
      </h3>
      <div className="flex flex-col justify-center items-center mx-auto rounded-xl p-10 bg-slate-300 md:w-1/3 shadow-xl">
        <div>
          <form className="space-y-4" onSubmit={postEggInfo}>
            <div className="flex items-center justify-between md:gap-10">
              <label htmlFor="selectedDate" className="text-lg">
                Date:
              </label>
              <input
                type="date"
                id="selectedDate"
                name="selectedDate"
                required={true}
                value={selectedDate}
                onChange={handleDateChange}
                className=" md:w-auto block px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
            {eggColors.map((color, index) => (
              <div className="flex items-center justify-between md:gap-10" key={color}>
                <label
                  htmlFor={`eggColor-${color}`}
                  className={`eggColor-${color
                    .toLowerCase()
                    .replace(/\s+/g, "-")} flex text-lg justify-start`}
                >
                  {color}:
                </label>
                <input
                  type="number"
                  id={`count-${color}`}
                  name={`count-${color}`}
                  value={
                    selectedEggs.find((egg) => egg.color === color)?.count || ""
                  }
                  onChange={(event) => handleCountChange(event, color)}
                  className={`block px-4 py-2 mt-2 border ${index > 0 && selectedEggs[index - 1]?.color === color
                    ? "border-transparent"
                    : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm`}
                />

              </div>
            ))}

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-4 py-2 w-full font-semibold text-white bg-emerald-500 rounded-md hover:bg-emerald-600"
              >
                Add Eggs
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewEgg;