import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  include: [
    "@chakra-ui/react",
    "@emotion/react",
    "@emotion/styled",
    "framer-motion",
  ],
});
