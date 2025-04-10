const GRID_SIZE = 10;

const MIN_SPEED = 300;
const MAX_SPEED = 50;
const SPEED_STEP = 10;

type SnakeCell = [number, number];
type Snake = Array<SnakeCell>;

import { LitElement, html, css, nothing,  } from 'lit';

class SnakeGame extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      position: relative;
      margin: auto;
    }

    td {
      width: 20px;
      height: 20px;
      box-sizing: border-box;
      border: 1px solid black;
    }

    table[blurry] {
      filter: blur(4px);
    }

    section {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      backdrop-filter: blur(4px);
      background-color: rgb(from lightgreen r g b / 0.4);
    }

    section[gameover] {
      background-color: rgb(from red r g b / 0.4);
      backdrop-filter: blur(4px);
    }
  `;

  static override get properties() {
    return {
      gameStarted: { type: Boolean, state: true },
      gameOver: { type: Boolean, state: true },
      score: { type: Number },
      speed: { type: Number },
    }
  }

  get table() {
    return this.renderRoot.querySelector('table');
  }

  get rows() {
    return this.renderRoot.querySelectorAll('tr');
  }

  get cells() {
    return this.renderRoot.querySelectorAll('td');
  }

  draw(x: number, y: number, color: string) {
    const row = this.rows[this.rows.length - y - 1];
    const cells = Array.from(row.querySelectorAll('td'));
    cells[x].style.backgroundColor = color;
  }

  clear() {
    this.cells.forEach((td) => (td.style.backgroundColor = ''));
  }

  private snake: Snake = [
    [4, 4],
    [4, 5],
    [5, 5],
  ];

  drawSnake(snake: Snake) {
    for (let i = 0; i < snake.length - 1; i++) {
      this.draw(...snake[i], 'lightgreen');
    }
    this.draw(...snake.at(-1)!, 'green');
  }

  private fruit: SnakeCell = [3, 3];

  moveSnake(
    snake: Snake,
    direction: 'ArrowUp' | 'ArrowRight' | 'ArrowDown' | 'ArrowLeft'
  ) {
    const [x, y] = snake.at(-1)!;
    let newHead: SnakeCell;
    switch (direction) {
      case 'ArrowUp':
        newHead = [x, y + 1];
        break;
      case 'ArrowRight':
        newHead = [x + 1, y];
        break;
      case 'ArrowDown':
        newHead = [x, y - 1];
        break;
      case 'ArrowLeft':
        newHead = [x - 1, y];
        break;
    }

    const [newX, newY] = newHead;

    let gameOver = false;
    if (newX >= GRID_SIZE || newX < 0 || newY >= GRID_SIZE || newY < 0) {
      gameOver = true;
    }

    for (let i = 1; i < snake.length; i++) {
      const [x, y] = snake[i];
      if (x === newX && y === newY) {
        gameOver = true;
        break;
      }
    }

    if (gameOver) {
      console.log('Game over');
      clearInterval(this.interval);
    }

    snake.push(newHead);

    if (newHead[0] === this.fruit[0] && newHead[1] === this.fruit[1]) {
      let stop = false;
      while (!stop) {
        const fruitX = Math.floor(Math.random() * GRID_SIZE);
        const fruitY = Math.floor(Math.random() * GRID_SIZE);
        let bad = false;
        for (const [x, y] of snake) {
          if (x === fruitX || y === fruitY) {
            bad = true;
            console.log({bad})
            break;
          }
        }
        if (!bad) {
          this.fruit[0] = fruitX;
          this.fruit[1] = fruitY;
          break;
        }
      }

      this.speed = Math.max(this.speed - SPEED_STEP, MAX_SPEED);

      clearInterval(this.interval);
      this.interval = setInterval(this.tick.bind(this), this.speed);
    } else {
      snake.shift();
    }

    this.score = snake.length;

    return gameOver;
  }

  private direction: 'ArrowUp' | 'ArrowRight' | 'ArrowDown' | 'ArrowLeft' =
    'ArrowUp';

  tick() {
    this.gameOver = this.moveSnake(this.snake, this.direction);
    
    this.clear();
    this.drawSnake(this.snake);

    if (this.gameOver) return;
  
    this.draw(...this.fruit, 'red');
  }

  override connectedCallback() {
    super.connectedCallback();
    document.body.addEventListener('keydown', (event) => {
      console.log(event);
      if (
        (event.key === 'ArrowUp' && this.direction !== 'ArrowDown') ||
        (event.key === 'ArrowRight' && this.direction !== 'ArrowLeft') ||
        (event.key === 'ArrowDown' && this.direction !== 'ArrowUp') ||
        (event.key === 'ArrowLeft' && this.direction !== 'ArrowRight')
      ) {
        console.log('Changing event', event.key);
        this.direction = event.key as any;
      }
    });
  }

  private interval: number | undefined;

  private gameStarted: boolean = false;

  private gameOver: boolean = false;

  get gameActive() {
    return this.gameStarted && !this.gameOver;
  }

  private score: number = this.snake.length;

  private speed: number = MIN_SPEED;

  makeRow(cols: number) {
    const cells = new Array(cols).fill(0).map((_) => html`<td></td>`);
    return html`<tr>
      ${cells}
    </tr>`;
  }

  makeTable(rows: number, cols: number) {
    return new Array(rows).fill(0).map((_) => this.makeRow(cols));
  }
  
  makeScore() {
    return html`
      <p>Score: ${this.score} | Speed: ${this.speed}</p>
    `;
  }

  makeMenu() {
    if (this.gameOver) {
      return html`
        <section gameover>
          <h3>Game over</h3>
          ${this.makeScore()}
          <button @click=${this.restartGame}>Restart</button>
        </section>
      `
    }

    if (!this.gameStarted) {
      return html`
        <section>
          <button @click=${this.startGame}>Start</button>
        </section>
      `;
    }

    return nothing
  }

  startGame() {
    this.gameStarted = true;
    this.interval = setInterval(this.tick.bind(this), this.speed);
    this.drawSnake(this.snake);
  }

  restartGame() {
    this.snake = [
      [4, 4],
      [4, 5],
      [5, 5],
    ];
    this.clear();
    this.drawSnake(this.snake);
    this.speed = MIN_SPEED;
    this.direction = 'ArrowUp';
    this.gameOver = false;
    this.startGame();
  }

  override render() {
    return html`
      <table ?blurry=${!this.gameActive}>
        ${this.makeTable(GRID_SIZE, GRID_SIZE)}
      </table>
      ${this.gameActive ? this.makeScore() : nothing}
      ${this.makeMenu()}
    `;
  }
}

customElements.define('snake-game', SnakeGame);

declare global {
  interface HTMLElementTagNameMap {
    'snake-game': SnakeGame;
  }
}
