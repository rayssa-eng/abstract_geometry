const Vertice = require('./questao1');
const prompt = require('prompt-sync')();

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

      var essesVertices = [this.#v1, this.#v2, this.#v3];
      var outrosVertices = [outroTriangulo.#v1, outroTriangulo.#v2, outroTriangulo.#v3];

      var checarIgualdade = essesVertices.every(esseVertice => 
          outrosVertices.some(outroVertice => esseVertice.equals(outroVertice))
      ); 
      
      return checarIgualdade;
  }

  get perimetro() {
      var a = this.#v1.distancia(this.#v2);
      var b = this.#v1.distancia(this.#v3);
      var c = this.#v2.distancia(this.#v3);

      return this.#v1.distancia(this.#v2) + this.#v2.distancia(this.#v3) + this.#v3.distancia(this.#v1); 
  }

  get area() {
      var a = this.#v1.distancia(this.#v2);
      var b = this.#v1.distancia(this.#v3);
      var c = this.#v2.distancia(this.#v3);

      var S = (a + b + c) / 2;    

      var area = Math.sqrt(S * (S - a) * (S - b) * (S - c));
      
      return area;
  }

  tipo() {
    var equilatero = this.#v1.distancia(this.#v2) == this.#v2.distancia(this.#v3) == this.#v1.distancia(this.#v3);
    var escaleno = this.#v1.distancia(this.#v2) != this.#v2.distancia(this.#v3) != this.#v1.distancia(this.#v3);

    if (equilatero) {
        return "esse triangulo é equilatero";
    } else if (escaleno) {
        return "esse triangulo é escaleno";
    } else {
        return "esse triangulo é isosceles";
    }
  }

  clone() {
      var clone = new Triangulo(this.#v1, this.#v2, this.#v3);

      return clone;
  }
}

function askForVertice(index) {
  const x = parseFloat(prompt(`digite coordenada x pro vértice v${index}: `));
  const y = parseFloat(prompt(`digite coordenada y pro vértice v${index}: `));
  return new Vertice(x, y);
}

function createTriangle(triangleIndex) {
  console.log(`\ncriando triângulo ${triangleIndex}:`);
  
  const v1 = askForVertice(1);
  const v2 = askForVertice(2);
  const v3 = askForVertice(3);

  try {
    const triangle = new Triangulo(v1, v2, v3);
    return triangle;
  } catch (error) {
    console.error("erro ao criar triângulo:", error.message);
    return null;
  }
}

if (require.main === module) {
  
  
  const triangles = [];
  
  for (let i = 1; i <= 3; i++) {
    const triangle = createTriangle(i);
    if (triangle) triangles.push(triangle);
  }
  
  triangles.forEach((triangle, index) => {
    console.log(`\ntriângulo ${index + 1}:`);
    console.log(`  do tipo: ${triangle.tipo()}`);
    console.log(`  com perímetro: ${triangle.perimetro}`);
    console.log(`  e área: ${triangle.area}`);
  });
}