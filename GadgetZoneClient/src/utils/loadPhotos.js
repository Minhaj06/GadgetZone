import axios from "axios";

const loadPhotos = async (id) => {
  try {
    const { data } = await axios.get(`/product/photos/${id}`);
    return data?.photos;
  } catch (error) {
    console.error(error);
  }
};

export default loadPhotos;
