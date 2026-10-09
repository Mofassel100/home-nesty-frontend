// import apiClient from "@/lib/apiClient";
// import {
//   LoginPayload,
//   RegistrationPayload,
//   VerifyAccountPayload,
// } from "@/types";
// import { HomeTopeEditPayload, HomeTopePayload, HomeTopeUpdatedData } from "@/types/homeTope";

import apiClient from "@/lib/apiClient";
import { IUserEditPayload, IUserUpdatedPayload } from "@/types";
import { HomeTopeEditPayload } from "@/types/homeTope";

// // export function userLogin(payload: LoginPayload) {
// //   return apiClient("/auth/login", { method: "POST", body: payload });
// // }

// // export function verifyAccount(payload: VerifyAccountPayload) {
// //   return apiClient("/auth/verify-email", { method: "POST", body: payload });
// // }

// export function userUserCreate(payload: HomeTopePayload) {
//   console.log(payload)

//   const formData = new FormData();

//   formData.append("data", JSON.stringify(payload.data));
//   formData.append("homeBanner", payload.homeBanner);

 
//   return apiClient("/homeBanner/create", { method: "POST", body:formData });

// }
export function userUpdated(
  {
  id,
  payload,
}: IUserEditPayload
) {
  const formData = new FormData();

  formData.append("data", JSON.stringify(payload.data));

  if (payload.image) {
    formData.append("house-backend", payload.image);
  }

  return apiClient(`/users/me/${id}`, {
    method: "PATCH",
    body: formData,
  });
}

// // export function userLogout() {
// //   return apiClient("/auth/logout", { method: "POST" });
// // }

// export function getHomeBanner() {
//   return apiClient("/homeBanner");
// }

// // export function googleOAuth(payload: { idToken: string }) {
// //   return apiClient("/auth/google", { method: "POST", body: payload });
// // }