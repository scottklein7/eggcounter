import Egg from "@/Components/Egg"



function page({ params }: { params: { id: string } }) {


    return (
        <div>
            <Egg id={params.id} />
        </div>
    )
}

export default page