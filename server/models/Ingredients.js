module.exports = (sequelize, DataTypes) => {

    const Ingredients = sequelize.define("Ingredients", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        caloriesPerGram: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })

    return Ingredients;
}