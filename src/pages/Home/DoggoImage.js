import { Col, Image, Row, Tag } from 'antd'
import { useQuery } from 'react-query'
import { fetchRandomImages } from '../../queries'

export const DoggoImage = ({ imageUrl }) => {
  const [breed, subBreed] = imageUrl.split('/').splice(4, 1)[0].split('-')
  return <Col span={3}>
    <Row>
      <Image key={imageUrl} width={200} src={imageUrl}/>
    </Row>
    <Row>
      <Tag color={'success'}>{breed}</Tag>
      {subBreed && <Tag color="success">{subBreed}</Tag>}
    </Row>
  </Col>
}

export const RandomDoggoImage = () => {
  const { data, isFetching } = useQuery('randomImage', fetchRandomImages)

  if (isFetching) return <p>Loading</p>

  return data.map(imageUrl => <DoggoImage imageUrl={imageUrl}/>)
}
