const app = require('./app/app')

const port = process.env.PORT || 3301

app.listen(port, ()=>{
    console.log(`-----------------> 🚀 Server listening on port ${port}`)
})
