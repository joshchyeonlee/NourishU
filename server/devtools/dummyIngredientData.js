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
    IngredientID    INT         NOT NULL,
    IngredientName  VARCHAR(50) NOT NULL,
    Carbs           FLOAT       NOT NULL,
    Protein         FLOAT       NOT NULL,
    SaturatedFats   FLOAT       NOT NULL,
    UnsaturatedFats FLOAT       NOT NULL,
    IsPerServing    INT         NOT NULL,
    Calories        INT         NOT NULL,
    AdminID         INT         NOT NULL,
    DatePosted      DATE        NOT NULL,
    PRIMARY KEY (IngredientID, IngredientName)
)`;

const apple = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (01, "Apple", 25.0, 1.0, 0.0, 0.0, 100, 52, 0, '2023-11-20');`;
const bean = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (02, "Bean", 63.0, 21.0, 0.2, 1.0, 100, 347, 0, '2023-11-20');`;
const chicken = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (03, "Chicken", 0.0, 27.0, 3.8, 10.2, 100, 239, 0, '2023-11-20');`;
const beef = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (04, "Beef", 0.0, 26.0, 6.0, 7.9, 100, 250, 0, '2023-11-20');`;
const salmon = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (05, "Salmon", 0, 20.0, 3.1, 9.9, 100, 208, 0, '2023-11-20');`;
const shrimp = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (06, "Shrimp", 0, 0.2, 0.1, 0.2, 100, 99, 0, '2023-11-20');`;
const egg = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (07, "Egg", 0.6, 6, 1.6, 3.4, 50, 78, 0, '2023-11-20');`;
const rice = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (08, "Rice", 28.0, 2.7, 0.1, 0.2, 100, 130, 0, '2023-11-20');`;
const bread = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (09, "Bread", 6.0, 1.1, 0.1, 0.3, 12, 32, 0, '2023-11-20');`;
const cheese = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (10, "Cheese", 1.3, 25.0, 21.0, 12.0, 100, 402, 0, '2023-11-20');`;
const strawberry = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (11, "Strawberry", 2.07, 0.18, 0.08, 0.0, 20, 6, 0, '2023-11-20');`;
const banana = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (12, "Banana", 2.07, 0.18, 0.08, 0.0, 20, 6, 0, '2023-11-20');`;
const vA = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (0, "Vitamin A", 0.0, 0.1, 0.0, 0.0, 5, 0, 0, '2023-11-20');`;
const vC = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (1, "Vitamin C", 0.0, 0.1, 0.0, 0.0, 5, 0, 0, '2023-11-20');`;
const vD = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (2, "Vitamin D", 0.0, 0.1, 0.0, 0.0, 5, 0, 0, '2023-11-20');`;
const vE = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (3, "Vitamin E", 0.0, 0.1, 0.0, 0.0, 5, 0, 0, '2023-11-20');`;
const vK = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (4, "Vitamin K", 0.0, 0.1, 0.0, 0.0, 5, 0, 0, '2023-11-20');`;
const vB1 = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (5, "Vitamin B1", 0.0, 0.1, 0.0, 0.0, 5, 0, 0, '2023-11-20');`;
const vB2 = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (6, "Vitamin B2", 0.0, 0.1, 0.0, 0.0, 5, 0, 0, '2023-11-20');`;
const vB6 = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (7, "Vitamin B6", 0.0, 0.1, 0.0, 0.0, 5, 0, 0, '2023-11-20');`;
const vB12 = `INSERT INTO INGREDIENT(IngredientID, IngredientName, Carbs, Protein, SaturatedFats, UnsaturatedFats, IsPerServing, Calories, AdminID, DatePosted) VALUES (8, "Vitamin B12", 0.0, 0.1, 0.0, 0.0, 5, 0, 0, '2023-11-20');`;


const data = [apple, bean, chicken, beef, salmon, shrimp, egg, rice, bread, cheese, strawberry, banana, vA, vC, vD, vE, vK, vB1, vB2, vB6, vB12];

module.exports = { checkTable, createTable, data };