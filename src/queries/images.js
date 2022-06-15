import axios from 'axios'

export const fetchImages = async (breeds) => {
  console.log(breeds)
  return await axios.all(breeds.map(breed => axios.get(`${process.env.REACT_APP_API_URL}/breed/${breed}/images`).then((response) => ({
    breed,
    images: response.data.message
  }))))
}
