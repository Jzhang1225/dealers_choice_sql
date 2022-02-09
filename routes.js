const express = require ('express');
const router = express.Router();
const client = require('./pg_client');
const sql = require('./sql');
module.exports = router;

router.get('/', async (req, res, next) =>{
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
                <div><a href='/player/add'>Add a Player</a></div>
                <div>
                    <ul>
                        ${player.map(({id,name, titles}) =>
                            `<li>
                                Number ${id} is <a href ='/player/${id}'>${name}
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

router.get('/add', (req, res)=>{
    res.send('hello')
})

router.get('/:id', async (req, res, next) =>{
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