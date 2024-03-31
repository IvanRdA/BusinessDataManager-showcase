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
        <section id="headerSection" className="text-center">
          <h1 className="text-3xl text-oliveGreen-800 pt-2 font-playfair">
            CREAR EMPLEADO
          </h1>
          <h3 className="text-xl text-white pt-2 font-marck">
            Cree un nuevo empleado para asignar a su negocio.
          </h3>
          <div className="flex flex-col justify-center items-center">
            <Suspense fallback={<Loading />}>
              <section className="w-[80vw] h-fit flex flex-col items-center bg-gradient-to-b from-mainRed-800 to-mainRed-900 border border-slate-800">
                <div className="w-[100%] h-[5vh] p-2 bg-gradient-to-r from-oliveGreen-800 to-oliveGreen-700">
                  <Breadcrumbs route="empleados" />
                </div>
                <div className="w-[100%] p-2 text-white font-fairplay mb-4 flex-wrap bg-oliveGreen-800">
                  <CreateNewItem model="employee" />
                </div>
              </section>
            </Suspense>
          </div>
        </section>
      </main>
    </>
  );
}
