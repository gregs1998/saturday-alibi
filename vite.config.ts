import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// NOTE: For a GitHub *project* page the site is served from
//   https://<user>.github.io/<repo>/
// so Vite must emit asset URLs under that sub-path. If you name the repo
// something other than "saturday-alibi", change BASE below to "/<your-repo>/".
// (For a user/org page or a custom domain served at the root, set BASE = "/".)
//
// This site is served at the root of a custom domain (see public/CNAME), so
// assets must be emitted at "/...". A sub-path base here would 404 every asset
// and render a white screen.
const BASE = "/";
export default defineConfig({
  base: BASE,
  plugins: [react()],
});
