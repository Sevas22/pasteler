export type Location = {
  name: string
  type: string
  address: string
  phone: string
  hours: string
  isPrincipal: boolean
  /** Google Maps search URL for the address */
  mapsUrl: string
}

export const locations: Location[] = [
  {
    name: "Bosa Carbonell",
    type: "Sede Principal",
    address: "Diag. 71 Sur No. 78A - 19",
    phone: "310 8336425",
    hours: "Lun - Sáb: 8:00 AM - 7:00 PM",
    isPrincipal: true,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Diag.+71+Sur+No.+78A+-+19+Bogot%C3%A1",
  },
  {
    name: "Bosa Naranjos",
    type: "Sucursal",
    address: "Transv. 79D No. 73A - 19 Sur",
    phone: "312 5169547",
    hours: "Lun - Sáb: 8:00 AM - 7:00 PM",
    isPrincipal: false,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Transv.+79D+No.+73A+-+19+Sur+Bogot%C3%A1",
  },
  {
    name: "Bosa Piamonte",
    type: "Sucursal",
    address: "Calle 68A Sur No. 79C - 10",
    phone: "322 3940849",
    hours: "Lun - Sáb: 8:00 AM - 7:00 PM",
    isPrincipal: false,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Calle+68A+Sur+No.+79C+-+10+Bogot%C3%A1",
  },
  {
    name: "Ciudadela Colsubsidio",
    type: "Sucursal",
    address: "Cra. 113 No. 81 - 82",
    phone: "",
    hours: "Lun - Sáb: 8:00 AM - 7:00 PM",
    isPrincipal: false,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Cra.+113+No.+81+-+82+Bogot%C3%A1",
  },
]
