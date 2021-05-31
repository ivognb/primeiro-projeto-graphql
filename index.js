const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    nome: String!
    idade: Int!
    email: String!
    id: ID!
  }

type Query{
    users: [User!]!
    getUserByEmail(email: String!): User!
}
type Mutation{
    createUser(
        nome: String!
        email: String!
    ): User!
}

`;

const users = [{
    nome: 'Ivo Gabriel', id: (Math.ceil(Math.random()*1000)), idade: 20, email: 'ivognb@hotmail.com',
},
]

const resolvers = {
    Query:{
        users: () => users,
        getUserByEmail:(_,args) => {
        return users.find((user) => user.email === args.email);
            },
        },
        Mutation:{
            createUser: (_, args) => {
                const newUser = {
                    id: (Math.ceil(Math.random()*1000)),
                    nome: args.nome,
                    email: args.email,
                };
                users.push(newUser);
                return newUser;
            
            }
        }
}


 const server = new ApolloServer({ resolvers, typeDefs })

server.listen().then(console.log('Servidor Rodando'))


 
