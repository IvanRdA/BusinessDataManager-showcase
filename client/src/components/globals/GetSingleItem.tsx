import ServerError from "./ServerError";
import { singleItemFetch } from "@/CI/private.constants";
import SingleEmployee from "../employees/SingleEmployee";

async function fetchSingleItem(param: string, model: string) {
  return await singleItemFetch(param, model);
}

export default async function GetSingleItem(props: {
  param: string;
  model: string;
}) {
  const { param, model } = props;

  const singleItem = await fetchSingleItem(param, model);

  if (singleItem.error !== null) {
    return <ServerError />;
  }

  if (model === "Employee") {
    return <SingleEmployee data={singleItem} />;
  } else if (model === "trabajador") {
    return <h1>No existen trabajadores</h1>;
  }
}
