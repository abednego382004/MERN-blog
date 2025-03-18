import React from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function DashSidebar() {
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="?tab=profile">
            <Sidebar.Item active icon={HiUser} label={"User"} labelColor="dark">
              Profile
            </Sidebar.Item>
            <Sidebar.Item
              active
              icon={HiArrowSmRight}
              className="cursor-pointer"
            >
              Sign Up
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
