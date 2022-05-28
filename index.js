const { Pool } = require('pg')
const nuevaTransaccion = require('./nuevaTransaccion')
const consultaTransacciones = require('./consultaTransacciones')
const consultaSaldo = require('./consultaSaldo')

const args = process.argv.slice(2)
const comando = args[0]

const config = {
    user: "postgres",
    host: "localhost",
    password: "120313",
    database: "banco_db",
    port: 5430,
};
const pool = new Pool(config)

pool.connect(async (errorConexion, client, release) => {
    if (errorConexion) {
        console.log(errorConexion)
    } else {
        if (comando === 'nueva') {
            nuevaTransaccion(client, release, pool)
        } else if (comando === 'consulta') {
            consultaTransacciones(client, release, pool)
        } else if (comando === 'saldo') {
            consultaSaldo(client, release, pool)
        }
    }
})