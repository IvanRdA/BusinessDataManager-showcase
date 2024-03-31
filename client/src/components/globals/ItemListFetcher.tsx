import ItemList from "./ItemList";
import EmptyItemList from "./EmptyItemList";
import ServerError from "./ServerError";
import { allItemsFetch } from "@/CI/private.constants";

async function fetchAllItems(model: string) {
  const allItems = await allItemsFetch(model);

  if (allItems.error !== null) {
    return <ServerError />;
  }
  return allItems.data;
}

export default async function ItemListFetcher(props: any) {
  const { item, finalStep } = props;
  const items = await fetchAllItems(item);

  if (item === "Employees") {
    return (
      <>
        <section className="w-[75vw] flex flex-col items-center">
          <div className="w-[100%] h-fit p-2 text-white font-fairplay">
            <ItemList items={items} model="Employees" finalStep={finalStep} />
          </div>
        </section>
      </>
    );
  }
}
