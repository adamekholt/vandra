import { Navbar } from "@/components/layout/navbar"
import { Header } from "@/components/layout/header"
import EditTrail from "@/components/features/UpdateTrail"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header/>
      <EditTrail />
      <Navbar/>
    </main>
  )
}
