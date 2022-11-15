import express from 'express';

const app = express();

app.get("/", (request, response) =>{
  response.cookie("domain origin", request.hostname,{
    httpOnly: true
  });
  response.sendFile(__dirname + 'index.html')
})

app.listen(3000, () => {
  console.log(`server start localhost:${3000}`)
})