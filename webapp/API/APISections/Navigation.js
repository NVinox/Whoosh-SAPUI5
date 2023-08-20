sap.ui.define([], () => {
  const _API = axios.create({
    baseURL: "https://api.whoosh.dev.pyrobyte.ru/api/reference/",
  });

  return {
    // Получаем панели навигации
    async navigation() {
      let { data } = await _API.get("navigation");

      return data;
    },
  };
});
