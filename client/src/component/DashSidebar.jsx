import React from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function DashSidebar() {
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item icon={HiUser} label="User" labelColor="dark">
              Profile
            </Sidebar.Item>
          </Link>
          <Link to="/signup">
            <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer">
              Sign Up
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
