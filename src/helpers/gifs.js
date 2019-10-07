export const getGifsFromResponse = (response, ids) => {
  return response.map(gif => ({
    url: gif.images.original.url,
    title: gif.title,
    id: gif.id,
    favourite: ids.indexOf(gif.id) > -1
  }));
};
