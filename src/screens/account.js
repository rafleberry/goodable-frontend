import React, { useContext } from "react";
import { Button } from "react-native";
import { AuthContext } from "../auth";

export default function Account() {
  const authContext = useContext(AuthContext);

  return <Button onPress={authContext.signOut} title="Sign Out" />;
}
