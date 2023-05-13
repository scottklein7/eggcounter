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
  const router = useRouter()

  async function postEggInfo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const res = await fetch("/api/addEgg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedEggs),
    });

    if (!res.ok) {
      throw new Error(`Failed to post egg info. Status: ${res.status}`);
    }

    const data = await res.json();
    router.push("/eggs")


  }

  function handleCountChange(
    event: React.ChangeEvent<HTMLInputElement>,
    color: string
  ) {
    const { value } = event.target;
    const count = parseInt(value, 10);

    setSelectedEggs((prevSelectedEggs) => {
      const updatedSelectedEggs = [...prevSelectedEggs];
      const existingEgg = updatedSelectedEggs.find(
        (egg) => egg.color === color
      );

      if (existingEgg) {
        existingEgg.count = count;
      } else {
        updatedSelectedEggs.push({ color, count });
      }

      return updatedSelectedEggs;
    });
  }

  return (
    <div>
      <h3 className="text-center pb-10 text-4xl font-extrabold text-emerald-500 drop-shadow-sm">
        {"Add Today's Eggs"}
      </h3>
      <div className="flex flex-col justify-center items-center mx-auto rounded-xl p-10 bg-slate-300 md:w-1/3 shadow-xl">
        <div>
          <form className="space-y-4" onSubmit={postEggInfo}>
            {eggColors.map((color, index) => (
              <div className="flex items-center justify-end gap-10" key={color}>
                <label
                  htmlFor={`eggColor-${color}`}
                  className={`eggColor-${color
                    .toLowerCase()
                    .replace(/\s+/g, "-")} text-lg`}
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
                  className={`block px-4 py-2 mt-2 border ${
                    index > 0 && selectedEggs[index - 1]?.color === color
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

{
  /* <div className="flex flex-col space-y-2">
                <label
                  className="text-slate-500 font-extrabold"
                  htmlFor={`color-input-${index}`}
                >
                  Color:
                </label>
                <select
                  className="bg-emerald-100 text-slate-500 rounded w-auto h-auto p-2"
                  id={`color-input-${index}`}
                  value={egg.color}
                  onChange={(event) => {
                    const newEggInfo = [...eggInfo];
                    newEggInfo[index].color = event.target.value;
                    setEggInfo(newEggInfo);
                  }}
                >
                  <option value="">Choose a color</option>
                  <option value="brown">Brown</option>
                  <option value="blue">Blue</option>
                  <option value="white">White</option>
                  <option value="speckled">Speckled</option>
                  <option value="green">Green</option>
                </select>
                <label
                  className="text-slate-500 font-extrabold"
                  htmlFor={`count-input`}
                >
                  Count:
                </label>
                <input
                  className="bg-emerald-100 text-slate-500 rounded w-auto h-auto p-2"
                  id={`count-input`}
                  type="number"
                  value={egg.count}
                  onChange={(event) => {
                    setEggInfo(newEggInfo);
                  }}
                />
                <hr className="pb-5 mx-auto" />
                <hr className="pb-10 w-full mx-auto" />
            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="bg-blue-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
                onClick={handleAddEggInfo}
              >
                Add egg
              </button>
              <button
                type="submit"
                className="bg-blue-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div> */
}
