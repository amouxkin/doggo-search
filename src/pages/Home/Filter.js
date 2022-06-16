import { useEffect } from 'react'
import { Tree } from 'antd'
import { useQuery } from 'react-query'
import { useCategoriesStore } from '../../store/categories'

export const Filter = () => {
  const { allCategories, selectedCategories, setFilterTree, filterTree } = useCategoriesStore()
  const { data } = useQuery('images')

  // get current searched categories
  useEffect(() => {
    const subBreedsSelected = selectedCategories.filter(breedName => breedName.includes('/'))
    const breedsSelected = selectedCategories.filter(breedName => !subBreedsSelected.includes(breedName))
    const uniqueSubBreeds = subBreedsSelected.filter(subBreed => !breedsSelected.includes(subBreed.split('/')[0]))

    const uniqueSubBreedFilter = uniqueSubBreeds.reduce((accumulator, uniqueSubBreed) => {
      const [breed, subBreed] = uniqueSubBreed.split('/')
      if (!accumulator[breed]) accumulator[breed] = {
        title: breed,
        key: ['0', Object.keys(accumulator).length].join('-'),
        children: []
      }

      accumulator[breed].children = [
        ...accumulator[breed].children,
        {
          key: [breed, subBreed].join('-'),
          title: subBreed
        }
      ]

      return accumulator
    }, {})

    breedsSelected.reduce((accumulator, breed) => {
      if (!accumulator[breed]) accumulator[breed] = {
        title: breed,
        key: ['0', Object.keys(accumulator).length].join('-'),
        children: []
      }

      accumulator[breed].children = [
        ...accumulator[breed].children,
        ...allCategories.filter(breedObject => breedObject.value.split('/')[0] === breed && breedObject.value !== breed).map((subBreed, index) => ({
          key: [accumulator[breed].key, accumulator[breed].children.length + index].join('-'),
          title: subBreed.value.split('/')[1]
        }))]

      return accumulator
    }, uniqueSubBreedFilter)
    setFilterTree(uniqueSubBreedFilter)
  }, [data, selectedCategories, allCategories, setFilterTree])

  return <div>

    <Tree showLine
          blockNode
          defaultExpandedKeys={['0-0-0']}
          treeData={Object.values(filterTree || {})}/>
  </div>
}
