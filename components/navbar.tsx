import { navItems } from "@/data";
import { IdCard, Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export function Navbar() {
  return (
    <nav className="bg-background">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-between">
        <h1 className="text-xl sm:text-3xl font-bold flex items-center gap-2">
          <span>
            <IdCard />
          </span>
          Visiting
          <span>Card</span>
        </h1>

        <ul className="hidden lg:flex items-center gap-4 md:gap-6">
          {navItems.map((item, i) => (
            <li key={i}>
              <Link href={item.href} className="text-sm">
                <span className="capitalize">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <Sheet>
          <SheetTrigger className="lg:hidden">
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-3xl font-bold flex items-center gap-2">
                <IdCard />
              </SheetTitle>
            </SheetHeader>
            <ul className="px-4 py-2 flex items-center flex-col gap-4">
              {navItems.map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="text-sm">
                    <span className="capitalize">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <SheetFooter className="grid gap-2">
              <Button variant={"outline"} className="rounded">
                Login
              </Button>
              <Button>Register</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <div className="hidden lg:flex items-center gap-3">
          <Button className="rounded">Login</Button>
          <Button variant={"link"}>Register</Button>
        </div>
      </div>
    </nav>
  );
}
