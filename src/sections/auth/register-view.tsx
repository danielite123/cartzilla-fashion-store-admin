/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Logo from "@/assets/logo.png";
import Link from "next/link";
import { Container } from "@/components/container.component";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserRegisterFormValidation } from "@/lib/use-form-validation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/button.component";
import { useRegister } from "@/api/auth";
import { toast } from "sonner";
import { Loader } from "@/components/loader";

export default function RegisterView() {
  const router = useRouter();

  const { register, isRegister } = useRegister();

  const form = useForm<z.infer<typeof UserRegisterFormValidation>>({
    resolver: zodResolver(UserRegisterFormValidation),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserRegisterFormValidation>) {
    try {
      const res = await register(values);
      toast.success("Register successful");
      router.push("/");
      return res;
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  }
  return (
    <div className="flex flex-row h-screen">
      <div className="flex flex-1 justify-center p-5">
        <Container className="flex justify-center w-full">
          <div className="w-full max-w-sm flex flex-col justify-between">
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-row items-center gap-2">
                <div className="relative h-10 w-10 rounded-full overflow-hidden bg-accent">
                  <Image
                    src={Logo}
                    alt="logo"
                    width={32}
                    height={32}
                    className="object-cover absolute top-1.5"
                  />
                </div>
              </div>

              <h1 className="text-2xl font-semibold">Cartzilla</h1>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-semibold">Create an account</h2>
              <p className="text-sm text-lightgrey">
                I already have an account{" "}
                <Link
                  href="/login"
                  className="text-sm underline font-medium text-black"
                >
                  Sign in
                </Link>
              </p>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="flex flex-col gap-4 w-full">
                    <div className="flex md:flex-row flex-col gap-4 justify-between w-full">
                      <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <input
                                {...field}
                                type="text"
                                placeholder="First Name"
                                className="input-box"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <input
                                {...field}
                                type="text"
                                placeholder="Last Name"
                                className="input-box"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <input
                              {...field}
                              type="email"
                              placeholder="Email"
                              className="input-box"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <input
                              {...field}
                              type="password"
                              placeholder="Password"
                              className="input-box"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isRegister}
                      className="cursor-pointer p-2"
                    >
                      {isRegister ? <Loader /> : "Register"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>

            <div className="flex flex-col gap-2">
              <Link href="/" className="text-sm underline font-medium">
                Need help?
              </Link>
              <p className="text-xs text-lightgrey">
                © All rights reserved. Made by Createx Studio
              </p>
            </div>
          </div>
        </Container>
      </div>

      <div className="hidden md:flex flex-1">
        <p>Hello</p>
      </div>
    </div>
  );
}
