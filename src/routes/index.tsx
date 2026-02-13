import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import RootLayout from "../layouts/RootLayout";
import NotFoundPage from "@/components/Notfound";
import LoadingFallback from "@/components/LoadingFallback";

// Lazy load barcha sahifalarni (tezlik uchun tavsiya etiladi)
const HomePage = lazy(() => import("../features/home/pages/HomePage"));
const AboutPage = lazy(() => import("../features/about/pages/AboutPage"));
const GenetalSurgeryPage = lazy(
	() => import("../features/genetalSurgery/pages/GenetalSurgeryPage"),
);
const PlasticSurgery = lazy(
	() => import("../features/plasticSurgery/pages/PlasticSurgery"),
);
const NewsPage = lazy(() => import("../features/news/pages/NewsPage"));
const ContactPage = lazy(() => import("../features/contactUs/ContactPage"));
const ExamplesPage = lazy(
	() => import("@/features/examples/pages/ExamplesPage"),
);
const GenitalPage = lazy(
	() => import("@/features/operations/pages/GenitalPage"),
);
const PlasticPage = lazy(
	() => import("@/features/operations/pages/PlasticPage"),
);
const UrologyPage = lazy(
	() => import("@/features/operations/pages/UrologyPage"),
);

export const routes = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: (
					<Suspense fallback={<LoadingFallback />}>
						<HomePage />
					</Suspense>
				),
			},
			{
				path: "about",
				element: (
					<Suspense fallback={<LoadingFallback />}>
						<AboutPage />
					</Suspense>
				),
			},
			{
				path: "genetal-surgery",
				element: (
					<Suspense fallback={<LoadingFallback />}>
						<GenetalSurgeryPage />
					</Suspense>
				),
			},
			{
				path: "urology",
				element: (
					<Suspense fallback={<LoadingFallback />}>
						<UrologyPage />
					</Suspense>
				),
			},
			{
				path: "plastic-surgery",
				element: (
					<Suspense fallback={<LoadingFallback />}>
						<PlasticSurgery />
					</Suspense>
				),
			},

			{
				path: "news",
				element: (
					<Suspense fallback={<LoadingFallback />}>
						<NewsPage />
					</Suspense>
				),
			},

			{
				path: "contact",
				element: (
					<Suspense fallback={<LoadingFallback />}>
						<ContactPage />
					</Suspense>
				),
			},
			{
				path: "cases",
				element: (
					<Suspense fallback={<LoadingFallback />}>
						<ExamplesPage />
					</Suspense>
				),
			},
			{
				path: "operations/genital",
				element: (
					<Suspense fallback={<LoadingFallback />}>
						<GenitalPage />
					</Suspense>
				),
			},
			{
				path: "operations/urology",
				element: (
					<Suspense fallback={<LoadingFallback />}>
						<UrologyPage />
					</Suspense>
				),
			},
			{
				path: "operations/plastic",
				element: (
					<Suspense fallback={<LoadingFallback />}>
						<PlasticPage />
					</Suspense>
				),
			},

			// 404 sahifasi
			{ path: "*", element: <NotFoundPage /> },
		],
	},
]);
