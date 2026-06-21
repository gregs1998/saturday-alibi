import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// NOTE: For a GitHub *project* page the site is served from
//   https://<user>.github.io/<repo>/
// so Vite must emit asset URLs under that sub-path. If you name the repo
// something other than "saturday-alibi", change BASE below to "/<your-repo>/".
// (For a user/org page or a custom domain served at the root, set BASE = "/".)
var BASE = "/saturday-alibi/";
export default defineConfig({
    base: BASE,
    plugins: [react()],
});
