window.onload = function () {
    fetch('https://v8qw1eigab.execute-api.ap-southeast-2.amazonaws.com/prod/recipes')
        .then(response => response.json())
        .then(data => {
            const recipeList = document.getElementById('recipeList');
            const recipes = JSON.parse(data.body); // Parse the backend response body

            recipes.forEach(recipe => {
                // Extract actual values from the DynamoDB response
                const name = recipe.name.S; 
                const instructions = recipe.instructions.S;

                // Create and append recipe item to the list
                const recipeItem = document.createElement('div');
                recipeItem.textContent = `${name}: ${instructions}`;
                recipeList.appendChild(recipeItem);
            });
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });
};
