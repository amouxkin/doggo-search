import { useState } from 'react'
import { useQuery } from 'react-query'
import LoadingIcon from 'antd/lib/button/LoadingIcon'
import { CategoriesContext } from '../../store/categories'
import { fetchCategories } from '../../queries'
import { Search } from './Search'
import { Filter } from './Filter'
import { Col, Row } from 'antd'

export const Home = () => {
  const { data, isFetching, isSuccess } = useQuery('categories', fetchCategories)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [filteredCategories, setFilteredCategories] = useState([])
  const [filterTree, setFilterTree] = useState()
  if (isFetching) return <LoadingIcon/>

  if (isSuccess) return <CategoriesContext.Provider
    value={{
      allCategories: data,
      setSelectedCategories,
      selectedCategories,
      filterTree,
      setFilterTree,
      filteredCategories,
      setFilteredCategories
    }}>
    <Search/>
    <Row>
      <Col>
        <Filter/>
      </Col>
      <Col>

      </Col>
    </Row>
  </CategoriesContext.Provider>
}
