"use client"
import Image from "next/image";
import { Button } from "../../components/ui/button";

export const Navbar = () => {
    return (
        <div className="w-screen flex z-[100] pointer-events-auto flex-row items-center justify-between h-[60px] p-2.5 border-b-[1px]">
            <Image src="/static/logo.svg" alt="JustName" width={80} height={35} />
            <Button variant="secondary">Documentation</Button>
        </div>
    );
};
