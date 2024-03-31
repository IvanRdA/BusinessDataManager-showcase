"use client";
import Image from "next/image";
import { Toaster, toast } from "sonner";
import { useState } from "react";
import YearTitle from "./YearTitle";
import { useRouter } from "next/navigation";
import EmptyItemList from "../globals/EmptyItemList";
import { YearsData } from "../../../types";
import {
  availableEmployees,
  getAllDaysFromYear,
  generateEmptySchedule,
  defaultDay,
} from "@/CI/public.constants";
import isSunday from "date-fns/isSunday";
import { fetchUpdateEmployeeHolidays } from "@/CI/private.constants";

// This component is the master one on the client side at the time.
// Handles the year state for the holidays terms for each employee and for each year.
// The idea is to create a data structure that seems this:
// [ { [year]: { [dayOfYear]: { state of the day } }, ...]
// where each index of the main array represents a given employee, the year dynamic key the year that matches the query and the dayOfYear key the day of that given year, both in number data type.
// In the database, just store the days that have any different value as the default template day, so this way we save much space and time on queries.
// When we get a year from the database, first push the days into an empty year and then I fill the rest of the days of the year with the default template.
// With this steps setted, the component can work with this data structure in his global state and edit the information when the user interacts with the app.
export default function AllHolidaysTable(props: any) {
  const router = useRouter();

  const { employees } = props;
  const activeEmployees = availableEmployees(employees);

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const allDaysOfYear = getAllDaysFromYear(currentYear);

  const [editingYear, setEditingYear] = useState<number | null>(null);

  const handleYearClick = (year: number) => {
    setEditingYear(year);
  };

  const handleYearChange = (newYear: number) => {
    setCurrentYear(newYear);
    setEditingYear(null);
    getScheduleByYear(newYear, setYearsData);
  };

  // This is the method that creates or gets the given year when changes. If the year already exists in the state, just recovers it, if not, fill an empty year and push to the state.
  const getScheduleByYear = (
    year: number,
    setYearsData: React.Dispatch<React.SetStateAction<YearsData[]>>
  ) => {
    setYearsData((prevData: any) =>
      prevData.map((employee: any) => {
        const updatedEmployee = JSON.parse(JSON.stringify(employee));

        if (updatedEmployee[year]) {
          return updatedEmployee;
        } else {
          updatedEmployee[year] = {};

          getAllDaysFromYear(year).map((day: Date, idx: number) => {
            updatedEmployee[year][idx] = {
              date: day,
              isLockedDay: false,
              isFNR: false,
              isSunday: isSunday(day),
              isFreeDay: false,
              isConfirmedSchedule: false,
              scheduleTimes: [],
              isActiveHoliday: false,
              isEnjoyedHoliday: false,
              extraTimeAmount: 0,
              isReturnedFNR: false,
            };
          });

          return updatedEmployee;
        }
      })
    );
  };
  const starterEmployees = generateEmptySchedule(activeEmployees, currentYear);
  const [yearsData, setYearsData] = useState<YearsData[]>(starterEmployees);

  const handleCellClick = (e: any) => {
    e.preventDefault();
    const empIndex = parseInt(e.target.getAttribute("data-emp-id"));
    const dayIndex = parseInt(e.target.getAttribute("data-day-id"));

    if (
      empIndex >= 0 &&
      empIndex < yearsData.length &&
      yearsData[empIndex] &&
      yearsData[empIndex][currentYear] &&
      !yearsData[empIndex][currentYear][dayIndex].isLockedDay
    ) {
      if (
        empIndex >= 0 &&
        empIndex < yearsData.length &&
        yearsData[empIndex] &&
        yearsData[empIndex][currentYear] &&
        yearsData[empIndex][currentYear][dayIndex]
      ) {
        setYearsData((prevData: any) => {
          const updatedData = JSON.parse(JSON.stringify(prevData));
          const updatedEmployee = { ...updatedData[empIndex] };

          updatedEmployee[currentYear][dayIndex].isActiveHoliday =
            !updatedEmployee[currentYear][dayIndex].isActiveHoliday;

          updatedData[empIndex] = updatedEmployee;
          return updatedData;
        });
      }
    }
  };

  const handleCelldbClick = (e: any) => {
    e.preventDefault();
    const empIndex = parseInt(e.target.getAttribute("data-emp-id"));
    const dayIndex = parseInt(e.target.getAttribute("data-day-id"));

    if (
      empIndex >= 0 &&
      empIndex < yearsData.length &&
      yearsData[empIndex] &&
      yearsData[empIndex][currentYear] &&
      !yearsData[empIndex][currentYear][dayIndex].isLockedDay
    ) {
      if (
        empIndex >= 0 &&
        empIndex < yearsData.length &&
        yearsData[empIndex] &&
        yearsData[empIndex][currentYear] &&
        yearsData[empIndex][currentYear][dayIndex]
      ) {
        setYearsData((prevData: any) => {
          const updatedData = JSON.parse(JSON.stringify(prevData));
          const updatedEmployee = { ...updatedData[empIndex] };

          updatedEmployee[currentYear][dayIndex].isEnjoyedHoliday =
            !updatedEmployee[currentYear][dayIndex].isEnjoyedHoliday;

          updatedEmployee[currentYear][dayIndex].isActiveHoliday = false;

          updatedData[empIndex] = updatedEmployee;
          return updatedData;
        });
      }
    }
  };

  const handleChangeYear = (step: number) => {
    const newYear = currentYear + step;
    setCurrentYear(newYear);
    setEditingYear(null);
    getScheduleByYear(newYear, setYearsData);
  };

  const saveToDatabase = async () => {
    const fetchReq = async () => {
      try {
        for (let i = 0; i <= activeEmployees.length - 1; i++) {
          const state = {
            year: currentYear,
            [currentYear]: {},
          };
          for (
            let d = 0;
            d <= Object.keys(yearsData[i][currentYear]).length - 1;
            d++
          ) {
            const getDefaultDay = defaultDay(yearsData[i][currentYear][d].date);
            if (
              getDefaultDay.isLockedDay !==
                yearsData[i][currentYear][d].isLockedDay ||
              getDefaultDay.isActiveHoliday !==
                yearsData[i][currentYear][d].isActiveHoliday ||
              getDefaultDay.isEnjoyedHoliday !==
                yearsData[i][currentYear][d].isEnjoyedHoliday ||
              getDefaultDay.isFNR !== yearsData[i][currentYear][d].isFNR ||
              getDefaultDay.isSunday !==
                yearsData[i][currentYear][d].isSunday ||
              getDefaultDay.isFreeDay !==
                yearsData[i][currentYear][d].isFreeDay ||
              getDefaultDay.isConfirmedSchedule !==
                yearsData[i][currentYear][d].isConfirmedSchedule ||
              yearsData[i][currentYear][d].scheduleTimes.length > 0 ||
              yearsData[i][currentYear][d].extraTimeAmount !== 0 ||
              getDefaultDay.isReturnedFNR !==
                yearsData[i][currentYear][d].isReturnedFNR ||
              yearsData[i][currentYear][d].incidenceType ||
              yearsData[i][currentYear][d].incidenceDescription ||
              yearsData[i][currentYear][d].incidenceStartDate ||
              yearsData[i][currentYear][d].incidenceEndDate ||
              yearsData[i][currentYear][d].incidenceInhability ||
              yearsData[i][currentYear][d].reportType ||
              yearsData[i][currentYear][d].reportDescription ||
              yearsData[i][currentYear][d].reportStartDate ||
              yearsData[i][currentYear][d].reportEndDate ||
              yearsData[i][currentYear][d].reportInhability ||
              yearsData[i][currentYear][d].sanctionLevel
            ) {
              state[currentYear][d] = yearsData[i][currentYear][d];
            }
          }
          const res = await fetchUpdateEmployeeHolidays(
            state,
            activeEmployees[i]._id ?? ""
          );
        }
        return true;
      } catch (e: any) {
        console.log(e);
        return false;
      }
    };
    try {
      const updateHolidays = await fetchReq();

      if (updateHolidays) {
        toast.success(`Vacaciones actualizadas correctamente.`);
        router.refresh();
      }
    } catch (error) {
      toast.error("Error guardando vacaciones.");
      console.error("Error al guardar en la base de datos:", error);
    }
  };

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="flex flex-col justify-center items-center">
        {employees.length > 0 ? (
          <>
            <button
              className="flex flex-row gap-2 items-center justify-center bg-gradient-to-r from-oliveGreen-800 to-oliveGreen-700 hover:scale-105 cursor-pointer p-2 w-[85%] text-mainRed-800 text-xl"
              onClick={saveToDatabase}
            >
              <Image
                src="/icons/red/save.svg"
                width={18}
                height={18}
                alt="Guardar cambios"
                title="Guardar cambios en vacaciones"
              />
              Guardar cambios
            </button>
            <div className="flex flex-row justify-evenly p-2 gap-2 bg-white w-[85%]">
              <button onClick={() => handleChangeYear(-1)} data-step="prev">
                <Image
                  src="/icons/red/prev.svg"
                  width={18}
                  height={18}
                  alt="Año previo"
                  title="Año previo"
                />
              </button>

              <h3
                className="text-center text-3xl text-mainRed-800 font-marck"
                onClick={() => handleYearClick(currentYear)}
              >
                {editingYear !== null ? (
                  <YearTitle
                    year={currentYear}
                    onYearChange={handleYearChange}
                  />
                ) : (
                  currentYear
                )}
              </h3>

              <button onClick={() => handleChangeYear(1)} data-step="next">
                <Image
                  src="/icons/red/next.svg"
                  width={18}
                  height={18}
                  alt="Próximo año"
                  title="Próximo"
                />
              </button>
            </div>

            <div className="w-[85%] table-container">
              <table className="font-fairplay text-sm text-white sticky-header-table">
                <thead>
                  <tr>
                    <th>Empleado</th>
                    {allDaysOfYear.map((date: any, idx: number) => {
                      return (
                        <th
                          key={idx}
                          className={
                            isSunday(new Date(date)) === true
                              ? "verticalAligned bg-cyan-600/50"
                              : "verticalAligned"
                          }
                        >
                          {date.toLocaleDateString("es-ES", {
                            year: "2-digit",
                            month: "2-digit",
                            day: "2-digit",
                          })}
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                <tbody>
                  {yearsData.map((employee: any, empId: number) => (
                    <tr key={activeEmployees[empId]?._id}>
                      <td>
                        {activeEmployees[empId]?.info.surName},{" "}
                        {activeEmployees[empId]?.info.firstName}
                      </td>
                      {allDaysOfYear.map((date: any, idx: number) => (
                        <td
                          onClick={handleCellClick}
                          onDoubleClick={handleCelldbClick}
                          key={date}
                          data-emp-id={empId}
                          data-day-id={idx}
                          className={
                            yearsData[empId] &&
                            yearsData[empId][currentYear] &&
                            yearsData[empId][currentYear][idx] &&
                            yearsData[empId][currentYear][idx].isLockedDay
                              ? "bg-black"
                              : yearsData[empId] &&
                                yearsData[empId][currentYear] &&
                                yearsData[empId][currentYear][idx] &&
                                yearsData[empId][currentYear][idx]
                                  .isEnjoyedHoliday
                              ? "bg-green-500"
                              : yearsData[empId] &&
                                yearsData[empId][currentYear] &&
                                yearsData[empId][currentYear][idx] &&
                                yearsData[empId][currentYear][idx]
                                  .isActiveHoliday
                              ? "bg-yellow-400"
                              : isSunday(new Date(date))
                              ? "bg-cyan-600/40"
                              : "bg-white"
                          }
                        ></td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <EmptyItemList item="empleados" />
        )}
      </div>
    </>
  );
}
