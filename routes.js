const express = require ('express');
const router = express.Router();
const client = require('./pg_client');
const sql = require('./sql');
module.exports = router;

router.post('/', async(req, res, next)=>{
    try{
        const { name, titles } = req.body
        let response = await client.query('select * from data where name =$1',[name])
        if(response.rows.length === 0){
            response = await client.query(`insert into data(name, titles) 
            values($1,$2) returning *`, [name, titles])
            player = response.rows[0]
            res.redirect(`player/${player.id}`)
        }
        else res.send(`
        <html>
        <head><title>Player already added!</title></head>
        <body>
            <div>
            Player already added, <a href ='/player/add'>try again</a>
            </div>
        </body>
        </html>
        `)
    }
    catch(e){
        next(e)
    }
})

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
    res.send(`
    <html>
        <head>
          <title>Add Player</title>
        </head>
        <body>
          <div>
            <header>Add a Player <a href= '/'> Go Back Home</a></header>
            <form method="post" action="/player">
              <input type="text" name="name" placeholder='Player Name'/>
              <input type="number" name="titles" placeholder='Number of Titles'/>
              <button type="submit">Add Player</button>
            </form>
          </div>
        </body>
    </html>`
    )
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