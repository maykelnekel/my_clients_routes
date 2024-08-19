import { FieldError } from "react-hook-form";
import { Error, InputContainer, Input } from "./styles";
import { InputHTMLAttributes } from "react";

interface iInput extends InputHTMLAttributes<HTMLInputElement> {
  fieldError?: FieldError;
  error: boolean;
}

export function CustomInput({
  error,
  fieldError,
  ...props
}: iInput): JSX.Element {
  return (
    <InputContainer>
      <Input {...props} onChange={() => (error = false)} />
      {error && fieldError && <Error>{fieldError.message}</Error>}
    </InputContainer>
  );
}
