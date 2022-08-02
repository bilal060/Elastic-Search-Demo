const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

const sql = require('mssql')

const sqlConfig = {
    user: 'j2',
    password: '123456',
    database: 'JIBE_Main',
    server: 'j3-dev.jibe.com.sg',
    port:  1982,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: false, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
  }
  const loadSql = async (table = 'LIB_USER') => {
sql.connect(sqlConfig, err => {
    // ... error checks

    const request = new sql.Request()
    request.stream = true // You can set streaming differently for each request
    request.query(`select * from ${table}`) // or request.execute(procedure) LIB_USER

    request.on('recordset', columns => {
        // Emitted once for each recordset in a query
    })

    request.on('row', async row => {
        // Emitted for each row in a recordset
        await client.index({
            index: table.toLowerCase(),
            document: row
          })
    })

    request.on('rowsaffected', rowCount => {
        // Emitted for each `INSERT`, `UPDATE` or `DELETE` statement
        // Requires NOCOUNT to be OFF (default)
    })

    request.on('error', err => {
        // May be emitted multiple times
        console.log(err)
    })

    request.on('done', async result => {
        // Always emitted as the last one
        await client.index({
            index: table.toLowerCase(),
            refresh: true,
            document: result
          })
    })
    sql.on('error', err => {
    // ... error handler
    console.log(err)
    })
})}

module.exports = {
    loadSql
  };