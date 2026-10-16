"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { Location } from "@/lib/data/locations"

const LocationsContext = createContext<Location[]>([])

/** Entrega las sedes (con su WhatsApp) a cualquier componente de cliente del sitio. */
export function LocationsProvider({ locations, children }: { locations: Location[]; children: ReactNode }) {
  return <LocationsContext.Provider value={locations}>{children}</LocationsContext.Provider>
}

export function useLocations() {
  return useContext(LocationsContext)
}
