import express from "express"
import routes from "./routes/index.js"



// Express config
const app = express();
app.use(express.json())


routes(app)


export default app