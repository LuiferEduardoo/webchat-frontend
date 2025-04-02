import Menu from "./Menu";
import OptionsBelow from "./ObtionsBelow";

export default function Sidebar() {

  return (
    <aside className="flex flex-col items-center bg-white shadow-lg w-16 h-screen py-4">
      <Menu />
      <OptionsBelow />
    </aside>
  );
}
