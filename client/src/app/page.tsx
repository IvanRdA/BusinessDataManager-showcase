import LoginMainBox from "@/components/login/LoginMainBox";

export default function Login() {
  return (
    <main className="w-[100%] h-[100%] flex flex-col md:flex-row justify-center items-center p-8">
      <div className="flex flex-col md:flex-row justify-center items-center w-[80%]">
        <LoginMainBox />
      </div>
    </main>
  );
}
