export interface Statistics {
  numBookings: number;
  totalRevenue: number;
  avgRevenuePerBooking: number;
  numBookingsPerRoom: { [roomId: string]: number };
  numBookingsPerUser: { [userEmail: string]: number };
}
