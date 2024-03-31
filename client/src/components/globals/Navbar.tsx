"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import getData from "@/hooks/GetData";
import { useEffect } from "react";

// General navigation component. This one includes the authorization permissions as is shown in any view of the app.
export default function Navbar() {
  const router = useRouter();

  // AUTH FOR ALL THE PAGES
  const validToken = async () => {
    const response = await getData(localStorage.getItem("token") ?? "");
    if (response.data !== true) {
      router.push("/");
    }
  };
  useEffect(() => {
    validToken();
  });

  // FUNCTION THAT HANDLES THE USER LOGOUT
  const handleLogout = (event: any) => {
    event.preventDefault();
    const confirmation = confirm("¿Está seguro de cerrar sesión?");
    if (confirmation) {
      localStorage.setItem("token", "undefined");
      router.push("/");
    }
  };
  return (
    <nav className="w-[100vw] h-[10vh] flex flex-row gap-2 justify-between items-center bg-oliveGreen-800 text-mainRed-800 p-4 font-marck">
      <Link href="/dashboard">
        <Image
          src="/logo.jpg"
          alt="Dashboard"
          title="Ir a dashboard"
          height={100}
          width={100}
        />
      </Link>
      <ul className="flex flex-row gap-8 justify-center items-center text-[1.3rem]">
        <Link href="/dashboard">
          <Image
            src="/icons/red/dashboard.svg"
            alt="Dashboard"
            title="Ir a dashboard"
            height={24}
            width={24}
          />
          <li className="hover:text-white">Dashboard</li>
        </Link>
        <Link href="/empleados">
          <Image
            src="/icons/red/employees.svg"
            alt="Empleados"
            title="Ir a empleados"
            height={24}
            width={24}
          />
          <li className="hover:text-white">Empleados</li>
        </Link>
        <Link href="/horarios">
          <Image
            src="/icons/red/schedules.svg"
            alt="Horarios"
            title="Ir a horarios"
            height={24}
            width={24}
          />
          <li className="hover:text-white">Turnos</li>
        </Link>
        <Link href="/stocks">
          <Image
            src="/icons/red/stocks.svg"
            alt="Stocks"
            title="Ir a stocks"
            height={24}
            width={24}
          />
          <li className="hover:text-white">Stocks</li>
        </Link>
        <Link href="/ventas">
          <Image
            src="/icons/red/sales.svg"
            alt="Ventas"
            title="Ir a ventas"
            height={24}
            width={24}
          />
          <li className="hover:text-white">Ventas</li>
        </Link>
      </ul>
      <div className="flex flex-row gap-8 justify-center items-center">
        <Link href="/config">
          <Image
            src="/icons/red/config.svg"
            alt="Configuración"
            title="Ir a configuración"
            height={36}
            width={36}
          />
        </Link>
        <button onClick={handleLogout}>
          <Image
            src="/icons/red/logout.svg"
            alt="Cerrar sesión"
            title="Cerrar sesión"
            height={36}
            width={36}
          />
        </button>
      </div>
    </nav>
  );
}
