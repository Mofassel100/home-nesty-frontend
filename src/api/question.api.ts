import apiClient from "@/lib/apiClient";
import { IQuestionPayload } from "@/types";

import { HomeTopeEditPayload, HomeTopePayload, HomeTopeUpdatedData } from "@/types/homeTope";



// export function userHomeTopeCreate(payload: HomeTopePayload) {
//   console.log(payload)

//   const formData = new FormData();

//   formData.append("data", JSON.stringify(payload.data));
//   formData.append("homeBanner", payload.homeBanner);

 
//   return apiClient("/homeBanner/create", { method: "POST", body:formData });

// }
export function QuestionUpdated(
 {
    id,
    payload
 }:IQuestionPayload
) {
  return apiClient(`/question/${id}`, {
    method: "PATCH",
    body: payload,
  });
}

// export function userLogout() {
//   return apiClient("/auth/logout", { method: "POST" });
// }

export function getQuestion() {
  return apiClient("/question");
}

