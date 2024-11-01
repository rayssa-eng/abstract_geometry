const prompt = require('prompt-sync')({ sigint: true });


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
  
function createVertice() {
    const x = parseFloat(prompt("Digitar coordenada x: "));
    const y = parseFloat(prompt("Digitar coordenada y: "));
    return new Vertice(x, y);
}

module.exports = Vertice;

if (require.main === module) {
    console.log("iniciando processo de criação de vértices...");

    const vertices = [];

    for (let i = 1; i <= 3; i++) {
        console.log(`criando vértice ${i}`);
        vertices.push(createVertice());
    }

    vertices.forEach((v, index) => {
        console.log(`vertice ${index + 1} criado em (${v.x}, ${v.y})`);
    });

    console.log(`v1 e v2 são iguais? ${vertices[0].equals(vertices[1]) ? "sim!" : "não!!"}`);
    console.log(`distância entre v1 e v3 é: ${vertices[0].distancia(vertices[2])}`);

    const x0v3 = vertices[2].x;
    const y0v3 = vertices[2].y;

    vertices[2].move(15, 85);
    console.log(`v3 foi de (${x0v3}, ${y0v3}) pra (${vertices[2].x}, ${vertices[2].y})`);
}




