//check table based off of:
//https://stackoverflow.com/questions/8829102/check-if-mysql-table-exists-without-using-select-from-syntax
const checkTable =
`SELECT * 
FROM information_schema.tables
WHERE table_schema = 'nourishudb' 
    AND table_name = 'VITAMINS'
LIMIT 1;`;

const createTable =
`CREATE TABLE VITAMINS
(IngredientID		INT	 		NOT NULL,
VitaminName		VARCHAR		NOT NULL,
PRIMARY KEY(IngredientID),
FOREIGN KEY(IngredientID) REFERENCES INGREDIENT(IngredientID) 
ON UPDATE CASCADE)
`;

const vitaminA = `INSERT INTO VITAMINS(IngredientID, VitaminName) VALUES(0, "Vitamin A");`;
const vitaminC = `INSERT INTO VITAMINS(IngredientID, VitaminName) VALUES(1, "Vitamin C");`;
const vitaminD = `INSERT INTO VITAMINS(IngredientID, VitaminName) VALUES(2, "Vitamin D");`;
const vitaminE = `INSERT INTO VITAMINS(IngredientID, VitaminName) VALUES(3, "Vitamin E");`;
const vitaminK = `INSERT INTO VITAMINS(IngredientID, VitaminName) VALUES(4, "Vitamin K");`;
const vitaminB1 = `INSERT INTO VITAMINS(IngredientID, VitaminName) VALUES(5, "Vitamin B1");`;
const vitaminB2 = `INSERT INTO VITAMINS(IngredientID, VitaminName) VALUES(6, "Vitamin B2");`;
const vitaminB6 = `INSERT INTO VITAMINS(IngredientID, VitaminName) VALUES(7, "Vitamin B6");`;
const vitaminB12 = `INSERT INTO VITAMINS(IngredientID, VitaminName) VALUES(8, "Vitamin B12");`;

const data = [vitaminA, vitaminC, vitaminD, vitaminE, vitaminK, vitaminB1, vitaminB2, vitaminB6, vitaminB12];

module.exports = { checkTable, createTable, data};