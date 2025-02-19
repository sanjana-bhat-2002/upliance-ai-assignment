"use client";

import { useEffect, useState } from "react";
import { Button, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useForm } from "react-hook-form";

interface FormValues {
  name: string;
  address: string;
  email: string;
  phone: string;
}

const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormValues>();

  const [userId, setUserId] = useState(0);

  useEffect(() => {
    const lastUserId = Number(localStorage.getItem("lastUserId")) || 1000;
    setUserId(lastUserId + 1);
  }, []);

  const onSubmit = (data: FormValues) => {
    const existingUsers: Array<{ id: number } & FormValues> = JSON.parse(
      localStorage.getItem("users") || "[]",
    );

    const newUser = { id: userId, ...data };

    const updatedUsers = [...existingUsers, newUser];

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("lastUserId", userId.toString());

    window.dispatchEvent(new Event("usersUpdated"));

    alert(`User ${userId} saved!`);
    console.log(updatedUsers);

    setUserId((prevId) => prevId + 1);
    reset();
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-1/2">
      <Stack gap="4" align="flex-center">
        <Field
          label="Name"
          invalid={!!errors.name}
          errorText={errors.name?.message}
        >
          <Input {...register("name", { required: "Name is required" })} />
        </Field>

        <Field
          label="Address"
          invalid={!!errors.address}
          errorText={errors.address?.message}
        >
          <Input
            {...register("address", { required: "Address is required" })}
          />
        </Field>

        <Field
          label="Email"
          invalid={!!errors.email}
          errorText={errors.email?.message}
        >
          <Input
            {...register("email", { required: "Email is required" })}
            type="email"
          />
        </Field>

        <Field
          label="Phone"
          invalid={!!errors.phone}
          errorText={errors.phone?.message}
        >
          <Input
            {...register("phone", { required: "Phone is required" })}
            type="tel"
          />
        </Field>

        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
};

export default Form;
