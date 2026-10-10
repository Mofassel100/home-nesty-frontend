import apiClient from "@/lib/apiClient";
import {
  IProperty,
  IPropertyPayload,
  LoginPayload,
  PropertyEditPayload,
  RegistrationPayload,
  VerifyAccountPayload,
} from "@/types";

export function PropertyUpdated(
  {
  id,
  payload,
}: PropertyEditPayload
) {
  const formData = new FormData();

  formData.append("data", JSON.stringify(payload.data));

  if (payload.propertyImage) {
    formData.append("propertyUpdate", payload.propertyImage);
  }

  return apiClient(`/property/${id}`, {
    method: "PATCH",
    body: formData,
  });
}
export function PropertyCreate(payload: IPropertyPayload) {
  console.log(payload)
  const formData = new FormData();
  formData.append("data", JSON.stringify(payload.data));
  formData.append("property", payload.propertyImage as File);
  return apiClient("/property/create", { method: "POST", body:formData });
}

export function getProperty() {
  return apiClient("/property");
}

// export function googleOAuth(payload: { idToken: string }) {
//   return apiClient("/auth/google", { method: "POST", body: payload });
// }