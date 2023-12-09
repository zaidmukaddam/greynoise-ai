# GreyNoise AI

This project is a web application that uses AI to get information about any IP address. It's powered by GreyNoise Enterprise API and OpenAI's GPT-4 Turbo x Function Calling.

## Getting Started

First, run the development server:

```sh
npm run dev
```
Open http://localhost:3000 with your browser to see the result.

### Dependencies

This project uses several dependencies, including:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Headless UI
- Heroicons
- Classnames
- Lodash
- OpenAI
- React Markdown
- React Textarea Autosize

## Contributing

The functions are stored in `utils/functions.ts`, the examples are stored in `utils/data.ts`, and the API calls are stored in `pages/api/generate.ts`.

To add new functions, open `utils/functions.ts`, do the following:

1. Create a new async function that takes in a string as a parameter and returns a promise.
2. Add the function to the switch statement in the `runFunction` function.
3. Then add the function to the `functions` array. The function should have the following properties:

- `name`: The name of the function
- `description`: A description of the function
- `parameters`: An array of objects with the following properties:
  - `name`: The name of the parameter
  - `type`: The type of the parameter
  - `description`: A description of the parameter

To add new examples, open `utils/data.ts` and add a new example to the `examples` array. The example should be simple text.