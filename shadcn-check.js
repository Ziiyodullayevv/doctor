import { execSync } from "child_process";
import fs from "fs";

const deps = [
	"class-variance-authority",
	"clsx",
	"tailwind-variants",
	"lucide-react",
	"@radix-ui/react-dialog",
	"@radix-ui/react-popover",
	"@radix-ui/react-tooltip",
	"@radix-ui/react-dropdown-menu",
	"@radix-ui/react-label",
	"@radix-ui/react-slot",
];

const missing = deps.filter((pkg) => {
	try {
		require.resolve(pkg);
		return false;
	} catch {
		return true;
	}
});

if (missing.length > 0) {
	console.log("🚀 Quyidagi paketlar topilmadi, o‘rnatilyapti:");
	console.log(missing.join(", "));
	try {
		execSync(`npm install ${missing.join(" ")}`, { stdio: "inherit" });
		console.log("✅ Barcha kerakli shadcn kutubxonalar o‘rnatildi!");
	} catch (err) {
		console.error("❌ O‘rnatishda xatolik:", err);
	}
} else {
	console.log("✅ Barcha shadcn kutubxonalar allaqachon o‘rnatilgan!");
}

