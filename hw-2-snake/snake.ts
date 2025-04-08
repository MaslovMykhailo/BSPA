const GRID_SIZE = 10;

type SnakeCell = [number, number];
type Snake = Array<SnakeCell>;

import { LitElement, html, css, nothing,  } from 'lit';

class SnakeGame extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
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
  `;

  static override get properties() {
    return {
      gameOver: { type: Boolean, state: true, reflect: true },
      score: { type: Number, reflect: true },
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
      clearTimeout(this.interval);
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
            break;
          }
        }
        if (!bad) {
          this.fruit[0] = fruitX;
          this.fruit[1] = fruitY;
          break;
        }
      }
    } else {
      snake.shift();
    }

    this.score = snake.length;

    return gameOver;
  }

  private direction: 'ArrowUp' | 'ArrowRight' | 'ArrowDown' | 'ArrowLeft' =
    'ArrowRight';

  tick() {
    this.gameOver = this.moveSnake(this.snake, this.direction);
    if (this.gameOver) return;
    this.clear();
    this.drawSnake(this.snake);
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

  gameOver: boolean = false;

  score: number = this.snake.length;

  override firstUpdated() {
    super.firstUpdated(new Map());
    this.interval = setInterval(this.tick.bind(this), 200);
    this.drawSnake(this.snake);
  }

  makeRow(cols: number) {
    const cells = new Array(cols).fill(0).map((_) => html`<td></td>`);
    return html`<tr>
      ${cells}
    </tr>`;
  }

  makeTable(rows: number, cols: number) {
    return new Array(rows).fill(0).map((_) => this.makeRow(cols));
    // return html`<table>
    //   ${tableRows}
    // </table>`;
  }

  restartGame() {
    this.snake = [
      [4, 4],
      [4, 5],
      [5, 5],
    ];
    this.clear();
    this.drawSnake(this.snake);
    this.gameOver = false;
    this.firstUpdated();
  }

  override render() {
    const table = this.makeTable(GRID_SIZE, GRID_SIZE);
    return html`
      <div>High score: ${this.score}</div>
      <table ?blurry=${this.gameOver}>
        ${this.makeTable(GRID_SIZE, GRID_SIZE)}
      </table>
      ${this.gameOver
        ? html`<div @click=${this.restartGame}>Game Over</div>`
        : nothing}
    `;
  }
}

customElements.define('snake-game', SnakeGame);

declare global {
  interface HTMLElementTagNameMap {
    'snake-game': SnakeGame;
  }
}
