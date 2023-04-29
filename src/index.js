
import { createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'

const usuarios = [
  {
    id: '100',
    nome: 'Jose',
    livros: [{
      id: '1',
      titulo: 'Effective Java',
      genero: "Técnico",
      edicao: 3,
      preco: 39.99
    },
    {
      id: '2',
      titulo: "Concrete Mathematics",
      genero: "Técnico",
      edicao: 1,
      preco: 89.99
    }
    ]
  },
  {
    id: '101',
    nome: 'Maria',
    livros: [{
      id: '5',
      titulo: 'Programming Challenges',
      genero: "Técnico",
      edicao: 1,
      preco: 39.99
    }]
  }]

const livros = [
  {
    id: '1',
    titulo: 'Effective Java',
    genero: "Técnico",
    edicao: 3,
    preco: 39.99
  },
  {
    id: '2',
    titulo: "Concrete Mathematics",
    genero: "Técnico",
    edicao: 1,
    preco: 89.99
  }
];

const schema = createSchema({
  typeDefs: `
    type Query {
      hello: String!
      name: String!
      id: ID!
      location: String!
      age: Int!
      ofAge: Boolean!
      salary: Float
      notas: [Int!]!
      bemVindo (nome: String): String!
      effectiveJava: Livro!
      adicionar(numeros: [Float!]!): Float!
      livros (precoMaximo: Float!): [Livro!]!
      usuarios: [Usuario!]
    }
    type Usuario {
      id: ID!,
      nome: String!,
      idade: Int!,
      livros: [Livro!]
    },
    type Livro {
      id: ID!
      titulo: String!
      genero: String!
      edicao: Int
      preco: Float
    }
  `,
  resolvers: {
    Query: {
      hello() {
        return "Minha primeira API GraphQL!"
      },
      name() {
        return "Ana"
      },
      id: () => "uma chave qualquer aqui",
      location: () => "Rua B, numero 1",
      age: () => 1,
      ofAge: () => true,
      salary: () => 400,
      effectiveJava() {
        return {
          id: '123456',
          titulo: 'Effective Java',
          genero: 'Técnico',
          edicao: 3,
          preco: 43.9
        }
      },
      bemVindo(parent, args, ctx, info) {
        // console.log("parent: " + JSON.stringify(parent));
        // console.log("args: " + JSON.stringify(args));
        // console.log(ctx);
        // console.log("info: " + JSON.stringify(info));
        return `Bem vindo ${args.nome ? args.nome : 'visitante'}`;
      },
      notas(parent, args, ctx, info) {
        return [10, 2, 7, 7, 8]
      },
      adicionar(parent, args, ctx, info) {
        return args.numeros.length === 0 ? 0 : args.numeros.reduce((ac, atual) => { return ac + atual; })
      },
      livros(parent, args, ctx, info) {
        return livros.filter((l) => {
          return l.preco <= args.precoMaximo
        });
      },
      usuarios() {
        return usuarios;
      }
    }
  }
})

const yoga = createYoga({
  schema: schema
})

const porta = 4000
const server = createServer(yoga)
server.listen(porta, () => console.log(`Servidor ok. Porta ${porta}.`))
