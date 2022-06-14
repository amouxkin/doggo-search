import axios from 'axios'

export const fetchCategories = async () => {
  let { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/breeds/list/all`
  )

  return Object.entries(data.message).reduce((previousValue, [breed, subBreeds]) => {
    // Pushes the breed name
    previousValue.push(breed)
    // Pushes all the sub-breed
    if (!!subBreeds.length) subBreeds.forEach(subBreed => previousValue.push(`${breed}/${subBreed}`))
    return previousValue
  }, [])
}
