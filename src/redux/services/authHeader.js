const getDefaultToken = () => {
  let user = localStorage.getItem("token");
  if (user && user !== undefined && user !== "undefined") {
    return JSON.parse(user);
  } else {
    return {};
  }
};

export default function authHeader() {
  const token = localStorage.getItem("token") ? getDefaultToken() : {};
  //console.log('token', token)

  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}
