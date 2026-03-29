// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { createClient } from "@/lib/supabase/client";
// import { Button } from "@/components/ui/button";

// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableHead,
//   TableRow,
//   TableCell,
// } from "@/components/ui/table";

// const supabase = createClient();

// type Trail = {
//   trail_id: string;
//   name: string | null;
//   user_id: string | null;
//   created_at: string;
// };

// export default function AdminTrailTable() {
//   const router = useRouter();

//   const [trails, setTrails] = useState<Trail[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function loadData() {
//       const { data, error } = await supabase
//         .from("trails")
//         .select("trail_id, name, user_id, created_at")
//         .order("created_at", { ascending: false });

//       if (error) {
//         console.error(error);
//         return;
//       }

//       if (data) setTrails(data);

//       setLoading(false);
//     }

//     loadData();
//   }, []);

//   if (loading) return <div className="p-8">Loading trails...</div>;

//   return (
//     <div className="p-8 space-y-4">

//       <Button onClick={() => router.push("/trails/new")}>
//         New trail
//       </Button>

//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Name</TableHead>
//             <TableHead>Trail ID</TableHead>
//             <TableHead>User</TableHead>
//             <TableHead>Created</TableHead>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {trails.map((trail) => (
//             <TableRow
//               key={trail.trail_id}
//               className="cursor-pointer"
//               onClick={() =>
//                 router.push(`/trails/${trail.trail_id}`)
//               }
//             >
//               <TableCell>{trail.name ?? "Unnamed"}</TableCell>
//               <TableCell>{trail.trail_id}</TableCell>
//               <TableCell>{trail.user_id}</TableCell>
//               <TableCell>
//                 {new Date(trail.created_at).toLocaleDateString()}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//     </div>
//   );
// }

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Trail page</h1>
    </main>
  )
}
