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
const dropAdminTable = `DROP TABLE IF EXISTS ADMIN;`;
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
const admin = require(`./dummyAdminData`);
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
    const dropAdminTablePromise = [query(dropAdminTable)];

    //add to end of this
    await Promise.all(dropUserTablePromise, dropFollowsTablePromise, dropAchievementTablePromise, dropAchievementsEarnedTablePromise, dropUserInterestsTablePromise, dropGoalTablePromise, dropAdminTablePromise);

    const setForeignKeyCheckPromise = [query(setForeignKeyCheck)];
    await Promise.all(setForeignKeyCheckPromise);

    //add here
    const userPromise = [checkTable(users.checkTable, users.createTable, users.data)];
    const followsPromise = [checkTable(followers.checkTable, followers.createTable, followers.data)];
    const achievementPromise =[checkTable(achievement.checkTable, achievement.createTable, achievement.data)];
    const achievementsEarnedPromise = [checkTable(achievementsEarned.checkTable, achievementsEarned.createTable, achievementsEarned.data)];
    const userInterestsPromise = [checkTable(userInterests.checkTable, userInterests.createTable, userInterests.data)];
    const goalPromise = [checkTable(goal.checkTable, goal.createTable, goal.data)];
    const adminPromise = [checkTable(admin.checkTable, admin.createTable, admin.data)];
    
    //add to end of this
    await Promise.all(userPromise, followsPromise, achievementPromise, achievementsEarnedPromise, userInterestsPromise, goalPromise, adminPromise);

    db.end((err) => {
        if(err){
            throw(err);
        }
    
        console.log('MySQL disconnected');
        console.log("Get Beaned!");
    })
}


runQueries();