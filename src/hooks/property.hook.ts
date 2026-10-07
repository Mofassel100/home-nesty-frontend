// import {
//   applyAsDoctor,
//   approveDoctor,
//   getAllDoctors,
//   getAllPublicDoctors,
//   getPublicDoctorProfile,
//   getTodayScheduleByDoctor,
//   verifyDoctorAccount,
// } from "@/api";
// import { DoctorParams, PublicDoctorParams } from "@/types";
import { getProperty } from "@/api";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

// export function useApplyAsDoctor() {
//   return useMutation({
//     mutationFn: applyAsDoctor,
//   });
// }

// export function useVerifyDoctorAccount() {
//   return useMutation({
   
//   });
// }

// export function useGetAllDoctors(params: DoctorParams) {
//   return useQuery({
//     queryKey: ["doctors", params],
//     queryFn: () => getAllDoctors(params),
//   });
// }

// export function useGetAllPublicDoctors(params: PublicDoctorParams) {
//   return useQuery({
//     queryKey: ["doctor", "public", params],
//     queryFn: () => getAllPublicDoctors(params),
//   });
// }

// export function useSuspenseGetPublicDoctors(params: PublicDoctorParams) {
//   return useSuspenseQuery({
//     queryKey: ["doctors", "public", params],
//     queryFn: () => getAllPublicDoctors(params),
//   });
// }

// export function usePublicDoctorProfile(doctorId: string) {
//   return useQuery({
//     queryKey: ["doctor", "public", doctorId],
//     queryFn: () => getPublicDoctorProfile(doctorId),
//     enabled: !!doctorId,
//   });
// }

// export function useSuspenseGetAllDoctors(params: DoctorParams) {
//   return useSuspenseQuery({
//     queryKey: ["doctors", params],
//     queryFn: () => getAllDoctors(params),
//   });
// }

// export function useApproveDoctor() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: approveDoctor,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["doctors"] });
//     },
//   });
// }

// export function useGetProperty(params: {
//   providerId?: string;
//   page?: number;
//   limit?: number;
// }) {
//   return useQuery({
//     queryKey: ["property", params],
//     queryFn: () => getProperty(),
//   });
// }
export function useGetProperty() {
  return useQuery({
    queryKey: ["property"],
    queryFn: () => getProperty(),
  });
}