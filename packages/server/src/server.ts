import client from '../database/client'
import app from './app'
import "dotenv/config"

const PORT = Number(process.env.SERVER_PORT);
const HOST = process.env.SERVER_HOST;

app.listen(PORT, async () => {
  try {
    await client.connect();
    console.info("DatabaseConnected")
    console.info(`App listening at ${HOST}:${PORT}`)
    console.info(`You can access the doc in ${HOST}:${PORT}/docs`)
  } catch (error) {
    console.error(error)
  }
})