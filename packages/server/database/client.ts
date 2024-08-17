import pg from 'pg'
const { Client } = pg
 
const client = new Client({
  user: 'postgres',
  password: '1234',
  host: 'localhost',
  port: 5432,
  database: 'my_user_routes',
})

export default client;