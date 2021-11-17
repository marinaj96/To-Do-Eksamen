const express = require('express');
const { Pool } = require('pg');
const db = require('./modules/db.js')
const server = express();
const PORT = process.env.PORT || 8080;
server.set('port', PORT);

// MIDDLEWARE ----------------------------
server.use(express.static("public"));
server.use(express.json());

// ENDPOINTS --------------------
server.get("/tasklist", async function(req, res, next) {
    try {
		let data = await db.getAllTasks();
        console.log(data)
		res.status(200).json(data.rows).end();
	} catch (err) {
		next(err);
	}
});

server.post("/tasklist", async function(req, res, next) {
    
    let userid = 1; // Must be changed when we implement more users than 1.

    let sql = 'INSERT INTO tasklist (id, date, userid, task) VALUES(DEFAULT, DEFAULT, $1, $2) returning *';
    let values = [userid, updata.task];

    try {
        let result = await Pool.query(sql, values);

        if (result.rows.length > 0) {
            res.status(200).json({msg: "the task was succesfully created"}).end();
        }
        else {
            throw "The task could not be created";
        }
    }
    catch(err) {
        res.status(500).json({error: err}).end();
    }
});

server.delete("/", function(req, res, next) {
    res.status(200).send("Hello from DELETE").end()
})


server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});


