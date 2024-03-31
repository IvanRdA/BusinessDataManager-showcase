"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import EmptyItemList from "../globals/EmptyItemList";
import { fetchDeleteEmployee } from "@/CI/private.constants";

// This component is the main view for the employees section as is the all employees table. From this component the user can check a list of registered employees and make CRUD operations over they.
export default function AllEmployeesTable(props: any) {
  const { employees } = props;

  const router = useRouter();

  const [search, setSearch] = useState("");
  const deleteEmployee = async (e: any) => {
    e.preventDefault();
    if (
      confirm(
        `Seguro que deseas eliminar el trabajador ${e.target.id}? Esto eliminará al trabajador de forma permanente.`
      )
    ) {
      const response = await fetchDeleteEmployee(
        e.target.getAttribute("data-employee-id")
      );

      if (response.error !== null) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        router.refresh();
      }
    }
  };

  // This method filters the input employees array by the search of the user and returns a new list with the elements that match the filter.
  const filtered = employees.filter((employee: any) => {
    if (search === "") {
      return employees;
    }
    return employee.info.surName.indexOf(search) !== -1;
  });

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="flex flex-row gap-8 justify-evenly items-center bg-gradient-to-r from-oliveGreen-800 to-oliveGreen-700 w-[100%] p-1">
        <Link href="/empleados/listado/nuevo">
          <div className="flex flex-row gap-2 justify-center items-center">
            <Image
              src="/icons/red/new.svg"
              width={50}
              height={50}
              alt={`Crear empleado`}
              title={`Crear empleado`}
            />
            <h5 className="text-mainRed-800 text-lg">CREAR NUEVO EMPLEADO</h5>
          </div>
        </Link>
        <search
          role="search"
          className="text-black font-fairplay flex flex-row gap-2 justify-center items-center"
        >
          <input
            type="search"
            placeholder="Buscar..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
            className="text-mainRed-800"
          />
        </search>
      </div>
      {employees.length > 0 ? (
        <table className="font-fairplay text-lg text-white w-[100%] m-auto">
          <thead className="bg-slate-800">
            <tr>
              <th className="font-marck text-xl">DNI</th>
              <th className="font-marck text-xl">Nombre completo</th>
              <th className="font-marck text-xl">Rol</th>
              <th className="font-marck text-xl">Equipo asignado</th>
              <th className="font-marck text-xl">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white text-black text-center">
            {filtered.map((employee: any, idx: number) => (
              <tr
                key={idx}
                className={
                  (idx + 1) % 2 === 0
                    ? "bg-mainRed-800/30"
                    : "bg-mainRed-800/20"
                }
              >
                <td>{employee.info.dni}</td>
                <td>
                  {employee.info.surName}, {employee.info.firstName}
                </td>
                <td>{employee.contractual.role}</td>
                <td>{employee.business.assignedTeam}</td>
                <td className="flex flex-row gap-2 justify-center">
                  <button>
                    <Link href={`/empleados/listado/detalles/${employee._id}`}>
                      <Image
                        src="/icons/red/more.svg"
                        alt="Ver detalles"
                        title="Ver detalles"
                        data-employee-id={employee._id}
                        width={48}
                        height={48}
                      />
                    </Link>
                  </button>
                  <button>
                    <Link
                      href={`/empleados/listado/actualizar/${employee._id}`}
                    >
                      <Image
                        src="/icons/red/edit.svg"
                        alt="Editar"
                        title="Editar"
                        data-employee-id={employee._id}
                        width={48}
                        height={48}
                      />
                    </Link>
                  </button>
                  <button>
                    <Image
                      src="/icons/red/delete.svg"
                      alt="Eliminar"
                      title="Eliminar"
                      data-employee-id={employee._id}
                      id={`${employee.info.surName}, ${employee.info.firstName}`}
                      width={48}
                      height={48}
                      onClick={deleteEmployee}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyItemList item="empleados" color="red" />
      )}
    </>
  );
}
