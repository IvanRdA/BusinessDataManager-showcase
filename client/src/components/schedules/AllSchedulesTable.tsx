"use client";
import { Toaster, toast } from "sonner";
import {
  eachHourOfInterval,
  eachWeekOfInterval,
  eachYearOfInterval,
  isSunday,
  format,
  addDays,
} from "date-fns";
import { useState } from "react";
import { useRouter } from "next/navigation";
import EmptyItemList from "../globals/EmptyItemList";
import { YearsData } from "../../../types";
import {
  DAYS_IN_SPA,
  MONTHS_IN_SPA,
  generateEmptySchedule,
  getAllDaysFromYear,
} from "@/CI/public.constants";

export default function AllSchedulesTable(props: any) {
  const router = useRouter();
  const { employees } = props;

  const sortedEmployees = employees.sort((a: any, b: any) => {
    return a.business.isActive - b.business.isActive;
  });

  const getAllYears = () => {
    return eachYearOfInterval({
      start: new Date(1950, 0, 1),
      end: new Date(currentYear + 5, 11, 31),
    });
  };

  const getAllWeeks = () => {
    const startOfMonth = new Date(currentYear, currentMonth, 1);
    const endOfMonth = new Date(currentYear, currentMonth + 1, 0);

    // Get the range of dates for the given week
    const weeks = eachWeekOfInterval({
      start: startOfMonth,
      end: endOfMonth,
    });

    // Format the dates inputs if necessary
    return weeks.map((week) => ({
      start: format(addDays(week, 1), "dd/MM/yyyy"), // Sum 1 day to get Monday as start of the week
      end: format(addDays(week, 7), "dd/MM/yyyy"), // Sum 7 days to get Sunday as end of the week
    }));
  };

  const getAllHours = () => {
    const hours = eachHourOfInterval({
      start: new Date(2024, 0, 1),
      end: new Date(2024, 0, 2),
    });

    return hours.map((hour: any) => hour.getHours());
  };

  const handleChangeYear = (e: any) => {
    setCurrentYear(parseInt(e.target.value));
    setCurrentMonth(0);

    const allWeeksOfMonth = getAllWeeks();
    setCurrentWeek(allWeeksOfMonth[0]);

    getScheduleByYear(parseInt(e.target.value), setYearsData);
  };

  const handleChangeMonth = (e: any) => {
    setCurrentMonth(parseInt(e.target.value));
    const allWeeksOfMonth = getAllWeeks();
    setCurrentWeek(allWeeksOfMonth[0]);
  };

  const handleChangeWeek = (e: any) => {
    setCurrentWeek(e.target.value);
  };
  const handleChangeDay = (e: any) => {
    setCurrentDay(e.target.getAttribute("data-day-value"));
  };

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentWeek, setCurrentWeek] = useState(getAllWeeks()[0]);
  const [currentDay, setCurrentDay] = useState(new Date());

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
  const schedulesEmployees = generateEmptySchedule(
    sortedEmployees,
    currentYear
  );
  const [yearsData, setYearsData] = useState<YearsData[]>(schedulesEmployees);

  const handleCellClick = (event: any) => {
    event.preventDefault();
    const updatedSchedule = JSON.parse(JSON.stringify(yearsData));
    const empIndex = parseInt(event.target.getAttribute("data-empid"));
    const dateId = parseInt(event.target.id);

    if (empIndex >= 0 && empIndex < updatedSchedule.length) {
      updatedSchedule[empIndex][currentYear].log.forEach(
        (day: any, idx: number) => {
          if (idx === dateId) {
            day.isActive = !day.isActive;
          }
        }
      );

      setYearsData((prevData: any) =>
        prevData.map((employee: any) => {
          const updatedEmployee = { ...employee };
          if (updatedEmployee[currentYear]) {
            updatedEmployee[currentYear].log =
              updatedSchedule[empIndex][currentYear].log;
          } else {
            updatedEmployee[currentYear] = {
              log: updatedSchedule[empIndex][currentYear].log,
            };
          }
          return updatedEmployee;
        })
      );
    }
  };

  const handleCelldbClick = (event: any) => {
    event.preventDefault();
    const updatedSchedule = JSON.parse(JSON.stringify(yearsData));
    const empIndex = parseInt(event.target.getAttribute("data-empid"));
    const dateId = parseInt(event.target.id);

    if (empIndex >= 0 && empIndex < updatedSchedule.length) {
      updatedSchedule[empIndex][currentYear].log.forEach(
        (day: any, idx: number) => {
          if (idx === dateId) {
            day.isEnjoyed = !day.isEnjoyed;
          }
        }
      );

      setYearsData((prevData: any) =>
        prevData.map((employee: any) => {
          const updatedEmployee = { ...employee };
          if (updatedEmployee[currentYear]) {
            updatedEmployee[currentYear].log =
              updatedSchedule[empIndex][currentYear].log;
          } else {
            updatedEmployee[currentYear] = {
              log: updatedSchedule[empIndex][currentYear].log,
            };
          }
          return updatedEmployee;
        })
      );
    }
  };
  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="flex flex-col justify-center items-center">
        {employees.length > 0 ? (
          <>
            <div
              className="flex flex-row justify-evenly p-2 gap-2 bg-white w-[85%]"
              id="year"
            >
              <select
                value={currentYear}
                className="text-mainRed-800"
                onChange={handleChangeYear}
              >
                {getAllYears().map((year: any, idx: number) => (
                  <option value={year.getFullYear()} key={idx}>
                    {year.getFullYear()}
                  </option>
                ))}
              </select>

              <select
                value={currentMonth}
                className="text-mainRed-800"
                onChange={handleChangeMonth}
                id="month"
              >
                {MONTHS_IN_SPA.map((_: any, idx: number) => (
                  <option value={idx} key={idx}>
                    {MONTHS_IN_SPA[idx]}
                  </option>
                ))}
              </select>

              <select
                value={currentWeek.start}
                className="text-mainRed-800"
                id="week"
                onChange={handleChangeWeek}
              >
                {getAllWeeks().map((week: any, idx: number) => (
                  <option value={week.start} key={idx}>
                    {`Del ${week.start} al ${week.end}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-row gap-2 justify-center items-center bg-white text-mainRed-800 w-[85%]">
              {DAYS_IN_SPA.map((day: string, idx: number) => {
                return (
                  <button
                    className="w-fit h-fit px-1 my-2 bg-gradient-to-r from-mainRed-800 to-mainRed-900 hover:scale-105 text-white"
                    key={idx}
                    data-day-value={currentWeek.start + idx}
                    onClick={handleChangeDay}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            <div className="w-[85%] table-container">
              <table className="font-fairplay text-sm text-white sticky-header-table">
                <thead>
                  <tr>
                    <th>Empleado</th>
                    {getAllHours().map((hour: any, idx: number) => {
                      return (
                        <>
                          <th
                            key={idx}
                            className={
                              hour >= 22 || hour <= 5
                                ? "verticalAligned bg-black text-white"
                                : "verticalAligned bg-mainRed-800 text-white"
                            }
                          >
                            {hour === 0 && idx > 0 ? "24:00" : `${hour}:00`}
                          </th>
                          {idx < getAllHours().length - 1 ? (
                            <th
                              className={
                                hour >= 22 || hour < 5
                                  ? "verticalAligned bg-black text-white"
                                  : "verticalAligned bg-mainRed-800 text-white"
                              }
                              key={idx + 0.5}
                            >{`${hour}:30`}</th>
                          ) : (
                            <></>
                          )}
                        </>
                      );
                    })}
                  </tr>
                </thead>

                <tbody>
                  {yearsData.map((employee: any, empId: number) => (
                    <tr key={sortedEmployees[empId]?.info.dni}>
                      <td>
                        {sortedEmployees[empId]?.info.surName},{" "}
                        {sortedEmployees[empId]?.info.firstName}
                      </td>
                      {getAllHours().map((hour: any, idx: number) => (
                        <>
                          <td
                            onClick={handleCellClick}
                            onDoubleClick={handleCelldbClick}
                            key={idx}
                            data-emp-id={empId}
                            data-hour-value={hour}
                            className="bg-white"
                          ></td>
                          {idx < getAllHours().length - 1 ? (
                            <td
                              onClick={handleCellClick}
                              onDoubleClick={handleCelldbClick}
                              key={idx + 0.5}
                              data-emp-id={empId}
                              data-hour-value={hour + 0.5}
                              className="bg-white"
                            ></td>
                          ) : (
                            <></>
                          )}
                        </>
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
