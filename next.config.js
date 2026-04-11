/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import path from "path";
import { fileURLToPath } from "url";
import "./src/env.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import("next").NextConfig} */
const config = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  webpack(webpackConfig) {
    webpackConfig.resolve.alias["@content"] = path.join(__dirname, "src/content");
    return webpackConfig;
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter],
  },
});

export default withMDX(config);
