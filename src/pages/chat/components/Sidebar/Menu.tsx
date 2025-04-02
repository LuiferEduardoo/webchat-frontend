
import { Link, useLocation } from "react-router-dom";

import { FaRegMessage } from "react-icons/fa6";
import { cn } from "../../../../lib/utils";

const menuItems = [{ icon: FaRegMessage, badge: 6, endpoint: "/chat" }];

export default function Menu() {
  const location = useLocation();

  // Determina si el ítem debe estar activo basado en la ruta actual
  const isItemActive = (endpoint: string) => {
    return location.pathname.startsWith(endpoint);
  };

  return (
    <>
      {menuItems.map((item, index) => (
        <Link 
          to={item.endpoint}
          key={index}
          className={cn(
            "relative flex items-center justify-center w-12 h-12 my-2 rounded-lg transition-all",
            isItemActive(item.endpoint) ? "bg-gray-200" : "hover:bg-gray-100"
          )}
        >
          <item.icon className="w-6 h-6 text-gray-600" />
          {/* {item.badge && (
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {item.badge}
            </span>
          )} */}
        </Link>
      ))}
    </>
  );
}