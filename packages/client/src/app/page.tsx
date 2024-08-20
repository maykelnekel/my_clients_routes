import { HomeScreen } from "./screens/HomeScreen/index";
import StoreProvider from "./StoreProvider";

export default function Home() {
  return (
    <StoreProvider>
      <HomeScreen />;
    </StoreProvider>
  );
}
