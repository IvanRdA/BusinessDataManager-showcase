import Navbar from "@/components/globals/Navbar";
import EmployeeNavbar from "@/components/employees/EmployeeNavbar";

export default function EmployeesMainPage() {
  return (
    <>
      <header>
        <Navbar />
        <EmployeeNavbar />
      </header>
      <main>
        <section id="header-section" className="text-center">
          <h1 className="text-3xl text-oliveGreen-800 pt-2 font-playfair">
            DASHBOARD EMPLEADOS
          </h1>
          <h1 className="text-center">FUNCIONALIDAD NO IMPLEMENTADA</h1>
        </section>
      </main>
    </>
  );
}
