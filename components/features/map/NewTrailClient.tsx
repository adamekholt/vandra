"use client";

import dynamic from "next/dynamic";

const NewTrail = dynamic(() => import("@/components/features/NewTrail"), {
  ssr: false,
});

export default function NewTrailClient(props: any) {
  return <NewTrail />;
}