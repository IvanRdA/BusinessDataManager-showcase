// This file includes all the private constants of the project for the client side. At the moment just include the fetching functions and is implemented for CI/CD purposes.
// Must not be included in the repository, but at it is a portfolio project, I will include it to make easier to reproduce the project in other computers.

import { ApiResponse, EmployeeBaseForm, YearsData } from "../../types";

export const API_BASE_URI = 'http://localhost:8080/'

// ? FETCH REQUESTS
export const fetchLoginRequest = async (email: string, password:string): Promise<ApiResponse> => {
    const fetching = await fetch(`${API_BASE_URI}login`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const response = await fetching.json()

    return response
}

export const fetchDeleteEmployee = async (id: string): Promise<ApiResponse> => {
  const fetching = await fetch(
    `${API_BASE_URI}deleteEmployee/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
  );

  const response = await fetching.json();

  return response
}

export const fetchCreateEmployee = async (state: EmployeeBaseForm): Promise<ApiResponse> => {
  const fetching = await fetch(`${API_BASE_URI}newEmployee`, {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ state }),
      });
      const response = await fetching.json();

      return response
}

export const fetchUpdateEmployee = async (state: EmployeeBaseForm, id: string): Promise<ApiResponse> => {
  const fetching = await fetch(
    `${API_BASE_URI}updateEmployee/${id}`,
    {
      cache: "no-store",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ state }),
    }
  );
  const response = await fetching.json();

  return response
}

export const fetchUpdateEmployeeHolidays = async (state: YearsData, id: string): Promise<ApiResponse> => {
  const fetching = await fetch(
    `${API_BASE_URI}updateEmployee/${id}?subset=Holidays`,
    {
      cache: "no-store",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ state }),
    }
  );
  const response = await fetching.json();

  return response
}

export const singleItemFetch = async (param: string, model: string) => {
  const fetching = await fetch(`${API_BASE_URI}getSingle${model}/${param}`, {
    cache: 'no-store',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })

  const response = await fetching.json()

  return response
}

export const allItemsFetch = async (model: string) => {
  const fetching = await fetch(`${API_BASE_URI}getAll${model}`, {
    cache: 'no-store',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })

  const response = await fetching.json()

  return response
}