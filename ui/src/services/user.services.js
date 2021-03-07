import axios from "axios";
//API Endpoint
const apiUrl = `http://localhost:5000`;

//Fetch all users
export const loadUsers = async () => {
  return await axios.get(apiUrl + "/persons/all");
};

//Login with username and password
export const loginUser = async (userName, password) => {
  return await axios.post(apiUrl + "/persons", {
    userName,
    password,
  });
};

//Register using Name, Username and Password
export const registerUser = async (name, userName, password) => {
  return await axios.put(apiUrl + "/persons", {
    name,
    userName,
    password,
  });
};

//Update name of user using id
export const updateUser = async (name, id) => {
  return await axios.put(apiUrl + "/persons/update", {
    name,
    id,
  });
};

//Delete a user using id
export const deleteUser = async (id) => {
  return await axios.delete(apiUrl + "/persons/" + id);
};
