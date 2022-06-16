import { useState } from 'react'
import { useQuery } from 'react-query'
import LoadingIcon from 'antd/lib/button/LoadingIcon'
import { CategoriesContext } from '../../store/categories'
import { fetchCategories } from '../../queries'
import { Search } from './Search'
import { Filter } from './Filter'
import { Col, Layout, Row } from 'antd'
import { ImageGrid } from './ImageGrid'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'

export const Home = () => {
  const { data, isFetching, isSuccess } = useQuery('categories', fetchCategories)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [filteredCategories, setFilteredCategories] = useState(['all'])
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
    <Layout style={{ marginTop: 20 }}>
      <Sider style={{height: '100%'}}>
        <Filter/>
      </Sider>
      <Layout>
        <Content style={{padding: 10}}>
          <ImageGrid/>
        </Content>
      </Layout>
    </Layout>
  </CategoriesContext.Provider>
}
