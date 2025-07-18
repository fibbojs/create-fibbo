import { cancel, isCancel, select, text } from "@clack/prompts";
import type { Options, ResolvedOptions } from "./types";

export * from "./types";

/**
 * Resolve the user options and configs
 * @param options The user options
 * @returns The resolved options
 */
export async function resolveOptions(
	options: Options,
): Promise<ResolvedOptions> {
	// Resolve the name of the application
	let resolvedName: string | symbol;
	if (options.name !== undefined) {
		resolvedName = options.name;
	} else {
		resolvedName = (await text({
			message: "What is the name of your application ?",
			placeholder: "./my-app",
			initialValue: "./my-app",
		})) as string;
	}
	// Handle cancel
	if (isCancel(resolvedName)) {
		cancel("Operation cancelled.");
		process.exit(0);
	}

	// Resolve the template
	let resolvedTemplate: ResolvedOptions["template"];
	if (options.template !== undefined) {
		resolvedTemplate = options.template;
		if (!["2d", "3d", "module"].includes(resolvedTemplate)) {
			throw new Error(
				`Invalid template "${resolvedTemplate}". Available templates: 2d, 3d, module`,
			);
		}
	} else {
		resolvedTemplate = (await select({
			message: "Which template do you want to use?",
			options: [
				{ value: "2d", label: "2D" },
				{ value: "3d", label: "3D" },
				{ value: "module", label: "Module" },
			],
			initialValue: "default",
		})) as ResolvedOptions["template"];
	}
	// Handle cancel
	if (isCancel(resolvedTemplate)) {
		cancel("Operation cancelled.");
		process.exit(0);
	}

	// Return the resolved options
	return {
		name: resolvedName,
		template: resolvedTemplate,
	};
}
