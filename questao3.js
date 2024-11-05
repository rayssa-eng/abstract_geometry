const Vertice = require('./questao1');
const prompt = require('prompt-sync')();

class Poligono {
    #vertices;
    
    constructor(vertices = []) {
        if (vertices.length < 3) {
            throw new Error("o número mínimo de vértices para a criação do polígono é 3");
        }

        this.#vertices = vertices;
    }

    addVertice(v) {
        if (!(v instanceof Vertice)) {
            throw new Error("deve-se adicionar um objeto do tipo Vertice.");
        }

        if (!(this.#vertices.includes(v))) {
            this.#vertices.push(v);
            return true;
        } else {
            return false;
        }
    }
    
    get perimetro() {
        let perimetro = 0;

        for (let i = 0; i < this.#vertices.length - 1; i++) {
            perimetro += this.#vertices[i].distancia(this.#vertices[i + 1]);
        }

        perimetro += this.#vertices[this.#vertices.length - 1].distancia(this.#vertices[0]);

        return perimetro;
    }

    get qtdVertices() {
        return this.#vertices.length;
    }

}

function createPolygon() {
    const vertices = [];
    
    let numVertices = parseFloat(prompt(`quantos vertices vai ter seu poligono? (minimo 3) `));

    if (numVertices >= 3) {
        console.log(`digite as coordenadas para ao menos ${numVertices} vertices: `);
    } else {
        do {
            numVertices = parseFloat(prompt(`quantos vertices vai ter seu poligono? (minimo 3) `));
        } while (numVertices < 3);
        
    }

    for (let i = 0; i < numVertices; i++) {
        const x = parseFloat(prompt(`digite a coordenada x do vértice ${i + 1}: `));
        const y = parseFloat(prompt(`digite a coordenada y do vértice ${i + 1}: `));
        vertices.push(new Vertice(x, y));
    }

    const polygon = new Poligono(vertices);

    let addMore = prompt("quer adicionar mais vértices? (sim/nao): ").toLowerCase();
    while (addMore === 'sim') {
        const x = parseFloat(prompt("dê a coordenada x: "));
        const y = parseFloat(prompt("dê a coordenada y: "));
        const newVertice = new Vertice(x, y);

        if (polygon.addVertice(newVertice)) {
            console.log(`vértice em (${x}, ${y}) adicionado.`);
        } else {
            console.log("esse vértice já existe no polígono.");
        }
        addMore = prompt("quer adicionar outro vértice? (sim/nao): ").toLowerCase();
    }

    console.log(`polígono criado com ${polygon.qtdVertices} vértices.`);
    console.log(`perímetro do polígono: ${polygon.perimetro}`);
}

if (require.main === module) createPolygon();