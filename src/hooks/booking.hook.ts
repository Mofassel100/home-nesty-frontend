import {
    BookingCreate,
  getBookingDB,
  
  userHomeTopeUpdated,
  userLogin,
  userLogout,
  userRegistration,
  verifyAccount,
} from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export function useBookingCreate() {
   
  return useMutation({
    mutationFn: BookingCreate,
  });
}






export function useGetBooking() {
  return useQuery({
    queryKey: ["booking-all"],
    queryFn: getBookingDB,
    retry: false,
  });
}

