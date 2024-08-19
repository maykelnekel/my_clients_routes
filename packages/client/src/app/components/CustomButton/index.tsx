"use client";
import { ButtonHTMLAttributes } from "react";
import { Button } from "./styles";

export interface iCustomButton
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function CustomButton({ children, ...props }: iCustomButton) {
  return <Button {...props}>{children}</Button>;
}
