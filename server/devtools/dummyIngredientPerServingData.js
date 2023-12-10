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

const apple = `INSERT INTO INGREDIENT_PER_SERVING(IngredientID, Weight) VALUES(1, 80)`
const bean = `INSERT INTO INGREDIENT_PER_SERVING(IngredientID, Weight) VALUES(2, 3)`
const egg = `INSERT INTO INGREDIENT_PER_SERVING(IngredientID, Weight) VALUES(7, 100)`
const rice = `INSERT INTO INGREDIENT_PER_SERVING(IngredientID, Weight) VALUES(8, 250)`
const cheese = `INSERT INTO INGREDIENT_PER_SERVING(IngredientID, Weight) VALUES(10, 100)`
const strawberry = `INSERT INTO INGREDIENT_PER_SERVING(IngredientID, Weight) VALUES(11, 90)`
const banana = `INSERT INTO INGREDIENT_PER_SERVING(IngredientID, Weight) VALUES(12, 100)`
const proteinPowder = `INSERT INTO INGREDIENT_PER_SERVING(IngredientID, Weight) VALUES(13, 100)`
const pasta = `INSERT INTO INGREDIENT_PER_SERVING(IngredientID, Weight) VALUES(15, 100)`
const tomatoSauce = `INSERT INTO INGREDIENT_PER_SERVING(IngredientID, Weight) VALUES(16, 70)`
const tuna = `INSERT INTO INGREDIENT_PER_SERVING(IngredientID, Weight) VALUES(17, 30)`
const redPeppers = `INSERT INTO INGREDIENT_PER_SERVING(IngredientID, Weight) VALUES(19, 5)`
const greenPeppers = `INSERT INTO INGREDIENT_PER_SERVING(IngredientID, Weight) VALUES(20, 5)`


const data = [apple, bean, egg, rice, cheese, strawberry, banana, proteinPowder, pasta, tomatoSauce, tuna, redPeppers, greenPeppers];

module.exports = { checkTable, createTable, data };