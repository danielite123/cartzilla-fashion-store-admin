"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  UseFormRegister,
  FieldErrors,
  Path,
  FieldValues,
} from "react-hook-form";
import { Eye, EyeOff, CheckCircle, UploadCloud } from "lucide-react";
import Image from "next/image";

type InputFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type?: "text" | "email" | "password" | "file" | "select";
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  watch?: (name: Path<T>) => any;
  options?: readonly string[];
  required?: boolean;
  className?: string;
  showCheckIcon?: boolean;
  placeholder?: string;
  [key: string]: any;
};

const InputField = <T extends FieldValues>({
  name,
  label,
  type = "text",
  register,
  errors,
  watch,
  options,
  required = false,
  className = "",
  showCheckIcon = false,
  placeholder,
  ...props
}: InputFieldProps<T>) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const error = errors[name];
  const watchedFile = type === "file" && watch ? watch(name) : null;

  useEffect(() => {
    if (type === "file" && watchedFile && watchedFile[0]) {
      const file = watchedFile[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else if (type === "file") {
      setImagePreview(null);
    }
  }, [watchedFile, type]);

  const baseInputClasses = `block w-full rounded-lg border text-gray-900 placeholder:text-[13px] dark:bg-gray-700 outline-none focus:border-blue-500 dark:border-gray-600 dark:text-white dark:placeholder-gray-400`;
  const normalBorderClasses = `border-gray-300 `;
  const errorBorderClasses = `border-red-500`;
  const inputPadding = `p-2`;
  const iconPadding = `pr-10`;

  const renderInput = () => {
    switch (type) {
      case "password":
        return (
          <div className="relative w-full">
            <input
              type={passwordVisible ? "text" : "password"}
              id={name}
              className={`${baseInputClasses} ${inputPadding} ${iconPadding} ${
                error ? errorBorderClasses : normalBorderClasses
              }`}
              {...props}
              {...register(name)}
              placeholder={placeholder}
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label={passwordVisible ? "Hide password" : "Show password"}
            >
              {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        );

      case "email":
        const emailValue = watch ? watch(name) : "";
        return (
          <div className="relative w-full">
            <input
              type="email"
              id={name}
              className={`${baseInputClasses} ${inputPadding} ${iconPadding} ${
                error ? errorBorderClasses : normalBorderClasses
              }`}
              {...props}
              {...register(name)}
              placeholder={placeholder}
            />
            {showCheckIcon && !error && emailValue && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-green-500 text-xs">
                <CheckCircle size={20} />
              </div>
            )}
          </div>
        );

      case "file":
        return (
          <div className="w-full">
            <label
              htmlFor={name}
              className={`group relative flex items-center justify-center w-full h-32 rounded-lg border-2 border-dashed transition-colors duration-200 cursor-pointer ${
                error
                  ? "border-red-500 hover:border-red-600"
                  : "border-gray-300 hover:border-blue-500 dark:border-gray-600 dark:hover:border-gray-500"
              }`}
            >
              <div className="text-center">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    className="mx-auto h-28 w-auto object-contain rounded-md"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400">
                    <UploadCloud size={32} className="mb-2" />
                    <p className="text-sm font-semibold">
                      Click to upload image
                    </p>
                    <p className="text-xs">PNG, JPG, WEBP (MAX. 2MB)</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                id={name}
                accept="image/png, image/jpeg, image/webp"
                className="sr-only"
                {...props}
                {...register(name)}
              />
            </label>
          </div>
        );

      case "select":
        return (
          <div className="relative w-full">
            <select
              id={name}
              className={`${baseInputClasses} ${inputPadding} ${
                error ? errorBorderClasses : normalBorderClasses
              }`}
              {...props}
              {...register(name)}
              defaultValue=""
            >
              <option value="" disabled>
                {placeholder || "Select an option..."}
              </option>
              {options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );

      default:
        const textValue = watch ? watch(name) : "";
        return (
          <div className="relative w-full">
            <input
              type="text"
              id={name}
              className={`${baseInputClasses} ${inputPadding} ${iconPadding} ${
                error ? errorBorderClasses : normalBorderClasses
              }`}
              {...props}
              {...register(name)}
              placeholder={placeholder}
            />
            {showCheckIcon && !error && textValue && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-green-500">
                <CheckCircle size={20} />
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderInput()}
      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-500">
          {String(error.message)}
        </p>
      )}
    </div>
  );
};

export default InputField;
