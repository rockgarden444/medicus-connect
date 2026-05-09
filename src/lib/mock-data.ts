export type RideStatus =
  | "pending"
  | "accepted"
  | "driver_assigned"
  | "driver_arriving"
  | "in_transport"
  | "completed"
  | "cancelled";

export type TransportType = "standard" | "wheelchair" | "stretcher" | "elderly";

export interface Ride {
  id: string;
  patientName: string;
  pickup: string;
  destination: string;
  scheduledAt: string;
  type: TransportType;
  status: RideStatus;
  driver?: string;
  vehicle?: string;
  eta?: string;
  notes?: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  online: boolean;
  rating: number;
  currentRide?: string;
  vehicle: string;
}

export interface Vehicle {
  id: string;
  plate: string;
  type: "Standard" | "Wheelchair" | "Stretcher";
  available: boolean;
  driver?: string;
  nextService: string;
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  address: string;
  rides: number;
  notes?: string;
}

export const rides: Ride[] = [
  {
    id: "MC-2041",
    patientName: "Hannelore Schmidt",
    pickup: "Hauptstraße 12, 10115 Berlin",
    destination: "Charité Universitätsmedizin",
    scheduledAt: "Heute, 09:30",
    type: "wheelchair",
    status: "in_transport",
    driver: "Markus Weber",
    vehicle: "B-MC 1042",
    eta: "12 Min",
  },
  {
    id: "MC-2042",
    patientName: "Friedrich Bauer",
    pickup: "Klinikum Neukölln",
    destination: "Lindenallee 8, 12043 Berlin",
    scheduledAt: "Heute, 10:15",
    type: "stretcher",
    status: "driver_arriving",
    driver: "Anna Hoffmann",
    vehicle: "B-MC 2210",
    eta: "4 Min",
  },
  {
    id: "MC-2043",
    patientName: "Ursula Becker",
    pickup: "Goethestraße 44",
    destination: "Dialysezentrum Mitte",
    scheduledAt: "Heute, 11:00",
    type: "elderly",
    status: "driver_assigned",
    driver: "Tobias Klein",
    vehicle: "B-MC 0918",
  },
  {
    id: "MC-2044",
    patientName: "Wolfgang Richter",
    pickup: "Seniorenheim Sonnenhof",
    destination: "Vivantes Klinikum",
    scheduledAt: "Heute, 11:45",
    type: "wheelchair",
    status: "pending",
  },
  {
    id: "MC-2045",
    patientName: "Ingrid Wagner",
    pickup: "Bismarckallee 5",
    destination: "Charité Campus Virchow",
    scheduledAt: "Heute, 13:20",
    type: "standard",
    status: "accepted",
    driver: "Markus Weber",
  },
  {
    id: "MC-2038",
    patientName: "Helmut Fischer",
    pickup: "St. Hedwig-Krankenhaus",
    destination: "Rosenthaler Str. 22",
    scheduledAt: "Heute, 08:10",
    type: "stretcher",
    status: "completed",
    driver: "Anna Hoffmann",
    vehicle: "B-MC 2210",
  },
];

export const drivers: Driver[] = [
  { id: "D-01", name: "Markus Weber", phone: "+49 170 1234567", online: true, rating: 4.9, currentRide: "MC-2041", vehicle: "B-MC 1042" },
  { id: "D-02", name: "Anna Hoffmann", phone: "+49 171 2345678", online: true, rating: 4.8, currentRide: "MC-2042", vehicle: "B-MC 2210" },
  { id: "D-03", name: "Tobias Klein", phone: "+49 172 3456789", online: true, rating: 4.7, currentRide: "MC-2043", vehicle: "B-MC 0918" },
  { id: "D-04", name: "Sabine Müller", phone: "+49 173 4567890", online: true, rating: 4.9, vehicle: "B-MC 3301" },
  { id: "D-05", name: "Karl Schneider", phone: "+49 174 5678901", online: false, rating: 4.6, vehicle: "B-MC 1180" },
];

export const vehicles: Vehicle[] = [
  { id: "V-01", plate: "B-MC 1042", type: "Wheelchair", available: false, driver: "Markus Weber", nextService: "12.06.2026" },
  { id: "V-02", plate: "B-MC 2210", type: "Stretcher", available: false, driver: "Anna Hoffmann", nextService: "28.05.2026" },
  { id: "V-03", plate: "B-MC 0918", type: "Standard", available: false, driver: "Tobias Klein", nextService: "03.07.2026" },
  { id: "V-04", plate: "B-MC 3301", type: "Wheelchair", available: true, driver: "Sabine Müller", nextService: "19.06.2026" },
  { id: "V-05", plate: "B-MC 1180", type: "Standard", available: true, nextService: "22.05.2026" },
];

export const patients: Patient[] = [
  { id: "P-1001", name: "Hannelore Schmidt", phone: "+49 30 1112233", address: "Hauptstraße 12", rides: 24, notes: "Rollstuhl erforderlich" },
  { id: "P-1002", name: "Friedrich Bauer", phone: "+49 30 2223344", address: "Lindenallee 8", rides: 8, notes: "Liegendtransport" },
  { id: "P-1003", name: "Ursula Becker", phone: "+49 30 3334455", address: "Goethestraße 44", rides: 41, notes: "Dialyse 3x/Woche" },
  { id: "P-1004", name: "Wolfgang Richter", phone: "+49 30 4445566", address: "Sonnenhof 2", rides: 5 },
  { id: "P-1005", name: "Ingrid Wagner", phone: "+49 30 5556677", address: "Bismarckallee 5", rides: 12 },
];

export const statusLabel: Record<RideStatus, string> = {
  pending: "Ausstehend",
  accepted: "Akzeptiert",
  driver_assigned: "Fahrer zugewiesen",
  driver_arriving: "Fahrer unterwegs",
  in_transport: "In Transport",
  completed: "Abgeschlossen",
  cancelled: "Storniert",
};

export const transportLabel: Record<TransportType, string> = {
  standard: "Standard",
  wheelchair: "Rollstuhl",
  stretcher: "Liegendtransport",
  elderly: "Begleitung Senioren",
};

export const weeklyStats = [
  { day: "Mo", rides: 42, completed: 40 },
  { day: "Di", rides: 51, completed: 49 },
  { day: "Mi", rides: 47, completed: 45 },
  { day: "Do", rides: 58, completed: 56 },
  { day: "Fr", rides: 63, completed: 60 },
  { day: "Sa", rides: 28, completed: 27 },
  { day: "So", rides: 19, completed: 19 },
];
