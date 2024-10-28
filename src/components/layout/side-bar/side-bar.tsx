'use client'
import {
  Calendar,
  Users,
  BookOpen,
  School,
  Home,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const menuItems = [
  { name: "Inicio", icon: Home, href: "/" },
  { name: "Gestión Académica", icon: Calendar, href: "/gestion-academica" },
  { name: "Recursos Académicos", icon: Users, href: "/recursos-academicos" },
  { name: "Gestión de Cursos", icon: Users, href: "/gestion-cursos" },
  { name: "Gestión de Estudiantes y Docentes", icon: School, href: "/gestion-personas" },
  { name: "Historial de cambios y Auditoría", icon: BookOpen, href: "/historial-cambios" }
];

export default function SideBar() {
  const pathname = usePathname();

  return (
    <aside
      className="bg-white w-64 min-h-screen p-4 md:block border shadow-sm rounded"
    >
      <nav>
        <h2 className="text-xl font-bold mb-6 text-gray-800">
          Sistema Académico
        </h2>
        <ul>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.name} className="mb-2">
                <Link
                  href={item.href}
                  className={clsx(
                    'flex items-center p-2 rounded',
                    isActive
                      ? 'text-blue-600 bg-gray-200'
                      : 'text-gray-700 hover:bg-gray-200'
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
