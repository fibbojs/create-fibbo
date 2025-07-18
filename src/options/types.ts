/**
 * Options for the CLI.
 */
export interface Options {
	/**
	 * The name of the application.
	 * @default 'my-app'
	 */
	name?: string;
	/**
	 * The template to use.
	 * @default 'default'
	 */
	template?: "2d" | "3d" | "module";
}

export type ResolvedOptions = {
	/**
	 * The name of the application.
	 * @default 'my-app'
	 */
	name: string;
	/**
	 * The template to use.
	 * @default 'default'
	 */
	template: "2d" | "3d" | "module";
};
