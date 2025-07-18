import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["./src/cli.ts"],
	platform: "node",
	dts: {
		isolatedDeclarations: true,
	},
	exports: true,
});
