'use client'
import React, { useEffect, useState } from 'react'

interface EggData {
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

interface Props {
    id: string;
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


function Egg({ id }: Props) {
    const [data, setData] = useState<EggData | null>(null);
    const [selectedEggs, setSelectedEggs] = useState<EggData['eggCount']['eggs']>([]);
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        async function fetchEggs() {
            const res = await fetch(`/api/egg/?id=${id}`);
            const data = await res.json() as EggData;
            setData(data);
            setSelectedEggs(data.eggCount.eggs);
            setSelectedDate(data.eggCount.date);
        }
        fetchEggs();
    }, [id]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const res = await fetch(`/api/editEgg/?id=${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ selectedEggs, selectedDate }),
        });

        if (!res.ok) {
            throw new Error(`Failed to post egg info. Status: ${res.status}`);
        }

        const data = await res.json();
        // Handle response data if needed
    };

    const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>, eggId: string) => {
        const count = event.target.value;
        setSelectedEggs((prevState: EggData['eggCount']['eggs']) =>
            prevState.map((egg) =>
                egg.id === eggId ? { ...egg, count: Number(count) } : egg
            )
        );

    };



    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    return (
        <div>
            {data ? (
                <div>
                    <h3 className="text-center py-10 text-4xl font-extrabold text-emerald-500 drop-shadow-sm">
                        {"Edit Egg Data"}
                    </h3>
                    <div className="flex flex-col justify-center py-10 items-center mx-auto rounded-xl px-5 bg-slate-300 md:w-1/3 shadow-xl">
                        <div>
                            <form className="space-y-4" onSubmit={handleSubmit}>
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
                                        className="md:w-auto block px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                    />
                                </div>
                                {eggColors.map((color) => {
                                    const egg = selectedEggs.find((egg) => egg.color === color);
                                    const count = egg ? egg.count : 0;
                                    if (egg !== undefined) {


                                        return (
                                            <div className="flex items-center justify-between md:gap-10" key={color}>
                                                <label
                                                    htmlFor={`count-${color}`}
                                                    className={`eggColor-${color.toLowerCase().replace(/\s+/g, "-")} flex text-lg justify-start`}
                                                >
                                                    {color}:
                                                </label>
                                                <input
                                                    type="number"
                                                    id={`count-${color}`}
                                                    name={`count-${color}`}
                                                    value={count || ""} // Update the initial value to an empty string
                                                    onChange={(event) => handleCountChange(event, egg.id)}
                                                    className="block px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                                />

                                            </div>
                                        );
                                    }

                                })}

                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 w-full font-semibold text-white bg-emerald-500 rounded-md hover:bg-emerald-600"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Egg;