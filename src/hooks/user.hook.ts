import {
  getHomeBanner,
  googleOAuth,
  userHomeTopeCreate,
  userHomeTopeUpdated,
  userLogin,
  userLogout,
  userRegistration,
  userUpdated,
  verifyAccount,
} from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


// export function useHomeTope() {
   
//   return useMutation({
//     mutationFn: userHomeTopeCreate,
//   });
// }
export function useUserEdit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userUpdated,
      
  });
}



// export function useGetHomeBanner() {
//   return useQuery({
//     queryKey: ["homeBanner"],
//     queryFn: getHomeBanner,
//     retry: false,
//   });
// }