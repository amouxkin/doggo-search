import { useQuery } from 'react-query'
import LoadingIcon from 'antd/lib/button/LoadingIcon'
import { CategoriesContext } from '../../store/categories'
import { fetchCategories } from '../../queries'
import { Search } from './Search'

export const Home = () => {
  const { data, isFetching, isSuccess } = useQuery('categories', fetchCategories)

  if (isFetching) return <LoadingIcon/>

  if (isSuccess) return <CategoriesContext.Provider value={data}>
    <Search/>
  </CategoriesContext.Provider>
}
