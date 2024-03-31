"use client";

import { ApiResponse } from "../../../types";
import { useState } from "react";
import EmptyItemList from "../globals/EmptyItemList";
import { Card } from "@tremor/react";
import { getAllDaysFromYear, separateDates } from "@/CI/public.constants";
import { isSunday } from "date-fns";

// This is the single employee view component and include some methods and dynamic views that are interesting. Read the comments as you check the component.
export default function SingleEmployee(props: ApiResponse["data"]) {
  const { data } = props;
  const employee = data.data;

  const [activeStep, setActiveStep] = useState(1);
  const [activeSubStep, setActiveSubStep] = useState(1);
  const [currYear, setCurrYear] = useState(new Date().getFullYear());

  const handleNext = () => {
    setActiveStep((prevStep: number) => prevStep + 1);
  };

  const handlePrev = () => {
    setActiveStep((prevStep: number) => prevStep - 1);
  };

  const handleChangePage = (e: any) => {
    e.preventDefault();
    if (e.target.id === "1") {
      setActiveStep(1);
    } else if (e.target.id === "2") {
      setActiveStep(2);
    } else if (e.target.id === "3") {
      setActiveStep(3);
    }
  };

  const handleChangeSubpage = (e: any) => {
    e.preventDefault();
    if (e.target.id === "1") {
      setActiveSubStep(1);
      setCurrYear(new Date().getFullYear());
    } else if (e.target.id === "2") {
      setActiveSubStep(2);
      setCurrYear(new Date().getFullYear());
    } else if (e.target.id === "3") {
      setActiveSubStep(3);
      setCurrYear(new Date().getFullYear());
    } else if (e.target.id === "4") {
      setActiveSubStep(4);
      setCurrYear(new Date().getFullYear());
    }
  };

  const handleYearSelect = (e: any) => {
    e.preventDefault();
    setCurrYear(e.target.value);
    setFilteredYearState(filterYearState(e.target.value));
  };

  // This first method filters the year state data from the input employee and create a new data structure with it to store in the global state of the component.
  const filterYearState = (year: number) => {
    const currentYear = employee.business.registers[year];
    const currentState: Record<string, any> = {
      holidays: { active: [], enjoyed: [] },
      fnr: { worked: [], returned: [] },
      schedules: { splitTurn: [], total: [] },
      sundaysWorked: [],
      extraTime: [],
      reports: [],
    };
    Object.keys(currentYear).map((day: number | string) => {
      if (currentYear[day].isActiveHoliday) {
        currentState.holidays.active.push(currentYear[day]);
      } else if (currentYear[day].isEnjoyedHoliday) {
        currentState.holidays.enjoyed.push(currentYear[day]);
      } else if (currentYear[day].isFNR) {
        currentState.fnr.worked.push(currentYear[day]);
      } else if (currentYear[day].isReturnedFNR) {
        currentState.fnr.returned.push(currentYear[day]);
      } else if (currentYear[day].scheduleTimes.length > 0) {
        currentState.schedules.total.push(currentYear[day]);
        if (currentYear[day].scheduleTimes.length > 1)
          currentState.schedules.splitTurn.push(currentYear[day]);
      } else if (currentYear[day].isSunday) {
        currentState.schedules.sundaysWorked.push(currentYear[day]);
      } else if (currentYear[day].extraTimeAmount > 0) {
        currentState.schedules.extraTime.push(currentYear[day]);
      } else if (currentYear[day].reportType) {
        currentState.schedules.reports.push(currentYear[day]);
      }
    });
    return currentState;
  };

  // Those are the methods and states to handle the detailed or regular view of business logic section.
  const handleHolidayDetails = (e: any) => {
    const newDetails = !holidayDetails;

    setHolidayDetails(newDetails);
  };
  const handleFnrDetails = (e: any) => {
    const newDetails = !fnrDetails;

    setFnrDetails(newDetails);
  };
  const handleScheduleDetails = (e: any) => {
    const newDetails = !scheduleDetails;

    setScheduleDetails(newDetails);
  };
  const handleExtraTimeDetails = (e: any) => {
    const newDetails = !extraTimeDetails;

    setExtraTimeDetails(newDetails);
  };
  const handleReportsDetails = (e: any) => {
    const newDetails = !reportsDetails;

    setReportsDetails(newDetails);
  };
  const [holidayDetails, setHolidayDetails] = useState(false);
  const [fnrDetails, setFnrDetails] = useState(false);
  const [scheduleDetails, setScheduleDetails] = useState(false);
  const [extraTimeDetails, setExtraTimeDetails] = useState(false);
  const [reportsDetails, setReportsDetails] = useState(false);

  // I store the data structure that generates the method seen earlier into the global state as initial information.
  const [filteredYearState, setFilteredYearState] = useState(
    filterYearState(currYear)
  );

  return (
    <>
      <div className="font-playfair text-white w-[100%] p-4 mx-2 bg-oliveGreen-800">
        <div className="flex flex-col justify-center items-center w-[100%] p-2">
          <h1 className="text-3xl text-mainRed-800">
            {employee.info.surName}, {employee.info.firstName}
          </h1>
          <h3 className="text-xl text-mainRed-800">
            {employee.business.isActive
              ? employee.contractual.lastActivation
                ? `Miembro activo desde: ${new Date(
                    employee.contractual.lastActivation
                  ).toLocaleDateString("es-ES", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                  })}`
                : `Miembro activo desde: ${new Date(
                    employee.contractual.startedAt
                  ).toLocaleDateString("es-ES", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                  })}`
              : "Miembro inactivo"}
          </h3>

          <div className="flex flex-row p-0 m-2 gap-1 justify-between w-[100%] h-10 font-playfair">
            <button
              onClick={handleChangePage}
              className="bg-mainRed-800 w-[32.5%] rounded-t-xl text-white hover:scale-105"
              id="1"
            >
              Información personal
            </button>
            <button
              onClick={handleChangePage}
              className="bg-mainRed-800 w-[32.5%] rounded-t-xl text-white hover:scale-105"
              id="2"
            >
              Información contractual
            </button>
            <button
              onClick={handleChangePage}
              className="bg-mainRed-800 w-[32.5%] rounded-t-xl text-white hover:scale-105"
              id="3"
            >
              Información de negocio
            </button>
          </div>
        </div>

        {
          // Dynamic rendering of the form steps view.
        }
        {activeStep === 1 && (
          <>
            <h4 className="font-fairplay text-2xl text-center text-mainRed-800 w-[100%] m-4">
              Información personal
            </h4>
            <div className="flex flex-row gap-4 justify-center font-playfair p-4">
              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="dni" className="text-lg text-white">
                  DNI
                </label>
                <p className="text-lg">{employee.info.dni}</p>
              </div>

              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="ss" className="text-lg text-white">
                  Afiliación a la SS
                </label>
                <p className="text-lg">{employee.info.ssAffiliation}</p>
              </div>
            </div>

            <div className="flex flex-row gap-4 justify-center font-playfair p-4">
              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="dob" className="text-lg text-white">
                  Fecha de nacimiento
                </label>
                <p className="text-lg">
                  {new Date(employee.info.dob).toLocaleDateString("es-ES", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </p>
              </div>

              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="phone" className="text-lg text-white">
                  Teléfono
                </label>
                <p className="text-lg">{employee.info.phone}</p>
              </div>
            </div>

            <div className="flex flex-row gap-4 justify-center font-playfair p-4">
              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="email" className="text-lg text-white">
                  Email
                </label>
                <p className="text-lg">{employee.info.email}</p>
              </div>
            </div>

            <div className="flex flex-row justify-center items-center gap-2">
              <button
                type="button"
                onClick={handleNext}
                className="cursor-pointer bg-gradient-to-r from-mainRed-800 to-mainRed-900 hover:scale-105 p-4 mt-4 rounded-tr-lg rounded-bl-lg text-white"
              >
                Siguiente
              </button>
            </div>
          </>
        )}

        {activeStep === 2 && (
          <>
            <h4 className="font-fairplay text-2xl text-center text-mainRed-800 w-[100%] m-4">
              Información contractual
            </h4>
            <div className="flex flex-row gap-4 justify-center font-playfair p-4">
              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="started-at" className="text-lg text-white">
                  Fecha de inicio
                </label>
                <p className="text-lg">
                  {new Date(employee.contractual.startedAt).toLocaleDateString(
                    "es-ES",
                    {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                    }
                  )}
                </p>
              </div>

              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="duration" className="text-lg text-white">
                  Duración de contrato
                </label>
                <p className="text-lg">
                  {employee.contractual.duration === 0
                    ? "Indefinido"
                    : `${employee.contractual.duration} meses`}
                </p>
              </div>
              {employee.contractual.duration !== 0 ? (
                <>
                  <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                    <label htmlFor="finish-at" className="text-lg text-white">
                      Fecha de finalización
                    </label>
                    <p className="text-lg">
                      {new Date(
                        employee.contractual.finishAt
                      ).toLocaleDateString("es-ES", {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </p>
                  </div>

                  <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                    <label
                      htmlFor="possible-return"
                      className="text-lg text-white"
                    >
                      Fecha de posible retorno
                    </label>
                    <p className="text-lg">
                      {new Date(
                        employee.contractual.nextPossibleReturn
                      ).toLocaleDateString("es-ES", {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </p>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="flex flex-row gap-4 justify-center font-playfair p-4">
              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="type" className="text-lg text-white">
                  Tipo de contrato
                </label>
                <p className="text-lg">{employee.contractual.type}</p>
              </div>

              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="hours" className="text-lg text-white">
                  Horas de contrato
                </label>
                <p className="text-lg">{employee.contractual.hours}</p>
              </div>
            </div>

            <div className="flex flex-row gap-4 justify-center font-playfair p-4">
              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="role" className="text-lg text-white">
                  Rol
                </label>
                <p className="text-lg">{employee.contractual.role}</p>
              </div>
              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="category" className="text-lg text-white">
                  Categoría
                </label>
                <p className="text-lg">{employee.contractual.category}</p>
              </div>
              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="monthly-cost" className="text-lg text-white">
                  Coste mensual
                </label>
                <p className="text-lg">{employee.contractual.monthlyCost} €</p>
              </div>
            </div>

            <div className="flex flex-row gap-4 justify-center font-playfair p-4">
              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="team" className="text-lg text-white">
                  Equipo asignado
                </label>
                <p className="text-lg">{employee.business.assignedTeam}</p>
              </div>

              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="turn" className="text-lg text-white">
                  Turno asignado
                </label>
                <p className="text-lg">{employee.business.turnAssigned}</p>
              </div>

              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="turn" className="text-lg text-white">
                  Trabajador activo
                </label>
                <p className="text-lg">
                  {employee.business.isActive ? "Sí" : "No"}
                </p>
              </div>
            </div>

            <div className="flex flex-row justify-center items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="cursor-pointer bg-gradient-to-r from-mainRed-800 to-mainRed-900 hover:scale-105 p-4 mt-4 rounded-tr-lg rounded-bl-lg text-white"
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="cursor-pointer bg-gradient-to-r from-mainRed-800 to-mainRed-900 hover:scale-105 p-4 mt-4 rounded-tr-lg rounded-bl-lg text-white"
              >
                Siguiente
              </button>
            </div>
          </>
        )}

        {activeStep === 3 && (
          <>
            <h4 className="font-fairplay text-2xl text-center text-mainRed-800 w-[100%] m-4">
              Información de negocio
            </h4>
            <select
              onChange={handleYearSelect}
              value={currYear}
              className="text-mainRed-800 mt-2 mb-2"
            >
              {Object.keys(employee.business.registers).map(
                (year: number | string, idx: number) => {
                  return (
                    <option
                      value={year}
                      key={idx}
                      className="text-mainRed-800 text-lg"
                    >
                      {year}
                    </option>
                  );
                }
              )}
            </select>
            <div className="flex flex-row p-0 m-2 gap-1 justify-between w-[100%] h-10 font-playfair">
              <button
                onClick={handleChangeSubpage}
                className="bg-mainRed-800 w-[25%] rounded-t-xl text-white hover:scale-105"
                id="1"
              >
                Vacaciones y FNR
              </button>
              <button
                onClick={handleChangeSubpage}
                className="bg-mainRed-800 w-[25%] rounded-t-xl text-white hover:scale-105"
                id="2"
              >
                Turnos
              </button>
              <button
                onClick={handleChangeSubpage}
                className="bg-mainRed-800 w-[25%] rounded-t-xl text-white hover:scale-105"
                id="3"
              >
                Horas extra
              </button>
              <button
                onClick={handleChangeSubpage}
                className="bg-mainRed-800 w-[25%] rounded-t-xl text-white hover:scale-105"
                id="4"
              >
                Informes
              </button>
            </div>
            {employee.business.registers ? (
              <>
                {activeSubStep === 1 && (
                  <>
                    <div className="w-[100%] flex flex-col md:flex-row gap-4 justify-center items-start p-4 m-2">
                      <Card className="mx-auto max-w-md">
                        <h4 className="text-3xl text-tremor-content dark:text-dark-tremor-content">
                          Vacaciones
                        </h4>
                        <div className="flex flex-row justify-evenly items-center">
                          <div className="flex flex-col text-oliveGreen-800 text-xl justify-center items-center">
                            <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                              {filteredYearState?.holidays.active.length +
                                filteredYearState?.holidays.enjoyed.length}{" "}
                              / 30
                            </p>
                            <p className="mt-4 flex items-center justify-between text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                              <span>
                                {Math.floor(
                                  ((filteredYearState?.holidays.active.length +
                                    filteredYearState?.holidays.enjoyed
                                      .length) /
                                    30) *
                                    100
                                ) === Infinity
                                  ? 0
                                  : Math.floor(
                                      ((filteredYearState?.holidays.active
                                        .length +
                                        filteredYearState?.holidays.enjoyed
                                          .length) /
                                        30) *
                                        100
                                    )}
                                % de días programados
                              </span>
                            </p>
                          </div>

                          <div className="flex flex-col text-oliveGreen-800 text-xl justify-center items-center">
                            <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                              {filteredYearState?.holidays.enjoyed.length} / 30
                            </p>
                            <p className="mt-4 flex items-center justify-between text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                              <span>
                                {Math.floor(
                                  ((filteredYearState?.holidays.active.length +
                                    filteredYearState?.holidays.enjoyed
                                      .length) /
                                    30) *
                                    100
                                ) === Infinity
                                  ? 0
                                  : Math.floor(
                                      (filteredYearState?.holidays.enjoyed
                                        .length /
                                        30) *
                                        100
                                    )}
                                % de días disfrutados
                              </span>
                            </p>
                          </div>
                        </div>

                        {holidayDetails && (
                          <div className="flex flex-row justify-evenly items-center w-[100] h-fit mt-2 p-2">
                            <div className="flex flex-col justify-start items-center">
                              <h5>Programados</h5>
                              {separateDates(
                                filteredYearState?.holidays.active
                              ).map((tram: any, idx: number) => {
                                return <p key={idx}>{tram}</p>;
                              })}
                            </div>

                            <div className="flex flex-col justify-start items-center">
                              <h5>Disfrutados</h5>
                              {separateDates(
                                filteredYearState?.holidays.enjoyed
                              ).map((tram: any, idx: number) => {
                                return <p key={idx}>{tram}</p>;
                              })}
                            </div>
                          </div>
                        )}
                        <div className="flex flex-col justify-center items-center">
                          {filteredYearState?.holidays.active.length !== 0 ||
                          filteredYearState?.holidays.enjoyed.length !== 0 ? (
                            <button
                              onClick={handleHolidayDetails}
                              className="bg-gradient-to-r from-oliveGreen-800 to-oliveGreen-700 text-mainRed-800 hover:scale-105 p-4 m-2"
                            >
                              {holidayDetails
                                ? "OCULTAR DETALLES"
                                : "VER DETALLES"}
                            </button>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Card>
                      <Card className="mx-auto max-w-md">
                        <h4 className="text-3xl text-tremor-content dark:text-dark-tremor-content">
                          FNR
                        </h4>
                        <div className="flex flex-row justify-evenly items-center">
                          <div className="flex flex-col text-oliveGreen-800 text-xl justify-center items-center">
                            <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                              {filteredYearState?.fnr.worked.length} / 15
                            </p>
                            <p className="mt-4 flex items-center justify-between text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                              <span>
                                {Math.floor(
                                  (filteredYearState?.fnr.worked.length / 15) *
                                    100
                                ) === Infinity
                                  ? 0
                                  : Math.floor(
                                      (filteredYearState?.fnr.worked.length /
                                        15) *
                                        100
                                    )}
                                % de FNR en turno
                              </span>
                            </p>
                          </div>

                          <div className="flex flex-col text-oliveGreen-800 text-xl justify-center items-center">
                            <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                              {filteredYearState?.fnr.returned.length} /{" "}
                              {filteredYearState?.fnr.worked.length}
                            </p>
                            <p className="mt-4 flex items-center justify-between text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                              <span>
                                {Math.floor(
                                  (filteredYearState?.fnr.returned.length /
                                    filteredYearState?.fnr.worked.length) *
                                    100
                                ) === Infinity ||
                                isNaN(
                                  Math.floor(
                                    (filteredYearState?.fnr.returned.length /
                                      filteredYearState?.fnr.worked.length) *
                                      100
                                  )
                                )
                                  ? 0
                                  : Math.floor(
                                      (filteredYearState?.fnr.returned.length /
                                        filteredYearState?.fnr.worked.length) *
                                        100
                                    )}
                                % de FNR retornados
                              </span>
                            </p>
                          </div>
                        </div>

                        {fnrDetails && (
                          <div className="flex flex-row justify-evenly items-center w-[100] h-fit mt-2 p-2">
                            <div className="flex flex-col justify-start items-center">
                              <h5>Trabajados</h5>
                              {separateDates(filteredYearState?.fnr.worked).map(
                                (tram: any, idx: number) => {
                                  return <p key={idx}>{tram}</p>;
                                }
                              )}
                            </div>

                            <div className="flex flex-col justify-start items-center">
                              <h5>Retornados</h5>
                              {separateDates(
                                filteredYearState?.fnr.returned
                              ).map((tram: any, idx: number) => {
                                return <p key={idx}>{tram}</p>;
                              })}
                            </div>
                          </div>
                        )}
                        <div className="flex flex-col justify-center items-center">
                          {filteredYearState?.fnr.worked.length !== 0 ||
                          filteredYearState?.fnr.returned.length !== 0 ? (
                            <button
                              onClick={handleFnrDetails}
                              className="bg-gradient-to-r from-oliveGreen-800 to-oliveGreen-700 text-mainRed-800 hover:scale-105 p-4 m-2"
                            >
                              {holidayDetails
                                ? "OCULTAR DETALLES"
                                : "VER DETALLES"}
                            </button>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Card>
                    </div>
                  </>
                )}

                {activeSubStep === 2 && (
                  <>
                    <div className="w-[100%] flex flex-col md:flex-row gap-4 justify-center items-start p-4 m-2">
                      <Card className="mx-auto max-w-md">
                        <h4 className="text-3xl text-tremor-content dark:text-dark-tremor-content">
                          Turnos
                        </h4>
                        <div className="flex flex-row justify-evenly items-center">
                          <div className="flex flex-col text-oliveGreen-800 text-xl justify-center items-center">
                            <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                              {filteredYearState?.schedules.splitTurn.length}
                              {" / "}
                              {filteredYearState?.schedules.total.length}
                            </p>
                            <p className="mt-4 flex items-center justify-between text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                              <span>
                                {Math.floor(
                                  (filteredYearState?.schedules.splitTurn
                                    .length /
                                    filteredYearState?.schedules.total.length) *
                                    100
                                ) === Infinity ||
                                isNaN(
                                  Math.floor(
                                    (filteredYearState?.schedules.splitTurn
                                      .length /
                                      filteredYearState?.schedules.total
                                        .length) *
                                      100
                                  )
                                )
                                  ? 0
                                  : Math.floor(
                                      (filteredYearState?.schedules.splitTurn
                                        .length /
                                        filteredYearState?.schedules.total
                                          .length) *
                                        100
                                    )}
                                % de turnos partidos
                              </span>
                            </p>
                          </div>

                          <div className="flex flex-col text-oliveGreen-800 text-xl justify-center items-center">
                            <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                              {filteredYearState?.sundaysWorked.length} /{" "}
                              {
                                getAllDaysFromYear(currYear).filter(
                                  (date: Date) => {
                                    return isSunday(new Date(date));
                                  }
                                ).length
                              }
                            </p>
                            <p className="mt-4 flex items-center justify-between text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                              <span>
                                {Math.floor(
                                  (filteredYearState?.sundaysWorked.length /
                                    getAllDaysFromYear(currYear).filter(
                                      (date: Date) => {
                                        return isSunday(new Date(date));
                                      }
                                    ).length) *
                                    100
                                ) === Infinity
                                  ? 0
                                  : Math.floor(
                                      (filteredYearState?.sundaysWorked.length /
                                        getAllDaysFromYear(currYear).filter(
                                          (date: Date) => {
                                            return isSunday(new Date(date));
                                          }
                                        ).length) *
                                        100
                                    )}
                                % de domingos trabajados
                              </span>
                            </p>
                          </div>
                        </div>

                        {scheduleDetails && (
                          <div className="flex flex-row justify-evenly items-center w-[100] h-fit mt-2 p-2">
                            <div className="flex flex-col justify-start items-center">
                              <h5>Turnos partidos</h5>
                              {filteredYearState?.schedules.splitTurn.map(
                                (day: any, idx: number) => {
                                  return (
                                    <p key={idx}>
                                      {new Date(day).toLocaleDateString(
                                        "es-ES",
                                        {
                                          year: "2-digit",
                                          month: "2-digit",
                                          day: "2-digit",
                                        }
                                      )}
                                    </p>
                                  );
                                }
                              )}
                            </div>

                            <div className="flex flex-col justify-start items-center">
                              <h5>Domingos</h5>
                              {filteredYearState?.sundaysWorked.map(
                                (sunday: any, idx: number) => {
                                  return (
                                    <p key={idx}>
                                      {new Date(sunday).toLocaleDateString(
                                        "es-ES",
                                        {
                                          year: "2-digit",
                                          month: "2-digit",
                                          day: "2-digit",
                                        }
                                      )}
                                    </p>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        )}
                        <div className="flex flex-col justify-center items-center">
                          {filteredYearState?.schedules.total.length !== 0 ||
                          filteredYearState?.sundaysWorked.length !== 0 ? (
                            <button
                              onClick={handleScheduleDetails}
                              className="bg-gradient-to-r from-oliveGreen-800 to-oliveGreen-700 text-mainRed-800 hover:scale-105 p-4 m-2"
                            >
                              {scheduleDetails
                                ? "OCULTAR DETALLES"
                                : "VER DETALLES"}
                            </button>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Card>
                    </div>
                  </>
                )}

                {activeSubStep === 3 && (
                  <>
                    <div className="w-[100%] flex flex-col md:flex-row gap-4 justify-center items-start p-4 m-2">
                      <Card className="mx-auto max-w-md">
                        <h4 className="text-3xl text-tremor-content dark:text-dark-tremor-content">
                          Horas extra
                        </h4>

                        <div className="flex flex-row justify-evenly items-center">
                          <div className="flex flex-col text-oliveGreen-800 text-xl justify-center items-center">
                            <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                              {filteredYearState?.extraTime.reduce(
                                (total: any, currentValue: any) => {
                                  return (
                                    total.extraTimeAmount +
                                    currentValue.extraTimeAmount
                                  );
                                },
                                0
                              )}{" "}
                              horas extras registradas
                            </p>
                          </div>

                          <div className="flex flex-col text-oliveGreen-800 text-xl justify-center items-center">
                            <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                              {filteredYearState?.extraTime.length}
                              {" / "}
                              {filteredYearState?.schedules.total.length}
                            </p>
                            <p className="mt-4 flex items-center justify-between text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                              <span>
                                {Math.floor(
                                  (filteredYearState?.extraTime.length /
                                    filteredYearState?.schedules.total.length) *
                                    100
                                ) === Infinity ||
                                isNaN(
                                  Math.floor(
                                    (filteredYearState?.extraTime.length /
                                      filteredYearState?.schedules.total
                                        .length) *
                                      100
                                  )
                                )
                                  ? 0
                                  : Math.floor(
                                      (filteredYearState?.extraTime.length /
                                        filteredYearState?.schedules.total
                                          .length) *
                                        100
                                    )}
                                % de turnos con horas extra
                              </span>
                            </p>
                          </div>
                        </div>

                        {extraTimeDetails && (
                          <div className="flex flex-row justify-evenly items-center w-[100] h-fit mt-2 p-2">
                            <div className="flex flex-col justify-start items-center">
                              <h5>Días y cantidades</h5>
                              {filteredYearState?.extraTime.map(
                                (day: any, idx: number) => {
                                  return (
                                    <>
                                      <p key={idx}>
                                        {new Date(day).toLocaleDateString(
                                          "es-ES",
                                          {
                                            year: "2-digit",
                                            month: "2-digit",
                                            day: "2-digit",
                                          }
                                        )}{" "}
                                        - {day.extraTimeAmount}
                                      </p>
                                    </>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        )}
                        <div className="flex flex-col justify-center items-center">
                          {filteredYearState?.extraTime.length !== 0 ? (
                            <button
                              onClick={handleExtraTimeDetails}
                              className="bg-gradient-to-r from-oliveGreen-800 to-oliveGreen-700 text-mainRed-800 hover:scale-105 p-4 m-2"
                            >
                              {extraTimeDetails
                                ? "OCULTAR DETALLES"
                                : "VER DETALLES"}
                            </button>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Card>
                    </div>
                  </>
                )}

                {activeSubStep === 4 && (
                  <>
                    <div className="w-[100%] flex flex-col md:flex-row gap-4 justify-center items-start p-4 m-2">
                      <Card className="mx-auto max-w-md">
                        <h4 className="text-3xl text-tremor-content dark:text-dark-tremor-content">
                          Informes
                        </h4>

                        <div className="flex flex-row justify-evenly items-center">
                          <div className="flex flex-col text-oliveGreen-800 text-xl justify-center items-center">
                            <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                              {filteredYearState?.reports.length} informes
                              laborales registrados
                            </p>
                          </div>
                        </div>

                        {reportsDetails && (
                          <div className="flex flex-row justify-evenly items-center w-[100] h-fit mt-2 p-2">
                            <div className="flex flex-col justify-start items-center">
                              <h5>Por fecha y tipo</h5>
                              {filteredYearState?.reports.map(
                                (day: any, idx: number) => {
                                  return (
                                    <>
                                      <p key={idx}>
                                        {new Date(day).toLocaleDateString(
                                          "es-ES",
                                          {
                                            year: "2-digit",
                                            month: "2-digit",
                                            day: "2-digit",
                                          }
                                        )}{" "}
                                        - {day.reportType}
                                      </p>
                                    </>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        )}
                        <div className="flex flex-col justify-center items-center">
                          {filteredYearState?.reports.length !== 0 ? (
                            <button
                              onClick={handleReportsDetails}
                              className="bg-gradient-to-r from-oliveGreen-800 to-oliveGreen-700 text-mainRed-800 hover:scale-105 p-4 m-2"
                            >
                              {reportsDetails
                                ? "OCULTAR DETALLES"
                                : "VER DETALLES"}
                            </button>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Card>
                    </div>
                  </>
                )}
              </>
            ) : (
              <EmptyItemList item="registros de información de negocio" />
            )}

            <div className="flex flex-row justify-center items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="cursor-pointer bg-gradient-to-r from-mainRed-800 to-mainRed-900 hover:scale-105 p-4 mt-4 rounded-tr-lg rounded-bl-lg text-white"
              >
                Anterior
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
