type LocaleCode = "ru" | "uz" | "en";

const normalizeLocale = (language: string | undefined): LocaleCode => {
	if (language?.startsWith("uz")) return "uz";
	if (language?.startsWith("en")) return "en";
	return "ru";
};

const urologyMeta: Record<number, { title: Record<LocaleCode, string> }> = {
	1: {
		title: {
			ru: "Дистальная гипоспадия, вид до и после коррекции",
			uz: "Distal gipospadiya, korreksiyadan oldin va keyin",
			en: "Distal hypospadias, before and after correction",
		},
	},
	2: {
		title: {
			ru: "Дистальная гипоспадия, вид до и после коррекции",
			uz: "Distal gipospadiya, korreksiyadan oldin va keyin",
			en: "Distal hypospadias, before and after correction",
		},
	},
	3: {
		title: {
			ru: "Дистальная гипоспадия, вид до и после коррекции",
			uz: "Distal gipospadiya, korreksiyadan oldin va keyin",
			en: "Distal hypospadias, before and after correction",
		},
	},
	4: {
		title: {
			ru: "Проксимальная гипоспадия до и после операции",
			uz: "Proksimal gipospadiya, operatsiyadan oldin va keyin",
			en: "Proximal hypospadias before and after surgery",
		},
	},
	5: {
		title: {
			ru: "Проксимальная гипоспадия до и после операции",
			uz: "Proksimal gipospadiya, operatsiyadan oldin va keyin",
			en: "Proximal hypospadias before and after surgery",
		},
	},
	6: {
		title: {
			ru: "Пеноскротальная гипоспадия до и после операции",
			uz: "Penoskrotal gipospadiya, operatsiyadan oldin va keyin",
			en: "Penoscrotal hypospadias before and after surgery",
		},
	},
	7: {
		title: {
			ru: "Осложненная гипоспадия до и после операции",
			uz: "Asoratlangan gipospadiya, operatsiyadan oldin va keyin",
			en: "Complicated hypospadias before and after surgery",
		},
	},
	8: {
		title: {
			ru: "Изолированная эписпадия у мальчиков (осложненная форма)",
			uz: "O‘g‘il bolalarda izolyatsiyalangan epispadiya (murakkab shakl)",
			en: "Isolated epispadias in boys (complicated form)",
		},
	},
	9: {
		title: {
			ru: "Изолированная эписпадия у мальчиков (тотальная форма)",
			uz: "O‘g‘il bolalarda izolyatsiyalangan epispadiya (to‘liq shakl)",
			en: "Isolated epispadias in boys (total form)",
		},
	},
	10: {
		title: {
			ru: "Изолированная эписпадия у мальчиков (головчатая форма)",
			uz: "O‘g‘il bolalarda izolyatsiyalangan epispadiya (boshcha shakli)",
			en: "Isolated epispadias in boys (glanular form)",
		},
	},
	11: {
		title: {
			ru: "Женская эписпадия до и после операции",
			uz: "Qizlarda epispadiya, operatsiyadan oldin va keyin",
			en: "Female epispadias before and after surgery",
		},
	},
	12: {
		title: {
			ru: "Скрытый половой член (СПЧ) до и после операции",
			uz: "Yashirin jinsiy a’zo (SPCh), operatsiyadan oldin va keyin",
			en: "Concealed penis before and after surgery",
		},
	},
	13: {
		title: {
			ru: "Скрытый половой член (СПЧ) до и после операции",
			uz: "Yashirin jinsiy a’zo (SPCh), operatsiyadan oldin va keyin",
			en: "Concealed penis before and after surgery",
		},
	},
	14: {
		title: {
			ru: "Скрытый половой член (СПЧ) до и после операции",
			uz: "Yashirin jinsiy a’zo (SPCh), operatsiyadan oldin va keyin",
			en: "Concealed penis before and after surgery",
		},
	},
	15: {
		title: {
			ru: "Врожденная дисфункция коры надпочечников (ВДКН)",
			uz: "Buyrak usti bezi tug‘ma disfunktsiyasi (VDKN)",
			en: "Congenital adrenal hyperplasia (CAH)",
		},
	},
	16: {
		title: {
			ru: "Врожденная дисфункция коры надпочечников (ВДКН)",
			uz: "Buyrak usti bezi tug‘ma disfunktsiyasi (VDKN)",
			en: "Congenital adrenal hyperplasia (CAH)",
		},
	},
	17: {
		title: {
			ru: "Экстрофия мочевого пузыря после первого этапа",
			uz: "Siydik pufagi ekstrofiyasi, birinchi bosqichdan keyin",
			en: "Bladder exstrophy after the first stage",
		},
	},
	18: {
		title: {
			ru: "Экстрофия мочевого пузыря, осложнённая форма (девочка)",
			uz: "Siydik pufagi ekstrofiyasi, murakkab shakl (qiz bola)",
			en: "Bladder exstrophy, complicated form (girl)",
		},
	},
	19: {
		title: {
			ru: "Экстрофия мочевого пузыря после второго этапа",
			uz: "Siydik pufagi ekstrofiyasi, ikkinchi bosqichdan keyin",
			en: "Bladder exstrophy after the second stage",
		},
	},
	20: {
		title: {
			ru: "Экстрофия мочевого пузыря (девочка)",
			uz: "Siydik pufagi ekstrofiyasi (qiz bola)",
			en: "Bladder exstrophy (girl)",
		},
	},
	21: {
		title: {
			ru: "Экстрофия мочевого пузыря после первого этапа",
			uz: "Siydik pufagi ekstrofiyasi, birinchi bosqichdan keyin",
			en: "Bladder exstrophy after the first stage",
		},
	},
	22: {
		title: {
			ru: "Фаллопластика",
			uz: "Falloplastika",
			en: "Phalloplasty",
		},
	},
	23: {
		title: {
			ru: "Пенопластика",
			uz: "Penoplastika",
			en: "Penoplasty",
		},
	},
	24: {
		title: {
			ru: "Лапароскопическая пиелопластика (восстановление оттока мочи из почки)",
			uz: "Laparoskopik pieloplastika (buyrakdan siydik chiqishini tiklash)",
			en: "Laparoscopic pyeloplasty (restoring urine outflow from the kidney)",
		},
	},
	25: {
		title: {
			ru: "Клапан задней уретры до и после рассечения",
			uz: "Orqa uretra klapani, kesishdan oldin va keyin",
			en: "Posterior urethral valve before and after incision",
		},
	},
	26: {
		title: {
			ru: "Пузырно-мочеточниковый рефлюкс до и после эндокоррекции",
			uz: "Pufak-siydik nayi reflyuksi, endokorreksiyadan oldin va keyin",
			en: "Vesicoureteral reflux before and after endoscopic correction",
		},
	},
	27: {
		title: {
			ru: "Пузырно-мочеточниковый рефлюкс до и после реимплантации мочеточника",
			uz: "Pufak-siydik nayi reflyuksi, ureter reimplantatsiyasidan oldin va keyin",
			en: "Vesicoureteral reflux before and after ureter reimplantation",
		},
	},
};

