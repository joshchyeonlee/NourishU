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
const chili_ingr1 = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient)
VALUES(2, 4, 150);`;
const chili_ingr2 = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient)
VALUES(2, 8, 100);`;
const chili_ingr3 = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient)
VALUES(2, 10, 10);`;
const pasta_tomato = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient)
VALUES(3, 16, 1);`;
const pasta_noodles = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient)
VALUES(3, 15, 1);`;
const pasta_beef = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient)
VALUES(3, 4, 1);`;

const data = [proteinShake_Powder, proteinShake_Banana, proteinShake_Milk, chili_ingr1, chili_ingr2, chili_ingr3, pasta_tomato, pasta_noodles, pasta_beef];

module.exports = { checkTable, createTable, data };
