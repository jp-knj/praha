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

app.post("/", (request,response) => {
  try {
    if (request.headers["content-type"] !== "application/json") {
      return response.status(400).send("400 Error: Use `application/json")
    }
    return response.status(201).json(request.body)
  } catch (err) {
    return response.status(500).json({
      success: false,
      error: err
    });
  }
})

app.listen(PORT, () => console.log(`server start localhost:${PORT}`))