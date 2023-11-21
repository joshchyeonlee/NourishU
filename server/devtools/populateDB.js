console.log("get ready to get beaned!!");

//based off of:
//https://tableplus.com/blog/2018/08/mysql-how-to-drop-all-tables.html
const findAllTables = 
`SELECT * 
FROM information_schema.tables
WHERE table_schema = 'nourishudb';`;
const dropUserTable = `DROP TABLE IF EXISTS USER;`;
const dropFollowsTable = `DROP TABLE IF EXISTS FOLLOWS;`;
const dropAchievementTable = `DROP TABLE IF EXISTS ACHIEVEMENT;`;
const dropAchievementsEarnedTable = `DROP TABLE IF EXISTS ACHIEVEMENTS_EARNED;`;
const dropUserInterestsTable = `DROP TABLE IF EXISTS USER_INTERESTS;`;
const dropGoalTable = `DROP TABLE IF EXISTS GOAL;`;
const dropIngredientTable = `DROP TABLE IF EXISTS INGREDIENT;`;
const dropVitaminsTable = `DROP TABLE IF EXISTS VITAMINS;`;
const dropIngredientPerServingTable = `DROP TABLE IF EXISTS INGREDIENT_PER_SERVING;`;
const dropIngredientPer100gTable = `DROP TABLE IF EXISTS INGREDIENT_PER_100g`;
const dropMealTable = `DROP TABLE IF EXISTS MEAL;`;
const dropRecipeTable = `DROP TABLE IF EXISTS RECIPE;`;
const dropMealContainsRecipeTable = `DROP TABLE IF EXISTS MEAL_CONTAINS_RECIPE;`;
const dropAdminTable = `DROP TABLE IF EXISTS ADMIN;`;
const dropReviewTable = `DROP TABLE IF EXISTS REVIEW;`;
const dropAdminReviewTable = `DROP TABLE IF EXISTS ADMIN_REVIEW;`;
const dropRecipeIngrTable = `DROP TABLE IF EXISTS RECIPE_CONTAINS_INGREDIENT;`;
//add more here

const dropForeignKeyCheck = `SET FOREIGN_KEY_CHECKS = 0;`;
const setForeignKeyCheck = `SET FOREIGN_KEY_CHECKS = 1;`;

const mysql = require('mysql2');
const users = require('./dummyUserData');
const followers = require('./dummyFollowerData');
const achievement = require('./dummyAchievementData');
const achievementsEarned = require('./dummyAchievementsEarnedData');
const userInterests = require('./dummyUserInterestsData');
const goal = require('./dummyGoalData');
const ingredient = require('./dummyIngredientData');
const vitamins = require('./dummyVitaminsData');
const ingredientPerServing = require('./dummyIngredientPerServingData');
const ingredientPer100g = require('./dummyIngredientPer100g');
const meal = require('./dummyMealData');
const recipe = require('./dummyRecipeData');
const mealContainsRecipe = require('./dummyMealContainsRecipeData');
const admin = require(`./dummyAdminData`);
const review = require(`./dummyReviewData`);
const adminReview = require('./dummyAdminReviewData');
const recipeIngr = require('./dummyRecipeContainsIngredientData');
//import here


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nourishudb",
    dateStrings: 'date' //https://stackoverflow.com/questions/11187961/date-format-in-node-js
});

db.connect((err) => {
    if(err){
        throw(err);
    }
    
    console.log('MySQL connected');
})

const query = (q) => {
    return new Promise((resolve, reject) => {
        db.query(q, (err, res) => {
            if(err){
                return reject(err);
            }
            return resolve(res);
        })
    })
}

const checkTable = (check, q, data) => {
    return new Promise((resolve, reject) => {
        db.query(check, async (err, res) => {
            if(err){
                return reject(err);
            }

            console.log("no table found");
            console.log("creating table");
            await query(q);

            console.log("adding data to table");
            data.forEach(async e => {
                return resolve(query(e));
            })
        })
    })
}

