// This file includes the same as private constants but with the public ones. Instead of fetchings as such things, this file functions are more like the algorithms of the projects in terms of filtering,
// data structuring, dating, etc...

import { eachDayOfInterval } from "date-fns"
import { EmployeeBaseForm } from "../../types"
import isSunday from "date-fns/isSunday";


// ? DATES
export const MONTHS_IN_SPA = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
export const  DAYS_IN_SPA = [
    "L",
    "M",
    "X",
    "J",
    "V",
    "S",
    "D"
  ];
export const getSingleDayDate = (year: number, month: number, day: number): Date => {
    return new Date(year, month, day)
}
export const getAllDaysFromYear = (year: number): Date[] => {
    return eachDayOfInterval({
        start: new Date(year, 0, 1),
        end: new Date(year, 11, 31)
    })
}
export const getAllDaysFromMonth = (year: number, month: number): Date[] => {
    return eachDayOfInterval({
        start: new Date(year, month, 1),
        end: new Date(year, month + 1, 1)
    })
}
export function separateDates(dateArray: any[]) {

  const result = [];
  let currentRange = [];

  for (let i = 0; i < dateArray.length; i++) {
    const currentDate = dateArray[i].date;
    const nextDate = dateArray[i + 1]?.date;

    currentRange.push(currentDate);

    if (!nextDate || !isConsecutive(currentDate, nextDate)) {
      result.push(formatRange(currentRange));
      currentRange = [];
    }
  }

  return result;
}

function isConsecutive(date1: any, date2: any) {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(date1).getTime();
  const secondDate = new Date(date2).getTime();

  return Math.abs((firstDate - secondDate) / oneDay) === 1;
}

function formatRange(dateRange: any) {
  if (dateRange.length === 1) {
    return formatDate(dateRange[0]);
  } else {
    const firstDate = formatDate(dateRange[0]);
    const lastDate = formatDate(dateRange[dateRange.length - 1]);
    return `Del ${firstDate} al ${lastDate}`;
  }
}

function formatDate(dateString: any) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(2);

  return `${day}-${month}-${year}`;
}

// ? FILTERS
export const availableEmployees = (employees: EmployeeBaseForm[]): EmployeeBaseForm[] => {
    return employees.filter((employee: EmployeeBaseForm) => {
        return employee.business.isActive === true
    })
}

// ? DATA STRUCTURES
export const defaultDay = (day: number) => {
    return {
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
    }
}

export const generateEmptySchedule = (employees: EmployeeBaseForm[], currYear: number): any[] => {
    const allYears: number[] = Array.from(
      new Set(
        employees
          .flatMap((employee) =>
            Object.keys(employee.business.registers || {}).map(Number)
          )
          .filter((year) => !isNaN(year))
      )
    );

    const emptySchedule: any[] = employees.map((employee: EmployeeBaseForm) => {
      const employeeHolidays: any = {};

      if (allYears.length === 0) {
        employeeHolidays[currYear] = {};

        getAllDaysFromYear(currYear).map((day: Date, idx: number) => {
          employeeHolidays[currYear][idx] = {
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

        return employeeHolidays;
      }

      allYears.forEach((year) => {
        const employeeYearHolidays =
          employee.business.registers && employee.business.registers[year];
        if (employeeYearHolidays) {
          // Si hay vacaciones registradas para este año, recupéralas y genera el resto del año vacío
          employeeHolidays[year] = employeeYearHolidays;
          const allDaysOfYear = getAllDaysFromYear(year)

          for(let i = 0; i <= allDaysOfYear.length - 1; i++) {
            if(!employeeHolidays[year][i]){
                employeeHolidays[year][i] = {
                    date: allDaysOfYear[i],
                    isLockedDay: false,
                    isFNR: false,
                    isSunday: isSunday(allDaysOfYear[i]),
                    isFreeDay: false,
                    isConfirmedSchedule: false,
                    scheduleTimes: [],
                    isActiveHoliday: false,
                    isEnjoyedHoliday: false,
                    extraTimeAmount: 0,
                    isReturnedFNR: false,
                }
            }
          }
            
        } else {
          // Si no hay vacaciones para este año, genera un horario vacío
          getAllDaysFromYear(year).map((day: Date, idx: number) => {
            employeeHolidays[currYear][idx] = {
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
        }
      });

      return employeeHolidays;
    });

    return emptySchedule;
};