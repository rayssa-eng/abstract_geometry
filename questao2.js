const Vertice = require('./Vertice');

class Triangulo {
    #v1;
    #v2;
    #v3;
  
    constructor (v1, v2, v3) {
      if (!(v1 instanceof Vertice) || !(v2 instanceof Vertice) || !(v3 instanceof Vertice)) {
        throw new Error("todos os argumentos devem ser do tipo Vertice.");
      }
  
      if (v1 === v2 || v1 === v3 || v2 === v3) {
          throw new Error("esses vértices não formam um triângulo.")
      }
  
        this.#v1 = v1;
        this.#v2 = v2;
        this.#v3 = v3;
  
    }

    get v1() { return this.#v1; }
    get v2() { return this.#v2; }
    get v3() { return this.#v3; }

    set v1(v1) { this.v1 = v1; }
    set v2(v2) { this.v2 = v2; }
    set v3(v3) { this.v3 = v3; }
  
    equals(outroTriangulo) {
        if (!(outroTriangulo instanceof Triangulo)) throw new Error("objeto de comparacao nao é um triangulo.");

        essesVertices = [this.#v1, this.#v2, this.#v3];
        outrosVertices = [outroTriangulo.#v1, outroTriangulo.#v2, outroTriangulo.#v3];

        var checarIgualdade = essesVertices.every(esseVertice => 
            outrosVertices.some(outroVertice => esseVertice.equals(outroVertice))
        ); 
        
        return checarIgualdade;
    }

    get perimetro() {
        return this.#v1.distancia(this.#v2) + this.#v2.distancia(this.#v3) + this.#v3.distancia(this.#v1); 
    }

    tipo() {

        var isosceles = this.#v1.distancia(this.#v2) == this.#v2.distancia(this.#v3) || this.#v1.distancia(this.#v3) == this.#v1.distancia(this.#v2) || this.#v2.distancia(this.#v3) == this.#v1.distancia(this.#v3);
        var equilatero = this.#v1.distancia(this.#v2) == this.#v2.distancia(this.#v3) == this.#v1.distancia(this.#v3);
        var escaleno = this.#v1.distancia(this.#v2) != this.#v2.distancia(this.#v3) != this.#v1.distancia(this.#v3);

        if (isosceles) {
            return "esse triangulo é isosceles";
        } else if (equilatero) {
            return "esse triangulo é equilátero";
        } else {
            return "esse triangulo é escaleno";
        }
    }

    clone() {
        var clone = new Triangulo(this.#v1, this.#v2, this.#v3);

        return clone;
    }
    
  }