import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import ScrollToTop from "@/components/ScrollToTop";

export default function RootLayout() {
	return (
		<div>
			<Navigation />
			<ScrollToTop />

			<main>
				<Outlet />
			</main>

			<Footer />
		</div>
	);
}
