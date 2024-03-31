import { Suspense } from "react";
import Navbar from "@/components/globals/Navbar";
import CreateNewItem from "@/components/globals/CreateNewItem";
import Breadcrumbs from "@/components/globals/Breadcrumbs";
import Loading from "@/components/globals/Loading";

export default function CreateEmployee() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <section id="header-section" className="text-center">
          <h1 className="text-3xl text-oliveGreen-800 pt-2 font-playfair">
            CREAR EMPLEADO
          </h1>
          <h3 className="text-xl text-white pt-2 font-marck">
            Cree un nuevo empleado para asignar a su negocio.
          </h3>
          <div className="flex flex-col justify-center items-center">
            <Suspense
              fallback={<Loading parameter="formulario de nuevo empleado" />}
            >
              <section className="w-[80vw] flex flex-col items-center bg-gradient-to-b from-mainRed-800 to-mainRed-900">
                <div className="w-[100%] h-fit p-2 bg-gradient-to-r from-oliveGreen-800 to-oliveGreen-700">
                  <Breadcrumbs route="empleados/listado" />
                </div>
                <div className="w-[100%] p-2 text-white font-fairplay mb-4 flex-wrap bg-oliveGreen-800">
                  <CreateNewItem model="Employee" />
                </div>
              </section>
            </Suspense>
          </div>
        </section>
      </main>
    </>
  );
}
