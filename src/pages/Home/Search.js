import { Button, Col, Row, Select } from 'antd'
import { useState } from 'react'
import { useCategoriesStore } from '../../store/categories'

export const Search = () => {
  const categories = useCategoriesStore()
  const [value, setValue] = useState([])

  return <Row justify={'center'}>
    <Col>
      <Select style={{ width: 300 }} value={value} onChange={setValue} options={categories} mode={'multiple'}
              placeholder={'Search'} maxTagCount={5}/>
    </Col>
    <Col>
      <Button disabled={!value.length}>Search</Button>
    </Col>
  </Row>

}
