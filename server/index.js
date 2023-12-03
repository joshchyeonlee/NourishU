require("dotenv").config();
// based off of https://www.youtube.com/watch?v=EN6Dx22cPRI
// https://www.youtube.com/watch?v=fPuLnzSjPLE
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require("jsonwebtoken");

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
        res.send(result);
    })
})

app.get('/ingredients', (req, res) => {
    let sql = `SELECT * FROM INGREDIENT`;
    db.query(sql, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    })
})

//need to get info and update it here
app.post('/login', (req,res) => {
    let sql = "INSERT INTO USER(UserID, UserName, UserEmail, UserBirthdate, UserHeight, UserWeight, UserAge, DietName, DietDescription, CookingConfidence) VALUES(?)";
    const values = [req.body.UserID, req.body.UserName, req.body.UserEmail, req.body.UserBirthdate, req.body.UserHeight, req.body.UserWeight, req.body.UserAge, req.body.DietName, req.body.DietDescription, req.body.CookingConfidence];
    db.query(sql, [values], (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    })
})

app.post('/getUserInfo', (req, res) => {
    const userId = req.body.UserID;
    let sql = `SELECT * FROM USER WHERE UserID = ?`;
    db.query(sql, userId, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    })
})

app.post('/getFollowingCount', (req, res) => {
    const userId = req.body.UserID;
    let sql = `SELECT UserName FROM FOLLOWS JOIN USER ON UserID = FolloweeUserID WHERE FollowerUserID = ?`;
    db.query(sql, userId, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    })
})

app.post('/getFollowerCount', (req, res) => {
    const userId = req.body.UserID;
    let sql = `SELECT UserName FROM FOLLOWS JOIN USER ON UserID = FollowerUserID WHERE FolloweeUserID = ?`;
    db.query(sql, userId, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    })
})

app.post('/getUserMeals', (req, res) => {
    const userId = req.body.UserID;
    let sql = `SELECT * FROM MEAL WHERE MEAL.UserID = ?`
    db.query(sql, userId, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    })
})

app.post('/getMealContains', (req, res) => {
    const mealId = req.body.MealID;
    let sql = `SELECT r.RecipeID, r.RecipeTitle, mr.QuantityConsumed, ri.AmountIngredient, i.IsPerServing, i.Carbs, i.Protein, i.SaturatedFats, i.UnsaturatedFats, i.Calories, i.IngredientName, i.IngredientID
    FROM MEAL as m, MEAL_CONTAINS_RECIPE as mr, RECIPE as  r, RECIPE_CONTAINS_INGREDIENT as ri, INGREDIENT as i
    WHERE m.MealID = mr.MealID AND mr.MealID = ? AND mr.RecipeID = r.RecipeID AND ri.RecipeID = r.RecipeID AND ri.IngredientID = i.IngredientID`
    db.query(sql, mealId, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    })
})

app.post('/editFood', (req, res) => {
    const recipeID = req.body.RecipeID;
    const quantityConsumed = req.body.QuantityConsumed;
    let sql = `UPDATE MEAL_CONTAINS_RECIPE
    SET QuantityConsumed = ${quantityConsumed}
    WHERE RecipeID = ${recipeID};`;
    db.query(sql, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    })
})

app.post('/removeRecipeFromMeal', (req, res) => {
    const recipeID = req.body.RecipeID;
    const mealID = req.body.MealID;
    let sql = `DELETE FROM MEAL_CONTAINS_RECIPE
    WHERE MealID = ${mealID} AND RecipeID = ${recipeID}`;
    db.query(sql, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    })
})

app.post('/updateMealTitle', (req, res) => {
    const MealTitle = req.body.MealTitle;
    const MealID = req.body.MealID;
    let sql = `UPDATE MEAL SET MealTitle = "${MealTitle}" WHERE MealID = ${MealID};`;
    db.query(sql, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    })
})

app.post('/searchRecipes', (req, res) => {
    const search = req.body.Search;
    let sql = `SELECT * FROM RECIPE WHERE RecipeTitle LIKE '%${search}%';`;
    db.query(sql, (err, result) => {
        if(err){
            throw(err);
        }
        console.log(result);
        res.send(result);
    })
})

app.post('/createRecipe', (req, res) => {
    const uid = req.body.UserID;
    const diff = req.body.RDifficulty;
    const t = req.body.CookTime;
    const title = req.body.RecipeTitle;
    const desc = req.body.RecipeDescription;
    const size = req.body.ServingSize;
    let sql = `INSERT INTO RECIPE(UserID, RDifficulty, CookTime, RecipeTitle, RecipeDescription, ServingSize)
    VALUES (${uid}, ${diff}, ${t}, "${title}", "${desc}", ${size});`;
    db.query(sql, (err, result) => {
        if(err){
            throw(err);
        }
        console.log(result);
        res.send(result);
    })
})

