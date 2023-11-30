const formatRecipeData = (data) =>{
    const rTitles = [...new Set(data.map(val => val.RecipeTitle))];
    var totalCalories = 0;
    var totalProtein = 0;
    var totalSaturatedFats = 0;
    var totalUnsaturatedFats = 0;
    var totalCarbohydrates = 0;
    const recipeIngr = [];

    rTitles.forEach((value) => {
        var arr = (data.filter((val) => val.RecipeTitle === value))
        
        const recipeIngredient = {
            recipeID: arr[0].RecipeID,
            recipeTitle: value,
            ingredients: arr.map(val => val.IngredientName),
            ingredientIDs: arr.map(val => val.IngredientID),
            ingredientAmtConsumed: arr[0].AmountIngredient,
            quantityConsumed: arr[0].QuantityConsumed,
        }

        var calories = 0;
        var protein = 0;
        var saturatedFats = 0;
        var unsaturatedFats = 0;
        var carbohydrates = 0;

        for(var i = 0; i < arr.length; i++){
            var amt = 1;
            console.log(arr[i]);
            if(arr[i].IsPerServing.data[0]){
                amt = arr[i].AmountIngredient;
            }
            calories += amt * arr[i].Calories;
            protein += amt * arr[i].Protein;
            saturatedFats += amt * arr[i].SaturatedFats;
            unsaturatedFats += amt * arr[i].UnsaturatedFats;
            carbohydrates += amt * arr[i].Carbs;
        }

        var totalFats = saturatedFats + unsaturatedFats;

        recipeIngredient.calories = calories;
        recipeIngredient.protein = protein;
        recipeIngredient.saturatedFats = saturatedFats;
        recipeIngredient.unsaturatedFats = unsaturatedFats;
        recipeIngredient.totalFats = totalFats;
        recipeIngredient.carbohydrates = carbohydrates;

        var mult = recipeIngredient.quantityConsumed;
        if(!mult) mult = 1;

        totalCalories += (calories * mult);
        totalProtein += Number(mult * protein).toFixed(2);
        totalSaturatedFats += Number(mult * saturatedFats).toFixed(2);
        totalUnsaturatedFats += Number(mult * unsaturatedFats).toFixed(2);
        totalCarbohydrates += Number(mult * carbohydrates).toFixed(2);

        recipeIngr.push(recipeIngredient);
    })

    const obj = {
        totalCalories: Number(totalCalories),
        totalProtein: Number(totalProtein),
        totalSaturatedFats: Number(totalSaturatedFats),
        totalUnsaturatedFats: Number(totalUnsaturatedFats),
        totalCarbohydrates: Number(totalCarbohydrates),
        recipeIngredients: recipeIngr,
    }

    return obj;
}

export default formatRecipeData;