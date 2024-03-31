import Navbar from "@/components/globals/Navbar";
import ItemListFetcher from "@/components/globals/ItemListFetcher";
import { Suspense } from "react";
import EmployeeNavbar from "@/components/employees/EmployeeNavbar";
import Loading from "@/components/globals/Loading";

export default function EmployeesPage() {
  return (
    <>
      <header>
        <Navbar />
        <EmployeeNavbar />
      </header>
      <main className="w-[100vw] h-[90vh] bg-mainRed-800">
        <section id="headerSection" className="text-center">
          <h1 className="text-3xl text-oliveGreen-800 pt-2 font-playfair">
            INCIDENCIAS DE NÓMINA
          </h1>
          <h3 className="text-xl text-white pt-2 font-marck">
            Gestione las incidencias de nómina: Revise el estado de horas extra,
            domingos y festivos por empleado y año.
          </h3>
          <div className="flex flex-col justify-center items-center">
            <Suspense fallback={<Loading parameter="incidencias de nómina" />}>
              <ItemListFetcher item="Employees" finalStep="ExtraTime" />
            </Suspense>
          </div>
        </section>
      </main>
    </>
  );
}
