console.log("get ready to get beaned!!");

//based off of:
//https://tableplus.com/blog/2018/08/mysql-how-to-drop-all-tables.html
const findAllTables = 
`SELECT * 
FROM information_schema.tables
WHERE table_schema = 'nourishudb';`
const dropUserTable = `DROP TABLE IF EXISTS USER;`
const dropFollowsTable = `DROP TABLE IF EXISTS FOLLOWS;`
const dropForeignKeyCheck = `SET FOREIGN_KEY_CHECKS = 0;`
const SETForeignKeyCheck = `SET FOREIGN_KEY_CHECKS = 1;`

//based off of:
//https://stackoverflow.com/questions/8829102/check-if-mysql-table-exists-without-using-select-from-syntax
const checkUserTableExists =
`SELECT * 
FROM information_schema.tables
WHERE table_schema = 'nourishudb' 
    AND table_name = 'user'
LIMIT 1;`

const createUserTable =
`CREATE TABLE USER (
UserID              INT         NOT NULL,
UserName            VARCHAR(50) NOT NULL,
UserEmail           VARCHAR(50) NOT NULL,
UserBirthdate       DATE        NOT NULL,
UserHeight          INT         NOT NULL,
UserWeight          INT         NOT NULL,
UserAge             INT         NOT NULL,
DietName            VARCHAR(50) NOT NULL,
DietDescription     VARCHAR(50) NOT NULL,
CookingConfidence   INT         NOT NULL,
PRIMARY KEY(UserID),
UNIQUE (UserName),
UNIQUE (UserEmail));`;

const addUser0 = 
`INSERT INTO USER(UserId, UserName, UserEmail, UserBirthdate, UserHeight, UserWeight, UserAge, DietName, DietDescription, CookingConfidence)
VALUES(0, "josh", "josh@nourishu.com", '1997-02-01', 170, 70, 73, "Bean Eater", "Eat the bean", 5);`;
const addUser1 = 
`INSERT INTO USER(UserId, UserName, UserEmail, UserBirthdate, UserHeight, UserWeight, UserAge, DietName, DietDescription, CookingConfidence)
VALUES(1, "notJosh", "notjosh@nourishu.com", '1965-03-15', 190, 83, 13, "Carnivore", "Dude eat some veggies", 3);`;
const addUser2 = 
`INSERT INTO USER(UserId, UserName, UserEmail, UserBirthdate, UserHeight, UserWeight, UserAge, DietName, DietDescription, CookingConfidence)
VALUES(2, "definitelynotjosh", "whodis@nourishu.com", '1995-12-31', 154, 49, 28, "Vegetarian", "No meat, only bean", 5);`;
const addUser3 = 
`INSERT INTO USER(UserId, UserName, UserEmail, UserBirthdate, UserHeight, UserWeight, UserAge, DietName, DietDescription, CookingConfidence)
VALUES(3, "therealjosh", "josh4realz@nourishu.com", '1998-04-29', 169, 69, 25, "Carnivore", "No bean", 1);`;
const addUser4 = 
`INSERT INTO USER(UserId, UserName, UserEmail, UserBirthdate, UserHeight, UserWeight, UserAge, DietName, DietDescription, CookingConfidence)
VALUES(4, "beanman3000", "bean@nourishu.com", '1832-02-01', 300, 300, 420, "Bean Eater", "Eat the bean", 3);`;

const users = [addUser0, addUser1, addUser2, addUser3, addUser4];

const checkFollowsTableExists =
`SELECT * 
FROM information_schema.tables
WHERE table_schema = 'nourishudb' 
    AND table_name = 'FOLLOWS'
LIMIT 1;`;

const createFollowsTable=
`CREATE TABLE FOLLOWS (
FollowerUserID   INT NOT NULL,
FolloweeUserID  INT NOT NULL,
PRIMARY KEY(FollowerUserID, FolloweeUserID),
FOREIGN KEY(FollowerUserID) REFERENCES USER(UserID) ON UPDATE CASCADE,
FOREIGN KEY(FolloweeUserID) REFERENCES USER(UserID) ON UPDATE CASCADE);`;

const addFollower0 = `INSERT INTO FOLLOWS(FollowerUserID, FolloweeUserID) VALUES (0,1);`;
const addFollower1 = `INSERT INTO FOLLOWS(FollowerUserID, FolloweeUserID) VALUES (0,2);`;
const addFollower2 = `INSERT INTO FOLLOWS(FollowerUserID, FolloweeUserID) VALUES (0,3);`;
const addFollower3 = `INSERT INTO FOLLOWS(FollowerUserID, FolloweeUserID) VALUES (1,0);`;
const addFollower4 = `INSERT INTO FOLLOWS(FollowerUserID, FolloweeUserID) VALUES (3,0);`;
const addFollower5 = `INSERT INTO FOLLOWS(FollowerUserID, FolloweeUserID) VALUES (2,1);`;
const addFollower6 = `INSERT INTO FOLLOWS(FollowerUserID, FolloweeUserID) VALUES (1,3);`;

const followers = [addFollower0, addFollower1, addFollower2, addFollower3, addFollower4, addFollower5, addFollower6];

const mysql = require('mysql2');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nourishudb"
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
    const dropForeginKeyCheckPromise = [query(dropForeignKeyCheck)];
    const allTablesPromise = [query(findAllTables)];
    await Promise.all(dropForeginKeyCheckPromise, allTablesPromise);

    const dropUserTablePromise = [query(dropUserTable)];
    const dropFollowsTablePromise = [query(dropFollowsTable)];
    await Promise.all(dropUserTablePromise, dropFollowsTablePromise);

    const setForeignKeyCheckPromise = [query(SETForeignKeyCheck)];
    await Promise.all(setForeignKeyCheckPromise);

    const userPromise = [checkTable(checkUserTableExists, createUserTable, users)];
    const followsPromise = [checkTable(checkFollowsTableExists, createFollowsTable, followers)];
    await Promise.all(userPromise, followsPromise);

    db.end((err) => {
        if(err){
            throw(err);
        }
    
        console.log('MySQL disconnected');
        console.log("Get Beaned!");
    })
}


runQueries();