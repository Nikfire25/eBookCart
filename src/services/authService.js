export const login = async (authDetail) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(authDetail),
  };
  const res = await fetch(
    `${process.env.REACT_APP_HOST}/login`,
    requestOptions
  );
  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }
  const data = await res.json();
  return data;
};

export const register = async (authDetail) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(authDetail),
  };
  const res = await fetch(
    `${process.env.REACT_APP_HOST}/register`,
    requestOptions
  );
  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }
  const data = await res.json();
  return data;
};

export const logout = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("ebid");
};
