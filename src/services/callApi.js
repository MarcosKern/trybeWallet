const CURRENCIE_ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';

const callApi = async () => {
  const response = await fetch(CURRENCIE_ENDPOINT);
  const currecieList = await response.json();

  return Promise.resolve(currecieList);
};

export default callApi;