app.post('/setRecipeIngredient', (req, res) => {
    const rid = req.body.RecipeID;
    const iid = req.body.IngredientID;
    const quantity = req.body.Quantity;
    let sql = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient) VALUES(${rid}, ${iid}, ${quantity});`;
    db.query(sql, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    })
})

app.post('/getRecipeIngredients', (req, res) => {
    const recipeID = req.body.RecipeID;
    let sql = `SELECT * FROM RECIPE as r, RECIPE_CONTAINS_INGREDIENT as ri, INGREDIENT as i
    WHERE r.RecipeID = ? and r.RecipeID = ri.RecipeID and i.IngredientID = ri.IngredientID;`;
    db.query(sql, recipeID, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    })
})

app.post('/getRecipeVitamins', (req, res) => {
    const recipeID = req.body.RecipeID;
    let sql = `SELECT r.RecipeID, v.VitaminName FROM RECIPE as r, RECIPE_CONTAINS_INGREDIENT as ri, VITAMINS as v
    WHERE r.RecipeID = ? and r.RecipeID = ri.RecipeID and ri.IngredientID = v.IngredientID;`;
    db.query(sql, recipeID, (err, result) => {
      if(err){
        throw(err);
      }
      res.send(result);
    })
})

app.post('/getUserEmail', (req, res) => {
    const userEmail = req.body.userEmail;
    let sql = `SELECT * FROM USER WHERE UserEmail = "${userEmail}"`;
    db.query(sql, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    })
})

app.post('/getRecipeReviews', (req, res) => {
    const recipeID = req.body.RecipeID;
    let sql = `SELECT u.UserID, u.UserName, r.RComment, r.Rdifficulty
    FROM REVIEW as r, USER as u
    WHERE u.UserID = r.WrittenBy and r.RecipeID = ?;`;
    db.query(sql, recipeID, (err, result) => {
      if(err){
        throw(err);
      }
      res.send(result);
    })
})

app.post('/getUserPassword', (req, res) => {
    const userPassword = req.body.userPassword;
    let sql = `SELECT * FROM USER WHERE UserPassword = "${userPassword}"`;
    db.query(sql, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    })
})


app.post('/addToMeal', (req, res) => {
    const recipeID = req.body.RecipeID;
    const mealID = req.body.MealID;
    const quant = req.body.Quantity;
    let sql = `INSERT INTO MEAL_CONTAINS_RECIPE(MealID, RecipeID, QuantityConsumed) VALUES (${mealID},${recipeID},${quant});`;
    db.query(sql, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    }) 
});

app.post('/updateMealRecipeQuantity', (req, res) => {
    const recipeID = req.body.RecipeID;
    const mealID = req.body.MealID;
    const quant = req.body.Quantity;
    let sql = `UPDATE MEAL_CONTAINS_RECIPE SET QuantityConsumed = ${quant} WHERE MealID = ${mealID} AND RecipeID = ${recipeID}`;
    db.query(sql, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
        
    }) 
});

app.post('/queryMealContainsRecipe', (req, res) => {
    const recipeID = req.body.RecipeID;
    const mealID = req.body.MealID;
    let sql = `SELECT * FROM MEAL_CONTAINS_RECIPE WHERE MealID = ${mealID} AND RecipeID = ${recipeID};`;
    db.query(sql, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    })
})

app.post('/createReview', (req, res) => {
    const by = req.body.WrittenBy;
    const rID = req.body.RecipeID;
    const rating = req.body.RDifficulty;
    const comment = req.body.RComment;
    let sql = `INSERT INTO REVIEW(WrittenBy, RecipeID, RDifficulty, RComment) VALUES(${by}, ${rID}, ${rating}, "${comment}")`
    db.query(sql, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    })
})

app.post('/getUserAchievements', (req, res) => {
    const uid = req.body.UserID;
    let sql = `SELECT * FROM ACHIEVEMENTS_EARNED AS e, ACHIEVEMENT AS a WHERE e.UserID = ${uid} AND a.AchievementID = e.AchievementID;`;
    db.query(sql, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    })
})

app.post('/getUserCreatedRecipes', (req, res) => {
    const uid = req.body.UserID;
    let sql =  `SELECT * FROM RECIPE WHERE UserID = ${uid};`;
    db.query(sql, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    })
})

app.post('/updateRecipe', (req, res) => {
    const rid = req.body.RecipeID;
    const rTitle = req.body.RecipeTitle;
    const rDesc = req.body.RecipeDescription;
    const rTime = req.body.CookTime;
    const rSize = req.body.ServingSize;
    const rDifficulty = req.body.RecipeDifficulty;
    let sql = `UPDATE RECIPE SET
    RecipeTitle = "${rTitle}",
    RecipeDescription = "${rDesc}",
    CookTime = ${rTime},
    ServingSize = ${rSize},
    RDifficulty = ${rDifficulty}
    WHERE RecipeID = ${rid};`;
    db.query(sql, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    })
})

app.post('/updateRecipeIngredient', (req, res) => {
    const rid = req.body.RecipeID;
    const iid = req.body.IngredientID;
    const rQuant = req.body.AmountIngredient;
    let sql = `UPDATE RECIPE_CONTAINS_INGREDIENT SET
    AmountIngredient = ${rQuant}
    WHERE RecipeID = ${rid} AND IngredientID = ${iid};`;
    db.query(sql, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    })
})

app.post('/authenticateUser', (req, res) => {
    const email = req.body.Email;
    const password = req.body.Password;

    const jwtToken = jwt.sign(
        {email: email, password: password},
        `${process.env.JWT_SECRET_KEY}`,
    )

    const obj = {
        message: "authenticated",
        token: jwtToken,
    }

    res.send(obj);

})

app.post('/fetchAdminInfo', (req, res) => {
    const adminID = req.body.AdminID;
    let sql = `SELECT AdminName, AdminEmail FROM ADMIN WHERE AdminID = ${adminID};`;
    db.query(sql, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    })
})

app.get('/fetchFlaggedReviews', (req,res) => {
    let sql = `SELECT * FROM ADMIN_REVIEW as ar, REVIEW as r, User as u, Admin as a
    WHERE r.ReviewID = ar.ReviewID AND ar.ReviewFlagged = 1 AND u.UserID = r.WrittenBy AND ar.AdminID = a.AdminID;`;
    db.query(sql, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    })
})

app.get('/fetchAllReviews', (req,res) => {
    let sql = `SELECT * FROM REVIEW as r, USER as u, ADMIN_REVIEW as ar WHERE r.WrittenBy = u.UserID and r.ReviewID = ar.ReviewID;`;
    db.query(sql, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    })
})

app.post('/deleteReview', (req, res) => {
    const ReviewID = req.body.ReviewID;
    let adminReview = `DELETE FROM ADMIN_REVIEW WHERE ReviewID = ${ReviewID}`;
    let review = `DELETE FROM REVIEW WHERE ReviewID = ${ReviewID}`;

    db.query(adminReview, (err, result) => {
        if(err){
            throw(err);
        }
        db.query(review, (err, result) => {
            if(err){
                throw(err);
            }
            res.send(result);
        })
    })
})

app.post('/unflagReview', (req, res) => {
    const ReviewID = req.body.ReviewID;
    let sql = `UPDATE ADMIN_REVIEW SET ReviewFlagged = 0 WHERE ReviewID = ${ReviewID};`;
    db.query(sql, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    })
})

app.post('/flagReview', (req, res) => {
    const ReviewID = req.body.ReviewID;
    var ReviewFlag;
    (req.body.ReviewFlagged === 1) ? ReviewFlag = 0 : ReviewFlag = 1

    let sql = `UPDATE ADMIN_REVIEW SET ReviewFlagged = ${ReviewFlag} WHERE ReviewID = ${ReviewID};`;
    console.log(sql);
    db.query(sql, (err, result) => {
        if(err){
            throw(err);
        }
        console.log(result);
        res.send(result);
    })
})

app.post('/createMeal', (req, res) => {
    const UserID = req.body.UserID;
    const DateTime = req.body.DateTime;
    const MealTitle = req.body.MealTitle;

    console.log(MealTitle)

    let sql = `INSERT INTO MEAL(UserID, DateTime, MealTitle) VALUES(${UserID}, "${DateTime}", "${MealTitle}");`;
    db.query(sql, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    })
})

app.post('/queryUserNameExists', (req, res) => {
    const userName = req.body.UserName;
    let sql = `SELECT UserName FROM User WHERE UserName = '${userName}'`;
    console.log(req);
    db.query(sql, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    })
})

app.post('/queryUserEmailExists', (req, res) => {
    const userEmail = req.body.UserEmail;
    let sql = `SELECT UserEmail FROM User WHERE UserEmail = '${userEmail}'`;
    console.log(req);
    db.query(sql, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    })
})

app.listen(3001, () => {
    console.log("Server started on port 3001");
});