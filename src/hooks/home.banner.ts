import {
  getHomeBanner,
  googleOAuth,
  userHomeTopeCreate,
  userHomeTopeUpdated,
  userLogin,
  userLogout,
  userRegistration,
  verifyAccount,
} from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export function useHomeTope() {
   
  return useMutation({
    mutationFn: userHomeTopeCreate,
  });
}
export function useHomeTopeEdit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userHomeTopeUpdated,
       onSuccess: () => {
        queryClient.invalidateQueries({
        queryKey: ["homeBanner"],
      });
    },
  });
}



export function useGetHomeBanner() {
  return useQuery({
    queryKey: ["homeBanner"],
    queryFn: getHomeBanner,
    retry: false,
  });
}