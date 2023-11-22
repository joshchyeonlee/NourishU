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
    database: "nourishudb",
    dateStrings: 'date' //https://stackoverflow.com/questions/11187961/date-format-in-node-js
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
    let sql = 'SELECT * FROM USER';
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
    let sql = "INSERT INTO USER(UserID, UserName, UserEmail, UserBirthdate, UserHeight, UserWeight, UserAge, DietName, DietDescription, CookingConfidence) VALUES(?)";
    const values = [req.body.UserID, req.body.UserName, req.body.UserEmail, req.body.UserBirthdate, req.body.UserHeight, req.body.UserWeight, req.body.UserAge, req.body.DietName, req.body.DietDescription, req.body.CookingConfidence];
    console.log("here");
    console.log(values);
    db.query(sql, [values], (err, result) => {
        if(err){
            throw(err);
        }
        console.log(result);
        res.send(result);
    })
})

app.post('/getUserInfo', (req, res) => {
    const userId = req.body.UserID;
    let sql = `SELECT * FROM USER WHERE UserID = ?`;
    // console.log(req);
    console.log(req);
    console.log("user")
    console.log(userId);
    db.query(sql, userId, (err, result) => {
        if(err){
            throw(err);
        }
        console.log(result);
        res.send(result);
    })
})

app.post('/getFollowingCount', (req, res) => {
    const userId = req.body.UserID;
    let sql = `SELECT UserName FROM FOLLOWS JOIN USER ON UserID = FolloweeUserID WHERE FollowerUserID = ?`;
    // console.log(req);
    console.log(req);
    db.query(sql, userId, (err, result) => {
        if(err){
            throw(err);
        }
        console.log(result);
        res.send(result);
    })
})

app.post('/getFollowerCount', (req, res) => {
    const userId = req.body.UserID;
    let sql = `SELECT UserName FROM FOLLOWS JOIN USER ON UserID = FollowerUserID WHERE FolloweeUserID = ?`;
    // console.log(req);
    console.log(req);
    db.query(sql, userId, (err, result) => {
        if(err){
            throw(err);
        }
        console.log(result);
        res.send(result);
    })
})

app.post('/getUserMeals', (req, res) => {
    const userId = req.body.UserID;
    let sql = `SELECT * FROM MEAL WHERE MEAL.UserID = ?`
    console.log(req);
    db.query(sql, userId, (err, result) => {
        if(err){
            throw(err);
        }
        console.log(result);
        res.send(result);
    })
})

app.post('/getMealContains', (req, res) => {
    const mealId = req.body.MealID;
    let sql = `SELECT r.RecipeID, r.RecipeTitle, i.IngredientName
    FROM MEAL as m, MEAL_CONTAINS_RECIPE as mr, RECIPE as  r, RECIPE_CONTAINS_INGREDIENT as ri, INGREDIENT as i
    WHERE m.MealID = mr.MealID AND mr.MealID = ? AND mr.RecipeID = r.RecipeID AND ri.RecipeID = r.RecipeID AND ri.IngredientID = i.IngredientID`
    db.query(sql, mealId, (err, result) => {
        if(err){
            throw(err);
        }
        console.log(result);
        res.send(result);
    })
})

app.post('/getMealInfo', (req, res) => {
    const mealId = req.body.MealID;
    let sql = `SELECT m.RecipeID, sum(Carbs) as TotalCarbs, sum(Protein) as TotalProtein, sum(SaturatedFats) as TotalSatFat, sum(UnsaturatedFats) as TotalUnsatFat, sum(Calories) as TotalCalories
    FROM MEAL_CONTAINS_RECIPE AS m, RECIPE as r, RECIPE_CONTAINS_INGREDIENT as ri, INGREDIENT as i
    WHERE m.MealID = ? AND m.RecipeID = r.RecipeID AND r.RecipeID = ri.RecipeID AND i.IngredientID = ri.IngredientID
    GROUP BY m.RecipeID;`
    db.query(sql, mealId, (err, result) => {
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