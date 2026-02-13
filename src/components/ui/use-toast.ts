import { useEffect, useState } from "react";

export type ToastVariant = "default" | "destructive" | "success";

export type ToastPayload = {
	title: string;
	description?: string;
	variant?: ToastVariant;
	duration?: number;
};

export type ToastItem = ToastPayload & {
	id: string;
};

let toasts: ToastItem[] = [];

const listeners = new Set<(state: ToastItem[]) => void>();

const emit = () => {
	listeners.forEach((listener) => listener(toasts));
};

const createToastId = () => {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
		return crypto.randomUUID();
	}
	return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const dismissToast = (id: string) => {
	toasts = toasts.filter((toast) => toast.id !== id);
	emit();
};

export const toast = ({
	title,
	description,
	variant = "default",
	duration = 4500,
}: ToastPayload) => {
	const id = createToastId();
	toasts = [{ id, title, description, variant, duration }, ...toasts].slice(
		0,
		4,
	);
	emit();

	window.setTimeout(() => {
		dismissToast(id);
	}, duration);

	return id;
};

export const useToastState = () => {
	const [state, setState] = useState<ToastItem[]>(toasts);

	useEffect(() => {
		listeners.add(setState);
		return () => {
			listeners.delete(setState);
		};
	}, []);

	return { toasts: state, dismissToast };
};
