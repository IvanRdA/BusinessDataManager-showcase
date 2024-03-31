"use client";
import Image from "next/image";
import Link from "next/link";

// This is the navigation component for the employees section. As I am using NextJS, he allows me to use the Link component to internally route through the app.
export default function EmployeeNavbar() {
  return (
    <nav className="w-[100vw] h-[10vh] flex flex-row gap-2 justify-center items-center bg-mainRed-800 text-oliveGreen-800 p-4 font-marck">
      <ul className="flex flex-row gap-8 justify-center items-center text-[1.3rem]">
        <Link href="/empleados">
          <Image
            src="/icons/olive/generalEmployees.svg"
            alt="Empleados"
            title="Ir a empleados"
            height={24}
            width={24}
          />
          <li className="hover:text-white">General</li>
        </Link>
        <Link href="/empleados/listado">
          <Image
            src="/icons/olive/list.svg"
            alt="Lista de empleados"
            title="Ir a lista de empleados"
            height={24}
            width={24}
          />
          <li className="hover:text-white">Listado</li>
        </Link>
        <Link href="/empleados/vacaciones">
          <Image
            src="/icons/olive/holidays.svg"
            alt="Vacaciones"
            title="Ir a vacaciones"
            height={24}
            width={24}
          />
          <li className="hover:text-white">Vacaciones</li>
        </Link>
        <Link href="/empleados/fnr">
          <Image
            src="/icons/olive/fnr.svg"
            alt="FNR"
            title="Ir FNR"
            height={24}
            width={24}
          />
          <li className="hover:text-white">FNR</li>
        </Link>
        <Link href="/empleados/incidencias-nomina">
          <Image
            src="/icons/olive/extraTime.svg"
            alt="Incidencias de nómina"
            title="Ir a incidencias de nómina"
            height={24}
            width={24}
          />
          <li className="hover:text-white">Incidencias nómina</li>
        </Link>
        <Link href="/empleados/incidencias-laboral">
          <Image
            src="/icons/olive/incidences.svg"
            alt="Incidencias laborales"
            title="Ir a incidencias laborales"
            height={24}
            width={24}
          />
          <li className="hover:text-white">Incidencias laborales</li>
        </Link>
        <Link href="/empleados/informes">
          <Image
            src="/icons/olive/reports.svg"
            alt="Informes de empleado"
            title="Ir a informes de empleado"
            height={24}
            width={24}
          />
          <li className="hover:text-white">Informes</li>
        </Link>
      </ul>
    </nav>
  );
}
