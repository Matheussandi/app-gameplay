import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useAth } from "../hooks/auth";

import { SignIn } from "../screens/SignIn";
import { AppRoutes } from "./app.routes";

export function Routes() {
    const { user } = useAth();

    return(
        <NavigationContainer>
            { user.id ? <AppRoutes/> : <SignIn />  }
        </NavigationContainer>
    )
}