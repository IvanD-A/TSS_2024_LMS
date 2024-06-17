import {createPool} from 'mysql2/promise'

const connection=createPool({
    host: 'localhost',
    user: 'root',
    database: 'TSS_LMS',
    password: 'root',
    port: 3306,
})

export default connection;
