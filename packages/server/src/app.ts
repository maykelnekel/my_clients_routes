import express from 'express'
import swaggerUi from "swagger-ui-express";
import router from './routes/index';
import swaggerDocument from "./swagger.json";
import cors from "cors";

const app = express()

const options = {
  customCss: '.swagger-ui .topbar { display: none }'
};

app.use(cors())
app.use(express.json())

app.use('/api/v1/', router)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));



export default app