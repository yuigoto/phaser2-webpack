import Info from "info.json";
import Boot from "states/Boot";
import { Preload } from "states/Preload";
import { Title } from "states/Title";

/**
 * core/Main
 * ----------------------------------------------------------------------
 * Main game class, bootstraps the game and its scenes.
 *
 * Also responsible for filling game information on the HTML.
 *
 * @since 0.0.1
 */
export default class Main extends Phaser.Game {
  /**
   * constructor.
   */
  constructor () {
    super(
      GAME_CANVAS_WIDTH || 640,
      GAME_CANVAS_HEIGHT || 360,
      Phaser.AUTO,
      GAME_CANVAS_ID,
      null,
      true,
      false
    );

    Main.setGameInfo();

    this.state.add("Boot", Boot, false);
    this.state.add("Preload", Preload, false);
    this.state.add("Title", Title, false);

    this.state.start("Boot");
  }

  /**
   * Fills up game information on the page's HTML.
   *
   * @private
   */
  private static setGameInfo (): void {
    const header = document.querySelector("#header");
    const footer = document.querySelector("#footer");
    const data = document.querySelector("#info");

    const title = document.createElement("h1");
    title.innerHTML = Info.name;

    const author = document.createElement("p");
    author.classList.add("author");
    author.innerHTML = Info.author;

    if (header) {
      header.appendChild(title);
      header.appendChild(author);
    }

    const description = document.createElement("p");
    description.classList.add("description");
    description.innerHTML = Info.description;

    const controls = document.createElement("ul");
    controls.classList.add("controls");

    for (let line of Info.controls) {
      let item = document.createElement("li");
      item.innerHTML = line;
      controls.appendChild(item);
    }

    if (data) {
      data.appendChild(description);
      data.appendChild(controls);
    }

    const copy = document.createElement("p");
    copy.classList.add("copy");
    copy.innerHTML = Info.copyright;

    const repository = document.createElement("p");
    repository.classList.add("repository");
    repository.innerHTML = `<a href="${Info.repository}" target="_blank"><i class="fab fa-github"></i> GitHub</a>`;

    if (footer) {
      if (typeof Info.repository !== "undefined") {
        footer.appendChild(repository);
      }
      footer.appendChild(copy);
    }
  }
}
