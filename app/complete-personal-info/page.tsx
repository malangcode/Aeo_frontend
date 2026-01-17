"use client";

import { useState } from "react";
import { axiosWithCsrf } from "@/lib/axiosWithCsrf";
import StepHeader from "./components/StepHeader";
import StepNavigation from "./components/StepNavigation";
import BasicInfoStep from "./components/steps/BasicInfoStep";
import NoticeStep1 from "./components/steps/Noticestep1";
import { toast } from "react-toastify";

export interface Profile {
  brand_name: string;
  domain_name: string;
  url: string;
}

export default function CompletePersonalInfoPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const totalSteps = 2;

  const [profile, setProfile] = useState<Profile>({
    brand_name: "",
    domain_name: "",
    url: "",
  });

  const isStepValid = () => {
    if (step === 1)
      return (
        true
      );
    if (step === 2) return true;

    return true;
  };

  const submitProfile = async () => {
    setLoading(true);
    const formData = new FormData();

    Object.entries(profile).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        formData.append(key, value instanceof File ? value : String(value));
      }
    });

    try {
      const res = await axiosWithCsrf.put("/brand-profile/create/", formData);
      setCompleted(true);
      toast.success("Primary Brand Updated!");
    } catch (error) {
      console.error("Failed to update brand profile", error);
      alert("failed to update the brand!");
    } finally {
      setLoading(false);
    }
  };

  if (completed) {
    location.href = "/settings";
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl overflow-hidden">
        <StepHeader step={step} totalSteps={totalSteps} />

        <div className="p-8">
          {step === 1 && (
            <BasicInfoStep profile={profile} setProfile={setProfile} />
          )}
          {step === 2 && <NoticeStep1 />}

          <StepNavigation
            step={step}
            totalSteps={totalSteps}
            isStepValid={isStepValid()}
            loading={loading}
            onNext={() => {
              if (step === 1) {
                if (
                  profile.domain_name.trim() !== "" &&
                  !profile.domain_name.includes(".com")
                ) {
                  toast.error("Oops! it seems you forgot '.com' in domain ?");
                  return;
                }

                if (
                  profile.brand_name.trim() === "" ||
                  profile.domain_name.trim() === ""
                ) {
                  toast.error("Please fill all required fields");
                  return;
                }
              }

              setStep(step + 1);
            }}
            onPrev={() => setStep(step - 1)}
            onSubmit={submitProfile}
          />
        </div>
      </div>
    </div>
  );
}
