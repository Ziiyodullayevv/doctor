import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToastState } from "./use-toast";

const variantClass: Record<string, string> = {
	default: "border-border bg-background text-foreground",
	destructive:
		"border-red-300/70 bg-red-50 text-red-900 dark:border-red-900/70 dark:bg-red-950 dark:text-red-100",
	success:
		"border-emerald-300/70 bg-emerald-50 text-emerald-900 dark:border-emerald-900/70 dark:bg-emerald-950 dark:text-emerald-100",
};

export function Toaster() {
	const { toasts, dismissToast } = useToastState();

	return (
		<div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3">
			{toasts.map((item) => (
				<div
					key={item.id}
					className={cn(
						"pointer-events-auto rounded-lg border p-4 shadow-lg backdrop-blur-sm transition-all animate-in fade-in-0 slide-in-from-right-8",
						variantClass[item.variant ?? "default"],
					)}
					role="status"
				>
					<div className="flex items-start justify-between gap-3">
						<div>
							<p className="text-sm font-semibold">{item.title}</p>
							{item.description ? (
								<p className="mt-1 text-sm opacity-90">{item.description}</p>
							) : null}
						</div>

						<button
							type="button"
							onClick={() => dismissToast(item.id)}
							className="rounded-sm opacity-70 transition-opacity hover:opacity-100"
							aria-label="Close notification"
						>
							<X className="h-4 w-4" />
						</button>
					</div>
				</div>
			))}
		</div>
	);
}
