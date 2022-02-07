const express = require ('express');
const app = express();
const client = require('./pg_client');
const sql = require('./sql');

app.get('/', async (req, res, next) =>{
    const response = await (client.query('SELECT * from data'))
    const player = response.rows
    try{
        res.send(`
        <html>
            <head>
                <title>Most Grandslam Titles</title>
            </head>
            <body>
                <h1>Most Grandslam Titles</h1>
                <div>
                    <ul>
                        ${player.map(({id,name, titles}) =>
                            `<li>
                                Number ${id} is <a href ='./player/${id}'>${name}
                                </a>
                            </li>`
                        ).join('')}
                    </ul>
                </div>
            </body>
        </html>
        `);
    }
    catch (e){
        next(e)
    }
})

app.get('/player/:id', async (req, res, next) =>{
    const response = await (client.query('SELECT * from data where id =$1', [req.params.id]))
    const player = response.rows[0]
    try{
        res.send(`
        <html>
            <head>
                <title>Most Grandslam Titles</title>
            </head>
            <body>
                <h1>Most Grandslam Titles</h1>
                <div>
                    Go back <a href='/'>home</a>
                </div>
                <div>
                    ${player.name} has ${player.titles} titles    
                </div>
            </body>
        </html>
        `);
    }
    catch (e){
        next(e)
    }
})

const insertSql = () =>{
    try{
        client.query(sql)
    }
    catch(e){
        console.log(e);
    }
} 
insertSql()
const port = process.env.port || 3000

app.listen(port, () =>{
    console.log (`Listening on port (port)`)
})