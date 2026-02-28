import { lazy, Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import ScrollToTop from "@/components/ScrollToTop";
import CanonicalUrl from "@/components/CanonicalUrl";

const FloatingShareButton = lazy(() => import("@/components/Share"));

export default function RootLayout() {
	const [isShareReady, setIsShareReady] = useState(false);

	useEffect(() => {
		const timerId = window.setTimeout(() => {
			setIsShareReady(true);
		}, 1800);
		return () => window.clearTimeout(timerId);
	}, []);

	return (
		<div>
			<Navigation />
			<ScrollToTop />
			<CanonicalUrl />
			{isShareReady ? (
				<Suspense fallback={null}>
					<FloatingShareButton />
				</Suspense>
			) : null}

			<main>
				<Outlet />
			</main>

			<Footer />
		</div>
	);
}
