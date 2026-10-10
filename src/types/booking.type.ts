export interface ICreateBookingPayload {
  propertyId: string;
  startDate: string;
  endDate?: string;
  guests: number;
}