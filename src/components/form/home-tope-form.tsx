"use client";

import { useForm } from "@tanstack/react-form";
import {
  BadgeCheck,
  Banknote,
  BriefcaseMedical,
  FileText,
  
  FileUp,
  GraduationCap,

  MapPin,
  Phone,
  Plus,
  Stethoscope,
  TicketPlus,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import { useHomeTope } from "@/hooks/home.banner";
import { HomeTopeData } from "@/types/homeTope";
import { homeTopeSchema, MAX_FILE_SIZE } from "@/validation/homeTope.validation";
import { formatFileSize } from "@/utils";

//* Data signature
// {
//   "user": {
//     "name": "Dr. Sarah Jenkins",
//     "email": "dr.sarah.jenkins@example.com"
//   },
//   "doctor": {
//     "address": "123 Medical Plaza, Suite 400, New York, NY",
//     "specialization": "Cardiology",
//     "licenseNumber": "MED-2026-98765",
//     "qualifications": "MD, FACC - Harvard Medical School",
//     "experienceYears": 12,
//     "bio": "Dedicated cardiologist with over a decade of experience specializing in non-invasive cardiovascular imaging and preventative heart care.",
//     "consultationFee": 150,
//     "contactNumber": "+1-555-0199"
//   }
// }

export default function HomeTopeForm() {
  const router = useRouter();
  const { mutate: homeTopeCreate, isPending: homeTopePending } = useHomeTope();

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      homeBanner: null as File | null,
      
    },
    

    validators: {
      onSubmit: homeTopeSchema,
    },

    onSubmit: async ({ value }) => {
      const homeTopeData: HomeTopeData = {
      
          title: value.title.trim(),
          description: value.description.trim(),
       
         
      };

       homeTopeCreate(
        {
          data: homeTopeData,
         homeBanner : value.homeBanner as File,
          
        },
        {
          onSuccess: (res) => {
            console.log(res)
            if (!res.success) {
              toast.add({
                title: "Server Failure",
                description: "Something went wrong. Please try again",
                type: "error",
              });
              return;
            }

            toast.add({
              title: "Application Submitted",
              description: "Please verify your account",
              type: "success",
            });
            
            router.push(`/`);
          },
          onError: (err) => {
            toast.add({
              title: "Application failure",
              description:
                err.message || "Something went wrong. Please try again",
              type: "error",
            });
          },
        },
      );
    },
  });

  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Apply to join Home Tope Banner
        </h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        noValidate
      >
        <FieldGroup>
          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field name="title">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Enter Title</FieldLabel>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="Enter Title"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className="pl-9"
                        autoComplete="title"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="description">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Enter Description address</FieldLabel>
                    <div className="relative">
                      <TicketPlus className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Textarea
                        id={field.name}
                        name={field.name}
                       
                        placeholder="Enter Description"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className="pl-9"
                        autoComplete="description"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>


            {/* <form.Field name="description">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.description}>
                      Practice address{" "}
                      <span className="font-normal text-muted-foreground">
                        (optional)
                      </span>
                    </FieldLabel>
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id={field.description}
                        name={field.name}
                        type="text"
                        placeholder="Chamber or hospital address"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className="pl-9"
                        autoComplete="street-address"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field> */}
          </div>

       



          <form.Field name="homeBanner">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              const file = field.state.value;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor="resume-field">Home Banner</FieldLabel>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      render={<label htmlFor="resume-field" />}
                      nativeButton={false}
                      variant="outline"
                    >
                      <FileUp size="4" />
                      Upload resume
                    </Button>
                    <input
                      id="resume-field"
                      type="file"
                      className="sr-only"
                      name={field.name}
                      onChange={(e) => {
                        const selected = e.target.files?.[0] ?? null;

                        field.handleChange(selected);
                        e.target.value = "";
                      }}
                    />
                    {file ? (
                      <span className="inline-flex max-w-full items-center gap-2 rounded-lg bg-muted px-2.5 py-1 text-sm">
                        <FileText className="size-4 shrink-0 text-primary" />
                        <span className="truncate">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </span>
                        <button
                          type="button"
                          aria-label="Remove resume"
                          onClick={() => {
                            field.handleChange(null);
                            field.handleBlur();
                          }}
                          className="text-muted-foreground transition-colors hover:text-destructive focus:outline-none"
                        >
                          <X className="size-4" />
                        </button>
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        PDF, DOC, DOCX or image up to {MAX_FILE_SIZE} MB
                      </span>
                    )}
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

        </FieldGroup>
           <div className="flex justify-center items-center w-full p-2 mt-5">
          <Button disabled={homeTopePending} type="submit">
            {homeTopePending ? (
              <>
                <Spinner /> submitting
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
  
      </form>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Already an approved Admin?{" "}
        <Link
          href="/login"
          className="font-medium underline underline-offset-4 hover:text-primary"
        >
          Sign in to the admin portal
        </Link>
        . admin applications should use the{" "}
        <Link
          href="/register"
          className="font-medium underline underline-offset-4 hover:text-primary"
        >
          Customer registration
        </Link>{" "}
        form instead.
      </p>
    </div>
  );
}