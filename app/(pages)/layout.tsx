import { auth } from "@/auth";
import LogoutButton from "@/components/logout-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { currentUser } from "@/lib/auth";
import { LogIn, Package2, Settings } from "lucide-react";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  const session = await auth();
  return (
    <SessionProvider baseUrl="/" session={session}>
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <TooltipProvider>
            {user && <LogoutButton />}
            {!user && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="login"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <LogIn className="h-5 w-5" />
                    <span className="sr-only">Giriş Tap</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Giriş Tap</TooltipContent>
              </Tooltip>
            )}
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>

      {children}
    </div>
    </SessionProvider>
  );
};

export default HomeLayout;
