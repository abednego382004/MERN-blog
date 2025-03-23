import { Button } from "flowbite-react";
import React from "react";

export default function CallToAcrion() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center text-center rounded-tl-3xl rounded-bl-3xl">
      <div className="flex-1 justify-center flex flex-col gap-3 ">
        <h2 className="text-2xl">Want to learn more about javascript</h2>
        <p className="text-gray-500">
          Checkout these resources with 100 javascript projects
        </p>
        <Button
          gradientDuoTone="purpleToBlue"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a
            href="https://www.100jsprojects.com"
            target="_blank"
            rel="noopener noreferer"
          >
            100 Js Projects{" "}
          </a>
        </Button>
      </div>
      <div>
        <img
          className="p-7 flex-1 h-23"
          src="https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhY3R8ZW58MHx8MHx8fDA%3D"
          alt=""
        />
      </div>
    </div>
  );
}
