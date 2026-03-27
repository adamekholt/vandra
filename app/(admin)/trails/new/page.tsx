import NewTrailClient from "@/components/features/map/NewTrailClient";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Create trail</h1>
      <NewTrailClient />
    </main>
  );
}