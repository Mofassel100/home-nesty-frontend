import apiClient from "@/lib/apiClient";
import {
  LoginPayload,
  RegistrationPayload,
  VerifyAccountPayload,
} from "@/types";
import { HomeTopeEditPayload, HomeTopePayload, HomeTopeUpdatedData } from "@/types/homeTope";



// export function userHomCreate(payload: HomeTopePayload) {
//   console.log(payload)

//   const formData = new FormData();

//   formData.append("data", JSON.stringify(payload.data));
//   formData.append("homeBanner", payload.homeBanner);

 
//   return apiClient("/homeBanner/create", { method: "POST", body:formData });

// }
// export function userHomeTopeUpdated(
//   {
//   id,
//   payload,
// }: HomeTopeEditPayload
// ) {
//   const formData = new FormData();

//   formData.append("data", JSON.stringify(payload.data));

//   if (payload.homeBanner) {
//     formData.append("homeBanner", payload.homeBanner);
//   }

//   return apiClient(`/homeBanner/${id}`, {
//     method: "PATCH",
//     body: formData,
//   });
// }


export function getUserAll() {
  return apiClient("/admin/user-all");
}
export function getPaymentAll() {
  return apiClient("/admin/payment-all");
}
export function getPropertyAll() {
  return apiClient("/admin/property-all");
}
export function getBookingAll() {
  return apiClient("/admin/booking-all");
}
