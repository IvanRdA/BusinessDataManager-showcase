"use client";

import { useReducer, useState } from "react";
import employeeReducer from "@/hooks/reducers/employeeReducer";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import { formatDateFromTimestamp } from "@/assets/libs";
import { getSingleDayDate } from "@/CI/public.constants";
import {
  fetchCreateEmployee,
  fetchUpdateEmployee,
} from "@/CI/private.constants";

let initialEmployeeState = {};

// This component handles the create and update employee form. Gets a prop input if is an update operation, so I use this concept to dynamic rendering the form and the operation to the database.

export default function EmployeeForm(props?: any) {
  const { employee } = props;

  if (!employee) {
    initialEmployeeState = {
      info: {
        firstName: "",
        surName: "",
        dni: "",
        ssAffiliation: "",
        dob: "",
        email: "",
        password: "",
        phone: "",
      },
      contractual: {
        startedAt: "",
        type: "",
        hours: 40,
        duration: 0,
        finishAt: "",
        role: "",
        category: "",
        monthlyCost: 0,
        nextPossibleReturn: "",
        lastActivation: "",
      },
      business: {
        assignedTeam: "",
        turnAssigned: "",
        isActive: true,
      },
    };
  } else {
    initialEmployeeState = employee;
  }

  const router = useRouter();
  const [state, dispatch] = useReducer(employeeReducer, initialEmployeeState);

  const [activeStep, setActiveStep] = useState(1);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleChangePage = (e: any) => {
    e.preventDefault();
    if (e.target.id === "1") {
      setActiveStep(1);
    } else if (e.target.id === "2") {
      setActiveStep(2);
    }
  };

  // This method handles the form submit on creation employee event. Uses the private method fetchCreateEmployee to try to store the query into the database.
  async function handleEmployeeSubmit(e: any) {
    e.preventDefault();

    if (state.contractual.duration === 0) {
      dispatch({
        type: "CHANGE_FINISHAT",
        value: getSingleDayDate(2099, 11, 31),
      });
      dispatch({
        type: "CHANGE_POSSIBLERETURN",
        value: getSingleDayDate(2099, 11, 31),
      });
    }

    const response = await fetchCreateEmployee(state);
    if (response.error !== null) {
      toast.error(response.message);
    } else {
      toast.success(`${response.message}`);
      dispatch({ type: "RESET" });
      router.push("/empleados/listado");
    }
  }

  // This method does the same as the upper one, but when the event is an update operation
  async function handleUpdateSubmit(e: any) {
    e.preventDefault();
    if (state.contractual.duration === 0) {
      dispatch({
        type: "CHANGE_FINISHAT",
        value: getSingleDayDate(2099, 11, 31),
      });
      dispatch({
        type: "CHANGE_POSSIBLERETURN",
        value: getSingleDayDate(2099, 11, 31),
      });
    }

    const response = await fetchUpdateEmployee(state, employee._id);

    if (response.error !== null) {
      toast.error(response.message);
    } else {
      toast.success(`${response.message}`);
      setTimeout(() => {
        router.push("/empleados/listado");
      }, 1500);
    }
  }

  return (
    <>
      <Toaster richColors position="top-center" />
      <form
        onSubmit={!employee ? handleEmployeeSubmit : handleUpdateSubmit}
        className="m-2 flex flex-col"
      >
        <div className="flex flex-row p-0 m-0 gap-1 justify-center w-[100%] h-10 font-playfair">
          <button
            onClick={handleChangePage}
            className="bg-mainRed-800 w-[50%] rounded-t-xl text-white hover:scale-105"
            id="1"
          >
            Información personal
          </button>
          <button
            onClick={handleChangePage}
            className="bg-mainRed-800 w-[50%] rounded-t-xl text-white hover:scale-105"
            id="2"
          >
            Información contractual
          </button>
        </div>
        {activeStep === 1 && (
          <>
            <h4 className="font-fairplay text-2xl text-center text-mainRed-800 w-[100%] m-4">
              Información personal
            </h4>
            <div className="flex flex-row gap-4 justify-center font-playfair p-4">
              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="name">Nombre</label>
                <input
                  className="text-black"
                  type="text"
                  id="name"
                  placeholder="José"
                  value={state.info.firstName}
                  onChange={(e) =>
                    dispatch({ type: "CHANGE_NAME", value: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="surname">Apellidos</label>
                <input
                  className="text-black"
                  type="text"
                  id="surname"
                  placeholder="López Escribano"
                  value={state.info.surName}
                  onChange={(e) =>
                    dispatch({ type: "CHANGE_SURNAME", value: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="dni">DNI</label>
                <input
                  className="text-black"
                  type="text"
                  id="dni"
                  placeholder="386457F"
                  value={state.info.dni}
                  onChange={(e) =>
                    dispatch({ type: "CHANGE_DNI", value: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="ss">Afiliación a la SS</label>
                <input
                  className="text-black"
                  type="text"
                  id="ss"
                  placeholder="195285316813"
                  value={state.info.ssAffiliation}
                  onChange={(e) =>
                    dispatch({
                      type: "CHANGE_SS",
                      value: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex flex-row gap-4 justify-center font-playfair p-4">
              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="dob">Fecha de nacimiento</label>
                <input
                  className="text-black"
                  type="date"
                  id="dob"
                  value={formatDateFromTimestamp(state.info.dob)}
                  onChange={(e) =>
                    dispatch({
                      type: "CHANGE_DOB",
                      value: new Date(e.target.value).getTime(),
                    })
                  }
                />
              </div>

              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="phone">Teléfono</label>
                <input
                  className="text-black"
                  type="text"
                  id="phone"
                  placeholder="699699699"
                  value={state.info.phone}
                  onChange={(e) =>
                    dispatch({
                      type: "CHANGE_PHONE",
                      value: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex flex-row gap-4 justify-center font-playfair p-4">
              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="email">Email</label>
                <input
                  className="text-black"
                  type="text"
                  id="email"
                  placeholder="ejemplo@ejemplo.com"
                  value={state.info.email}
                  onChange={(e) =>
                    dispatch({
                      type: "CHANGE_EMAIL",
                      value: e.target.value,
                    })
                  }
                />
              </div>

              {!employee && (
                <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    className="text-black"
                    type="text"
                    id="password"
                    value={state.info.password}
                    placeholder="Contraseña1De$Prueba"
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_PASSWORD",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
              )}
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex flex-row justify-center items-center gap-2">
                <input
                  type="reset"
                  value="Limpiar datos"
                  className="cursor-pointer bg-gradient-to-r from-mainRed-800 to-mainRed-900 hover:scale-105 p-4 mt-4 rounded-tr-lg rounded-bl-lg text-white"
                  onClick={(e) => {
                    if (confirm("Seguro que desea limpiar los datos?")) {
                      dispatch({ type: "RESET" });
                    }
                  }}
                />
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
                <label htmlFor="started-at">Fecha de inicio</label>
                <input
                  className="text-black"
                  type="date"
                  id="started-at"
                  value={formatDateFromTimestamp(state.contractual.startedAt)}
                  onChange={(e) =>
                    dispatch({
                      type: "CHANGE_STARTEDAT",
                      value: new Date(e.target.value).getTime(),
                    })
                  }
                />
              </div>

              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="duration">Duración de contrato</label>
                <input
                  className="text-black"
                  type="number"
                  id="duration"
                  value={state.contractual.duration}
                  onChange={(e) =>
                    dispatch({
                      type: "CHANGE_DURATION",
                      value: e.target.value,
                    })
                  }
                />
              </div>
              {state.contractual.duration !== 0 ? (
                <>
                  <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                    <label htmlFor="finish-at">Fecha de finalización</label>
                    <input
                      className="text-black"
                      type="date"
                      id="finish-at"
                      value={formatDateFromTimestamp(
                        state.contractual.finishAt
                      )}
                      onChange={(e) =>
                        dispatch({
                          type: "CHANGE_FINISHAT",
                          value: new Date(e.target.value).getTime(),
                        })
                      }
                    />
                  </div>

                  <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                    <label htmlFor="possible-return">
                      Fecha de posible retorno
                    </label>
                    <input
                      className="text-black"
                      type="date"
                      id="possible-return"
                      value={formatDateFromTimestamp(
                        state.contractual.nextPossibleReturn
                      )}
                      onChange={(e) =>
                        dispatch({
                          type: "CHANGE_POSSIBLERETURN",
                          value: new Date(e.target.value).getTime(),
                        })
                      }
                    />
                  </div>

                  <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                    <label htmlFor="last-return">
                      Fecha de última activación
                    </label>
                    <input
                      className="text-black"
                      type="date"
                      id="last-return"
                      value={
                        employee
                          ? formatDateFromTimestamp(
                              state.contractual.lastActivation
                            )
                          : formatDateFromTimestamp(state.contractual.startedAt)
                      }
                      onChange={(e) =>
                        dispatch({
                          type: "CHANGE_LASTACTIVATION",
                          value: new Date(e.target.value).getTime(),
                        })
                      }
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="flex flex-row gap-4 justify-center font-playfair p-4">
              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="type">Tipo de contrato</label>
                <input
                  className="text-black"
                  type="text"
                  id="type"
                  placeholder="Indefinido"
                  value={
                    state.contractual.duration === 0
                      ? "Indefinido"
                      : state.contractual.type
                  }
                  onChange={(e) =>
                    dispatch({
                      type: "CHANGE_TYPE",
                      value: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="hours">Horas de contrato</label>
                <input
                  className="text-black"
                  type="number"
                  id="hours"
                  value={state.contractual.hours}
                  onChange={(e) =>
                    dispatch({
                      type: "CHANGE_HOURS",
                      value: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex flex-row gap-4 justify-center font-playfair p-4">
              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="role">Rol</label>
                <select
                  onChange={(e) =>
                    dispatch({ type: "CHANGE_ROLE", value: e.target.value })
                  }
                  value={state.contractual.role}
                  className="text-black"
                  id="role"
                >
                  <option defaultChecked>Seleccione una opción</option>
                  <option value="Camarero">Camarero</option>
                  <option value="Cocinero">Cocinero</option>
                  <option value="Maitre">Maitre</option>
                  <option value="Jefe de departamento">
                    Jefe de departamento
                  </option>
                  <option value="Limpieza">Limpieza</option>
                  <option value="Backoffice">Backoffice</option>
                  <option value="Director">Director</option>
                </select>
              </div>
              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="category">Categoría</label>
                <select
                  onChange={(e) =>
                    dispatch({ type: "CHANGE_CATEGORY", value: e.target.value })
                  }
                  value={state.contractual.category}
                  className="text-black"
                  id="category"
                >
                  <option defaultChecked>Seleccione una opción</option>
                  <option value="Camarero">Camarero</option>
                  <option value="Cocinero">Cocinero</option>
                  <option value="Maitre">Maitre</option>
                  <option value="Jefe de departamento">
                    Jefe de departamento
                  </option>
                  <option value="Limpieza">Limpieza</option>
                  <option value="Backoffice">Backoffice</option>
                  <option value="Director">Director</option>
                </select>
              </div>
              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="monthly-cost">Coste mensual</label>
                <input
                  className="text-black"
                  type="number"
                  id="monthly-cost"
                  value={state.contractual.monthlyCost}
                  onChange={(e) =>
                    dispatch({
                      type: "CHANGE_MONTHLYCOST",
                      value: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex flex-row gap-4 justify-center font-playfair p-4">
              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="team">Equipo asignado</label>
                <select
                  onChange={(e) =>
                    dispatch({
                      type: "CHANGE_ASSIGNEDTEAM",
                      value: e.target.value,
                    })
                  }
                  value={state.business.assignedTeam}
                  className="text-black"
                  id="team"
                >
                  <option defaultChecked>Seleccione una opción</option>
                  <option value="Sala">Sala</option>
                  <option value="Cocina">Cocina</option>
                  <option value="Jefe de departamento">
                    Jefe de departamento
                  </option>
                  <option value="Limpieza">Limpieza</option>
                  <option value="Backoffice">Backoffice</option>
                  <option value="Dirección">Dirección</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="flex flex-col justify-center items-center text-mainRed-800 w-[25%]">
                <label htmlFor="turn">Turno asignado</label>
                <select
                  onChange={(e) =>
                    dispatch({
                      type: "CHANGE_ASSIGNEDTURN",
                      value: e.target.value,
                    })
                  }
                  value={state.business.turnAssigned}
                  className="text-black"
                  id="turn"
                >
                  <option defaultChecked>Seleccione una opción</option>
                  <option value="Mañanas">Mañanas</option>
                  <option value="Tardes">Tardes</option>
                  <option value="Partido">Partido</option>
                  <option value="Comodín">Comodín</option>
                </select>
              </div>
              <fieldset
                title="Trabajador activo"
                className="flex flex-col justify-start items-center text-mainRed-800 w-fit border border-mainRed-800 px-2"
              >
                <legend className="text-left p-2 cursor-default">
                  Trabajador activo
                </legend>
                <label
                  htmlFor="active"
                  className="text-lg px-2 hover:cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="p-2 m-2 text-mainRed-800"
                    checked={state.business.isActive}
                    id="active"
                    value={state.business.isActive}
                    onChange={(e) => {
                      dispatch({
                        type: "CHANGE_ISACTIVE",
                        value: Boolean(
                          state.business.isActive === true ? 0 : 1
                        ),
                      });
                    }}
                  />
                  Trabajador activo
                </label>
              </fieldset>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex flex-row justify-center items-center gap-2">
                <input
                  type="reset"
                  value="Limpiar datos"
                  className="cursor-pointer bg-gradient-to-r from-mainRed-800 to-mainRed-900 hover:scale-105 p-4 mt-4 rounded-tr-lg rounded-bl-lg text-white"
                  onClick={(e) => {
                    if (confirm("Seguro que desea limpiar los datos?")) {
                      dispatch({ type: "RESET" });
                    }
                  }}
                />
                <input
                  type="submit"
                  value={employee ? "Actualizar empleado" : "Crear empleado"}
                  className="cursor-pointer bg-gradient-to-r from-mainRed-800 to-mainRed-900 hover:scale-105 p-4 mt-4 rounded-tr-lg rounded-bl-lg text-white"
                />
              </div>

              <div className="flex flex-row justify-center items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="cursor-pointer bg-gradient-to-r from-mainRed-800 to-mainRed-900 hover:scale-105 p-4 mt-4 rounded-tr-lg rounded-bl-lg text-white"
                >
                  Anterior
                </button>
              </div>
            </div>
          </>
        )}
      </form>
    </>
  );
}
