# Phaser CE Base

> A boilerplate for games using Phaser CE with TypeScript and Webpack.

<small>
  <em>by Fabio Y. Goto</em>
</small>

It's been on my mind for quite some time to have a boilerplate to make games with TypeScript and Phaser, but I never had an idea on how to build it. This is my take on that, pretty opinionated btw.

There are no example of complex scenes and objects, just a simple boilerplate to render a Phaser canvas, with some elements as example.

All imports from `src` are absolute, including media files, images and others, so it's fairly easy to start coding!

> **DISCLAIMER**:
> 
> The images and sound files in this project come from my _Ludum Dare 42/LOWREZJAM 2018 game_, found [**over here**](https://github.com/yuigoto/ludumdare-42).

---

## Features

- Uses Phaser CE;
- Modules!;
- Latest version of TypeScript (as of now) and a nice `tsconfig.json` for your Intellisense pleasure;
- Uses Webpack 5 for bundling;
- SCSS/SASS for styling;
- Automatically fills game information on the HTML (as long as you provide'em on the `info.json` file) and inside `meta` tags too (also some `og` tags);
- Resolves all your absolute imports so you can import images, audio and data directly from TypeScript (because I'm far too lazy to remember `../../../../../../../../data`);
- FontAwesome Free for some icons, fonts are imported right into your build folder;

---

## Requirements

- `node` (**`v14.x.x`**);

See `package.json` for all dependencies on this project.

---

## How To

Clone or fork this repository, then run `npm install` or `yarn` to install all dependencies. After that, you can:

- `npm run dev` or `yarn dev` to run the project locally in development mode;
- `npm run build` or `yarn build` to build the project for production;

---

## Structure

This is a pretty opinionated project structure that works for me, but you might want to change it, so here's some description of how everything's placed.

```
/
|-- public/               # Contains static assets that are 'just copied' during build
|   |-- index.html        # Index file with template tags
|   |-- preview.png       # Preview image
|   |-- favicon.ico       # Does this need any description at all?
|
|-- src/                  # Application source folder
|   |-- assets/           # Assets that are imported from TS should be placed in here
|   |   |-- audio/
|   |   |-- data/
|   |   |-- img/
|   |
|   |-- core/             # Core utilities and stuff
|   |   |-- interfaces/   # Interfaces folder
|   |   |-- types/        # Types folder
|   |   |-- utils/        # I usually have a global utilities module just because 🤷‍♀️
|   |   |-- main.ts       # Main game class
|   |
|   |-- index.ts          # Application entry point
|   |-- info.json         # Application information/description file
|
|-- scenes/               # Place all your game scenes in here
|
|-- .env                  # Environment variables for the application
|-- global.d.ts           # Global constants and module declarations
|-- package.json          # Your good old 📦
|-- tsconfig.json         # TypeScript configuration file
|-- webpack.config.js     # Webpack configuration file
```

_After building or during development, all content will be placed on the generated `build` directory._

--- 

## Authors

See `AUTHORS.md` file for details.

--- 

## License

This projects is licensed under the `MIT License`. See `LICENSE.md` for details.

---

_&copy;2021 YUITI_
