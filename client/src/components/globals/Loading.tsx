import Image from "next/image";

// Fallback component. Showed when charging some required data.
export default function Loading(props: any) {
  const { parameter } = props;
  return (
    <>
      <div className="flex flex-col gap-2 p-2 w-[100%] h-fit font-playfair justify-center items-center text-center text-3xl bg-mainRed-800 text-oliveGreen-800">
        <Image
          width={80}
          height={80}
          alt={`Cargando ${parameter}`}
          title={`Cargando ${parameter}`}
          src="/icons/olive/loading.svg"
          className="mb-2"
        />
        <h2 className="py-2">{`Cargando ${parameter}`}</h2>
      </div>
    </>
  );
}
