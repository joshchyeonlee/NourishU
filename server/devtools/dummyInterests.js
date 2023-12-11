//check table based off of:
//https://stackoverflow.com/questions/8829102/check-if-mysql-table-exists-without-using-select-from-syntax
const checkTable =`
SELECT * 
FROM information_schema.tables
WHERE table_schema = 'nourishudb' 
    AND table_name = 'INTERESTS'
LIMIT 1;`;

const createTable=`
CREATE TABLE INTERESTS (
InterestID          INT             NOT NULL,
InterestName        VARCHAR(50)     NOT NULL,
PRIMARY KEY(InterestID));`;

const interest0 = `
INSERT INTO INTERESTS (InterestID, InterestName)
VALUES (0, "Reading");`

const interest1 = `
INSERT INTO INTERESTS (InterestID, InterestName)
VALUES (1, "Video Games");`

const interest2 = `
INSERT INTO INTERESTS (InterestID, InterestName)
VALUES (2, "Travelling");`

const interest3 = `
INSERT INTO INTERESTS (InterestID, InterestName)
VALUES (3, "Cooking");`

const interest4 = `
INSERT INTO INTERESTS (InterestID, InterestName)
VALUES (4, "Sports");`

const interest5 = `
INSERT INTO INTERESTS (InterestID, InterestName)
VALUES (5, "Programming/Coding");`

const interest6 = `
INSERT INTO INTERESTS (InterestID, InterestName)
VALUES (6, "Dancing");`

const interest7 = `
INSERT INTO INTERESTS (InterestID, InterestName)
VALUES (7, "Fitness");`

const interest8 = `
INSERT INTO INTERESTS (InterestID, InterestName)
VALUES (8, "Fashion");`

const interest9 = `
INSERT INTO INTERESTS (InterestID, InterestName)
VALUES (9, "Technology");`

const interest10 = `
INSERT INTO INTERESTS (InterestID, InterestName)
VALUES (10, "Movies and Tv Shows");`

const data = [interest0, interest1, interest2, interest3, interest4, interest5, interest6, 
    interest7, interest8, interest9, interest10];

module.exports = { checkTable, createTable, data };