"use client";

import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const components = [
  { title: "Logout", href: "/logout" },
  { title: "Login", href: "/login" },
  { title: "profile", href: "/profile" },
];

const Navbar = () => {
  return (
    // <NavigationMenu className="flex gap-6">
    //   <NavigationMenuList className="flex gap-4">
    //     {components.map(({ title, href }) => (
    //       <NavigationMenuItem key={href} className="list-none">
    //         <NavigationMenuLink asChild>
    //           <Link to={href}>{title}</Link>
    //         </NavigationMenuLink>
    //       </NavigationMenuItem>
    //     ))}
    //   </NavigationMenuList>
    // </NavigationMenu>
  );
};

export default Navbar;
