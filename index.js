// PASO 1:
const { Pool } = require('pg')

const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'music',
    password: 'postgres',
    port: 5432,
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000
}

const pool = new Pool(config)


pool.connect(async (error_conexion, client, release) => {
    if (error_conexion) {
        return console.error(error_conexion.code)
    }

    // Capturando argumentos desde el terminal
    const argumentos = process.argv.slice(2)
    let accion = argumentos[0]

    if (accion == 'nuevo') {
        console.log('entra a nuevo')

        const SQLQuery = {
            name: 'insert-student',
            rowMode: 'array',
            text: `INSERT INTO estudiantes (nombre, rut, curso, nivel) values ($1, $2, $3, $4) RETURNING *;`,
            values: ['pedro', '11111', 'flauta', '2']
        }
        try {
            async function nuevo() {
                const res = await client.query(SQLQuery);
                console.log(`Estudiante agregado con éxito`)
                release()
                console.log('Registro Agregado', res.rows[0]);
                pool.end()
            }
            nuevo()
        } catch (error_consulta) {
            console.error(error_consulta.code)
        }

    }

    if (accion == 'rut') {
        console.log('entra a rut')
        const SQLQuery = {
            name: 'busca-rut',
            rowMode: 'array',
            text: `SELECT nombre, rut, curso, nivel FROM estudiantes WHERE rut =$1;`,
            values: ['11111']
        }
        try {
            async function busquedaRut() {
                const res = await client.query(SQLQuery);
                console.log(`Estudiante encontrado con éxito`)
                release()
                console.log('Registros Encontrados', res.rows[0]);
                pool.end()
            }
            busquedaRut()
        } catch (error_consulta) {
            console.error(error_consulta.code)
        }

    }

    if (accion == 'consulta') {
        console.log('entra a consulta')
        const SQLQuery = {
            name: 'lista-todos',
            rowMode: 'array',
            text: `SELECT * FROM estudiantes`,
        }
        try {
            async function consulta() {
                const res = await client.query(SQLQuery);
                console.log(`Estudiantes encontrados con éxito`)
                release()
                console.log('Registros Encontrados', res.rows);
                pool.end()
            }
            consulta()
        } catch (error_consulta) {
            console.error(error_consulta.code)
        }

    }

    if (accion == 'editar') {
        console.log('entra a editar')

        const SQLQuery = {
            name: 'insert-student',
            rowMode: 'array',
            text: `UPDATE estudiantes SET rut=$2, curso=$3, nivel=$4 WHERE nombre=$1`,
            values: ['pedro', '11111', 'violin', '7']
        }
        try {
            async function editar() {
                const res = await client.query(SQLQuery);
                console.log(`Estudiante editado con éxito`)
                release()
                pool.end()
            }
            editar()
        } catch (error_consulta) {
            console.error(error_consulta.code)
        }

    }

    if (accion == 'eliminar') {
        console.log('entra a eliminar')

        const SQLQuery = {
            name: 'insert-student',
            rowMode: 'array',
            text: `DELETE FROM estudiantes WHERE rut=$1`,
            values: ['11111']
        }
        try {
            async function eliminar() {
                const res = await client.query(SQLQuery);
                console.log(`Estudiante eliminado con éxito`)
                release()
                pool.end()
            }
            eliminar()
        } catch (error_consulta) {
            console.error(error_consulta.code)
        }

    }

})
