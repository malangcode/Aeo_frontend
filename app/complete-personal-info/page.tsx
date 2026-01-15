"use client";

import { useState } from "react";
import { axiosWithCsrf } from "@/lib/axiosWithCsrf";
import StepHeader from "./components/StepHeader";
import StepNavigation from "./components/StepNavigation";
import BasicInfoStep from "./components/steps/BasicInfoStep";
import CompletionScreen from "./components/CompletionScreen";
import Competitor1InfoStep from "./components/steps/CompetetorInfo1";
import Competitor2InfoStep from "./components/steps/CompetetorInfo2";

export interface Profile {
  brand_name: string;
  domain_name: string;
  competitor1_brand_name: string;
  competitor1_domain_name: string;
  competitor2_brand_name: string;
  competitor2_domain_name: string;
}

export default function CompletePersonalInfoPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const totalSteps = 3;

  const [profile, setProfile] = useState<Profile>({
    brand_name: "",
    domain_name: "",
    competitor1_brand_name: "",
    competitor1_domain_name: "",
    competitor2_brand_name: "",
    competitor2_domain_name: "",
  });

  const isStepValid = () => {
    if (step === 1)
      return (
        profile.brand_name.trim() !== "" && profile.domain_name.trim() !== ""
      );
    if (step === 2) return ( profile.competitor1_brand_name.trim() !== ""  && profile.competitor1_domain_name.trim() !== "" );
    if (step === 3) return ( profile.competitor2_brand_name.trim() !== ""  && profile.competitor2_domain_name.trim() !== "" );
    
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
      await axiosWithCsrf.put("/brand-profile/create/", formData);
      localStorage.setItem("profile_completed", "true");
      setCompleted(true);
    } finally {
      setLoading(false);
    }
  };

  if (completed) return <CompletionScreen />;

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl overflow-hidden">
        <StepHeader step={step} totalSteps={totalSteps} />

        <div className="p-8">
          {step === 1 && (
            <BasicInfoStep profile={profile} setProfile={setProfile} />
          )}
          {step === 2 && (
            <Competitor1InfoStep profile={profile} setProfile={setProfile} />
          )}
          {step === 3 && (
            <Competitor2InfoStep profile={profile} setProfile={setProfile} />
          )}

          <StepNavigation
            step={step}
            totalSteps={totalSteps}
            isStepValid={isStepValid()}
            loading={loading}
            onNext={() => setStep(step + 1)}
            onPrev={() => setStep(step - 1)}
            onSubmit={submitProfile}
          />
        </div>
      </div>
    </div>
  );
}
