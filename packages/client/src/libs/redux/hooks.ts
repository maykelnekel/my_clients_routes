import { useDispatch, useSelector, useStore } from "react-redux";
import type { tRootState, tAppDispatch, tAppStore } from "./store";

export const useAppDispatch = useDispatch.withTypes<tAppDispatch>();
export const useAppSelector = useSelector.withTypes<tRootState>();
export const useAppStore = useStore.withTypes<tAppStore>();
