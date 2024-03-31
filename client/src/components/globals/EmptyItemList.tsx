import Image from "next/image";

// Component to handle dynamically the empty response on an item query to the database.
export default function EmptyItemList(props: any) {
  const { item } = props;
  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center m-8 bg-mainRed-800 w-[100%] h-fit">
        <Image
          src={`/icons/olive/empty.svg`}
          width={120}
          height={120}
          alt={`No se encuentran ${item}`}
          className="m-2"
        />
        <h2 className="font-playfair text-3xl text-center text-oliveGreen-800 p-2">
          No se encuentran {item}
        </h2>
      </div>
    </>
  );
}
