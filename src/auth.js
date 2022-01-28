import { createContext, useEffect, useMemo, useReducer } from "react";
import * as SecureStore from "expo-secure-store";
import { BASE_API_URL } from "./other";

export const AuthContext = createContext();

export function useAuth() {
  const [authState, dispatch] = useReducer(
    (_prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            isLoading: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            isLoading: false,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      userToken: null,
    }
  );

  useEffect(() => {
    const checkForUserToken = async () => {
      let userToken;
      try {
        userToken = await SecureStore.getItemAsync("userToken");
      } catch (e) {
        // no token
      }
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    checkForUserToken();
  }, []);

  const authContext = useMemo(
    () => ({
      userToken: authState.userToken,
      signIn: async ({ username, password }) => {
        // send to Django to authenticate
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        const resp = await fetch(`${BASE_API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });
        if (resp.ok) {
          const { token } = await resp.json();
          SecureStore.setItemAsync("userToken", token);
          dispatch({ type: "SIGN_IN", token });
        } else {
          // login failed
          throw "Login failed: " + JSON.stringify(resp);
        }
      },
      // don't we also need to clear out the secure storage?
      signOut: () => {
        SecureStore.deleteItemAsync("userToken");
        dispatch({ type: "SIGN_OUT" });
      },
    }),
    [authState.userToken]
  );

  return [authState, authContext];
}
