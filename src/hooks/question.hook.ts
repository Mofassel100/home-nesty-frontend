
import { getQuestion } from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


// export function useHomeTope() {
   
//   return useMutation({
//     mutationFn: userHomeTopeCreate,
//   });
// }
// export function useQuestionEdit() {
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



export function useGetQuestion() {
  return useQuery({
    queryKey: ["question"],
    queryFn: getQuestion,
    retry: false,
  });
}