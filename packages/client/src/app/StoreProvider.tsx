"use client";
import mainStore, { tAppStore } from "@/libs/redux/store/index";
import { useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<tAppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = mainStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
