import { User } from "./user.type";

export interface HomeTopeData {
  
    title: string;
    description: string;
}
export interface HomeTopeUpdatedData {
  
    title?: string;
    description?: string;
}

export interface HomeTopePayload {
  homeBanner: File;
  data: HomeTopeData;
}
export interface HomeTopeUpdatedPayload {
  homeBanner: File | null;
  data: HomeTopeData;
}
export interface HomeTopeEditPayload {
  id: string;
  payload: HomeTopeUpdatedPayload;
}
export type DoctorVerificationStatus = "PENDING" | "APPROVED" | "REJECTED";



export interface DoctorParams {
  verificationStatus?: DoctorVerificationStatus;
  page?: number;
  limit?: number;
  searchTerm?: string;
  sortOrder?: "desc" | "asc";
}

export interface ApproveDoctorPayload {
  doctorId: string;
  verificationStatus: "APPROVED" | "REJECTED";
  rejectionReason?: string;
}

export interface PublicDoctorProfile {
  id: string;
  name: string;
  specialization: string;
  licenseNumber: string;
  qualifications: string;
  experienceYears: number;
  bio?: string | null;
  consultationFee?: number | string | null;
  createdAt: string;
}

export interface PublicDoctorParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  specialization?: string;
  sortBy?: string;
  sortOrder?: "desc" | "asc";
}