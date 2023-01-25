import axios from "axios";

export const createCustomer = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginCustomer = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const createProduct = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};
