import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useMediaQuery, useTheme } from "@mui/material";

export default function ImageGroup() {
	const theme = useTheme();
	const isXs = useMediaQuery(theme.breakpoints.down("sm"));
	const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
	const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));

	const getCols = () => {
		if (isXs) return 3;
		if (isSm) return 4;
		if (isMd) return 5;
		return 6;
	};

	return (
		<div className="container mx-auto py-10 px-3">
			<ImageList sx={{ overflowY: "hidden" }} gap={10} cols={getCols()}>
				{itemData.map((item) => (
					<ImageListItem key={item.img}>
						<div
							style={{
								position: "relative",
								width: "100%",
								paddingTop: "100%", // Bu eng muhim qator! 1:1 nisbat = kvadrat
								overflow: "hidden",
								borderRadius: 16, // ixtiyoriy: yumaloq burchak
							}}
						>
							<img
								src={item.img}
								alt={item.title}
								loading="lazy"
								style={{
									position: "absolute",
									top: 0,
									left: 0,
									width: "100%",
									height: "100%",
									objectFit: "cover", // kesib chiroyli joylashtiradi
									objectPosition: "center", // markazdan kesadi
								}}
							/>
						</div>
					</ImageListItem>
				))}
			</ImageList>
		</div>
	);
}

const itemData = [
	{
		img: "/home/2.jpg",
		title: "Tajribali shifokor – bemorni ko‘rikdan o‘tkazmoqda",
	},
	{ img: "/home/3.jpg", title: "Tajribali shifokor – USM tekshiruvi" },
	{ img: "/home/4.jpg", title: "Tajribali shifokor – EKG o‘lchamoqda" },
	{ img: "/home/5.jpg", title: "Tajribali shifokor – bolalar qabulida" },
	{ img: "/home/6.jpg", title: "Tajribali shifokor – stetoskop bilan" },
	{ img: "/home/7.jpg", title: "Tajribali shifokor – rentgen tahlili" },
	{
		img: "/home/8.jpg",
		title: "Tajribali shifokor – operatsiya xonasida",
	},
	{ img: "/home/9.jpg", title: "Tajribali shifokor – bemorga maslahat" },
	{ img: "/home/10.jpg", title: "Tajribali shifokor – ko‘z tekshiruvi" },
	{ img: "/home/11.jpg", title: "Tajribali shifokor – tish davolashda" },
	{
		img: "/home/12.jpg",
		title: "Tajribali shifokor – planshet bilan ishlayapti",
	},
	{
		img: "/home/13.jpg",
		title: "Tajribali shifokor – qon bosimi o‘lchamoqda",
	},
	{
		img: "/home/14.jpg",
		title: "Tajribali shifokor – jarrohlik kiyimida",
	},
	{ img: "/home/15.jpg", title: "Tajribali shifokor – laboratoriyada" },
	{
		img: "/home/16.jpg",
		title: "Tajribali shifokor – bemor bilan suhbat",
	},
	{
		img: "/home/17.jpg",
		title: "Tajribali shifokor – vaktsina qo‘ymoqda",
	},
	{
		img: "/home/18.jpg",
		title: "Tajribali shifokor – nevrologik tekshiruv",
	},
	{
		img: "/home/19.jpg",
		title: "Tajribali shifokor – dermatologik muolaja",
	},
	{ img: "/home/20.jpg", title: "Tajribali shifokor – gips qo‘ymoqda" },
	{ img: "/home/21.jpg", title: "Tajribali shifokor – endoskopiya" },
	{ img: "/home/22.jpg", title: "Tajribali shifokor – reanimatsiyada" },
	{
		img: "/home/23.jpg",
		title: "Tajribali shifokor – oilaviy shifokor",
	},
	{ img: "/home/24.jpg", title: "Tajribali shifokor – kardiogrammada" },
	{
		img: "/home/25.jpg",
		title: "Tajribali shifokor – bolalar stomatologi",
	},
	{ img: "/home/26.jpg", title: "Tajribali shifokor – lazer muolajasi" },
	{
		img: "/home/27.jpg",
		title: "Tajribali shifokor – quloq tekshiruvi",
	},
	{ img: "/home/28.jpg", title: "Tajribali shifokor – fizioterapiya" },
	{
		img: "/home/29.jpg",
		title: "Tajribali shifokor – onkologik konsultatsiya",
	},
	{
		img: "/home/30.jpg",
		title: "Tajribali shifokor – urologik tekshiruv",
	},
	{
		img: "/home/31.jpg",
		title: "Tajribali shifokor – allergiya testlari",
	},
	{
		img: "/home/32.jpg",
		title: "Tajribali shifokor – plastik jarrohlik",
	},
	{ img: "/home/33.jpg", title: "Tajribali shifokor – psixoterapiya" },
	{
		img: "/home/34.jpg",
		title: "Tajribali shifokor – dietolog maslahati",
	},
	{ img: "/home/35.jpg", title: "Tajribali shifokor – travmatologiya" },
	{ img: "/home/36.jpg", title: "Tajribali shifokor – oilaviy klinika" },
];
