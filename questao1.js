const readline = require('readline');

class Vertice {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x; 
        this.#y = y;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    set x(valor) {
        this.#x = valor;
    }

    set y(valor) {
        this.#y = valor;
    }

    distancia(outroVertice) { 
        const dx = outroVertice.x - this.#x;
        const dy = outroVertice.y - this.#y;

        return Math.sqrt(dx * dx + dy * dy);
    }

    move(xNovo, yNovo) {
        this.#x = xNovo;
        this.#y = yNovo;
    }

    equals(outroVertice) {
        if (this.#x === outroVertice.x && this.#y === outroVertice.y) {
            return true;
        } else {
            return false;
        }
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const vertices = [];

function criarVertices(index) {
    if (index < 3) {
      rl.question(`Digitar coordenada x do vértice ${index + 1}: `, (x) => {
        rl.question(`Digitar coordenada y do vértice ${index + 1}: `, (y) => {
          const novoVertice = new Vertice(parseFloat(x), parseFloat(y));
          vertices.push(novoVertice);
          console.log(`Novo vértice criado em (${novoVertice.x}, ${novoVertice.y})`);
          criarVertices(index + 1);
        });
      });
    } else {
        rl.close();

        if (vertices.length == 3) {
            console.log(`v1 e v2 são iguais? ${vertices[0].equals(vertices[1]) ? "sim!" : "não!!"}`);
            console.log(`distância entre v1 e v3 é: ${vertices[0].distancia(vertices[2])}`);

            x0v3 = vertices[2].x;
            y0v3 = vertices[2].y;

            vertices[2].move(15, 85);
            console.log(`v3 foi de (${x0v3}, ${y0v3}) pra (${vertices[2].x}, ${vertices[2].y})`);
        }
    }
}
  
criarVertices(0);

module.exports = Vertice;



