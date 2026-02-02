import "./globals.css";
import connectDb from '@/lib/db';
import { auth } from '@/auth';
import User from '@/models/user.model';
import { redirect } from "next/navigation";
import EditRoleMobile from "@/components/EditRoleMobile";

const Home = async () => {

  await connectDb()
  const session = await auth()
  const user = await User.findById(session?.user?.id)

  if (!user) {
    redirect("/login")
  }

  const inComplete = !user.mobile || !user.role || (!user.mobile && user.role == "user")

  if (inComplete) {
    return <EditRoleMobile />
  }

  return (

    <div>
      <h1 className="text-3xl font-bold underline">Home</h1>
    </div>
  )
}

export default Home
