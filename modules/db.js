const { query } = require("express");
const pg = require("pg");
const dbURI = "postgres://dvfrihnwtenmec:dd57911311ad4e4afcced101b316ba1386f75f68d5755b7012cc784e22036d74@ec2-18-202-1-222.eu-west-1.compute.amazonaws.com:5432/d4n071tse3ervn";
const connstring = process.env.DATABASE_URL || dbURI;
const pool = new pg.Pool({
    connectionString: connstring,
    ssl: {rejectUnauthorized: false}
});

let dbMethods = {};

dbMethods.getAllTasklists = function(){
    let sql = "SELECT id, title FROM tasklists"
    return pool.query(sql);
}

dbMethods.getTasksFromList = function(){
    let sql = "SELECT * FROM tasks";
    return pool.query(sql);

}

dbMethods.getAllTasks = function(){
    let sql = "SELECT * FROM tasks";
    return pool.query(sql);
}

dbMethods.deleteTask = function(id){
    let sql = "DELETE FROM tasks WHERE id = $1 RETURNING *";
    let values = [id];
    return pool.query(sql, values);
}

dbMethods.deleteList = function(id){
    let sql = "DELETE FROM tasklists WHERE id = $1 RETURNING *";
    let values = [id];
    return pool.query(sql, values);
}

dbMethods.createTask = function(userid, tasktext, listid){
    let sql = "INSERT INTO tasks (id, date, userid, task, listid) VALUES(DEFAULT, DEFAULT, $1, $2, $3) RETURNING *";
    let values = [userid, tasktext, listid];
    return pool.query(sql, values);
}

dbMethods.createTasklist = function(title, userid){
    let sql = "INSERT INTO tasklists (id, title, userid) VALUES (DEFAULT, $1, $2) RETURNING *";
    let values = [title, userid];
    return pool.query(sql, values);
}


//----------------------------------------
dbMethods.getAllUsers = function() {
    let sql = "SELECT id, username FROM users";
    return pool.query(sql); //return the promise 

}
//--------------------------------------------
dbMethods.getUser = function(username) {
    let sql = "SELECT * FROM users WHERE username = $1";
    let values = [username];
    return pool.query(sql, values);
}

//--------------------------------------------

dbMethods.createUser = function(username, password, salt) {
    let sql = "INSERT INTO users (id, username, password, salt) VALUES(DEFAULT, $1, $2, $3) returning *";
    let values = [username, password, salt];
    return pool.query(sql, values);
}

//---------------------------------------------
dbMethods.deleteUser = function (id) {
    let sql = "DELETE FROM users WHERE id = $1 RETURNING *";
    let values = [id];
    return pool,query(sql, values);
}



module.exports = dbMethods;