import { useEffect } from 'react'
import { Tree } from 'antd'
import { useQuery } from 'react-query'
import { useCategoriesStore } from '../../store/categories'

export const Filter = () => {
  const {
    allCategories,
    selectedCategories,
    setFilterTree,
    filterTree,
    filteredCategories,
    setFilteredCategories
  } = useCategoriesStore()
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
          key: uniqueSubBreed,
          title: subBreed
        }
      ]

      return accumulator
    }, {})

    breedsSelected.reduce((accumulator, breed) => {
      if (!accumulator[breed]) accumulator[breed] = {
        title: breed,
        key: breed,
        children: []
      }

      accumulator[breed].children = [
        ...accumulator[breed].children,
        ...allCategories.filter(breedObject => breedObject.value.split('/')[0] === breed && breedObject.value !== breed).map((subBreed) => ({
          key: subBreed.value,
          title: subBreed.value.split('/')[1]
        }))]

      return accumulator
    }, uniqueSubBreedFilter)

    uniqueSubBreedFilter['all'] = {
      key: 'all',
      title: 'All'
    }

    setFilterTree(uniqueSubBreedFilter)
  }, [data, selectedCategories, allCategories, setFilterTree])

  return <Tree
    showLine
    checkable
    blockNode
    defaultExpandedKeys={[]}
    onCheck={(keys) => {
      if (keys.includes('all')) {
        return setFilteredCategories(['all'])
      }
      setFilteredCategories(keys)
    }}
    checkedKeys={filteredCategories}
    treeData={Object.values(filterTree || {})}/>

}
