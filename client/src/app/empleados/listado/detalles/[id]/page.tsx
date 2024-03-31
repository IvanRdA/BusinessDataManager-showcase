import Navbar from "@/components/globals/Navbar";
import GetSingleItem from "@/components/globals/GetSingleItem";
import { Suspense } from "react";
import EmployeeNavbar from "@/components/employees/EmployeeNavbar";
import Loading from "@/components/globals/Loading";
import Breadcrumbs from "@/components/globals/Breadcrumbs";

export default function SingleEmployeePage({ params }) {
  const { id } = params;
  return (
    <>
      <header>
        <Navbar />
        <EmployeeNavbar />
      </header>
      <main className="w-[100vw] h-[90vh] bg-mainRed-800">
        <section id="header-section" className="text-center">
          <h1 className="text-3xl text-oliveGreen-800 pt-2 font-playfair">
            VISTA DETALLADA DE EMPLEADO
          </h1>
          <div className="flex flex-col justify-center items-center">
            <Suspense fallback={<Loading parameter="detalles de empleado" />}>
              <section className="w-[80vw] flex flex-col items-center bg-gradient-to-b from-mainRed-800 to-mainRed-900">
                <div className="w-[100%] h-fit p-2 bg-gradient-to-r from-oliveGreen-800 to-oliveGreen-700">
                  <Breadcrumbs route="empleados/listado" />
                </div>
                <div className="w-[100%] p-2 text-white font-fairplay mb-4 flex flex-col justify-center items-center bg-oliveGreen-800">
                  <GetSingleItem param={id} model="Employee" />
                </div>
              </section>
            </Suspense>
          </div>
        </section>
      </main>
    </>
  );
}
