import {createPool} from 'mysql2/promise'

const connection=createPool({
    host: 'monorail.proxy.rlwy.net',
    user: 'root',
    database: 'railway',
    port: 49646,
    password: 'aAnsVlVxeKPbxarTLRfvUSgfoCqySUMr',
})

export default connection;
