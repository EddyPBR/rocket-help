import type { FC } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { SignIn } from "../screens/SignIn";

export const Routes: FC = () => {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
};
