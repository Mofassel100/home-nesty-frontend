import HomeDatelsTable from "@/components/modules/home-tope-details"
import Link from "next/link"



const HomeDatels = () => {
  return (
    <div className="p-10">
        <h1 className="flex justify-end font-bold p-2 m-1 text-green-400"><Link href={"/admin/homeTope"}>Create Home Tope</Link></h1>
        <HomeDatelsTable></HomeDatelsTable></div>
  )
}

export default HomeDatels