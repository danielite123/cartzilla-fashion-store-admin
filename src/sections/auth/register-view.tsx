"use client";

import CustomButton from "@/components/button.component";
import Image from "next/image";
import GoogleLogo from "@/assets/google-logo.png";
import AppleLogo from "@/assets/apple-logo.png";
import Banner from "@/assets/banner.jpg";
import InputField from "@/components/input.component";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Checkbox from "@/components/checkbox.componet";
import { useState } from "react";
import Link from "next/link";
import LoadingSpinner from "@/components/loading-spinner";
import registerFormSchema from "@/lib/validation/register";
import { useRegister } from "@/api/auth";
import { useAuthStore } from "@/store/auth-store";

type FormValues = z.infer<typeof registerFormSchema>;

export default function RegisterView() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(registerFormSchema),
    mode: "onBlur",
  });

  const { register: submitRegister, isRegistering } = useRegister();
  const setToken = useAuthStore((state) => state.setToken);

  const [boxChecked, setBoxChecked] = useState(false);

  const handleBoxChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setBoxChecked(e.target.checked);

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await submitRegister(data);
      setToken(res.accessToken);
      reset();
    } catch (error) {
      reset();
      console.error("Submission failed:", error);
    }
  };

  return (
    <div className="w-full flex flex-row">
      <div className="flex flex-col flex-1 items-start justify-center p-4 gap-4 min-h-screen">
        <div className="w-full max-w-[360px] flex flex-col mx-auto gap-2">
          <div className="flex items-center">
            <p className="text-xl font-semibold">Cartzilla</p>
          </div>

          <div className="flex flex-col items-start mt-3">
            <h1 className="text-3xl font-medium">Create an account</h1>
            <p className="text-light-grey text-sm">
              Enter your personal data to create your account
            </p>
          </div>

          <div className="flex flex-row items-center w-full gap-4">
            <CustomButton
              type="submit"
              className="w-full px-2 py-2.5 border-1 border-gray-100 gap-1.5"
            >
              <Image
                src={GoogleLogo}
                alt="goggle-logo"
                width={18}
                height={18}
              />
              <p>Google</p>
            </CustomButton>
            <CustomButton
              type="submit"
              className="w-full px-2 py-2.5 border-1 border-gray-100 gap-1.5"
            >
              <Image src={AppleLogo} alt="goggle-logo" width={16} height={16} />
              <p>Apple</p>
            </CustomButton>
          </div>

          <div className="flex items-center justify-center w-full mt-2">
            <div className="flex items-center flex-1">
              <div className="h-px bg-gray-300 flex-1 relative">
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-300 rotate-45"></span>
              </div>
            </div>
            <span className="px-5 text-sm font-medium">OR</span>
            <div className="flex items-center flex-1">
              <div className="h-px bg-gray-300 flex-1 relative">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-300 rotate-45"></span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full flex flex-col items-center gap-4">
              <div className="w-full flex flex-row justify-between gap-4">
                <InputField
                  name="firstname"
                  label="Firstname"
                  type="text"
                  required
                  placeholder="Antony"
                  register={register}
                  watch={watch}
                  errors={errors}
                  showCheckIcon={true}
                />
                <InputField
                  name="lastname"
                  label="Lastname"
                  type="text"
                  required
                  placeholder="Smith"
                  register={register}
                  watch={watch}
                  errors={errors}
                  showCheckIcon={true}
                />
              </div>

              <InputField
                name="email"
                label="Email"
                type="email"
                required
                placeholder="johndoe@gmail.com"
                register={register}
                watch={watch}
                errors={errors}
                showCheckIcon={true}
              />

              <InputField
                name="password"
                label="Password"
                type="password"
                required
                placeholder="johndoe11"
                register={register}
                watch={watch}
                errors={errors}
                showCheckIcon={true}
              />
            </div>

            <div className="flex flex-row items-center gap-1 mt-4">
              <Checkbox
                name="remeber"
                variant="box"
                checked={boxChecked}
                onChange={handleBoxChange}
              />
              <p className="text-[13px] text-light-grey">
                I agree to the Terms and Privacy policy
              </p>
            </div>

            <CustomButton
              type="submit"
              className="w-full p-3 bg-green-400 cursor-pointer mt-4"
              disabled={isRegistering}
            >
              {isRegistering ? <LoadingSpinner /> : "Register"}
            </CustomButton>
          </form>

          <div className="w-full flex flex-row items-center justify-center">
            <p className="text-[13px] text-light-grey pr-1">
              Already have an account?
            </p>
            <Link href="/login" className="text-[13px] underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden md:flex flex-1 relative">
        <Image src={Banner} alt="banner" fill className="object-cover" />
      </div>
    </div>
  );
}
