import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingShareButton from "@/components/Share";

export default function RootLayout() {
	return (
		<div>
			<Navigation />
			<ScrollToTop />
			<FloatingShareButton />

			<main>
				<Outlet />
			</main>

			<Footer />
		</div>
	);
}
