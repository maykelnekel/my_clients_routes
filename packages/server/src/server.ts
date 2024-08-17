import client from '../database/client'
import app from './app'
const port = 4000
app.listen(port, async () => {
  try {
    await client.connect();
    console.info("DatabaseConnected")
    console.info(`App listening at http://localhost:${port}`)
    console.info(`You can access the doc in http://localhost:${port}/docs`)
  } catch (error) {
    console.error(error)
  }
})