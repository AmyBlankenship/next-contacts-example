const dotenv = require('dotenv')
const { parse } = require('pg-connection-string')

dotenv.config({ path: '.env.local' })

const options = parse(process.env.DATABASE_URL || '')
// comes in as a string, which doesn't work if it's false
options.ssl = options.ssl !== 'false';
//wipe all tables
options.all=true;

module.exports = options
