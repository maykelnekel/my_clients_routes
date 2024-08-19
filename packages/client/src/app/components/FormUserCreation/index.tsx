"use client";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tUserCreation } from "../../../../../Shared/types/user.types";
import { userCreationSchema } from "../../../../../Shared/schemas/users.schemas";
import { Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { createUser } from "@/api/myRoutesApi/users/createUser";

export function FormUserCreation(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<tUserCreation>({ resolver: zodResolver(userCreationSchema) });
  const onSubmit = async (data: tUserCreation) => {
    try {
      const res = await createUser(data);
      console.log("res", res);
    } catch (error) {
      console.error(error);
    }
  };

  function formatPhoneNumber(value: string) {
    let cleaned = ("" + value).replace(/\D/g, "");
    cleaned = cleaned.substring(0, 11);

    if (cleaned.length === 11) {
      return (
        "(" +
        cleaned.substring(0, 2) +
        ") " +
        cleaned.substring(2, 7) +
        "-" +
        cleaned.substring(7, 11)
      );
    }

    if (cleaned.length === 10) {
      return (
        "(" +
        cleaned.substring(0, 2) +
        ") " +
        cleaned.substring(2, 6) +
        "-" +
        cleaned.substring(6, 10)
      );
    }
    return cleaned;
  }

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%", maxWidth: "300px" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Controller
        name="name"
        control={control}
        render={({ field: { ref, ...field } }) => (
          <TextField
            {...field}
            id="outlined-error-helper-text"
            label="Nome*"
            variant="outlined"
            size="medium"
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            inputRef={ref}
            onChange={(value) => {
              setValue("name", value.target.value, { shouldValidate: true });
            }}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field: { ref, ...field } }) => (
          <TextField
            {...field}
            id="outlined-error-helper-text"
            label="Email*"
            type="email"
            variant="outlined"
            size="medium"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            inputRef={ref}
            onChange={(value) => {
              setValue("email", value.target.value, { shouldValidate: true });
            }}
          />
        )}
      />
      <Controller
        name="phone_number"
        control={control}
        render={({ field: { ref, ...field } }) => (
          <TextField
            {...field}
            id="outlined-error-helper-text"
            label="Telefone*"
            type="tel"
            variant="outlined"
            size="medium"
            error={Boolean(errors.phone_number)}
            helperText={errors.phone_number?.message}
            inputRef={ref}
            onChange={(e) => {
              // Aplica a formatação conforme o usuário digita
              const formattedValue = formatPhoneNumber(e.target.value);
              field.onChange(formattedValue);
            }}
          />
        )}
      />
      <Controller
        name="latitude"
        control={control}
        render={({ field: { ref, ...field } }) => (
          <TextField
            {...field}
            id="outlined-error-helper-text"
            label="Latitude*"
            variant="outlined"
            size="medium"
            error={Boolean(errors.latitude)}
            helperText={errors.latitude?.message}
            inputRef={ref}
            type="number"
            inputProps={{
              maxLength: 13,
              step: "1",
            }}
            onChange={(value) => {
              const cleanValue = value.target.value
                .replace(/[^-\d.]*/g, "")
                .trim();
              setValue("latitude", Number(cleanValue), {
                shouldValidate: true,
              });
            }}
          />
        )}
      />
      <Controller
        name="longitude"
        control={control}
        render={({ field: { ref, ...field } }) => (
          <TextField
            {...field}
            id="outlined-error-helper-text"
            label="Longitude*"
            variant="outlined"
            size="medium"
            error={Boolean(errors.longitude)}
            helperText={errors.longitude?.message}
            inputRef={ref}
            type="number"
            inputProps={{
              maxLength: 13,
              step: "1",
            }}
            onChange={(value) => {
              const cleanValue = value.target.value
                .replace(/[^-\d.]*/g, "")
                .trim();
              setValue("longitude", Number(cleanValue), {
                shouldValidate: true,
              });
            }}
          />
        )}
      />
      <Button variant="contained" size="medium" type="submit">
        Criar Usuário
      </Button>
    </Box>
  );
}
