import {createPool} from 'mysql2/promise'

const connection=createPool({
    host: 'viaduct.proxy.rlwy.net',
    user: 'root',
    database: 'railway',
    port: 20271,
    password: 'ZJKzakRYAsiXFCIcbxQNmFdEpBIeyBKk',
})

export default connection;
