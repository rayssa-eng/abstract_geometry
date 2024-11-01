class Turma {
    #alunos;

    constructor(alunos = []) {
        this.#alunos = alunos;
    }

    get qtdAlunos() {
        return this.#alunos.length;
    }

    addAluno(aluno) {
        if (!(aluno instanceof Aluno)) {
            throw new Error("deve-se adicionar um objeto do tipo Aluno.");
        }

        const jaExiste = this.#alunos.some(a => a.matricula == aluno.matricula);

        if (!jaExiste) {
            this.#alunos.push(aluno);
            return true;
        } else {
            // console.log(`aluno com matricula ${aluno.matricula} ja consta na turma.`);
            return false;
        }
    }

    removerAluno(matricula) {
        this.#alunos = this.#alunos.filter(aluno => aluno.matricula !== matricula);
    }

    toTable() {
        console.log("--------------------------------------------------");
        console.log("Matricula    Nome                P1     P2     NF");
        console.log("--------------------------------------------------");

        this.#alunos.forEach(aluno => {
            const p1 = aluno.P1 !== null ? aluno.P1.toFixed(1) : "-";
            const p2 = aluno.P2 !== null ? aluno.P2.toFixed(1) : "-";
            const nf = aluno.NF().toFixed(1);

            console.log(`${aluno.matricula.toString().padEnd(12)} ${aluno.nome.padEnd(18)} ${p1.padEnd(6)} ${p2.padEnd(6)} ${nf}`);
        });

        console.log("--------------------------------------------------");
    }
}

class Aluno {
    #matricula;
    #nome;
    #P1;
    #P2;

    constructor(nome, matricula, P1 = null, P2 = null) {
        this.nome = nome;
        this.matricula = matricula;
        this.#P1 = P1;
        this.#P2 = P2;
    }

    get P1() {
        return this.#P1;
    }


    get P2() {
        return this.#P2;
    }

    set P1(nota) {
        this.#P1 = nota;
    }

    set P2(nota) {
        this.#P2 = nota;
    }

    NF() {
        if (this.#P1 === null && this.#P2 === null) return 0.0;
        
        const notaTotal = (this.#P1 || 0) + (this.#P2 || 0);
        const nProvas = [this.#P1, this.#P2].filter(nota => nota !== null).length;
        
        return notaTotal / nProvas;
    }

    
}

const aluno1 = new Aluno("Ana de Almeida", 12345, 8.0, 9.5);
const aluno2 = new Aluno("Bruno Carvalho", 23456, 7.0, null);
const aluno3 = new Aluno("Fernanda Abreu", 34567, null, 8.5);
const aluno4 = new Aluno("Joao Santos", 45678, null, null);
const aluno5 = new Aluno("Lucas Pereira", 56789, 6.5, 7.0);
const aluno6 = new Aluno("Alma Mater", 56789, 6.5, 7.0);

const turma = new Turma();
turma.addAluno(aluno1);
turma.addAluno(aluno2);
turma.addAluno(aluno3);
turma.addAluno(aluno4);
turma.addAluno(aluno5);
turma.addAluno(aluno6);

turma.toTable();