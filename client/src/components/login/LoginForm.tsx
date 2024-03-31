"use client";

import { useState } from "react";
import Image from "next/image";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { ApiResponse } from "../../../types";
import { fetchLoginRequest } from "@/CI/private.constants";

// Component for the login form. If the user login successfully it stores in the local storage the authorization token. If not stores undefined as the value for the token key. It will be used in future auth processes.
export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState("password");

  const handleEmail = (event: any) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handlePassword = (event: any) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleVisible = (event: any) => {
    event.preventDefault();
    setIsVisible(isVisible === "text" ? "password" : "text");
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const response: ApiResponse = await fetchLoginRequest(email, password);
    if (response.error === null) {
      toast.success(`Login correcto. \nBienvenido ${response.data.name}`);
      localStorage.setItem("token", response.data.token);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } else {
      toast.error(`${response.message}`);
      localStorage.setItem("token", "undefined");
    }
  };

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="w-[80%] flex flex-col justify-center items-center">
        <form className="text-mainRed-800 flex flex-col md:flex-row justify-center items-center text-center gap-4">
          <div className="p-2 w-[40%]">
            <label htmlFor="email-field" className="text-center">
              Email
            </label>
            <br />
            <input
              id="email-field"
              type="text"
              value={email}
              placeholder="example@example.com"
              onChange={handleEmail}
            />
            <br />
            <small></small>
          </div>
          <div className="p-2 w-[60%]">
            <label htmlFor="pass-field" className="text-center">
              Password
            </label>
            <br />
            <input
              id="pass-field"
              type={isVisible}
              value={password}
              placeholder="Contraseña0Prueba$"
              onChange={handlePassword}
            />
            <button onClick={handleVisible} className="ml-2">
              <Image
                src={
                  isVisible === "password"
                    ? "/icons/red/visible.svg"
                    : "/icons//red/invisible.svg"
                }
                width={24}
                height={24}
                alt={
                  isVisible === "text"
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
                }
                title={
                  isVisible === "text"
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
                }
                className="items-center"
              />
            </button>
            <br />
            <small></small>
          </div>
          <br />
        </form>
        <div className="w-[100%] flex justify-center items-center">
          <input
            type="submit"
            value="ACCESO"
            className="bg-white text-center text-xl text-mainRed-800 hover:bg-mainRed-800 hover:text-white w-[25%] cursor-pointer py-2 px-4 hover:rounded-md hover:scale-105 m-4"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </>
  );
}
