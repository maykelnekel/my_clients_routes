"use client";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tUserCreation } from "../../../../../Shared/types/user.types";
import { userCreationSchema } from "../../../../../Shared/schemas/users.schemas";
import {
  Alert,
  Box,
  CircularProgress,
  Snackbar,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import { createUser } from "@/api/myRoutesApi/users/createUser";

import { useRouter } from "next/navigation";

export function FormUserCreation(): JSX.Element {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<tUserCreation>({ resolver: zodResolver(userCreationSchema) });
  const [send, setSend] = useState(false);
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendMessage, setSendMessage] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  const onSubmit = async (data: tUserCreation) => {
    setRedirecting(false);
    setSending(true);
    setTimeout(async () => {
      try {
        setSend(true);
        const res = await createUser(data);
        if (res.status === 201 && "data" in res) {
          setError(false);
          setSendMessage(res.message);
          setSending(false);
          setRedirecting(true);
          return setTimeout(() => router.push("/"), 1000);
        } else {
          setError(true);
          setSendMessage(res.message);
          setSending(false);
          return;
        }
      } catch (error) {
        console.error(error);
        setError(true);
        setSendMessage(
          "Um erro inesperado aconteceu, por favor tente novamente mais tarde."
        );
        setSending(false);
        return;
      }
    }, 1000);
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

  useEffect(() => {}, [send]);
  if (redirecting) {
  }
  return (
    <Box
      component="form"
      sx={{
        gap: 1,
        maxWidth: 330,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: 1,
        padding: 2,
        borderRadius: 2,
        color: "gray",
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      {redirecting ? (
        <CircularProgress color="inherit" />
      ) : (
        <>
          <Controller
            name="name"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                sx={{
                  width: "100%",
                }}
                id="outlined-error-helper-text"
                label="Nome*"
                variant="outlined"
                size="medium"
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                inputRef={ref}
                onChange={(value) => {
                  setValue("name", value.target.value, {
                    shouldValidate: true,
                  });
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
                sx={{
                  width: "100%",
                }}
                id="outlined-error-helper-text"
                label="Email*"
                type="email"
                variant="outlined"
                size="medium"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                inputRef={ref}
                onChange={(value) => {
                  setValue("email", value.target.value, {
                    shouldValidate: true,
                  });
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
                sx={{
                  width: "100%",
                }}
                id="outlined-error-helper-text"
                label="Telefone*"
                type="tel"
                variant="outlined"
                size="medium"
                error={Boolean(errors.phone_number)}
                helperText={errors.phone_number?.message}
                inputRef={ref}
                onChange={(e) => {
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
                sx={{
                  width: "100%",
                }}
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
                sx={{
                  width: "100%",
                }}
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
          {send && (
            <Snackbar open={send} autoHideDuration={6000} message={sendMessage}>
              <Alert
                onClose={() => {
                  setSend(false);
                  setError(false);
                }}
                severity={error ? "error" : "success"}
                variant="filled"
                sx={{ width: "100%", top: 0 }}
              >
                {sendMessage}
              </Alert>
            </Snackbar>
          )}
          <Button
            variant="contained"
            size="large"
            type="submit"
            color={error ? "error" : "primary"}
            sx={{
              width: "100%",
            }}
          >
            {sending ? <CircularProgress color="inherit" /> : "Criar Usuário"}
          </Button>
        </>
      )}
    </Box>
  );
}
