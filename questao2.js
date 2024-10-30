const Vertice = require('./questao1');
const readline = require('readline');

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
        var equilatero = this.#v1.distancia(this.#v2) == this.#v2.distancia(this.#v3) && this.#v2.distancia(this.#v3) == this.#v1.distancia(this.#v3);
        var escaleno = this.#v1.distancia(this.#v2) != this.#v2.distancia(this.#v3) && this.#v2.distancia(this.#v3) != this.#v1.distancia(this.#v3);

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

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  async function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
  }
  
  async function createVertice() {
    const x = parseFloat(await askQuestion("Digite a coordenada x: "));
    const y = parseFloat(await askQuestion("Digite a coordenada y: "));
    return new Vertice(x, y);
  }
  
  async function createTriangulo() {
    console.log("Iniciando processo de criação de triângulos. Você precisará entrar com vértices.");
    
    const v1 = await createVertice();
    const v2 = await createVertice();
    const v3 = await createVertice();
    
    try {
      return new Triangulo(v1, v2, v3);
    } catch (error) {
      console.error("Erro ao criar triângulo:", error.message);
      return null;
    }
  }
  
  async function main() {
    const triangles = [];
    
    for (let i = 1; i <= 3; i++) {
      console.log(`\nCriando triângulo ${i}:`);
      const triangle = await createTriangulo();
      if (triangle) triangles.push(triangle);
    }
    
    console.log("\nTodos os triângulos foram criados:");
    triangles.forEach((tri, index) => {
      console.log(`Triangulo ${index + 1}:`);
      console.log("Tipo:", tri.tipo());
      console.log("Perímetro:", tri.perimetro);
      console.log("Área:", tri.area);
    });
    
    rl.close();
  }
  
  main();