import { Outlet } from "react-router";

function Main() {
  return (
    <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#EBF0F7]">
      <Outlet />
    </main>
  );
}


export default Main;

