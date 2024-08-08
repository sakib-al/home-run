import { getServerSession } from "next-auth"

import { authOptions } from "@/libs/auth"



export default async function Page() {
  const session = await getServerSession(authOptions)

  console.log(session)

  return <h1>Home page!</h1>
}
