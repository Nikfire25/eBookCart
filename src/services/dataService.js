// utils/api.js

const getAuthData = () => {
  const token = JSON.parse(sessionStorage.getItem("token") || "null");
  const ebid = JSON.parse(sessionStorage.getItem("ebid") || "null");

  if (!token || !ebid) {
    throw new Error("User not authenticated");
  }

  return { token, ebid };
};

// ==========================
// GET USER
// ==========================
export const getUser = async () => {
  const { token, ebid } = getAuthData();

  const res = await fetch(`${process.env.REACT_APP_HOST}/600/users/${ebid}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  return await res.json();
};

// ==========================
// GET USER ORDERS
// ==========================
export const getUserOrders = async () => {
  const { token, ebid } = getAuthData();

  const res = await fetch(
    `${process.env.REACT_APP_HOST}/660/orders?user.id=${ebid}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  return await res.json();
};

// ==========================
// CREATE ORDER
// ==========================
export const createOrder = async (cartList, total, user) => {
  if (!cartList || cartList.length === 0) {
    alert("Cart is empty");
    return;
  }

  const token = JSON.parse(sessionStorage.getItem("token") || "null");
  if (!token) {
    throw new Error("User not authenticated");
  }

  const order = {
    cartList,
    total,
    quantity: cartList.length,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    createdAt: new Date().toISOString(),
  };

  const res = await fetch(`${process.env.REACT_APP_HOST}/660/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  return await res.json();
};
