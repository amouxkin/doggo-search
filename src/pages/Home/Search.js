import { useState } from 'react'
import { Button, Col, Row, Select } from 'antd'
import { useQuery } from 'react-query'
import { fetchImages } from '../../queries'
import { useCategoriesStore } from '../../store/categories'

export const Search = () => {
  const categories = useCategoriesStore()
  const [value, setValue] = useState([])
  const { refetch, isFetching } = useQuery('images', async () => await fetchImages(value), { enabled: false })

  return <Row justify={'center'}>
    <Col>
      <Select style={{ width: 300 }} value={value}
              onChange={newValues => newValues.length <= 5 && setValue(newValues)}
              options={categories} mode={'multiple'}
              placeholder={'Search'}/>
    </Col>
    <Col>
      <Button disabled={!value.length || isFetching}
              onClick={refetch}>Search</Button>
    </Col>
  </Row>

}
