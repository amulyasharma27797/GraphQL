import uuidv4 from 'uuid/v4'

// Defining the mutations for various operations
const Mutation = {
    createUser(parent, args, { db }, info){
        // Checking if email already exists
        const emailTaken = db.users.some((user) => {
            return user.email === args.data.email
        })
        console.log(emailTaken)

        // Throwing an error if email exists
        if (emailTaken) {
            throw new Error('Email Taken!')
        }

        // Creating a user
        const user = {
            id: uuidv4(),
            ...args.data
        }
        
        //  Pushing the data into the db
        db.users.push(user)
        
        // Returning the user to playground
        return user
    },

    updateUser(parent, args, { db }, info) {
        // Another way of getting id & data from arguments
        const { id, data } = args
        
        // Finding the user in db
        const user = db.users.find((user) => {
             return user.id === id
        })

        // Raising an exception if user doesn't exists
        if (!user) {
            throw new Error("User not found!")
        }

        // Checking the type of email
        if (typeof data.email === 'string') {
            // Checking if email exists
            const emailTaken = db.users.some((user) => {
                 return user.email === data.email
            })
            
            // Raising error if email exists
            if (emailTaken) {
                throw new Error('Email Taken!')
            }

            // Updating the new email
            user.email = data.email
        }

        // Checking the type of name
        if (typeof data.name === 'string') {
            user.name = data.name
        }

        // Checking the type of age
        if (typeof data.age !== 'undefined') {
            user.age = data.age
        }

        // Returning the user
        return user
    },

    deleteUser(parent, args, { db }, info) {
        // Getting the index of the user
        const userIndex = db.users.findIndex((user) => {
            return user.id === args.id
        })

        // If findIndex() returns -1, it means user is not found
        if (userIndex == -1) {
            throw new Error('User not Found')
        }

        // splice() will remove the specified index one time
        const deletedUser = db.users.splice(userIndex, 1)

        // Updating the user specific posts
        db.posts = db.posts.filter((post) => {
            const match = post.author === args.id

            if (match) {
                db.comments = db.comments.filter((comment) => {
                    return comment.post !== post.id
                })
            }

            return !match
        })

        // Updating the user specific comments
        db.comments = db.comments.filter((comment) => {
            return comment.author !== args.id
        })

        // Returning the deleted user
        return deletedUser[0]
    },

    createPost(parent, args, { db }, info) {
        // Checking if user exists already or not
        const userExists = db.users.some((user) => {
            return user.id === args.data.author
        })

        // Throwing error if user exists
        if (!userExists) {
            throw new Error('User not found')
        }

        // Creating a new post
        const post = {
            id: uuidv4(),
            ...args.data
        }

        // Pushing the new post to the db
        db.posts.push(post)

        // Returning the newly generated post
        return post
    },

    updatePost(parent, args, { db }, info) {
        // Finding the post
        const post = db.posts.find((post) => {
            return post.id === args.data.id
        })

        // Throwing an error if post isn't found
        if (!post) {
            throw new Error ('Post not found')
        }

        // Checking type of title
        if (typeof args.data.title === 'string') {
            post.title = data.title
        }

        // Checking type of body
        if (typeof data.body === 'string') {
            post.body = data.body
        }
        
        // Checking type of published
        if(typeof data.published === 'boolean') {
            post.published = data.published
        }

        // Returning the post
        return post
    },

    deletePost(parent, args, { db }, info) {
        // Finding the index of the post
        const postIndex = db.posts.findIndex((post) => {
            return post.id === args.id
        })
        
        // Throwing error if post doesn't exists
        if (postIndex == -1) {
            throw new Error('Post does not exists.')
        }
        
        // Removing the post
        const [post] = db.posts.splice(postIndex, 1)
        
        // Updating the comments in the db
        db.comments = db.comments.filter((comment) => {
            return comment.posts !== args.id
        })

        // Returning the deleted post
        return post
    },

    createComment(parent, args, { db }, info) {
        // Checking if user and posts exists
        const userExists = db.users.some((user) => {
            return user.id === args.data.author
        })
        const postExists = db.posts.some((post) => {
            return post.id === args.data.post && post.published
        })

        // Raising error if user or post not found
        if(!userExists || !postExists) {
            throw new Error("Unable to find user and post")
        }

        // Creating new account
        const comment = {
            id: uuidv4(),
            ...args.data
        }

        // Pushing comment into db
        db.comments.push(comment)

        // Returning the comment added
        return comment
    },

    updateComment(parent, args, { db }, info) {
        // Finding the comment in db
        const comment = db.comments.find((comment) => {
            return comment.id === args.data.id
        })

        // Raising an error if comment not found
        if (!comment) {
            throw new Error("Comment not found")
        }

        // Checking the data type of comment text
        if (typeof data.text == 'string'){
            comment.text = data.text
        }

        // Returning the comment updated
        return comment
    },

    deleteComment(parent, args, { db }, info) {
        // Finding the index of the comment
        const commentIndex = db.comments.findIndex((comment) => {
            return comment.id === args.data.id
        })

        // Raising an error if comment not found
        if (commentIndex == -1) {
            throw new Error('Comment not found')
        }

        // Removing the comment
        const [deletedComment] = db.comments.splice(commentIndex, 1)

        // Returning the deleted comment
        return deletedComment
    }


}

export { Mutation as default }