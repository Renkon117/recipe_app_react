import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from "./Recipe";
import { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } from 'constants';
require('dotenv').config()


const App = () => {

  //variables should be prefixed with REACT_APP_

  const APP_ID = process.env.REACT_APP_ID;
  const APP_KEY = process.env.REACT_APP_KEY;

  const [recipes,setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] =useState("chicken");
  

  //useEffect will run everytime the website renders a new change but it's should be avoided
  //putting empty array by [] works in here in order not to send billions of request by each render.
  useEffect(() =>{
    getRecipes();
  },[query]);

  const getRecipes = async () => {
    //Do await in order to wait till information comes back cuz the info comes from other place
    //it takes time you know
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return (
    <div className="App">
      <form onSubmit ={getSearch} className="search-form">
        <input className ="search-bar" type="text" value ={search} onChange={updateSearch}/>
        <button className ="search-button" type="submit"> 
        Search
        </button>
      </form>
      <div className="recipes">

      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories ={recipe.recipe.calories}
        image ={recipe.recipe.image}
        ingredients ={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
}

export default App;
