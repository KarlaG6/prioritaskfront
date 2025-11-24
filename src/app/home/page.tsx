"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
} from "@radix-ui/react-navigation-menu";
import { Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCategories } from "@/context/CategoriesContext";
import { useReminders } from "@/context/RemindersContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function HomeBento() {
  const { categories } = useCategories();
  const { reminders } = useReminders();
  return (
    <div className="p-6 max-w-7xl mx-auto grid gap-6">
      {/* ---------- FILA 1 (2 boxes) ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BOX 1 */}
        <div className="bg-white rounded-3xl shadow p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <Button
                className={`bg-gray-200 text-black font-bold flex rounded-3xl text-lg h-full font-parisienne`}
              >
                P
              </Button>

              <NavigationMenu className="bg-gray-200 flex p-2 rounded-3xl w-fit">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className="rounded-3xl px-4 py-2 hover:bg-white transition text-sm font-medium"
                    >
                      <Link href="/tasks">Tareas</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className="rounded-3xl px-4 py-2 hover:bg-white transition text-sm font-medium"
                    >
                      <Link href="/notifications">Notificaciones</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className="rounded-3xl px-4 py-2 hover:bg-white transition text-sm font-medium"
                    >
                      <Link href="/categories">Categorías</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className="rounded-3xl px-4 py-2 hover:bg-white transition text-sm font-medium"
                    >
                      <Link href="/reminders">Recordatorios</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <h2 className={`text-4xl font-semibold mb-2 font-parisienne`}>
              Prioritask
            </h2>
            <p className="text-gray-600 line-clamp-3">
              Organiza tu día, prioriza lo que importa y avanza hacia tus metas
              con claridad. Aquí tus tareas, recordatorios y categorías trabajan
              juntos para ayudarte a vivir con más enfoque y menos estrés.
            </p>
          </div>

          <button className="mt-4 bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition">
            Empezar
          </button>
        </div>

        {/* BOX 2 - Recordatorios */}
        <Card className="rounded-3xl shadow p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-xl font-semibold">
              Recordatorios
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-3 p-0">
            {reminders.map((n: any, i: number) => (
              <div key={n.id}>
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/100 hover:bg-muted transition">
                  <Bell className="w-5 h-5 text-indigo-600" />

                  <div className="flex-1">
                    <p className="font-medium">{n.message}</p>
                    <p className="text-xs text-gray-500">Hace 5 minutos</p>
                  </div>
                </div>

                {i < reminders.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ---------- FILA 2 (4 boxes con imagen) ---------- */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Categorías</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat: any) => (
          <div key={cat.id}>
            <Link href={`/tasks?category=${cat.id}`}>
                <div className="bg-white rounded-3xl shadow overflow-hidden">
                <Image
                    src={`https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d`}
                    alt="Imagen"
                    width={400}
                    height={400}
                    className="w-full h-40 object-cover"
                />
                </div>
                <h2 className="p-2 font-bold">{cat.name}</h2>
            </Link>
          </div>
        ))}
      </div>

      {/* ---------- FILA 3 (2 boxes) ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BOX FOTO */}
        <div className="rounded-3xl overflow-hidden shadow bg-white">
          <Image
            src="https://cdn.pixabay.com/photo/2019/04/27/10/09/cat-4159678_1280.jpg"
            alt="Foto"
            width={600}
            height={400}
            className="h-full object-cover"
          />
        </div>

        {/* BOX TEXTO */}
        <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Construye tu mejor versión
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Pequeños pasos constantes crean grandes cambios. Organiza tu día,
            enfoca tu energía y permite que cada tarea te acerque a tu mejor
            versión.
          </p>

          <blockquote className="border-l-4 border-primary pl-4 text-gray-700 italic">
            “El futuro depende de lo que hagas hoy.”
          </blockquote>

          <p className="text-gray-500 text-right">— Mahatma Gandhi</p>
        </div>
      </div>
    </div>
  );
}
