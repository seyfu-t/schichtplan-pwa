import astro from "eslint-plugin-astro";

export default [
	...astro.configs["flat/recommended"],
	...astro.configs["flat/jsx-a11y-strict"],
	{
		files: ["**/*.astro"],
		rules: {
			"astro/no-set-text-directive": "error",
			"astro/no-unused-css-selector": "error",
			"astro/prefer-class-list-directive": "error",
		},
	},
];
