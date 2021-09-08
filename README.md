# `phaser2-webpack`

> A boilerplate for games using Phaser 2 (CE) with TypeScript and Webpack.

<small>
  <em>by Fabio Y. Goto</em>
</small>

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

- `npm run start` or `yarn start` to run the project locally in development mode;
- `npm run build` or `yarn build` to build the project for production;

---

## Authors

See `AUTHORS.md` file for details.

---

## License

This projects is licensed under the `MIT License`. See `LICENSE.md` for details.

---

_&copy;2021 YUITI_
