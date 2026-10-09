import apiClient from "@/lib/apiClient";

import { HomeTopeEditPayload, HomeTopePayload, HomeTopeUpdatedData } from "@/types/homeTope";



// export function userHomeTopeCreate(payload: HomeTopePayload) {
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

// export function userLogout() {
//   return apiClient("/auth/logout", { method: "POST" });
// }

export function getQuestion() {
  return apiClient("/question");
}

