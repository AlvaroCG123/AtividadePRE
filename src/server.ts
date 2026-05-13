import express from 'express'
import convidadoRoutes from './routes/convidado.routes.js'
import usuarioRoutes from './routes/user.routes.js'
import cors from 'cors'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use("/convidado", convidadoRoutes)
app.use("/usuario", usuarioRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
