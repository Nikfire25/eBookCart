export const getProductList = async (searchTerm) => {
  const response = await fetch(
    `${process.env.REACT_APP_HOST}/444/products?name_like=${
      searchTerm ? searchTerm : ""
    }`
  );
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};

export const getProduct = async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_HOST}/444/products/${id}`
  );
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();

  return data;
};

export const getFeaturedProducts = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_HOST}/444/featured_products`
  );
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};
