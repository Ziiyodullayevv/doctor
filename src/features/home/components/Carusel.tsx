import {
	useEffect,
	useMemo,
	useRef,
	useState,
	type ChangeEvent,
	type FormEvent,
} from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

interface Review {
	id: string;
	fullName: string;
	date: string;
	description: string;
}

interface RemoteReview {
	id: string;
	fullName: string;
	message: string;
	createdAt: string;
}

const formatReviewDate = (value: string, locale: string) => {
	const parsed = new Date(value);
	if (Number.isNaN(parsed.getTime())) {
		return value;
	}
	return parsed.toLocaleDateString(locale, {
		year: "numeric",
		month: "short",
		day: "2-digit",
	});
};

export default function ReviewsCarousel() {
	const { t, i18n } = useTranslation("home");
	const locale = i18n.resolvedLanguage ?? "ru";

	const [activeSlide, setActiveSlide] = useState(0);
	const [remoteReviews, setRemoteReviews] = useState<RemoteReview[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [loadError, setLoadError] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({ fullName: "", message: "" });
	const swiperRef = useRef<SwiperType | null>(null);

	const allReviews = useMemo<Review[]>(() => {
		return remoteReviews.map((review) => ({
			id: review.id,
			fullName: review.fullName,
			description: review.message,
			date: formatReviewDate(review.createdAt, locale),
		}));
	}, [remoteReviews, locale]);

	useEffect(() => {
		const client = supabase;
		if (!client) {
			return;
		}

		let isMounted = true;

		const loadReviews = async () => {
			setIsLoading(true);
			setLoadError(false);
			const { data, error } = await client
				.from("reviews")
				.select("id, full_name, message, created_at")
				.order("created_at", { ascending: false });

			if (!isMounted) {
				return;
			}

			if (error) {
				setLoadError(true);
				setIsLoading(false);
				return;
			}

			const mapped = (data ?? [])
				.map((row) => ({
					id: row.id as string,
					fullName: String(row.full_name ?? "").trim(),
					message: String(row.message ?? "").trim(),
					createdAt: String(row.created_at ?? "").trim(),
				}))
				.filter((row) => row.fullName.length > 0 && row.message.length > 0);

			setRemoteReviews(mapped);
			setIsLoading(false);
		};

		void loadReviews();

		return () => {
			isMounted = false;
		};
	}, []);

	const handleChange =
		(field: "fullName" | "message") =>
		(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setFormData((prev) => ({ ...prev, [field]: event.target.value }));
		};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const client = supabase;
		if (!client) {
			toast({
				title: t("reviews.form.error_title"),
				description: t("reviews.form.config_missing"),
				variant: "destructive",
			});
			return;
		}

		const fullName = formData.fullName.trim();
		const message = formData.message.trim();

		if (!fullName || !message) {
			toast({
				title: t("reviews.form.error_title"),
				description: t("reviews.form.required"),
				variant: "destructive",
			});
			return;
		}

		if (isSubmitting) {
			return;
		}

		setIsSubmitting(true);

		try {
			const { data, error } = await client
				.from("reviews")
				.insert({
					full_name: fullName,
					message,
				})
				.select("id, full_name, message, created_at")
				.single();

			if (error || !data) {
				throw error ?? new Error("Insert failed");
			}

			setRemoteReviews((prev) => [
				{
					id: data.id as string,
					fullName: String(data.full_name ?? fullName),
					message: String(data.message ?? message),
					createdAt: String(data.created_at ?? new Date().toISOString()),
				},
				...prev,
			]);

			setFormData({ fullName: "", message: "" });
			setIsDialogOpen(false);
			toast({
				title: t("reviews.form.success_title"),
				description: t("reviews.form.success_desc"),
				variant: "success",
			});
			setTimeout(() => {
				swiperRef.current?.slideTo(0);
			}, 0);
		} catch {
			toast({
				title: t("reviews.form.error_title"),
				description: t("reviews.form.error_desc"),
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const hasReviews = allReviews.length > 0;
	const hasMultipleReviews = allReviews.length > 1;

	return (
		<section className="relative overflow-hidden py-12 md:py-20">
			<div
				className="absolute inset-0 bg-cover bg-center"
				style={{
					backgroundImage:
						"url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80')",
				}}
			>
				<div className="absolute inset-0 bg-gradient-to-br from-teal-900/95 via-cyan-900/90 to-blue-900/95" />
			</div>

			<div className="relative z-10 container mx-auto px-4 md:px-10">
				<div className="mb-8 text-center md:mb-12">
					<h2 className="mb-3 text-3xl font-bold text-white md:mb-4 md:text-4xl lg:text-5xl">
						{t("reviews.title")}
					</h2>
					<div className="mx-auto mb-3 h-1 w-16 bg-white md:mb-4 md:w-20" />
				</div>

				<div className="relative mx-auto max-w-5xl px-8 md:px-0">
					{hasReviews ? (
						<Swiper
							modules={[Autoplay, Pagination, A11y]}
							loop={false}
							slidesPerView={1}
							spaceBetween={20}
							grabCursor={hasMultipleReviews}
							allowTouchMove={hasMultipleReviews}
							touchStartPreventDefault={false}
							touchReleaseOnEdges
							autoplay={
								hasMultipleReviews
									? {
											delay: 6500,
											disableOnInteraction: false,
											pauseOnMouseEnter: true,
										}
									: false
							}
							pagination={{
								clickable: true,
								el: ".reviews-swiper-pagination",
								bulletClass:
									"reviews-swiper-bullet h-2 w-2 rounded-full bg-white/45 transition-all duration-300",
								bulletActiveClass:
									"reviews-swiper-bullet-active !w-10 !bg-white shadow-lg",
							}}
							onSwiper={(swiper) => {
								swiperRef.current = swiper;
							}}
							onSlideChange={(swiper) => {
								setActiveSlide(swiper.realIndex);
							}}
							className="!overflow-visible"
						>
							{allReviews.map((review) => (
								<SwiperSlide key={review.id}>
									<div className="min-h-[450px] rounded-xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md md:min-h-[400px] md:rounded-2xl md:p-12">
										<Quote className="mb-4 h-8 w-8 text-white/40 md:mb-6 md:h-12 md:w-12" />

										<p className="mb-6 max-h-[240px] overflow-y-auto pr-2 text-base leading-relaxed text-white md:mb-8 md:max-h-none md:text-lg lg:text-xl">
											{review.description}
										</p>

										<div className="flex flex-wrap items-center justify-between gap-3 md:gap-4">
											<div>
												<p className="text-base font-semibold text-white md:text-lg">
													{review.fullName}
												</p>
												<p className="text-xs text-white/70 md:text-sm">
													{review.date}
												</p>
											</div>
										</div>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					) : (
						<div className="rounded-2xl border border-white/20 bg-white/10 p-10 text-center text-base text-white/80 shadow-2xl backdrop-blur-md md:p-14 md:text-lg">
							{t("reviews.empty")}
						</div>
					)}

					{hasMultipleReviews && (
						<>
							<button
								type="button"
								onClick={() => swiperRef.current?.slidePrev()}
								className="group absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white md:-left-12 md:p-3"
								aria-label="Previous review"
							>
								<ChevronLeft className="h-5 w-5 text-gray-800 transition-colors group-hover:text-primary md:h-6 md:w-6" />
							</button>

							<button
								type="button"
								onClick={() => swiperRef.current?.slideNext()}
								className="group absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white md:-right-12 md:p-3"
								aria-label="Next review"
							>
								<ChevronRight className="h-5 w-5 text-gray-800 transition-colors group-hover:text-primary md:h-6 md:w-6" />
							</button>
						</>
					)}
				</div>

				<div className="mt-8 flex flex-col items-center gap-4 md:mt-12">
					{hasMultipleReviews && (
						<div className="flex items-center justify-center gap-2">
							<div className="reviews-swiper-pagination !static !w-auto" />
							<p className="sr-only">{`Active slide ${activeSlide + 1}`}</p>
						</div>
					)}

					<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<DialogTrigger asChild>
							<Button
								className="bg-blue-500 px-8 py-7 text-xl cursor-pointer"
								variant="ghost"
								size="lg"
								disabled={!supabase}
							>
								{t("reviews.add_button")}
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>{t("reviews.form.title")}</DialogTitle>
								<DialogDescription>
									{t("reviews.form.description")}
								</DialogDescription>
							</DialogHeader>

							<form className="grid gap-4" onSubmit={handleSubmit}>
								<div className="grid gap-2">
									<label
										className="text-sm font-medium"
										htmlFor="reviewer-name"
									>
										{t("reviews.form.name")}
									</label>
									<Input
										id="reviewer-name"
										name="fullName"
										value={formData.fullName}
										onChange={handleChange("fullName")}
										autoComplete="name"
										required
									/>
								</div>

								<div className="grid gap-2">
									<label
										className="text-sm font-medium"
										htmlFor="review-message"
									>
										{t("reviews.form.message")}
									</label>
									<Textarea
										id="review-message"
										name="message"
										value={formData.message}
										onChange={handleChange("message")}
										rows={4}
										required
									/>
								</div>

								<DialogFooter>
									<Button type="submit" disabled={isSubmitting}>
										{isSubmitting
											? t("reviews.form.submitting")
											: t("reviews.form.submit")}
									</Button>
								</DialogFooter>
							</form>
						</DialogContent>
					</Dialog>

					{!supabase && (
						<p className="text-sm text-white/70">
							{t("reviews.form.config_missing")}
						</p>
					)}

					{loadError && (
						<p className="text-sm text-white/70">
							{t("reviews.form.load_error")}
						</p>
					)}

					{isLoading && (
						<p className="text-sm text-white/70">{t("reviews.form.loading")}</p>
					)}
				</div>
			</div>
		</section>
	);
}
