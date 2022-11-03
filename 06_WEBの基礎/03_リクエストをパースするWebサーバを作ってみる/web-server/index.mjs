import express from "express";
const PORT = 8080;
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/",(_, response) => {
  const data = {
    text: 'hello world'
  }
  response.status(200).json(data)
})

app.post("/", (request,response) =>{
  if (request.headers["content-type"] === "application/json") {
    response.status(201).json(request.body)
  }
  if(request.headers["content-type"] !== "application/json") {
    response.status(400).send("400 Error: Use `application/json`")
  }
})

app.listen(PORT, () => console.log(`server start loclhost${PORT}`))