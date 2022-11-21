/**
 * main
 * ----------------------------------------------------------------------
 * Main game entry point.
 *
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */
import Info from '@/info.json';
import { Boot } from '@/game/states/boot';
import { Preload } from '@/game/states/preload';
import { Title } from '@/game/states/title';

/**
 * Main game instance.
 */
export default class Main extends Phaser.Game {
  /**
   * Main constructor.
   */
  constructor() {
    super(
      GAME_CANVAS_WIDTH,
      GAME_CANVAS_HEIGHT,
      Phaser.AUTO,
      GAME_CANVAS_ID,
      null,
      true,
      false
    );

    Main.setGameInfo();

    this.state.add(Boot.SCENE_KEY, Boot, false);
    this.state.add(Preload.SCENE_KEY, Preload, false);
    this.state.add(Title.SCENE_KEY, Title, false);

    this.state.start(Boot.SCENE_KEY);
  }

  /**
   * Sets game info on the page's HTML.
   *
   * @private
   */
  private static setGameInfo(): void {
    const header = document.querySelector('#header');
    header?.classList.add('game__header');

    const footer = document.querySelector('#footer');
    footer?.classList.add('game__footer');

    const data = document.querySelector('#info');
    data?.classList.add('game__info');

    if (header) {
      const title = document.createElement('h1');
      title.innerHTML = Info.name;

      const author = document.createElement('p');
      author.classList.add('game__author');
      author.innerHTML = `${Info.author}`;

      header.appendChild(title);
      header.appendChild(author);
    }

    if (data) {
      const description = document.createElement('p');
      description.classList.add('game__description');
      description.innerHTML = Info.description;

      const controls = document.createElement('ul');
      controls.classList.add('game__controls');

      for (let line of Info.controls) {
        let item = document.createElement('li');
        item.innerHTML = line;
        controls.appendChild(item);
      }

      data.appendChild(description);
      data.appendChild(controls);
    }

    if (footer) {
      const copy = document.createElement('p');
      copy.classList.add('game__copy');
      copy.innerHTML = `${Info.copyright}`;

      const repository = document.createElement('p');
      repository.classList.add('game__repository');

      const repositoryLink = document.createElement('a');
      repositoryLink.href = Info?.repository ?? '';
      repositoryLink.rel = 'noreferrer';
      repositoryLink.target = '_blank';
      repositoryLink.innerHTML = `<i class="fab fa-github"></i> GitHub`;

      if (typeof Info.repository !== 'undefined') {
        repository.appendChild(repositoryLink);
        footer.appendChild(repository);
      }
      footer.appendChild(copy);
    }
  }
}
