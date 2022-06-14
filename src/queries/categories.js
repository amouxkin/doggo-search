import axios from 'axios'

export const fetchCategories = async () => {
  let { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/breeds/list/all`
  )

  return data.message
}
