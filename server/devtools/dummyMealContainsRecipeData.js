const checkTable =  `
SELECT * 
FROM information_schema.tables
WHERE table_schema = 'nourishudb' 
    AND table_name = 'MEAL_CONTAINS_RECIPE'
LIMIT 1;`;

const createTable = `
CREATE TABLE MEAL_CONTAINS_RECIPE
(MealID             INT         NOT NULL,
RecipeID            INT         NOT NULL,
QuantityConsumed    INT         NOT NULL,
PRIMARY KEY(MealID, RecipeID),
FOREIGN KEY(MealID) REFERENCES MEAL(MealID) ON UPDATE CASCADE,
FOREIGN KEY(RecipeID) REFERENCES RECIPE(RecipeID) ON UPDATE CASCADE);`;

const mealcr0 = `INSERT INTO MEAL_CONTAINS_RECIPE(MealID, RecipeID, QuantityConsumed) VALUES(0, 1, 1);`;
const mealcr1 = `INSERT INTO MEAL_CONTAINS_RECIPE(MealID, RecipeID, QuantityConsumed) VALUES(1, 2, 1);`;
const mealcr2 = `INSERT INTO MEAL_CONTAINS_RECIPE(MealID, RecipeID, QuantityConsumed) VALUES(2, 3, 1);`;
const mealcr3 = `INSERT INTO MEAL_CONTAINS_RECIPE(MealID, RecipeID, QuantityConsumed) VALUES(3, 1, 1);`;
const mealcr4 = `INSERT INTO MEAL_CONTAINS_RECIPE(MealID, RecipeID, QuantityConsumed) VALUES(4, 1, 1);`;
const mealcr5 = `INSERT INTO MEAL_CONTAINS_RECIPE(MealID, RecipeID, QuantityConsumed) VALUES(5, 1, 1);`;
const mealcr6 = `INSERT INTO MEAL_CONTAINS_RECIPE(MealID, RecipeID, QuantityConsumed) VALUES(6, 3, 1);`;

const data = [mealcr0, mealcr1, mealcr2, mealcr3, mealcr4, mealcr5, mealcr6];

module.exports = { checkTable, createTable, data };