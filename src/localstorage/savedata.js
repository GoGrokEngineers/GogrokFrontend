const SaveData = (data) => {
  localStorage.setItem("data", JSON.stringify(data));
};
const GetData = (key) => {
  const getData = JSON.parse(localStorage.getItem(key));
  return getData;
};

const RemoveData = (key) => {
  localStorage.removeItem(key);
};


export { SaveData, GetData, RemoveData };
