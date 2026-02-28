import { Link } from "react-router";

export default function Logo() {
	return (
		<Link
			to="/"
			className="flex overflow-hidden border-1 rounded-lg items-center z-50"
		>
			<img
				className="w-9 h-9"
				src="/apple-touch-icon.png"
				alt="Urokids logo"
				width={36}
				height={36}
				loading="eager"
				decoding="async"
				fetchPriority="high"
			/>
		</Link>
	);
}