const urologyImageMap: Record<number, string[]> = {
	1: ["/image-carusel/carusel-1.1.png", "/image-carusel/carusel-1.2.png"],
	2: ["/image-carusel/carusel-2.1.png"],
	3: [
		"/image-carusel/carusel-3.1.png",
		"/image-carusel/carusel-3.2.png",
		"/image-carusel/carusel-3.3.png",
	],
	4: ["/image-carusel/carusel-4.1.png"],
	5: ["/image-carusel/carusel-5.1.png"],
	6: ["/image-carusel/carusel-6.1.png"],
	7: ["/image-carusel/carusel-7.1.png"],
	8: ["/image-carusel/carusel-8.1.png"],
	9: ["/image-carusel/carusel-9.1.png", "/image-carusel/carusel-9.2.png"],
	10: ["/image-carusel/carusel-10.1.png"],
	11: [
		"/image-carusel/carusel-11.1.png",
		"/image-carusel/carusel-11.2.png",
		"/image-carusel/carusel-11.3.png",
	],
	12: ["/image-carusel/carusel-12.1.png"],
	13: ["/image-carusel/carusel-13.1.png"],
	14: ["/image-carusel/carusel-14.1.png"],
	15: ["/image-carusel/carusel-15.1.png"],
	16: ["/image-carusel/carusel-16.1.png"],
	17: ["/image-carusel/carusel-17.1.png"],
	18: ["/image-carusel/carusel-18.1.png"],
	19: ["/image-carusel/carusel-19.1.png"],
	20: ["/image-carusel/carusel-20.1.png", "/image-carusel/carusel-20.2.png"],
	21: ["/image-carusel/carusel-21.1.png", "/image-carusel/carusel-21.2.png"],
	22: ["/image-carusel/carusel-22.1.png", "/image-carusel/carusel-22.2.png"],
	23: ["/image-carusel/carusel-23.1.png", "/image-carusel/carusel-23.2.png"],
	24: ["/image-carusel/carusel-24.1.png", "/image-carusel/carusel-24.2.png"],
	25: ["/image-carusel/carusel-25.1.png", "/image-carusel/carusel-25.2.png"],
	26: ["/image-carusel/carusel-26.1.png", "/image-carusel/carusel-26.2.png"],
	27: ["/image-carusel/carusel-27.1.png", "/image-carusel/carusel-27.2.png"],
};

export const getUrologiyaData = (language: string | undefined) => {
	const locale = normalizeLocale(language);

	return Array.from({ length: 27 }, (_, index) => {
		const id = index + 1;
		const meta = urologyMeta[id] ?? {
			title: {
				ru: `Клинический случай №${id}`,
				uz: `Klinik holat №${id}`,
				en: `Clinical case #${id}`,
			},
		};

		return {
			id: String(id),
			title: meta.title[locale],
			urlList: urologyImageMap[id] ?? [`/image-carusel/carusel-${id}.1.png`],
		};
	});
};

export const urologiyaData = getUrologiyaData("ru");
