import Link from "next/link";
import Image from "next/image";

// I use this component as a breadcrumbs manager. When click the button it will lead the user to the previous level of the breadcrumb tree.
export default function Breadcrumbs(props: any) {
  const { route } = props;

  return (
    <>
      <Link href={`/${route}`}>
        <div className="flex flex-row gap-2 justify-center items-center">
          <Image
            src="/icons/red/back.svg"
            width={24}
            height={24}
            alt="New icon"
          />
          <p className="font-fairplay text-mainRed-800 hover:text-white text-lg">
            Volver
          </p>
        </div>
      </Link>
    </>
  );
}
