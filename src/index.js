
import { createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'

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
      salary: () => 400
    }
  }
})

const yoga = createYoga({
  schema: schema
})

const porta = 4000
const server = createServer(yoga)
server.listen(porta, () => console.log(`Servidor ok. Porta ${porta}.`))
