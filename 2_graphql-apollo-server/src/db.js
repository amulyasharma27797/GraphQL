// Demo user data
const users = [{
    id: '1',
    name: 'Amulya',
    email: 'a@b.com',
    age: 22
}, {
    id: '2',
    name: 'Aman',
    email: 'b@c.com',
}]

// Demo post data
const posts = [{
    id: '1',
    title: 'Post1',
    body: 'Body Post1',
    published: true,
    author: '1',
}, {
    id: '2',
    title: 'Post2',
    body: 'Body Post2',
    published: false,
    author: '2',
},{
    id: '3',
    title: 'Post3',
    body: 'Body Post3',
    published: false,
    author: '1',
}
]

// Demo comments data
const comments = [{
    id: 'C1',
    text: "Comment1",
    author: '1',
    post: '1'
}, {
    id: "C2",
    text: "Comment2",
    author: '1',
    post: '1'
}, {
    id: "C3",
    text: "Comment3",
    author: '2',
    post: '2'
}, {
    id: "C4",
    text: "Comment4",
    author: '2',
    post: '2'
}]


const db = {
    users,
    posts,
    comments
}

// Exporting the db as a default
export { db as default }