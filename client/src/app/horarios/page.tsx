import Navbar from "@/components/globals/Navbar";
import ItemListFetcher from "@/components/globals/ItemListFetcher";
import { Suspense } from "react";
import Loading from "@/components/globals/Loading";

export default function SchedulesPage() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="w-[100vw] h-[90vh] bg-mainRed-800">
        <section id="headerSection" className="text-center">
          <h1 className="text-3xl text-oliveGreen-800 pt-2 font-playfair">
            GESTIÓN DE TURNOS
          </h1>
          <h3 className="text-xl text-white pt-2 font-marck">
            Gestione los turnos de su negocio.
          </h3>
          <div className="flex flex-col justify-center items-center">
            <Suspense fallback={<Loading parameter="horarios" />}>
              <ItemListFetcher item="Employees" finalStep="Schedules" />
            </Suspense>
          </div>
        </section>
      </main>
    </>
  );
}
