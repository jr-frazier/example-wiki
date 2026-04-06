import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {UserButton} from "@neondatabase/auth/react";

export function NavBar() {
    return (
        <nav
            className="w-full border-b backdrop-blur  sticky top-0 z-50">
            <div className="container mx-auto flex h-16 items-center justify-between">
                <Link
                    href="/public"
                    className="font-bold text-xl tracking-tight "
                >
                    My Wiki
                </Link>

                <NavigationMenu>
                    <NavigationMenuList className=" ">
                        <NavigationMenuItem>
                            <UserButton size="icon"/>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </nav>
    );
}
