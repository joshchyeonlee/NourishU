console.log("get ready to get beaned!!");

//based off of:
//https://stackoverflow.com/questions/8829102/check-if-mysql-table-exists-without-using-select-from-syntax
const checkUserTableExists =
`SELECT * 
FROM information_schema.tables
WHERE table_schema = 'nourishudb' 
    AND table_name = 'user'
LIMIT 1;`

const removeUsersFromUser = 
`DELETE FROM User`

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

query = (q) => {
    return new Promise((resolve, reject) => {
        db.query(q, (err, res) => {
            if(err){
                return reject(err);
            }
            return resolve(res);
        })
    })
}

checkTable = (check, q, rem, data) => {
    return new Promise((resolve, reject) => {
        db.query(check, async (err, res) => {
            if(err){
                return reject(err);
            }

            if(res[0]){
                console.log("found table");
                console.log("removing data in table");
                await query(rem);
            } else {
                console.log("no table found");
                console.log("creating table");
                await query(q);
            }

            console.log("adding data to table");
            data.forEach(async e => {
                return resolve(query(e));
            })
        })
    })
}

const runQueries = async () => {
    const promise = [checkTable(checkUserTableExists, createUserTable, removeUsersFromUser, users)];
    const result = await Promise.all(promise);

    db.end((err) => {
        if(err){
            throw(err);
        }
    
        console.log('MySQL disconnected');
        console.log("Get Beaned!");
    })
}


runQueries();