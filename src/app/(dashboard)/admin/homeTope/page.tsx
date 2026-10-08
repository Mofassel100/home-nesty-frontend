import HomeTopeForm from "@/components/form/home-tope-form"
import Link from "next/link"


const HomeTope = () => {
  return (
    <div className="m-10">
       <h1 className="flex justify-end font-bold p-2 m-1 text-green-400"><Link href={`/admin/homeTopeDetails`}>Home Banner Details</Link></h1>
      <HomeTopeForm></HomeTopeForm>
     
      </div>
  )
}

export default HomeTope