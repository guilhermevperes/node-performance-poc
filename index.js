import axios from "axios";
import fs from 'fs'
import { Parser } from 'json2csv'

const promises = [axios.get("http://localhost:3000/posts"), axios.get("http://localhost:3000/comments")]

await Promise.all(promises).then(async ([postsResponse, commentsResponse]) => {
    console.time("start")
    const commentsData = commentsResponse.data
    const postData = postsResponse.data 
    
    const comments = {}

    commentsData.forEach(item => {
        if(!comments[item.postId]) {
            comments[item.postId] = [item.body]
        } else {
            comments[item.postId].push(item.body)
        }
    })

    const finalData = postData.map((post) => ({id: post.id, comments: comments[post.id]?.join(" | ")}))

    const parser = new Parser();
    const csv = parser.parse(finalData);
    fs.writeFileSync("method_one.csv", csv, null)

    console.timeEnd("start")
})

await Promise.all(promises).then(([postsResponse, commentsResponse]) => {
    console.time("start2")
    const commentsData = commentsResponse.data 
    const postData = postsResponse.data
    
    const comments = {}

    commentsData.forEach(item => comments[item.postId] ? comments[item.postId].push(item.body): comments[item.postId] = [item.body])

    const finalData = postData.map((post) => ({id: post.id, comments: comments[post.id]?.join(" | ")}))
   
    const parser = new Parser();
    const csv = parser.parse(finalData);
    
    fs.writeFileSync("method_two.csv", csv, null)
    
    console.timeEnd("start2")
})

await Promise.all(promises).then(async ([postsResponse, commentsResponse]) => {
    console.time("start3");
    const commentsData = commentsResponse.data;
    const postData = postsResponse.data;


    const finalData = postData.map(item => {
        let comments = commentsData.filter((comment) => comment.postId === item.id.toString());
        comments = comments.map(i => i.body).join(" | ")

        return {id: item.id, comments}
    });

    const parser = new Parser();
    const csv = parser.parse(finalData);
    fs.writeFile("method_three.csv", csv, null)
    
    console.timeEnd("start3")
})
