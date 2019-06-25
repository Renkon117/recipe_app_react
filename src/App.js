import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from "./Recipe";
require('dotenv').config()


const App = () => {

  //variables should be prefixed with REACT_APP_

  const APP_ID = process.env.REACT_APP_ID;
  const APP_KEY = process.env.REACT_APP_KEY;

  const [recipes,setRecipes] = useState([]);
  

  //useEffect will run everytime the website renders a new change but it's should be avoided
  //putting empty array by [] works in here in order not to send billions of request by each render.
  useEffect(() =>{
    getRecipes();
  },[]);

  const getRecipes = async () => {
    //Do await in order to wait till information comes back cuz the info comes from other place
    //it takes time you know
    const response = await fetch(`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  return (
    <div className="App">
      <h1>Hello React</h1>
      <form className="search-form">
        <input className ="search-bar" type="text"/>
        <button className ="search-button" type="submit"> 
        Search
        </button>
      </form>

      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories ={recipe.recipe.calories}
        image ={recipe.recipe.image}
        />
      ))}
    </div>
  );
}

export default App;
