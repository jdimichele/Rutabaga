import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.Rutabaga",
  appName: "Rutabaga",
  webDir: "dist",
  bundledWebRuntime: false,
  ios: {
    scheme: "Rutabaga",
  },
};

export default config;
