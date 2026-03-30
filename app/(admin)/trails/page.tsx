import TrailTable from "@/components/layout/TrailTable";
import { Header } from "@/components/layout/header";
import { Navbar } from "@/components/layout/navbar";

export default function Page() {
  return (
    <main className="p-6">
      <Header/>
      <TrailTable />
      <Navbar />
    </main>
  );
}
