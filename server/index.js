require("dotenv").config();
// based off of https://www.youtube.com/watch?v=EN6Dx22cPRI
// https://www.youtube.com/watch?v=fPuLnzSjPLE
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const sha256 = require('js-sha256');

//https://www.youtube.com/watch?v=vYFZDRraMnw&t=4s
const isValidNumber = (val) => {
    return !isNaN(Number(val));
}

const isValidString = (val) => {
    const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]*$/
    return val.match(regex);
}

const isValidEmail = (val) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return val.match(regex);
}

//create connection
const db = mysql.createConnection({
    multipleStatements: false, //https://planetscale.com/blog/how-to-prevent-sql-injection-attacks-in-node-js
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
    const userId = Number(req.body.UserID);
    if(!isValidNumber(userId)){
        res.status(500).send();
        return;
    }
    let sql = `SELECT * FROM USER WHERE UserID = ?`;
    db.query(sql, userId, (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })

})

app.post('/getFollowingCount', (req, res) => {
    const userId = Number(req.body.UserID);
    if(!isValidNumber(userId)){
        res.status(500).send();
        return;
    }
    let sql = `SELECT UserName, FolloweeUserID as UserID FROM FOLLOWS JOIN USER ON UserID = FolloweeUserID WHERE FollowerUserID = ?`;
    db.query(sql, userId, (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/getFollowerCount', (req, res) => {
    const userId = Number(req.body.UserID);
    if(!isValidNumber(userId)){
        res.status(500).send();
        return;
    }
    let sql = `SELECT UserName, FollowerUserID as UserID FROM FOLLOWS JOIN USER ON UserID = FollowerUserID WHERE FolloweeUserID = ?`;
    db.query(sql, userId, (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

//CURDATE https://www.w3schools.com/sql/func_mysql_curdate.asp
//DATEDIFF https://www.w3schools.com/sql/func_mysql_datediff.asp
app.post('/getUserMeals', (req, res) => {
    const userId = Number(req.body.UserID);
    if(!isValidNumber(userId)){
        res.status(500).send();
        return;
    }

    let sql = `SELECT * FROM MEAL as m WHERE DATEDIFF(DateTime, CURDATE()) = 0 AND UserID = ?;`;
    db.query(sql, userId, (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/getMealContains', (req, res) => {
    const mealId = Number(req.body.MealID);
    if(!isValidNumber(mealId)){
        res.status(500).send();
        return;
    }
    let sql = `SELECT r.RecipeID, r.RecipeTitle, mr.QuantityConsumed, ri.AmountIngredient, i.IsPerServing, i.Carbs, i.Protein, i.SaturatedFats, i.UnsaturatedFats, i.Calories, i.IngredientName, i.IngredientID
    FROM MEAL as m, MEAL_CONTAINS_RECIPE as mr, RECIPE as  r, RECIPE_CONTAINS_INGREDIENT as ri, INGREDIENT as i
    WHERE m.MealID = mr.MealID AND mr.MealID = ? AND mr.RecipeID = r.RecipeID AND ri.RecipeID = r.RecipeID AND ri.IngredientID = i.IngredientID`
    db.query(sql, mealId, (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/editFood', (req, res) => {
    const recipeID = Number(req.body.RecipeID);
    if(!isValidNumber(recipeID)){
        res.status(500).send();
        return;
    }

    const quantityConsumed = Number(req.body.QuantityConsumed);
    if(!isValidNumber(quantityConsumed)){
        res.status(500).send();
        return;
    }

    let sql = `UPDATE MEAL_CONTAINS_RECIPE SET QuantityConsumed = ? WHERE RecipeID = ?;`;
    db.query(sql, [quantityConsumed, recipeID], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/removeRecipeFromMeal', (req, res) => {
    const recipeID = Number(req.body.RecipeID);
    if(!isValidNumber(recipeID)){
        res.status(500);
        return;
    }

    const mealID = Number(req.body.MealID);
    if(!isValidNumber(mealID)){
        res.status(500);
        return;
    }

    let sql = `DELETE FROM MEAL_CONTAINS_RECIPE WHERE MealID = ? AND RecipeID = ?`;
    db.query(sql, [mealID, recipeID], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/updateMealTitle', (req, res) => {
    const MealTitle = String(req.body.MealTitle);
    if(!isValidString(MealTitle)){
        res.status(500).send();
        return;
    }

    const MealID = Number(req.body.MealID);
    if(!isValidNumber(MealID)){
        res.status(500).send();
        return;
    }

    let sql = `UPDATE MEAL SET MealTitle = ? WHERE MealID = ?;`;
    db.query(sql, [MealTitle, MealID], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/searchRecipes', (req, res) => {
    var search = String(req.body.Search)
    if(!isValidString(String(search))){
        res.status(500).send();
        return;
    }

    search = "%" + search + "%";

    let sql = `SELECT * FROM RECIPE WHERE RecipeTitle LIKE ?;`;
    db.query(sql, search, (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/createRecipe', (req, res) => {
    const uid = Number(req.body.UserID);
    const diff = Number(req.body.RDifficulty);
    const t = Number(req.body.CookTime);
    const title = String(req.body.RecipeTitle);
    const desc = String(req.body.RecipeDescription);
    const size = Number(req.body.ServingSize);
    const values = [uid, diff, t, title, desc, size];
    
    if(!isValidNumber(uid) || !isValidNumber(diff) || !isValidNumber(t) || !isValidNumber(size) || !isValidString(title) || !isValidString(desc)){
        res.status(500).send();
        return;
    }

    let sql = `INSERT INTO RECIPE(UserID, RDifficulty, CookTime, RecipeTitle, RecipeDescription, ServingSize)
    VALUES (?);`;
    db.query(sql, [values], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/setRecipeIngredient', (req, res) => {
    const rid = Number(req.body.RecipeID);
    const iid = Number(req.body.IngredientID);
    const quantity = Number(req.body.Quantity);
    const values = [rid, iid, quantity];
    if(!isValidNumber(rid) || !isValidNumber(iid) || !isValidNumber(quantity)) {
        res.status(500).send();
        return;
    }

    let sql = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient) VALUES(?);`;
    db.query(sql, [values], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/getRecipeIngredients', (req, res) => {
    const recipeID = Number(req.body.RecipeID);

    if(!isValidNumber(recipeID)){
        res.status(500).send();
        return;
    }

    let sql = `SELECT * FROM RECIPE as r, RECIPE_CONTAINS_INGREDIENT as ri, INGREDIENT as i
    WHERE r.RecipeID = ? and r.RecipeID = ri.RecipeID and i.IngredientID = ri.IngredientID;`;
    db.query(sql, recipeID, (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/getRecipeVitamins', (req, res) => {
    const recipeID = Number(req.body.RecipeID);

    if(!isValidNumber(recipeID)){
        res.status(500).send();
        return;
    }

    let sql = `SELECT r.RecipeID, v.VitaminName FROM RECIPE as r, RECIPE_CONTAINS_INGREDIENT as ri, VITAMINS as v
    WHERE r.RecipeID = ? and r.RecipeID = ri.RecipeID and ri.IngredientID = v.IngredientID;`;
    db.query(sql, recipeID, (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/getUserEmail', (req, res) => {
    const userEmail = String(req.body.userEmail);

    if(!isValidEmail(userEmail)){
        res.status(500).send();
        return;
    }

    let sql = `SELECT * FROM USER WHERE UserEmail = ?`;
    db.query(sql, userEmail, (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/getRecipeReviews', (req, res) => {
    const recipeID = Number(req.body.RecipeID);
    
    if(!isValidNumber(recipeID)){
        res.status(500).send();
        return;
    }

    let sql = `SELECT u.UserID, u.UserName, r.RComment, r.Rdifficulty
    FROM REVIEW as r, USER as u
    WHERE u.UserID = r.WrittenBy and r.RecipeID = ?;`;
    db.query(sql, recipeID, (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/getUserPassword', (req, res) => {
    const userPassword = req.body.userPassword;
    const hash = sha256(userPassword);

    let sql = `SELECT * FROM USER WHERE UserPassword = ?`;
    db.query(sql, hash, (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})


app.post('/addToMeal', (req, res) => {
    const recipeID = Number(req.body.RecipeID);
    const mealID = Number(req.body.MealID);
    const quant = Number(req.body.Quantity);
    const values = [mealID, recipeID, quant];

    if(!isValidNumber(recipeID) || !isValidNumber(mealID) || !isValidNumber(quant)){
        res.status(500).send();
        return;
    }

    let sql = `INSERT INTO MEAL_CONTAINS_RECIPE(MealID, RecipeID, QuantityConsumed) VALUES (?);`;
    db.query(sql, [values], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    }) 
});

app.post('/updateMealRecipeQuantity', (req, res) => {
    const recipeID = Number(req.body.RecipeID);
    const mealID = Number(req.body.MealID);
    const quant = Number(req.body.Quantity);

    if(!isValidNumber(recipeID) || !isValidNumber(mealID) || !isValidNumber(quant)){
        res.status(500).send();
        return;
    }

    let sql = `UPDATE MEAL_CONTAINS_RECIPE SET QuantityConsumed = ? WHERE MealID = ? AND RecipeID = ?`;
    db.query(sql, [quant, mealID, recipeID], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
        
    }) 
});

app.post('/queryMealContainsRecipe', (req, res) => {
    const recipeID = Number(req.body.RecipeID);
    const mealID = Number(req.body.MealID);

    if(!isValidNumber(recipeID) || !isValidNumber(mealID)){
        res.status(500).send();
        return;
    }

    let sql = `SELECT * FROM MEAL_CONTAINS_RECIPE WHERE MealID = ? AND RecipeID = ?;`;
    db.query(sql, [mealID, recipeID], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/createReview', (req, res) => {
    const by = Number(req.body.WrittenBy);
    const rID = Number(req.body.RecipeID);
    const rating = Number(req.body.RDifficulty);
    const comment = String(req.body.RComment);
    const values = [by, rID, rating, comment];


    if(!isValidNumber(by) || !isValidNumber(rID) || !isValidNumber(rating) || !isValidString(comment)){
        res.status(500).send();
        return;
    }

    let sql = `INSERT INTO REVIEW(WrittenBy, RecipeID, RDifficulty, RComment) VALUES(?)`
    db.query(sql, [values], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/getUserAchievements', (req, res) => {
    const uid = Number(req.body.UserID);

    if(!isValidNumber(uid)){
        res.status(500).send();
        return;
    }

    let sql = `SELECT * FROM ACHIEVEMENTS_EARNED AS e, ACHIEVEMENT AS a WHERE e.UserID = ? AND a.AchievementID = e.AchievementID;`;
    db.query(sql, uid, (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/getUserCreatedRecipes', (req, res) => {
    const uid = Number(req.body.UserID);

    if(!isValidNumber(uid)){
        res.status(500).send();
        return;
    }

    let sql =  `SELECT * FROM RECIPE WHERE UserID = ?;`;
    db.query(sql, uid, (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/updateRecipe', (req, res) => {
    const rid = Number(req.body.RecipeID);
    const rTitle = String(req.body.RecipeTitle);
    const rDesc = String(req.body.RecipeDescription);
    const rTime = req.body.CookTime;
    const rSize = Number(req.body.ServingSize);
    const rDifficulty = Number(req.body.RecipeDifficulty);

    if(!isValidNumber(rid) || !isValidString(rTitle) || !isValidString(rDesc) || !isValidNumber(rSize) || !isValidNumber(rDifficulty)){
        res.status(500).send();
        return;
    }

    let sql = `UPDATE RECIPE SET RecipeTitle = ?, RecipeDescription = ?, CookTime = ?, ServingSize = ?, RDifficulty = ?
                WHERE RecipeID = ?;`;
    db.query(sql, [rTitle, rDesc, rTime, rSize, rDifficulty, rid], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/updateRecipeIngredient', (req, res) => {
    const rid = Number(req.body.RecipeID);
    const iid = Number(req.body.IngredientID);
    const rQuant = Number(req.body.AmountIngredient);

    if(!isValidNumber(rid) || !isValidNumber(iid) || !isValidNumber(rQuant)){
        res.status(500).send();
        return;
    }

    let sql = `UPDATE RECIPE_CONTAINS_INGREDIENT SET
    AmountIngredient = ?
    WHERE RecipeID = ? AND IngredientID = ?;`;
    db.query(sql, [rQuant, rid, iid], (err, result) => {
        if(err){
            res.status(500);
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
    const adminID = Number(req.body.AdminID);

    if(!isValidNumber(adminID)){
        res.status(500).send();
        return;
    }

    let sql = `SELECT AdminName, AdminEmail FROM ADMIN WHERE AdminID = ?;`;
    db.query(sql, adminID, (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.get('/fetchFlaggedReviews', (req, res) => {
    let sql = `SELECT * FROM ADMIN_REVIEW as ar, REVIEW as r, User as u, Admin as a
    WHERE r.ReviewID = ar.ReviewID AND ar.ReviewFlagged = 1 AND u.UserID = r.WrittenBy AND ar.AdminID = a.AdminID;`;
    db.query(sql, (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.get('/fetchAllReviews', (req,res) => {
    let sql = `SELECT * FROM REVIEW as r, USER as u, ADMIN_REVIEW as ar WHERE r.WrittenBy = u.UserID and r.ReviewID = ar.ReviewID;`;
    db.query(sql, (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/deleteReview', (req, res) => {
    const ReviewID = Number(req.body.ReviewID);
    
    if(!isValidNumber(ReviewID)){
        res.status(500).send();
        return;
    }

    let adminReview = `DELETE FROM ADMIN_REVIEW WHERE ReviewID = ?`;
    let review = `DELETE FROM REVIEW WHERE ReviewID = ?`;

    db.query(adminReview, ReviewID, (err, result) => {
        if(err){
            res.status(500);
        }
        db.query(review, ReviewID, (err, result) => {
            if(err){
                res.status(500);
            }
            res.send(result);
        })
    })
})

app.post('/unflagReview', (req, res) => {
    const ReviewID = Number(req.body.ReviewID);
    
    if(!isValidNumber(ReviewID)){
        res.status(500).send();
        return;
    }

    let sql = `UPDATE ADMIN_REVIEW SET ReviewFlagged = 0 WHERE ReviewID = ?;`;
    db.query(sql, ReviewID, (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/flagReview', (req, res) => {
    const ReviewID = Number(req.body.ReviewID);
    
    if(!isValidNumber(ReviewID)){
        res.status(500).send();
        return;
    }

    var ReviewFlag;
    (req.body.ReviewFlagged === 1) ? ReviewFlag = 0 : ReviewFlag = 1

    let sql = `UPDATE ADMIN_REVIEW SET ReviewFlagged = ? WHERE ReviewID = ?;`;
    db.query(sql, [ReviewFlag, ReviewID], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/getAdminEmail', (req, res) => {
    const adminEmail = String(req.body.adminEmail);

    let sql = `SELECT * FROM ADMIN WHERE AdminEmail = ?`;
    db.query(sql, adminEmail, (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/getAdminPassword', (req, res) => {
    const adminPassword = String(req.body.adminPassword);
    let sql = `SELECT * FROM ADMIN WHERE ADMINPASSWORD = ?`;
    db.query(sql, adminPassword, (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/createMeal', (req, res) => {
    const UserID = Number(req.body.UserID);
    const DateTime = req.body.DateTime;
    const MealTitle = String(req.body.MealTitle);
    const val = [UserID, DateTime, MealTitle]

    if(!isValidNumber(UserID) || !isValidString(MealTitle)){
        res.status(500).send();
        return;
    }

    let sql = `INSERT INTO MEAL(UserID, DateTime, MealTitle) VALUES(?);`;
    db.query(sql, [val], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/setRecipeInstruction', (req, res) => {
    const RecipeID = Number(req.body.RecipeID);
    const StepNo = Number(req.body.StepNo);
    const Description = String(req.body.StepDescription);

    if(!isValidNumber(RecipeID) || !isValidNumber(StepNo) || !isValidString(Description)){
        res.status(500).send();
        return;
    }

    const value = [RecipeID, StepNo, Description];

    let sql = `INSERT INTO RECIPE_STEP(RecipeID, StepNo, StepDescription) VALUES(?);`;
    db.query(sql, [value], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/queryUserNameExists', (req, res) => {
    const userName = String(req.body.UserName);

    if(!isValidString(userName)){
        res.status(500).send();
        return;
    }

    let sql = `SELECT UserName FROM User WHERE UserName = ?`;
    db.query(sql, userName, (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/queryUserEmailExists', (req, res) => {
    const userEmail = String(req.body.UserEmail);

    if(!isValidEmail(userEmail)){
        res.status(500).send();
        return;
    }

    let sql = `SELECT UserEmail FROM User WHERE UserEmail = ?;`;
      db.query(sql, userEmail, (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/fetchUserGoal', (req, res) => {
    const UserID = Number(req.body.UserID);

    if(!isValidNumber(UserID)){
        res.status(500).send();
        return;
    }

    let sql = `SELECT * FROM GOAL WHERE UserID = ?;`;
    db.query(sql, UserID, (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/fetchRecipeSteps', (req, res) => {
    const RecipeID = Number(req.body.RecipeID);

    if(!isValidNumber(RecipeID)){
        res.status(500).send();
        return;
    }

    let sql = `SELECT * FROM RECIPE_STEP WHERE RecipeID = ? ORDER BY StepNo;`;
    db.query(sql, RecipeID, (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/createUser', (req, res) => {
    const userN = String(req.body.UserName);
    const userEm = String(req.body.UserEmail);
    const userBirth = req.body.UserBirthdate;
    const userHt = Number(req.body.UserHeight);
    const userWt = Number(req.body.UserWeight);
    const userAg = Number(req.body.UserAge);
    const userDt = String(req.body.DietName);
    const userDtDes = String(req.body.DietDescription);
    const userCkConf = Number(req.body.CookingConfidence);
    const userPass = req.body.UserPassword;
    const values = [userN, userEm, userBirth, userHt, userWt, userAg, userDt, userDtDes, userCkConf, userPass];

    if(!isValidString(userN) || !isValidEmail(userEm) || !isValidNumber(userHt) || !isValidNumber(userWt)
    || !isValidNumber(userAg) || !isValidString(userDt) || !isValidString(userDtDes) || !isValidNumber(userCkConf)) {
        res.status(500).send();
        return;
    }

    let sql = `INSERT INTO USER(UserName, UserEmail, UserBirthdate, UserHeight, UserWeight, UserAge, DietName, DietDescription, CookingConfidence, UserPassword)
    VALUES (?);`;
      db.query(sql, [values], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/updateGoal', (req, res) => {
    const GoalID = Number(req.body.GoalID);
    const Calc = Number(req.body.Calculated);

    if(!isValidNumber(GoalID) || !isValidNumber(Calc)) {
        res.status(500).send();
        return;
    }

    let sql = `UPDATE GOAL SET CalculatedCaloricIntake = ? WHERE GoalID = ?`;
    db.query(sql, [Calc, GoalID], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/removeAllSteps', (req, res) => {
    const RecipeID = Number(req.body.RecipeID);

    if(!isValidNumber(RecipeID)){
        res.status(500).send();
        return;
    }

    let sql = `DELETE FROM RECIPE_STEP WHERE RecipeID = ?;`;
    db.query(sql, RecipeID, (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

//assuming this might have to change???
app.post('/createUserInterests', (req, res) => {
    const userID = Number(req.body.UserID);
    const userInterests = req.body.InterestID;
    const values = [userID, userInterests];

    if(!isValidNumber(userID)){
        res.status(500).send();
        return;
    }

    let sql = `INSERT INTO USER_INTERESTS(UserID, InterestID) VALUES (?);`;
    db.query(sql, [values], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/createGoal', (req, res) => {
    const GoalID = Number(req.body.GoalID);
    const UserID = Number(req.body.UserID);
    const Calc = Number(req.body.Calculated);
    const Init = Number(req.body.Initial);
    const values = [UserID, GoalID, Init, Calc];

    if(!isValidNumber(GoalID) || !isValidNumber(UserID) || !isValidNumber(Calc) || !isValidNumber(Init)){
        res.status(500).send();
        return;
    }

    let sql = `INSERT INTO GOAL(UserID, GoalID, InitialCaloricIntake, CalculatedCaloricIntake) VALUES(?);`;
    db.query(sql, [values], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/setRecipeInstruction', (req, res) => {
    const RecipeID = Number(req.body.RecipeID);
    const StepNo = Number(req.body.StepNo);
    const Description = String(req.body.StepDescription);
    const values = [RecipeID, StepNo, Description];

    if(!isValidNumber(RecipeID) || ! isValidNumber(StepNo) || !isValidString(Description)){
        res.status(500).send();
        return;
    }

    let sql = `INSERT INTO RECIPE_STEP(RecipeID, StepNo, StepDescription) VALUES(?);`;
    db.query(sql, values, (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/setRecipeInstruction', (req, res) => {
    const RecipeID = Number(req.body.RecipeID);
    const StepNo = Number(req.body.StepNo);
    const Description = String(req.body.StepDescription);
    const values = [RecipeID, StepNo, Description];

    if(!isValidNumber(RecipeID) || ! isValidNumber(StepNo) || !isValidString(Description)){
        res.status(500).send();
        return;
    }

    let sql = `INSERT INTO RECIPE_STEP(RecipeID, StepNo, StepDescription) 
    VALUES(?);`;
    db.query(sql, values, (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/createIngredient', (req, res) => {
    const ingName = req.body.IngredientName;
    const carb = req.body.Carbs;
    const pro = req.body.Protein;
    const satFat = req.body.SaturatedFats;
    const unsatFat = req.body.UnsaturatedFats;
    const serving = req.body.IsPerServing;
    const calorie = req.body.Calories;
    const aid = req.body.AdminID;
    const date = req.body.DatePosted;
    const values = [ingName, carb, pro, satFat, unsatFat, serving, calorie, aid, date];

    let sql = `INSERT INTO INGREDIENT(IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted)
    VALUES(?);`;
    db.query(sql, [values], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })

})

app.post('/getVitamin', (req, res) => {
    const ingID = req.body.IngredientID;
    const vit = req.body.VitaminName;
    const values = [ingID, vit];

    let sql = `INSERT INTO VITAMINS(IngredientID, VitaminName) VALUES(?);`;

    db.query(sql, [values], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post('/deleteMeal', (req, res) => {
    const MealID = Number(req.body.MealID);

    if(!isValidNumber(MealID)){
        res.status(500).send();
        return;
    }

    let sql = `DELETE FROM MEAL_CONTAINS_RECIPE WHERE MealID = ?;`;
    db.query(sql, MealID, (err, result) => {
        if(err){
            res.status(500);
        }
        
        let del = `DELETE FROM MEAL WHERE MealID = ?;`;
        db.query(del, MealID, (err, result) => {
            if(err){
                res.status(500);
            }
            res.send(result);
        })
    })
})

app.post("/setIngredientPer100g", (req, res) => {
    const IngredientID = req.body.IngredientID;
    const ServingSize = req.body.ServingSize;
    const values = [IngredientID, ServingSize];
    let sql = `INSERT INTO INGREDIENT_PER_100g(IngredientID, ServingSize) VALUES(?);`;
    db.query(sql, [values], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})


app.post("/setIngredientPerServing", (req, res) => {
    const IngredientID = req.body.IngredientID;
    const Weight = req.body.ServingSize;
    const values = [IngredientID, Weight];
    let sql = `INSERT INTO INGREDIENT_PER_SERVING(IngredientID, Weight) VALUES(?);`;
    db.query(sql, [values], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

//https://stackoverflow.com/questions/1676551/best-way-to-test-if-a-row-exists-in-a-mysql-table
app.post('/checkUserCredentials', (req, res) => {
    const UserEmail = String(req.body.Email);
    const hash = String(req.body.Password);

    if(!isValidEmail(UserEmail)){
        res.status(500).send();
        return;
    }

    let sql = `SELECT UserID FROM USER WHERE UserEmail = ? AND UserPassword = ?`;
    db.query(sql, [UserEmail, hash], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.post("/assignCreateAccountAchievement", (req, res) => {
    const UserID = req.body.UserID;
    const Time = req.body.Time;
    const value = [UserID, Time];
    let sql = `INSERT INTO ACHIEVEMENTS_EARNED(UserID, TimeEarned, AchievementID)
                VALUES(?,
                    (SELECT a.AchievementID FROM ACHIEVEMENT as a WHERE a.Name = "Account Created"));`;
    db.query(sql, [value], (err, result) => {
        if(err){
            throw (err);
        }
        res.send(result);
    })
})

app.post("/isFirstMeal", (req, res) => {
    const UserID = req.body.UserID;
    let sql = `SELECT COUNT(AchievementID) AS AchievementCount FROM ACHIEVEMENTS_EARNED WHERE UserID = ? AND
    AchievementID = (SELECT a.AchievementID FROM ACHIEVEMENT as a WHERE a.Name = "First meal logged");`;
    db.query(sql, UserID, (err, result) => {
        if(err){
            throw (err);
        }
        res.send(result[0].AchievementCount <= 0);
    })
})

app.post("/assignFirstMealAchievement", (req, res) => {
    const UserID = req.body.UserID;
    const Time = req.body.Time;
    const value = [UserID, Time];
    let sql = `INSERT INTO ACHIEVEMENTS_EARNED(UserID, TimeEarned, AchievementID)
                VALUES(?,
                    (SELECT a.AchievementID FROM ACHIEVEMENT as a WHERE a.Name = "First meal logged"));`;
    db.query(sql, [value], (err, result) => {
        if(err){
            throw (err);
        }
        res.send(result);
    })
})

app.post("/isFirstGoal", (req, res) => {
    const UserID = req.body.UserID;
    let sql = `SELECT COUNT(AchievementID) AS AchievementCount FROM ACHIEVEMENTS_EARNED WHERE UserID = ? AND
    AchievementID = (SELECT a.AchievementID FROM ACHIEVEMENT as a WHERE a.Name = "First goal completed");`;
    db.query(sql, UserID, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result[0].AchievementCount <= 0);
    })
})

app.post("/assignGoalAchievement", (req, res) => {
    const UserID = req.body.UserID;
    const Time = req.body.Time;
    const value = [UserID, Time];
    let sql = `INSERT INTO ACHIEVEMENTS_EARNED(UserID, TimeEarned, AchievementID)
                VALUES(?,
                    (SELECT a.AchievementID FROM ACHIEVEMENT as a WHERE a.Name = "First goal completed"));`;
    db.query(sql, [value], (err, result) => {
        if(err){
            throw (err);
        }
        res.send(result);
    })
})

app.post("/isFirstRecipe", (req, res) => {
    const UserID = req.body.UserID;
    let sql = `SELECT COUNT(AchievementID) AS AchievementCount FROM ACHIEVEMENTS_EARNED WHERE UserID = ? AND
    AchievementID = (SELECT a.AchievementID FROM ACHIEVEMENT as a WHERE a.Name = "First Recipe Created");`;
    db.query(sql, UserID, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result[0].AchievementCount <= 0);
    })
})

app.post("/assignFirstRecipeAchievement", (req, res) => {
    const UserID = req.body.UserID;
    const Time = req.body.Time;
    const value = [UserID, Time];
    let sql = `INSERT INTO ACHIEVEMENTS_EARNED(UserID, TimeEarned, AchievementID)
                VALUES(?,
                    (SELECT a.AchievementID FROM ACHIEVEMENT as a WHERE a.Name = "First Recipe Created"));`;
    db.query(sql, [value], (err, result) => {
        if(err){
            throw (err);
        }
        res.send(result);
    })
})

app.post("/isFirstReview", (req, res) => {
    const UserID = req.body.UserID;
    let sql = `SELECT COUNT(AchievementID) AS AchievementCount FROM ACHIEVEMENTS_EARNED WHERE UserID = ? AND
    AchievementID = (SELECT a.AchievementID FROM ACHIEVEMENT as a WHERE a.Name = "First Review Created");`;
    db.query(sql, UserID, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result[0].AchievementCount <= 0);
    })
})

app.post("/assignFirstReviewAchievement", (req, res) => {
    const UserID = req.body.UserID;
    const Time = req.body.Time;
    const value = [UserID, Time];
    let sql = `INSERT INTO ACHIEVEMENTS_EARNED(UserID, TimeEarned, AchievementID)
                VALUES(?,
                    (SELECT a.AchievementID FROM ACHIEVEMENT as a WHERE a.Name = "First Review Created"));`;
    db.query(sql, [value], (err, result) => {
        if(err){
            throw (err);
        }
        res.send(result);
    })
})
app.post("/isFirstRecipe", (req, res) => {
    const UserID = req.body.UserID;
    let sql = `SELECT COUNT(AchievementID) AS AchievementCount FROM ACHIEVEMENTS_EARNED WHERE UserID = ? AND
    AchievementID = (SELECT a.AchievementID FROM ACHIEVEMENT as a WHERE a.Name = "First Recipe Created");`;
    db.query(sql, UserID, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result[0].AchievementCount <= 0);
    })
})

app.post("/assignFirstRecipeAchievement", (req, res) => {
    const UserID = req.body.UserID;
    const Time = req.body.Time;
    const value = [UserID, Time];
    let sql = `INSERT INTO ACHIEVEMENTS_EARNED(UserID, TimeEarned, AchievementID)
                VALUES(?,
                    (SELECT a.AchievementID FROM ACHIEVEMENT as a WHERE a.Name = "First Recipe Created"));`;
    db.query(sql, [value], (err, result) => {
        if(err){
            throw (err);
        }
        res.send(result);
    })
})

app.post('/fetchRecipeCreator', (req, res) => {
    const CreatorID = req.body.UserID;
    let sql = `SELECT UserName FROM USER WHERE UserID = ?`;
    db.query(sql, CreatorID, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    })
})

app.post('/isFollowing', (req, res) => {
    const UserID = req.body.UserID;
    const ProfileID = req.body.ProfileID;
    let sql = `SELECT * FROM FOLLOWS WHERE FollowerUserID = ? AND FolloweeUserID = ?`;
    db.query(sql, [UserID, ProfileID], (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result.length > 0);
    })
})

app.post('/followUser', (req, res) => {
    const UserID = req.body.UserID;
    const ProfileID = req.body.ProfileID;
    const values = [UserID, ProfileID];
    let sql = `INSERT INTO FOLLOWS(FollowerUserID, FolloweeUserID) VALUES (?);`;
    db.query(sql, [values], (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    })
})

app.post('/unfollowUser', (req, res) => {
    const UserID = req.body.UserID;
    const ProfileID = req.body.ProfileID;
    let sql = `DELETE FROM FOLLOWS WHERE FollowerUserID = ? AND FolloweeUserID = ?;`;
    db.query(sql, [UserID, ProfileID], (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    })
})

app.get('/interests', (req, res) => {
    let sql = `SELECT * FROM INTERESTS`;
    db.query(sql, (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    })
})

app.post('/removeIngredientFromRecipe', (req, res) => {
    const IngredientID = req.body.IngredientID;
    const RecipeID = req.body.RecipeID;

    let sql = `DELETE FROM RECIPE_CONTAINS_INGREDIENT WHERE IngredientID = ? AND RecipeID = ?`;
    db.query(sql, [IngredientID, RecipeID], (err, result) => {
        if(err){
            throw(err);
        }
        res.send(result);
    })
})

app.post('/checkAdminCredentials', (req, res) => {
    const AdminEmail = String(req.body.Email);
    const hash = String(req.body.Password);

    if(!isValidEmail(AdminEmail)){
        res.status(500).send();
        return;
    }

    let sql = `SELECT AdminID FROM ADMIN WHERE AdminEmail = ? AND AdminPassword = ?`;
    db.query(sql, [AdminEmail, hash], (err, result) => {
        if(err){
            res.status(500);
        }
        res.send(result);
    })
})

app.listen(3001, () => {
    console.log("Server started on port 3001");
});