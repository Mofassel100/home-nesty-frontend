import apiClient from "@/lib/apiClient";

import { ICreateBookingPayload } from "@/types/booking.type";
import { HomeTopeEditPayload, HomeTopePayload, HomeTopeUpdatedData } from "@/types/homeTope";

// export function userLogin(payload: LoginPayload) {
//   return apiClient("/auth/login", { method: "POST", body: payload });
// }

// export function verifyAccount(payload: VerifyAccountPayload) {
//   return apiClient("/auth/verify-email", { method: "POST", body: payload });
// }

export function BookingCreate(payload: ICreateBookingPayload) {
  return apiClient("/booking/create", { method: "POST", body:payload });

}



export function getBookingDB() {
  return apiClient("/booking")

}

// export function googleOAuth(payload: { idToken: string }) {
//   return apiClient("/auth/google", { method: "POST", body: payload });
// }