import axios from 'axios';

const limit = 12;
const KEY = '30730953-a4b99fedc073d2eca0df8a6a8';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImages = async (query, page) => {
  const response = await axios.get(
    `?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${limit}`
  );
  return response.data;
};
