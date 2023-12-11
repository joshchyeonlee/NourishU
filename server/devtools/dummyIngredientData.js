//check table based off of:
//https://stackoverflow.com/questions/8829102/check-if-mysql-table-exists-without-using-select-from-syntax
const checkTable =
`SELECT * 
FROM information_schema.tables
WHERE table_schema = 'nourishudb' 
    AND table_name = 'INGREDIENT'
LIMIT 1;`;

const createTable = `
CREATE TABLE INGREDIENT (
    IngredientID    INT         NOT NULL    AUTO_INCREMENT,
    IngredientName  VARCHAR(50) NOT NULL,
    Carbs           FLOAT       NOT NULL,
    Protein         FLOAT       NOT NULL,
    SaturatedFats   FLOAT       NOT NULL,
    UnsaturatedFats FLOAT       NOT NULL,
    IsPerServing    BIT         NOT NULL,
    Calories        INT         NOT NULL,
    AdminID         INT         NOT NULL,
    DatePosted      DATE        NOT NULL,
    PRIMARY KEY (IngredientID, IngredientName)
)`;

const apple = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (1, "Apple", 25.0, 1.0, 0.0, 0.0, 1, 52, 0, '2023-11-20');`;
const bean = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (2, "Bean", 63.0, 21.0, 0.2, 1.0, 1, 347, 0, '2023-11-20');`;
const chicken = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (3, "Chicken", 0.0, 27.0, 3.8, 10.2, 0, 239, 0, '2023-11-20');`;
const beef = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (4, "Beef", 0.0, 26.0, 6.0, 7.9, 0, 250, 0, '2023-11-20');`;
const salmon = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (5, "Salmon", 0, 20.0, 3.1, 9.9, 0, 208, 0, '2023-11-20');`;
const shrimp = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (6, "Shrimp", 0, 0.2, 0.1, 0.2, 0, 99, 0, '2023-11-20');`;
const egg = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (7, "Egg", 0.6, 6, 1.6, 3.4, 1, 78, 0, '2023-11-20');`;
const rice = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (8, "Rice", 28.0, 2.7, 0.1, 0.2, 1, 130, 0, '2023-11-20');`;
const bread = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (9, "Bread", 6.0, 1.1, 0.1, 0.3, 0, 32, 0, '2023-11-20');`;
const cheese = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (10, "Cheese", 1.3, 25.0, 21.0, 12.0, 1, 402, 0, '2023-11-20');`;
const strawberry = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (11, "Strawberry", 2.07, 0.18, 0.08, 0.0, 1, 6, 0, '2023-11-20');`;
const banana = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (12, "Banana", 2.07, 0.18, 0.08, 0.0, 1, 6, 0, '2023-11-20');`;
const proteinPowder = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (13, "Protein Powder", 2.07, 18.05, 0.08, 0.0, 1, 150, 0, '2023-11-20');`
const milk = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (14, "Milk", 3.58, 7.45, 0.83, 23.90, 0, 200, 0, '2023-11-20');`
const pasta = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (15, "Pasta", 3.58, 7.45, 0.83, 23.90, 0, 200, 0, '2023-11-20');`
const tomatoSauce = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (16, "Tomato Sauce", 3.58, 7.45, 0.83, 23.90, 0, 50, 0, '2023-11-20');`
const tuna = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (17, "Tuna", 3.58, 7.45, 0.83, 23.90, 0, 54, 0, '2023-11-20');`
const mayo = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (18, "Mayonnaise", 3.58, 7.45, 0.83, 23.90, 0, 28, 0, '2023-11-20');`
const redPeppers = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (19, "Red Peppers", 3.58, 7.45, 0.83, 23.90, 0, 28, 0, '2023-11-20');`
const greenPeppers = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (20, "Green Peppers", 3.58, 7.45, 0.83, 23.90, 0, 28, 0, '2023-11-20');`
const sesameSeeds = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (21, "Sesame Seeds", 3.58, 7.45, 0.83, 23.90, 0, 15, 0, '2023-11-20');`
const carrot = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (22, "Carrot", 3.58, 7.45, 0.83, 23.90, 0, 30, 0, '2023-11-20');`
const mushroom = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (23, "Mushroom", 3.58, 7.45, 0.83, 23.90, 0, 40, 0, '2023-11-20');`
const yogurt = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (24, "Yogurt", 3.58, 7.45, 0.83, 2.0, 0, 30, 0, '2023-11-20');`

const data = [apple, bean, chicken, beef, salmon, shrimp, egg, rice, bread, cheese, strawberry, banana, proteinPowder, milk, pasta, tomatoSauce, tuna, mayo, redPeppers, greenPeppers, sesameSeeds, carrot, mushroom, yogurt];


module.exports = { checkTable, createTable, data };
