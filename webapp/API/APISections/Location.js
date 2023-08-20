sap.ui.define([], () => {
  const _API = axios.create({
    baseURL: "https://api.whoosh.dev.pyrobyte.ru/api/location/",
  });

  return {
    // Получение штатов
    async states() {
      let { data } = await _API.get("states");

      return data;
    },

    // Получение списка городов в которых работает компания
    async companyCities() {
      let { data } = await _API.get("company-cities");

      return data;
    },

    // Получение местоположений
    async places() {
      let { data } = await _API.get("places");

      return data;
    },
  };
});
