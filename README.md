# `phaser2-webpack`

> Boilerplate for games using Phaser CE and Webpack 5.

> **:warning: DISCLAIMER**
> 
> The images and sounds in this project come from my _Ludum Dare 42/LOWREZJAM 
> 2018 game_, found [**here**](https://github.com/yuigoto/ludumdare-42). As 
> such, I own the rights to them and they are not free to use. If you want to 
> use this project as a base for your own game, please replace/remove the 
> images and sounds with your own.

---

## Requirements

- [**Node.js**](https://nodejs.org/en/) (v16.13 or higher)	

---

## How To

Clone or fork this repository, run `npm install` (or `yarn`) to install all 
dependencies. After that, run any of these commands:

- `npm run dev` (or `yarn dev`) to start the local development server with hot 
  reloading;
- `npm run build` (or `yarn build`) to build the project for production;
- `npm run serve` (or `yarn serve`) to serve the production build locally;

---

## Project Structure

The project structure might look a little bit strange and wonky, but that's what 
worked best for me. The important thing to point is on the diagram below:

```yaml
- public/
  - index.html
  - favicon.ico
  - preview.png
- src/
  - assets/ <------------ Contains all asset files, loaded by '/game/assets'
    - audio/
    - data/
    - fonts/
    - img/
    - scss/
  - core/
    - constants/
    - entities/
    - interfaces/
    - types/
    - utils/
  - game/
    - assets/ <---------- Contains all game asset objects loading from `/assets`
      - atlas/
      - audio/
      - image/
      - sound/
      - spritesheet/
      - tilemap/
    - config/
    - scenes/
  - index.ts
  - info.json <---------- Contains game information, used by `/game/config`
  - main.ts
```

---

## Authors

See `AUTHORS.md` for more information.

---

## License

This project is licensed under the `MIT License`. See the `LICENSE.md` file for details.

---

_&copy;2021-2022 Fabio Y. Goto_
