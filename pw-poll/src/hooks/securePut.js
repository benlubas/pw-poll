import { furl } from "./../url";
export const securePut = async (url, body) => {
  try {
    let res = await fetch(url, {
      method: "PUT",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": furl,
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};
