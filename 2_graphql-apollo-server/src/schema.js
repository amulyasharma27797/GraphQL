import { gql } from "apollo-server-express";

// Defining the schema
const schema = gql`type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
    },

    type Mutation {
        createUser(data: CreateUserInput): User!
        updateUser(id: ID!, data: UpdateUserInput): User!
        deleteUser(id: ID!): User!
        createPost(data: CreatePostInput): Post!
        updatePost(id: ID!, data: UpdatePostInput!): Post!
        deletePost(id: ID!): Post!
        createComment(data: CreateCommentInput): Comment!
        updateComment(id: ID!, data: UpdateCommentInput!): Comment!
        deleteComment(id: ID!): Comment!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    },
    
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        posts: Post!
    }

    input CreateUserInput {
        name: String!
        email: String!
        age: Int
    }

    input UpdateUserInput {
        name: String
        email: String
        age: Int
    }

    input CreatePostInput {
        title: String!
        body: String!
        published: Boolean!
        author: ID!
    }

    input UpdatePostInput {
        title: String
        body: String
        published: Boolean
    }

    input CreateCommentInput {
        text: String!
        author: ID!
        post: ID!
    }

    input UpdateCommentInput {
        text: String
    }

    `

    export { schema as default }