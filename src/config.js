import { config } from 'dotenv';

config();

export default {
    port: process.env.PORT || 3100,
    dbUser: process.env.MYSQL_NAME || '',
    dbPassword: process.env.MYSQL_PASS || '',
    dbHost: process.env.MYSQL_HOST || '',
    dbName: process.env.MYSQL_DB || '',
}