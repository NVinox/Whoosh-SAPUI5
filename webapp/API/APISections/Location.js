sap.ui.define([], () => {
  const _API = axios.create({
    baseURL: "https://api.whoosh.dev.pyrobyte.ru/api/location/",
  });

  return {
    // Получение списка городов в которых работает компания
    async companyCities() {
      let { data } = await _API.get("company-cities");

      return data;
    },
  };
});
