"use client";

import React from "react";
import { Home, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { autologinAction, logoutAction } from "@/features/user/useraction";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const { user } = useSelector((state) => state.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    !user?._id && dispatch(autologinAction());
  }, []);

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 transition-[width,height] ease-linear">
      <div className="flex items-center gap-2 mr-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
      </div>

      <div className="flex flex-1 items-center justify-between">
        {/* Left Side (Breadcrumbs or Page Title could go here) */}
        <div className="flex items-center gap-2 text-sm font-medium">
             <Link to="/" className="flex items-center gap-2 text-primary">
                 <Home className="h-4 w-4" />
                 <span>Home</span>
             </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {user?._id ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-medium leading-none">{user?.fName} {user?.lName}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  <Avatar className="h-9 w-9 border-2 border-primary/10">
                    <AvatarImage src="" alt={user?.fName} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user?.fName?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
             <Link to="/login">
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
                  Login
                </button>
              </Link>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
