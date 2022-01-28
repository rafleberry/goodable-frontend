import React, { useContext, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { AuthContext } from "../auth";

const LoginScreen = () => {
  const authContext = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      authContext.signIn({
        username,
        password,
      });
    } catch (e) {
      setIsLoading(false);
      setErrorMessage(JSON.stringify(e));
    }
  };

  return (
    <View>
      {isLoading && <Text>Loading...</Text>}
      <Text style={styles.spaced}>Login Here</Text>
      <Text style={styles.spaced}>Username:</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      <Text style={styles.spaced}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      <Button style={styles.spaced} title="Login" onPress={handleLogin} />
      <Text style={styles.spaced}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  spaced: {
    margin: 10,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    margin: 10,
    marginBottom: 20,
  },
});

export default LoginScreen;
