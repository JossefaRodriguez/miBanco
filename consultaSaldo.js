const Cursor = require('pg-cursor')

const args = process.argv.slice(2)
const id = args[1]

const consultaSaldo = async (client, release, pool) => {
    try {
        const queryConsulta = {
            text: 'SELECT saldo FROM cuentas WHERE id = $1',
            values: [id],
        }

        const consulta = new Cursor(queryConsulta.text, queryConsulta.values)
        const cursor = await client.query(consulta)
        

        cursor.read(1, (err, rows) => {
            console.log(rows)
            cursor.close()
            release()
            pool.end()

        })
    } catch (error) {
        console.log(`Error código: ${error.code}`)
        console.log(`Detalle del error: ${error.detail}`)
        console.log(`Tabla originaria del error: ${error.table}`)
        console.log(`Restricción violada en el campo: ${error.constraint}`)
        release();
        pool.end();
    }

}

module.exports = consultaSaldo