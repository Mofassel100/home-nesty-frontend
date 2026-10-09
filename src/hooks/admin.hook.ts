
import { getBookingAll, getPaymentAll, getPropertyAll, getUserAll } from "@/api/admin.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



// export function useHomeTopeEdit() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: userHomeTopeUpdated,
//        onSuccess: () => {
//         queryClient.invalidateQueries({
//         queryKey: ["homeBanner"],
//       });
//     },
//   });
// }



export function useGetUserAll() {
  return useQuery({
    queryKey: ["user-all"],
    queryFn: getUserAll,
    retry: false,
  });
}
export function useGetPaymentAll() {
  return useQuery({
    queryKey: ["payment-all"],
    queryFn: getPaymentAll,
    retry: false,
  });
}
export function useGetPropertyAll() {
  return useQuery({
    queryKey: ["property-all"],
    queryFn: getPropertyAll,
    retry: false,
  });
}
export function useGetBookingAll() {
  return useQuery({
    queryKey: ["booking-all"],
    queryFn: getBookingAll,
    retry: false,
  });
}