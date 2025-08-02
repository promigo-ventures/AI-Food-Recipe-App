import React from 'react'
import Main from './Main'
import ReactMarkdown from "react-markdown"

const PromigoRecipe = ({recipe}) => {
  
  return (

  <section className="suggested-recipe-container" aria-live="polite">
<h2>Chef Promigo Recommends:  </h2>
<ReactMarkdown>
{recipe}
</ReactMarkdown>
</section>
  )
}

export default PromigoRecipe