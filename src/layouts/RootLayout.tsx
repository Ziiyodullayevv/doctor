import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingShareButton from "@/components/Share";
import CanonicalUrl from "@/components/CanonicalUrl";

export default function RootLayout() {
	return (
		<div>
			<Navigation />
			<ScrollToTop />
			<CanonicalUrl />
			<FloatingShareButton />

			<main>
				<Outlet />
			</main>

			<Footer />
		</div>
	);
}
