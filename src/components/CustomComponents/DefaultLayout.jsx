import React from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import SideBar from "../../pages/sidebar/SideBar";
import { useSelector } from "react-redux";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

const DefaultLayout = () => {
  const { user } = useSelector((state) => state.userInfo);
  return (
    <SidebarProvider>
      {user?._id && <SideBar />}
      <SidebarInset>
        <Header />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DefaultLayout;
