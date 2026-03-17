"use client"
import { GeoJSON } from "react-leaflet"
import { useEffect, useState } from "react"

export default function TrailLayer() {

  const [data,setData] = useState<any>(null)

  useEffect(() => {
    fetch("/api/trails")
      .then(res => res.json())
      .then(setData)
  }, [])

  if (!data) return null

  return (
    <GeoJSON
      data={data}
      style={{
        color: "#e27c00",
        weight: 3
      }}
    />
  )
}