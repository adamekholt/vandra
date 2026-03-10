export default function Page({ params }: Readonly<{ params: { id: string } }>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      {params.id}
    </div>
  )
}
