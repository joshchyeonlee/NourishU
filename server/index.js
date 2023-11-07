// based off of https://www.youtube.com/watch?v=EN6Dx22cPRI
// https://www.youtube.com/watch?v=fPuLnzSjPLE
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

//create connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nourishudb"
});

//connect
db.connect((err) => {
    if(err){
        throw(err);
    }

    console.log('MySQL Connected');
})

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json("This is the backend");

})

app.get('/login', (req,res) => {
    let sql = 'SELECT * FROM INGREDIENTS';
    db.query(sql, (err, result) => {
        if(err){
            throw(err);
        }
        console.log(result);
        res.send(result);
    })
})

//need to get info and update it here
app.post('/login', (req,res) => {
    let sql = "INSERT INTO INGREDIENTS (`Id`, `name`, `caloriesPerGram`, `createdAt`, `updatedAt`) VALUES(?)";
    const values = [2, "bean", 41, new Date(), new Date()];
    db.query(sql, [values], (err, result) => {
        if(err){
            throw(err);
        }
        console.log(result);
        res.send(result);
    })
})

app.listen(3001, () => {
    console.log("Server started on port 3001");
});