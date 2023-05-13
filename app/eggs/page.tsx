import GetEggs from "@/Components/GetEgg";

const EggList = () => {
  return (
    <div className="bg-emerald-100 min-h-screen">
      <h2 className="text-center text-3xl p-5 font-extrabold">
         How Are Your Chickens Are Performing?
      </h2>

      <GetEggs />
    </div>
  );
};

export default EggList;
