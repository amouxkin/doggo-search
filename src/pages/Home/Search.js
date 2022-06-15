import { Button, Col, Row, Select } from 'antd'
import { useQuery } from 'react-query'
import { fetchImages } from '../../queries'
import { useCategoriesStore } from '../../store/categories'

export const Search = () => {
  const { allCategories, setSelectedCategories, selectedCategories } = useCategoriesStore()
  const { refetch, isFetching } = useQuery('images', async () => await fetchImages(selectedCategories), { enabled: false })

  return <Row justify={'center'}>
    <Col>
      <Select style={{ width: 300 }} value={selectedCategories}
              onChange={newValues => newValues.length <= 5 && setSelectedCategories(newValues)}
              options={allCategories} mode={'multiple'}
              placeholder={'Search'}/>
    </Col>
    <Col>
      <Button disabled={!selectedCategories.length || isFetching}
              onClick={refetch}>Search</Button>
    </Col>
  </Row>

}
