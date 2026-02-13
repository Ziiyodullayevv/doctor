import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

interface Reviews {
	fullName: string;
	date: string;
	description: string;
}

const reviews: Reviews[] = [
	{
		fullName: "Dildora Ilxomjonova",
		date: "3 months ago",
		description:
			"Zafar Boburovich O'zbekistondigi eng supper bolalar urologi👍 moxir, qo'llari go'zal jarroh, ishlari akkuratniy, tozalikka, bilimlariga, muomalaga 10 baho. Milliy markaz urologiya bo'limi kallektiviga esa gap yo'q, cheksiz minnatdormiz. Qo'llariz dard bilmasin, ilohim oilangiz farzandlaringiz kamolini ko'rib yuring.",
	},
	{
		fullName: "Sayramxon Raxmonkulova",
		date: "7 months ago",
		description:
			"Hurmatli Zafar Abdullayev, o'g'limni davolab berganiz uchun katta rahmat. O'g'limni yaxshi bo'lib ketishiga umid qilmay qo'ygandik. O'g'lim ham xursand. Ilohim bundan ham yaxshi natijalarga erishing. Oilamiz nomidan minnatdorchilik bildiraman.",
	},
	{
		fullName: "Amanbayeva",
		date: "5 months ago",
		description:
			"Ассалому алайкум Зафар ака, куллариз дард курмасин. Болажонлар согайишига ёрдам беришдан чарчаменг, юзиз хар доим ёрук булсин. Сиздек уз касбининг фидойилари купайсин, хаммаси учун рахмат.",
	},
	{
		fullName: "Салимжон Рахманкулов",
		date: "7 months ago",
		description:
			"Ассалому алайкум доктор, сизга котта рахмат. Сиз сабабчи булиб, углим шифо топди. Оллох умризга барака берсин.",
	},
	{
		fullName: "огабек ахроров",
		date: "a year ago",
		description:
			"Ассалому алайкум доктор, сизга уз миннатдорчилигимни билдирмокчиман. 2 та фарзандимни хам соглом хаётга кайтардингиз. Аллох сизни сабабчи килганига минг шукур. Бир умр дуодаман, кулингиз дард курмасин. Сиз уз ишини устаси ва дунёдаги энг зурисиз, сиздан Аллох рози булсин.",
	},
	{
		fullName: "Shermurod Rustamov",
		date: "2 years ago",
		description:
			"Shifokorlarimizni qo'llari dard ko'rmasin. Xalqimizni, farzandlarimizni baxtiga ilohim salomat bo'lishsin. Z. Abdulloyev doktorimizga oilamiz nomidan o'z minnatdorchiligimizni bildirib qolamiz, Alloh doimo panohida asrasin sizni.",
	},
	{
		fullName: "Akmaljon G'aybullayev",
		date: "a year ago",
		description:
			"Assalomu aleykum hammaga. 1.8 oylik o'g'limni tug'ma gipospadiyasi bor edi. Ko'plab vrachlar operatsiyasini 2-3 bosqichda qilish kerak degandi. Dekabr oyida Zafar Boburvich bilan uchrashdik, yanvarda operatsiyasini qildilar.",
	},
	{
		fullName: "Zamira Ataniyazova",
		date: "3 years ago",
		description:
			"Amazing doctor that I visited with my kids several times. He is very intelligent and seems to understand urology extremely well. Sees the big picture. Prescribes minimum possible medication which was quite effective in cases that I have witnessed. Clear explanation, good ethics and communication.",
	},
	{
		fullName: "Sayramxon Raxmonqulova",
		date: "3 years ago",
		description:
			"Hurmatli doktor Abdullayev, sizga turmush o'rtog'im bilan birga minnatdorchilik bildiramiz. O'g'limni kasalligini davolaganingiz uchun katta rahmat. O'g'lim hozir ancha yaxshi. Bundan ham yaxshi natijalarga erishing.",
	},
	{
		fullName: "Ugiloy Toshkulova",
		date: "3 years ago",
		description:
			"Hurmatli Zafar Boburovich! Siz qanchadan-qancha oilalarga quvonch olib kirasiz. Qo'li yengil shifokor sifatida sizni yaxshi bilamiz. Kelajakdagi ishlaringizga omad, doimo el ardog'ida bo'lib yuring.",
	},
	{
		fullName: "Mexriddin Jurayev",
		date: "2 years ago",
		description:
			"Assalomu alaykum. Men Navoiy viloyatidanman, 1 yosh-u 6 oylik o'g'limning buyragidan tosh oldirdik. O'g'lim darddan butunlay sog'aydi. Zafar aka, Asqar aka, Qobiljon akalardan juda minnatdormiz.",
	},
	{
		fullName: "Zz Zz",
		date: "Edited 2 years ago",
		description:
			"Ассалому алайкум. Зафар Абдуллаев, углимни айнан сиз операция килганиздан бугун жуда хурсанд булдим. Углим бемалол уйнаб югуриб юрибти. Кулиз жуда енгил экан, машаАллох.",
	},
	{
		fullName: "Shirin Ismailovna",
		date: "2 years ago",
		description:
			"Assalomu aleykum Z. Boburivich, sizga katta rahmat. Alloh sizdan rozi bo'lsin. Mening o'g'lim operatsiyasi juda yaxshi o'tdi, alhamdulillah hozir bolam o'ynab yuribti. Sizday vrachlarimiz ko'paysin, sizni tarbiya qilgan ota-onangizga ham ming rahmat.",
	},
];

export default function ReviewsCarousel() {
	const { t } = useTranslation();

	const [activeSlide, setActiveSlide] = useState(0);
	const swiperRef = useRef<SwiperType | null>(null);

	if (reviews.length === 0) {
		return null;
	}

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
					<Swiper
						modules={[Autoplay, Pagination, A11y]}
						loop={false}
						slidesPerView={1}
						spaceBetween={20}
						grabCursor={reviews.length > 1}
						allowTouchMove={reviews.length > 1}
						touchStartPreventDefault={false}
						touchReleaseOnEdges
						autoplay={
							reviews.length > 1
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
						{reviews.map((review, index) => (
							<SwiperSlide key={`${review.fullName}-${review.date}-${index}`}>
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

					{reviews.length > 1 && (
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

				{reviews.length > 1 && (
					<div className="mt-8 flex items-center justify-center gap-2 md:mt-12">
						<div className="reviews-swiper-pagination !static !w-auto" />
						<p className="sr-only">{`Active slide ${activeSlide + 1}`}</p>
					</div>
				)}
			</div>
		</section>
	);
}
