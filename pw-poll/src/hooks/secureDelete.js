import { furl } from "./../url";
export const secureDelete = async (url, body) => {
  try {
    let res = await fetch(url, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": furl,
        "Access-Control-Allow-Credentials": true,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};
