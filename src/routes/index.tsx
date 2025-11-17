import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../features/home/pages/HomePage";
import AboutPage from "../features/about/pages/AboutPage";
import OperationsPage from "../features/operations/pages/OperationsPage";
import GenetalSurgeryPage from "../features/genetalSurgery/pages/GenetalSurgeryPage";
import UrologyPage from "../features/urology/pages/UrologyPage";
import PlasticSurgery from "../features/plasticSurgery/pages/PlasticSurgery";
import BlogPage from "../features/blog/pages/BlogPage";
import NewsPage from "../features/news/pages/NewsPage";
import ArticlesPage from "../features/articles/pages/ArticlesPage";
import DetailedSurgery from "../features/detailedSurgery/pages/DetailedSurgery";
import ContactPage from "../features/contactUs/ContactPage";
import ExamplesPage from "@/features/examples/pages/ExamplesPage";

export const routes = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: "about", element: <AboutPage /> },
			{ path: "operations", element: <OperationsPage /> },
			{ path: "genetal-surgery", element: <GenetalSurgeryPage /> },
			{ path: "urology", element: <UrologyPage /> },
			{ path: "plastic-surgery", element: <PlasticSurgery /> },
			{ path: "blog", element: <BlogPage /> },
			{ path: "news", element: <NewsPage /> },
			{ path: "articles", element: <ArticlesPage /> },
			{ path: "detailed-surgery", element: <DetailedSurgery /> },
			{ path: "contact", element: <ContactPage /> },
			{ path: "cases", element: <ExamplesPage /> },
		],
	},
]);
