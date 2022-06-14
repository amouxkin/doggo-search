import axios from 'axios'
import { capitalise } from '../utilities/string'

export const fetchCategories = async () => {
  let { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/breeds/list/all`
  )

  return Object.entries(data.message).reduce((previousValue, [breed, subBreeds]) => {
    // Pushes the breed name
    previousValue.push({ label: capitalise(breed), value: breed })
    // Pushes all the sub-breed
    if (!!subBreeds.length) subBreeds.forEach(subBreed => previousValue.push({
      label: capitalise(subBreed),
      value: `${breed}/${subBreed}`
    }))
    return previousValue
  }, [])
}
