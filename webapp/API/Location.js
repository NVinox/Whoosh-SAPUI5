sap.ui.define([], () => {
  const _API = axios.create({
    baseURL: "https://api.whoosh.dev.pyrobyte.ru/api/location/",
  });

  return {
    async places() {
      let { data } = await _API.get("places");

      return data;
    },
  };
});