const runQueries = async () => {
    const dropForeignKeyCheckPromise = [query(dropForeignKeyCheck)];
    const allTablesPromise = [query(findAllTables)];
    await Promise.all(dropForeignKeyCheckPromise, allTablesPromise);

    //add here
    const dropUserTablePromise = [query(dropUserTable)];
    const dropFollowsTablePromise = [query(dropFollowsTable)];
    const dropAchievementTablePromise = [query(dropAchievementTable)];
    const dropAchievementsEarnedTablePromise = [query(dropAchievementsEarnedTable)];
    const dropUserInterestsTablePromise = [query(dropUserInterestsTable)];
    const dropGoalTablePromise = [query(dropGoalTable)];
    const dropIngredientTablePromise = [query(dropIngredientTable)];
    const dropVitaminsTablePromise = [query(dropVitaminsTable)];
    const dropIngredientPerServingTablePromise = [query(dropIngredientPerServingTable)];
    const dropIngredientPer100gPromise = [query(dropIngredientPer100gTable)];
    const dropMealTablePromise = [query(dropMealTable)];
    const dropRecipeTablePromise = [query(dropRecipeTable)];
    const dropMealContainsRecipePromise = [query(dropMealContainsRecipeTable)];
    const dropAdminTablePromise = [query(dropAdminTable)];
    const dropReviewTablePromise = [query(dropReviewTable)];
    const dropAdminReviewTablePromise = [query(dropAdminReviewTable)];
    const dropRecipeIngrtTablePromise = [query(dropRecipeIngrTable)];

    //add to end of this
    await Promise.all(dropUserTablePromise, dropFollowsTablePromise, dropAchievementTablePromise,
        dropAchievementsEarnedTablePromise, dropUserInterestsTablePromise, dropGoalTablePromise,
        dropIngredientTablePromise, dropVitaminsTablePromise, dropIngredientPerServingTablePromise,
        dropIngredientPer100gPromise, dropMealTablePromise, dropRecipeTablePromise,
        dropMealContainsRecipePromise,dropAdminTablePromise, dropReviewTablePromise,
        dropAdminReviewTablePromise, dropRecipeIngrtTablePromise);

    const setForeignKeyCheckPromise = [query(setForeignKeyCheck)];
    await Promise.all(setForeignKeyCheckPromise);

    //add here
    const userPromise = [checkTable(users.checkTable, users.createTable, users.data)];
    const followsPromise = [checkTable(followers.checkTable, followers.createTable, followers.data)];
    const achievementPromise =[checkTable(achievement.checkTable, achievement.createTable, achievement.data)];
    const achievementsEarnedPromise = [checkTable(achievementsEarned.checkTable, achievementsEarned.createTable, achievementsEarned.data)];
    const userInterestsPromise = [checkTable(userInterests.checkTable, userInterests.createTable, userInterests.data)];
    const goalPromise = [checkTable(goal.checkTable, goal.createTable, goal.data)];
    const ingredientPromise = [checkTable(ingredient.checkTable, ingredient.createTable, ingredient.data)];
    const vitaminPromise = [checkTable(vitamins.checkTable, vitamins.createTable, vitamins.data)];
    const ingredientPerServingPromise = [checkTable(ingredientPerServing.checkTable, ingredientPerServing.createTable, ingredientPerServing.data)];
    const ingredientPer100gPromise = [checkTable(ingredientPer100g.checkTable, ingredientPer100g.createTable, ingredientPer100g.data)];
    const mealPromise = [checkTable(meal.checkTable, meal.createTable, meal.data)];
    const recipePromise = [checkTable(recipe.checkTable, recipe.createTable, recipe.data)];
    const mealContainsRecipePromise = [checkTable(mealContainsRecipe.checkTable, mealContainsRecipe.createTable, mealContainsRecipe.data)];
    const adminPromise = [checkTable(admin.checkTable, admin.createTable, admin.data)];
    const reviewPromise = [checkTable(review.checkTable, review.createTable, review.data)];
    const adminReviewPromise = [checkTable(adminReview.checkTable, adminReview.createTable, adminReview.data)];
    const recipeIngrPromise = [checkTable(recipeIngr.checkTable, recipeIngr.createTable, recipeIngr.data)];
    
    await Promise.all(userPromise, followsPromise, achievementPromise, achievementsEarnedPromise,
        userInterestsPromise, goalPromise, ingredientPromise, vitaminPromise,
        ingredientPerServingPromise, ingredientPer100gPromise, mealPromise, recipePromise,
        mealContainsRecipePromise,adminPromise, reviewPromise, adminReviewPromise, recipeIngrPromise);

    db.end((err) => {
        if(err){
            throw(err);
        }
    
        console.log('MySQL disconnected');
        console.log("Get Beaned!");
    })
}


runQueries();