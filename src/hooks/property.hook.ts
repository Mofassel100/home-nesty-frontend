
import { getProperty, PropertyCreate, PropertyUpdated } from "@/api";
import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";

export function usePropertyCreate() {
   
  return useMutation({
    mutationFn: PropertyCreate,
  });
}

export function usePropertyEdit() {
  return useMutation({
    mutationFn: PropertyUpdated,
       onSuccess: () => {
      
    },
  });
}

export function useGetProperty() {
  return useQuery({
    queryKey: ["property"],
    queryFn: () => getProperty(),
  });
}