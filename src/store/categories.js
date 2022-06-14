import { createContext, useContext, useState } from 'react'

export const CategoriesContext = createContext(null)

export const useCategoriesStore = () => useContext(CategoriesContext)

export const CategoriesStore = (props) => {
  const [categories, setCategories] = useState(undefined)
  return <CategoriesContext.Provider value={{ categories, setCategories }} {...props}/>
}
