import Image from "next/image";
import LoginForm from "./LoginForm";

// Main box component for the login section.
export default function LoginMainBox() {
  return (
    <section className="w-[70%] bg-gradient-to-br from-oliveGreen-800 to-oliveGreen-700 flex flex-col justify-center items-center shadow-xl p-4 h-fit">
      <Image
        src="/logo.jpg"
        alt="Logo La Poma"
        title="La Poma"
        width={250}
        height={250}
        className="m-4 p-4"
        priority
      />
      <h1 className="text-2xl text-center text-mainRed-800 m-2">
        NOMBRE DE TU NEGOCIO
      </h1>
      <h3 className="text-2xl text-center text-mainRed-800 m-2">
        ACCEDA A LA PLATAFORMA
      </h3>
      <LoginForm />
    </section>
  );
}
