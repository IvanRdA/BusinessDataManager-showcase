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
            FNR
          </h1>
          <h3 className="text-xl text-white pt-2 font-marck">
            Gestione los festivos no remunerados de su equipo. Elija al empleado
            que quiera gestionar y el año e indique el estado de sus FNR.
          </h3>
          <div className="flex flex-col justify-center items-center">
            <Suspense fallback={<Loading parameter="FNR" />}>
              <ItemListFetcher item="Employees" finalStep="Fnr" />
            </Suspense>
          </div>
        </section>
      </main>
    </>
  );
}
