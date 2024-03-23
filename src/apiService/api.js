import axios from "axios";

const ACCESS_KEY = "oLlKTfT9oQSa_eB7UcRbacb2ke1yLkSA9_LP6y3eVnI";
axios.defaults.baseURL = "https://api.unsplash.com/";
axios.defaults.params = {
  orientation: "landscape",
  per_page: 15,
};
export const getImages = async (query, page) => {
  const data = await axios.get(
    `search/photos?query=${query}&page=${page}&client_id=${ACCESS_KEY}`
  );
  return data;
};
