export default async function getData(currToken: string) {
  const validToken = await fetch("http://localhost:8080/verifyTokenRoute", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${currToken}`,
    },
    cache: "no-store",
  });

  return await validToken.json();
}
