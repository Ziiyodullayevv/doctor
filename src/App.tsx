import { RouterProvider } from "react-router";
import { routes } from "./routes";
import { AppProviders } from "@/context/AppProvider";
import { Toaster } from "@/components/ui/toaster";

export default function App() {
	return (
		<AppProviders>
			<RouterProvider router={routes} />
			<Toaster />
		</AppProviders>
	);
}
