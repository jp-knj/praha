import express from 'express';

const app = express();

app.get("/", (request, response) =>{
  response.cookie("example first domain", request.hostname,{
    httpOnly: true
  });
  response.sendFile(__dirname + 'index.html')
})

app.use(express.static('cat',{
  setHeaders: (res,path, stat) => {
    res.cookie('example second domain','', {
      httpOnly: true,
      sameSite: 'none',
      secure: true
    })
  }
}))

app.listen(3000, () => {
  console.log('server:localhost:3000')
})

app.listen(3001, () => {
  console.log('server:localhost:3001')
})