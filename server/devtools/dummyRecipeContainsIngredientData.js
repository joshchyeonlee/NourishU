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
VALUES(4, 16, 1);`;
const pasta_noodles = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient)
VALUES(4, 15, 1);`;
const pasta_beef = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient)
VALUES(4, 4, 1);`;
const tunaSand_bread = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient)
VALUES(5, 9, 2);`;
const tunaSand_tuna = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient)
VALUES(5, 17, 1);`;
const tunaSand_mayo = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient)
VALUES(5, 18, 1);`;
const chickenStirFry_rice = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient)
VALUES(6, 8, 3);`;
const chickenStirFry_chicken = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient)
VALUES(6, 3, 2);`;
const chickenStirFry_sesameSeed = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient)
VALUES(6, 21, 1);`;
const chickenStirFry_carrot = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient)
VALUES(6, 22, 2);`;
const chickenStirFry_mushroom = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient)
VALUES(6, 23, 2);`;
const chickenStirFry_redPepper = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient)
VALUES(6, 19, 2);`;
const chickenStirFry_greenPepper = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient)
VALUES(6, 20, 1);`;
const macAndCheese_pasta = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient)
VALUES(7, 15, 1);`;
const macAndCheese_cheese = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient)
VALUES(7, 10, 1);`;
const strawBanSmoothie_strawberry = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient)
VALUES(8, 11, 1);`;
const strawBanSmoothie_banana = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient)
VALUES(8, 12, 1);`;
const strawBanSmoothie_milk = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient)
VALUES(8, 14, 1);`;
const strawBanSmoothie_yogurt = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient)
VALUES(8, 24, 1);`;
const steak_beef = `INSERT INTO RECIPE_CONTAINS_INGREDIENT(RecipeID, IngredientID, AmountIngredient)
VALUES(3, 4, 100);`;

const data = [proteinShake_Powder, proteinShake_Banana, proteinShake_Milk, chili_ingr1, chili_ingr2, chili_ingr3, pasta_tomato, pasta_noodles, pasta_beef, tunaSand_bread, tunaSand_mayo, tunaSand_tuna, chickenStirFry_rice, chickenStirFry_chicken, chickenStirFry_sesameSeed, chickenStirFry_carrot, chickenStirFry_mushroom, chickenStirFry_redPepper, chickenStirFry_greenPepper, macAndCheese_pasta, macAndCheese_cheese,
strawBanSmoothie_strawberry, strawBanSmoothie_banana, strawBanSmoothie_milk, strawBanSmoothie_yogurt, steak_beef];

module.exports = { checkTable, createTable, data };
