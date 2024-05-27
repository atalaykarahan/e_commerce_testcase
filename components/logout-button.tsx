"use client";
import { LogOut } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";
import { logout as logoutAction } from "@/actions/logout";
import { logOut } from "@/app/api/services/authService";

const LogoutButton = () => {
  const onClick = async () => {
    const res = await logOut();
    if(res.status === 200){
        await logoutAction();
        window.location.reload();
    }
  };
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href="#"
          onClick={onClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
        >
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Çıkış Yap</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">Çıkış Yap</TooltipContent>
    </Tooltip>
  );
};

export default LogoutButton;
