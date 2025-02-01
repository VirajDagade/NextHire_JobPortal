import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import React from "react";

function Footer() {
  return (
    <div className="flex my-10 ">
      <div className="mx-auto">
        <h2 className=" text-center text-gray-400">
          ©️NextHire🎓 by Viraj Dagade
        </h2>
      </div>
      <div className="flex  items-end mx-auto gap-3">
        <Github className="h-5 w-5 " />
        <Linkedin className="h-5 w-5 " />
        <Instagram className="h-5 w-5 " />
      </div>
    </div>
  );
}

export default Footer;
