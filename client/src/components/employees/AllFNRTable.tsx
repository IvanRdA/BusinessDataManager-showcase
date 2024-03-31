"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import Image from "next/image";
import { YearsData } from "../../../types";
import EmptyItemList from "../globals/EmptyItemList";

export default function AllFNRTable(props: any) {
  const router = useRouter();

  const { employees } = props;

  const sortedEmployees = employees.sort((a: any, b: any) => {
    return b.business.isActive - a.business.isActive;
  });

  const [activeEmployee, setActiveEmployee] = useState<{
    id: number;
    name: string;
  }>({
    id: 0,
    name: `${sortedEmployees[0].info.surName}, ${sortedEmployees[0].info.firstName}`,
  });

  const [activeYear, setActiveYear] = useState<number>(
    new Date().getFullYear()
  );

  const handleChangeActiveEmployee = (e: any) => {
    setActiveEmployee({
      id: e.target.options[e.target.selectedIndex].getAttribute("data-id"),
      name: e.target.options[e.target.selectedIndex].value,
    });
  };

  const generateEmptySchedule = (employees: any[]): any[] => {
    // Obtener todos los años distintos de los fnr de los empleados
    const allYears: number[] = Array.from(
      new Set(
        employees
          .flatMap((employee) =>
            Object.keys(employee.business.fnr || {}).map(Number)
          )
          .filter((year) => !isNaN(year))
      )
    );

    // Generar el horario vacío para todos los años
    const emptySchedule: any[] = employees.map((employee: any) => {
      const employeeFNR: any = {};

      if (allYears.length > 0) {
        allYears.forEach((year) => {
          if (employee.business.fnr && employee.business.fnr[year]) {
            // Si hay fnr registrados para este año, recupéralas
            employeeFNR[year] = {
              log: employee.business.fnr[year].log,
            };
          } else {
            // Si no hay fnr para este año, genera un array vacío
            employeeFNR[year] = {
              log: [],
            };
          }
        });
      } else {
        employeeFNR[activeYear] = {
          log: [],
        };
      }

      return employeeFNR;
    });

    return emptySchedule;
  };

  const getScheduleByYear = (
    year: number,
    setYearsData: React.Dispatch<React.SetStateAction<YearsData[]>>
  ) => {
    setActiveYear(year);
    setYearsData((prevData: any) =>
      prevData.map((employee: any) => {
        const updatedEmployee = { ...employee };

        if (updatedEmployee[year]) {
          // Si ya existe el año, simplemente devolvemos el mismo objeto
          return updatedEmployee;
        }

        // Si no existe el año, creamos una nueva entrada
        updatedEmployee[year] = {
          log: [],
        };

        return updatedEmployee;
      })
    );
  };
  const starterEmployees = generateEmptySchedule(sortedEmployees);
  const [yearsData, setYearsData] = useState<YearsData[]>(starterEmployees);

  return (
    <>
      <Toaster richColors position="top-center" />

      <div className="flex flex-row gap-4 justify-center font-playfair p-4">
        <div className="flex flex-col justify-center items-center text-white w-[25%]">
          <label htmlFor="role">Empleado</label>
          <select
            onChange={handleChangeActiveEmployee}
            value={activeEmployee.name}
            className="text-black"
            id="active_employee"
          >
            {sortedEmployees.map((employee: any, idx: number) => {
              return (
                <option
                  data-id={idx}
                  key={idx}
                  value={`${employee.info.surName}, ${employee.info.firstName}`}
                >{`${employee.info.surName}, ${employee.info.firstName}`}</option>
              );
            })}
          </select>
        </div>

        <div className="flex flex-col justify-center items-center text-white w-[25%]">
          <label htmlFor="role">Año</label>
          <select
            onChange={(e) =>
              getScheduleByYear(parseInt(e.target.value), setYearsData)
            }
            value={activeYear}
            className="text-black"
            id="year"
          >
            {Object.keys(yearsData[activeEmployee.id]).map(
              (year: string, idx: number) => {
                return (
                  <option key={idx} id={idx.toString()} value={year}>
                    {year}
                  </option>
                );
              }
            )}
          </select>
        </div>
      </div>

      {yearsData[activeEmployee.id][activeYear].log.length > 0 ? (
        <>
          <div className="flex flex-col justify-center items-center">
            <button
              className="flex flex-row gap-2 items-center justify-center bg-gradient-to-r from-oliveGreen-800 to-oliveGreen-700 hover:scale-105 cursor-pointer p-2 w-[85%] text-mainRed-800 text-xl"
              onClick={handleChangeActiveEmployee}
            >
              <Image
                src="/icons/red/save.svg"
                width={18}
                height={18}
                alt="Guardar cambios"
                title="Guardar cambios en FNR"
              />
              Guardar cambios
            </button>
          </div>

          <div className="w-[85%]">
            <table className="font-fairplay text-sm text-white">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Horas trabajadas</th>
                  <th>Horas por día</th>
                  <th>Estado</th>
                </tr>
              </thead>

              <tbody>
                {yearsData[activeEmployee.id][activeYear].log.map(
                  (fnr: any, fnrId: number) => (
                    <tr key={sortedEmployees[fnrId]?._id}>
                      <td>{fnr.date}</td>
                      <td>{fnr.hoursWorked}</td>
                      <td>{fnr.hoursByDay}</td>
                      <td>{fnr.state}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <EmptyItemList item="FNR" />
      )}
    </>
  );
}
