import { Link } from "react-router";

export default function Logo() {
	return (
		<Link
			to="/"
			className="flex overflow-hidden border-1 rounded-lg items-center z-50"
		>
			<img className="w-9 h-9" src="/logo.jpg" alt="logo" />
		</Link>
	);
}
