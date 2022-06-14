import { createContext, useContext } from 'react'

export const CategoriesContext = createContext(null)

export const useCategoriesStore = () => useContext(CategoriesContext)
