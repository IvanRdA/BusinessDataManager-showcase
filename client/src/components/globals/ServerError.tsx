import Image from "next/image";

// Component for internal server error responses
export default function ServerError() {
  return (
    <>
      <div className="flex flex-col gap-2 p-2 w-[100%] h-fit font-playfair justify-center items-center text-center text-3xl bg-mainRed-800 text-oliveGreen-800">
        <Image
          width={80}
          height={80}
          alt={`Error servidor`}
          title={`Error operando con el servidor`}
          src="/icons/olive/serverError.svg"
          className="mb-2"
        />
        <h2 className="py-2">{`Error operando con el servidor`}</h2>
      </div>
    </>
  );
}
