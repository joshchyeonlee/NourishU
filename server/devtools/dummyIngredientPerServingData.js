//check table based off of:
//https://stackoverflow.com/questions/8829102/check-if-mysql-table-exists-without-using-select-from-syntax
const checkTable =
`SELECT * 
FROM information_schema.tables
WHERE table_schema = 'nourishudb' 
    AND table_name = 'INGREDIENT_PER_SERVING'
LIMIT 1;`;

const createTable = `
CREATE TABLE INGREDIENT_PER_SERVING
(
    IngredientID INT NOT NULL,
    Weight INT NOT NULL,
    PRIMARY KEY (IngredientID),
    FOREIGN KEY (IngredientID) REFERENCES INGREDIENT(IngredientID) ON UPDATE CASCADE
);`;

const apple = `INSERT INTO INGREDIENT_PER_SERVING(IngredientID, Weight) VALUES(01, 100)`
const bean = `INSERT INTO INGREDIENT_PER_SERVING(IngredientID, Weight) VALUES(02, 100)`
const chicken = `INSERT INTO INGREDIENT_PER_SERVING(IngredientID, Weight) VALUES(03, 100)`
const beef = `INSERT INTO INGREDIENT_PER_SERVING(IngredientID, Weight) VALUES(04, 100)`
const salmon = `INSERT INTO INGREDIENT_PER_SERVING(IngredientID, Weight) VALUES(05, 100)`
const shrimp = `INSERT INTO INGREDIENT_PER_SERVING(IngredientID, Weight) VALUES(06, 100)`
const egg = `INSERT INTO INGREDIENT_PER_SERVING(IngredientID, Weight) VALUES(07, 100)`
const rice = `INSERT INTO INGREDIENT_PER_SERVING(IngredientID, Weight) VALUES(08, 100)`
const bread = `INSERT INTO INGREDIENT_PER_SERVING(IngredientID, Weight) VALUES(09, 100)`
const cheese = `INSERT INTO INGREDIENT_PER_SERVING(IngredientID, Weight) VALUES(10, 100)`
const strawberry = `INSERT INTO INGREDIENT_PER_SERVING(IngredientID, Weight) VALUES(11, 100)`
const banana = `INSERT INTO INGREDIENT_PER_SERVING(IngredientID, Weight) VALUES(12, 100)`



const data = [apple, bean, chicken, beef, salmon, shrimp, egg, rice, bread, cheese, strawberry, banana];

module.exports = { checkTable, createTable, data };