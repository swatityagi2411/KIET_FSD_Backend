const express=require('express')
const app=express()
const cookieParser = require('cookie-parser')

//app.get('/', (req, res) => res.send('Hello World!'))
app.get('/', (req, res) => {res.download('../android-kotlin.pdf')
    res.send("Download Pdf")
})

app.use(cookieParser())
app.listen(2000,()=>{console.log("Server started")})