
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
    }]
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
  }
]

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
      adicionarNumeros(numeros: [Float!]): Float!
      hello: String!
      name: String!
      id: ID!
      location: String!
      age: Int!
      ofAge: Boolean!
      salary: Float
      EffectiveJava: Livro!
      boasVindas (nome: String): String!
      notas: [Int!]!
      livros(precoMaximo: Float!): [Livro!]!
      usuarios: [Usuario!]
    }
    type Usuario {
      id: ID!
      nome: String
      idade: Int
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
      hello(){
        return "Minha primeira API GraphQL!"
      },
      name(){
        return "Ana"
      },
      id: () => "uma chave qualquer aqui",
      location: () => "Rua B, numero 1",
      age: () => 1,
      ofAge: () => true,
      salary: () => 400,
      EffectiveJava () {
        return {
          id: '123456',
          titulo: 'Effective Java',
          genero: 'Linguagem de Programacao',
          edicao: 4,
          preco: 112.50
        }
      },
      boasVindas(parent, args, ctx, info) {
        // console.log ("parent: " + JSON.stringify(parent))
        // console.log ("ags: " + JSON.stringify(args))
        // console.log ("ctx: " + ctx)
        // console.log ("info: " + JSON.stringify(info))
        return `Bem-vindo ao mundo do desenvolvimento, ${args.nome? args.nome : 'visitante'}`
      },
      notas(parent, args, ctx, info) {
        return [1, 2, 3, 4]
      },
      adicionarNumeros (parent, args, ctx, info) {
        return args.numeros.length === 0 ? 0 :
          args.numeros.reduce((ac, atual) => {return ac + atual})
      },
      livros (parent, args, ctx, info) {
        return livros.filter((l) => {
          return l.preco <= args.precoMaximo
        })
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
