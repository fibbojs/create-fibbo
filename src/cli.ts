#!/usr/bin/env node
import process from "node:process";
import { intro, log, outro, spinner } from "@clack/prompts";
import { green, underline } from "ansis";
import { cac } from "cac";
import { version } from "../package.json";
import { type Options, resolveOptions } from "./options";

const cli = cac("create-fibbo");
cli.help().version(version);

cli
	.command("[...files]", "Create a Fibbo application", {
		ignoreOptionDefaultValue: true,
		allowUnknownOptions: true,
	})
	.option("-n, --name <name>", "Name of the application to create", {
		default: "./my-app",
	})
	.option("-t, --template <template>", "Available templates: 2d, 3d, module", {
		default: "default",
	})
	.action(async (input: string[], options: Options) => {
		// Start clack prompts
		intro(`Fibbo`);

		// Resolve the user options
		const resolvedOptions = await resolveOptions(options);

		const s = spinner();
		s.start("Cloning the template...");
		// Create the project
		const { create } = await import("./create");
		if (input.length > 0) options.name = input[0];
		await create(resolvedOptions);
		s.stop("Template cloned");

		// End clack prompts
		outro(
			`Done! Now run:\n` +
				`  ${green`cd ${resolvedOptions.name}`}\n` +
				`  ${green`npm install`}\n` +
				`  ${green`npm run build`}\n\n` +
				`For more information, visit: ${underline`https://fibbo.dev/`}`,
		);
	});

async function runCLI(): Promise<void> {
	cli.parse(process.argv, { run: false });

	try {
		await cli.runMatchedCommand();
	} catch (error) {
		log.error(String(error));
		process.exit(1);
	}
}

(async () => {
	await runCLI();
})().catch((error) => {
	log.error(String(error));
	process.exit(1);
});
