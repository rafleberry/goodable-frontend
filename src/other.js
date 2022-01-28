import Constants from "expo-constants";

const { manifest } = Constants;

const DJANGO_PORT = 8000;
export const BASE_API_URL = `http://${
  manifest.debuggerHost.split(":")[0]
}:${DJANGO_PORT}/api`;
