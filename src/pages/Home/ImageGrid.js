import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { Col, Image, Row, Tag } from 'antd'
import { useCategoriesStore } from '../../store/categories'

const interlaceImages = (breedList = [{ breed: '', images: [''] }]) => {
  if (breedList.length === 0) return []
  const maxLength = (breedList.sort((a, b) => a.images > b.images ? -1 : 1))[0].images.length

  const interlaced = []

  for (let i = 0; i < maxLength; i++) {
    breedList.forEach(breedObject => {
      if (breedObject.images[i]) {
        interlaced.push(breedObject.images[i])
      }
    })
  }

  return interlaced
}

export const ImageGrid = () => {
  const { data } = useQuery('images')
  const { filteredCategories, selectedCategories, allCategories } = useCategoriesStore()

  const filteredImages = useMemo(() => {
    const flattenedData = data.reduce((accumulator, breedOrSubBreed) => {
      if (breedOrSubBreed.breed.includes('/')) {
        accumulator.push(breedOrSubBreed)
      } else {
        const separatedSubBreeds = breedOrSubBreed.images.reduce((accumulator, imageUrl) => {
          const subBreedName = imageUrl.split('/').splice(4, 1)[0].replace('-', '/')
          accumulator[subBreedName] = [
            ...accumulator[subBreedName] || [],
            imageUrl
          ]
          return accumulator
        }, {})

        Object.entries(separatedSubBreeds).map(([breed, images]) => {
          accumulator.push({
            breed,
            images
          })
        })
      }

      return accumulator
    }, [])

    // Breeds Selected
    if (filteredCategories.includes('all') || selectedCategories.length === 0) {
      return interlaceImages(flattenedData)
    }

    return interlaceImages(flattenedData.filter(subBreedObject => filteredCategories.includes(subBreedObject.breed)))
  }, [data, filteredCategories])

  return <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify={data.length ? undefined : 'space-around'}
              align="middle">

    {data.length ? filteredImages.map(imageUrl => {
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
    }) : <Col className="gutter-row" span={6}>'Search to View Images' </Col>}

  </Row>
}
