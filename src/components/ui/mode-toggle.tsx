import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "../../context/theme/useTheme";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";

export function ModeToggle() {
	const { setTheme } = useTheme();
	const { t } = useTranslation("navigation");

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className="rounded-full h-9 w-9 border-1"
					variant="outline"
					size="icon"
				>
					<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme("light")}>
					{t("menu.light")}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					{t("menu.dark")}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>
					{t("menu.system")}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
