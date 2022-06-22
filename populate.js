import express from 'express'
import { LoremIpsum } from "lorem-ipsum";

const np = 30000
const posts = []

for (let i = 1; i < np; i++) {
   
      posts.push({id: i})
}

const comments = []

const nc = 100000

for (let i = 1; i < nc; i++) {
    const lorem = new LoremIpsum({
        sentencesPerParagraph: {
          max: 3,
          min: 1
        },
        wordsPerSentence: {
          max: 2,
          min: 1
        }
      });
      comments.push({postId: (Math.random() * (np -0) + 0).toFixed(0), body: lorem.generateSentences(1)})
}

const api = express()

api.get("/posts", (req, res) => {
    return res.json(posts)
})

api.get("/comments", (req, res) => {
    return res.json(comments)
})

api.listen(3000, () => console.log("Server is running on port 3000"))