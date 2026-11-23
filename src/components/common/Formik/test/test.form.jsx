"use client";

import useFormik from "@/hooks/useFormik";
import { Eye } from "lucide-react";
// import forgotPasswordSchema from "../utils/schema";
import { useState } from "react";
import CheckBoxField from "../CheckboxField";
import FieldDatePicker from "../FieldDatePicker";
import FieldFileInput from "../FieldFileInput";
import FieldInput from "../FieldInput";
import FieldSelect from "../FieldSelect";
import FormActionButton from "../FormActionButton";
import FormikWrapper from "../FormikWrapper";
import forgotPasswordSchema from "./utils/schmea";

export default function TestForm() {
  const [step, setStep] = useState(1);
  const form = useFormik({
    schema: forgotPasswordSchema.resetPasswordValidation,
    defaultValues: forgotPasswordSchema.values(),
    onSubmit,
  });
  const { isDirty, isSubmitting, isValid } = form.formState;

  async function onSubmit(data) {
    console.log("data = ", data);
  }

  return (
    <div className="space-y-4">
      <FormikWrapper form={form} onSubmit={onSubmit}>
        <div className="space-y-5">
          <div className="space-y-2">
            <FieldInput
              required
              autoComplete="on"
              type="text"
              name="name"
              placeholder="Enter your Name"
              label={"Name"}
              form={form}
            />
            <FieldInput
              required
              autoComplete="on"
              type="password"
              name="password"
              placeholder="Enter your Password"
              label={"Password"}
              form={form}
              icon={<Eye />}
            />
            <FieldInput
              required
              autoComplete="on"
              type="password"
              name="confirmPassword"
              placeholder="Enter your Password"
              label={"Confirm Password"}
              form={form}
              icon={<Eye />}
            />
            <FieldDatePicker
              required
              name="dateOfBirth"
              placeholder="Select your date of birth"
              label={"Date of Birth"}
              form={form}
            />

            <CheckBoxField name="terms" form={form} />
            <FieldFileInput
              required
              name="resume"
              placeholder="Upload your resume"
              label={"Resume"}
              form={form}
            />
            {/* <FieldOtpInput
              required
              name="otp"
              placeholder="Enter the OTP sent to your email"
              label={"OTP"}
              form={form}
            /> */}
            <FieldSelect
              name="country"
              placeholder="Select your country"
              label={"Country"}
              form={form}
              options={[
                { value: "us", label: "United States" },
                { value: "ca", label: "Canada" },
                { value: "uk", label: "United Kingdom" },
                { value: "au", label: "Australia" },
                { value: "in", label: "India" },
              ]}
            />
          </div>

          <FormActionButton
            {...{
              classNames: "",
              isDirty,
              isSubmitting,
              isValid,
              label: step === 1 ? "Submit" : "Submit",
              submittingLabel:
                step === 1 ? "Verifying..." : "Resetting Password...",
            }}
          />
        </div>
      </FormikWrapper>
    </div>
  );
}
