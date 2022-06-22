import axios from 'axios'

export const fetchImages = async (breeds) => await axios.all(breeds.map(breed => axios.get(`${process.env.REACT_APP_API_URL}/breed/${breed}/images`).then((response) => ({
  breed,
  images: response.data.message
}))))

export const fetchRandomImages = async () => await axios.get('https://dog.ceo/api/breeds/image/random/12').then((response) => {
  return response.data.message
})

