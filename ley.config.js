const dotenv = require('dotenv')
const { parse } = require('pg-connection-string')

dotenv.config({ path: '.env.local' })

const options = parse(process.env.DATABASE_URL || '')
console.log(options)

module.exports = options
