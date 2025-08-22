import { Suspense } from "react";
import Cabin from "../../_components/Cabin";
import Reservation from "../../_components/Reservation";
import Spinner from "../../_components/Spinner";
import { getCabin, getCabins } from "../../_lib/data-service";


// export const metadata = {
//   title: "Cabin",
// };

export async function generateMetadata({params}){
  const { name } = await getCabin(params.cabinId);
  return { title: `Cabin ${name}`};
}

export async function generateStaticParams(){
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({cabinId: String(cabin.id)}));
  console.log(ids);

  return ids;
}

export default async function Page({ params }) {

    const cabin= await getCabin(params.cabinId);
    // const settings = await getSettings();
    // const bookedDates = await getBookedDatesByCabinId(params.cabinId);


  return (
    <div className="max-w-6xl mx-auto mt-8">
   
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

      <Suspense fallback={<Spinner />}><Reservation cabin={cabin} /></Suspense>
      </div>
    </div>
  );
}
