const checkTable =  `
SELECT * 
FROM information_schema.tables
WHERE table_schema = 'nourishudb' 
    AND table_name = 'RECIPE_CONTAINS_INGREDIENT'
LIMIT 1;`;

const createTable = `
CREATE TABLE RECIPE_CONTAINS_INGREDIENT
(RecipeID		    INT		NOT NULL,
IngredientID		INT		NOT NULL,
AmountIngredient    INT     NOT NULL,
PRIMARY KEY(RecipeID, IngredientID),
FOREIGN KEY(IngredientID) REFERENCES INGREDIENT(IngredientID) 
ON UPDATE CASCADE);`;

const proteinShake_Powder = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient)
VALUES(1, 13, 1);`;
const proteinShake_Banana = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient)
VALUES(1, 12, 1);`;
const proteinShake_Milk = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient)
VALUES(1, 14, 150);`;

const data = [proteinShake_Powder, proteinShake_Banana, proteinShake_Milk];

module.exports = { checkTable, createTable, data };
