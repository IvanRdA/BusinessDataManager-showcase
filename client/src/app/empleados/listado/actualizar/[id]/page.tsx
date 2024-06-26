import { Suspense } from "react";
import Navbar from "@/components/globals/Navbar";
import Breadcrumbs from "@/components/globals/Breadcrumbs";
import Loading from "@/components/globals/Loading";
import UpdateItem from "@/components/globals/UpdateItem";
import { singleItemFetch } from "@/CI/private.constants";

async function UpdateEmployeeFetcher(param: any) {
  return await singleItemFetch(param, "Employee");
}

export default async function UpdateEmployee({ params }) {
  const { id } = params;
  const singleEmployee = await UpdateEmployeeFetcher(id);
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <section id="header-section" className="text-center">
          <h1 className="text-3xl text-oliveGreen-800 pt-2 font-playfair">
            ACTUALIZAR EMPLEADO
          </h1>
          <h3 className="text-xl text-white pt-2 font-marck">
            Actualice al trabajador seleccionado para mantener al día la
            información de su negocio.
          </h3>
          <div className="flex flex-col justify-center items-center">
            <Suspense
              fallback={
                <Loading parameter="formulario de actualización de empleado" />
              }
            >
              <section className="w-[80vw] h-fit flex flex-col items-center bg-gradient-to-b from-mainRed-800 to-mainRed-900 border border-slate-800">
                <div className="w-[100%] h-[5vh] p-2 bg-gradient-to-r from-oliveGreen-800 to-oliveGreen-700">
                  <Breadcrumbs route="empleados/listado" />
                </div>
                <div className="w-[100%] p-2 text-white font-fairplay mb-4 flex-wrap bg-oliveGreen-800">
                  <UpdateItem model="Employee" param={singleEmployee} />
                </div>
              </section>
            </Suspense>
          </div>
        </section>
      </main>
    </>
  );
}
