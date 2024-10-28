const Vertice = require('./Vertice');

class Triagulo {
    #v1;
    #v2;
    #v3;

    constructor (v1, v2, v3) {
        this.#v1 = v1;
        this.#v2 = v2;
        this.#v3 = v3;

        if (v1 === v2 || v1 === v3 || v2 === v3) {
            throw new Error("vértices não formam triângulo.")
        }
    }
}