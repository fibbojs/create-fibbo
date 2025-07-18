import { downloadTemplate } from "giget";
import type { ResolvedOptions } from "./options";

/**
 * Create a Fibbo application.
 */
export async function create(options: ResolvedOptions): Promise<void> {
	// Clone the template from the repository
	await downloadTemplate(
		`gh:fibbojs/create-fibbo/templates/${options.template}`,
		{
			dir: options.name,
		},
	);
}
