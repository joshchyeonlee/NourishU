//check table based off of:
//https://stackoverflow.com/questions/8829102/check-if-mysql-table-exists-without-using-select-from-syntax
const checkTable =
`SELECT * 
FROM information_schema.tables
WHERE table_schema = 'nourishudb' 
    AND table_name = 'INGREDIENT_PER_100g'
LIMIT 1;`;

const createTable = `
CREATE TABLE INGREDIENT_PER_100g
(
    IngredientID INT NOT NULL,
    ServingSize INT NOT NULL,
    PRIMARY KEY (IngredientID),
    FOREIGN KEY (IngredientID) REFERENCES INGREDIENT (IngredientID) ON UPDATE CASCADE
);`;

const chicken = `INSERT INTO INGREDIENT_PER_100g(IngredientID, ServingSize) VALUES(3, 250)`
const beef = `INSERT INTO INGREDIENT_PER_100g(IngredientID, ServingSize) VALUES(4, 200)`
const salmon = `INSERT INTO INGREDIENT_PER_100g(IngredientID, ServingSize) VALUES(5, 300)`
const shrimp = `INSERT INTO INGREDIENT_PER_100g(IngredientID, ServingSize) VALUES(6, 250)`
const bread = `INSERT INTO INGREDIENT_PER_100g(IngredientID, ServingSize) VALUES(9, 100)`
const milk = `INSERT INTO INGREDIENT_PER_100g(IngredientID, ServingSize) VALUES(14, 200)`
const mayo = `INSERT INTO INGREDIENT_PER_100g(IngredientID, ServingSize) VALUES(18, 100)`
const sesameSeeds = `INSERT INTO INGREDIENT_PER_100g(IngredientID, ServingSize) VALUES(21, 100)`
const carrot = `INSERT INTO INGREDIENT_PER_100g(IngredientID, ServingSize) VALUES(22, 100)`
const mushroom = `INSERT INTO INGREDIENT_PER_100g(IngredientID, ServingSize) VALUES(23, 100)`
const yogurt = `INSERT INTO INGREDIENT_PER_100g(IngredientID, ServingSize) VALUES(24, 100)`

const data = [chicken, beef, salmon, shrimp, bread, milk, mayo, sesameSeeds, carrot, mushroom, yogurt];

module.exports = { checkTable, createTable, data };