export const getUser = async () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const ebid = JSON.parse(sessionStorage.getItem("ebid"));
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await fetch(
    `${process.env.REACT_APP_HOST}/600/users/${ebid}`,
    requestOptions
  );

  if (!res.ok) {
    throw { message: res.statusText, status: res.status };
  }

  const data = await res.json();
  return data;
};

export const getUserOrders = async () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const ebid = JSON.parse(sessionStorage.getItem("ebid"));
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await fetch(
    `${process.env.REACT_APP_HOST}/660/orders/?user.id=${ebid}`,
    requestOptions
  );
  if (!res.ok) {
    throw { message: res.statusText, status: res.status };
  }
  const data = await res.json();
  return data;
};

export const createOrder = async (cartList, total, user) => {
  if (cartList.length === 0) {
    alert("Cart is empty");
    return;
  }
  const token = JSON.parse(sessionStorage.getItem("token"));
  const order = {
    cartList,
    total,
    quantity: cartList.length,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  };
  const res = await fetch(
    `${process.env.REACT_APP_HOST}/660/orders`,
    requestOptions
  );

  if (!res.ok) {
    throw { message: res.statusText, status: res.status };
  }
  const data = await res.json();
  return data;
};
