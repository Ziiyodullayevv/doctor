import SubHeader from "@/components/SubHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
	return (
		<>
			<SubHeader
				title="Контакты"
				data={[
					{ label: "Главная", path: "/" },
					{ label: "Контакты", path: "/contact" },
				]}
			/>

			<div className="container mx-auto px-5 md:px-10">
				{/* --- Konsultatsiya bo‘limi --- */}
				<div className="flex flex-col lg:flex-row items-start my-10 gap-10">
					{/* Left */}
					<div className="flex flex-col gap-5 text-gray-600 flex-1">
						<h2 className="text-xl md:text-2xl text-black font-medium leading-snug">
							Консультация по записи через контакты (предпочтительно сообщением
							в WhatsApp!!! +79686741261)
						</h2>

						<p>
							Для записи через WhatsApp нажмите{" "}
							<strong className="font-normal text-black">СЮДА!!!</strong>
						</p>

						<p>
							<strong className="text-black font-normal">
								Пластическая хирургия
							</strong>{" "}
							в Морозовской больнице, записаться просто! Нажмите сюда.
						</p>

						<p>
							Клиника Биос (Bios clinic), г. Москва, Иваньковское шоссе, дом 7.
							Запись по вопросам пластической хирургии: +7(495)796-11-45
						</p>

						<p>
							Отделение детской урологии — г. Москва, 4-й Добрынинский переулок,
							дом 1/9, корпус 1А, 3 этаж
						</p>

						<p>Метро: Октябрьская, Добрынинская, Серпуховская</p>
					</div>

					{/* Right */}
					<div className="text-gray-600 flex-1 w-full">
						<ul className="list-disc flex flex-col gap-3">
							<li>WhatsApp: +79686741261</li>
							<li>
								Telegram (пластическая хирургия):{" "}
								<a className="text-black" href="https://t.me/SurovPlastic">
									https://t.me/SurovPlastic
								</a>
							</li>
							<li>
								Telegram (детская урология):{" "}
								<a className="text-black" href="https://t.me/SurovPlastic">
									https://t.me/SurovPlastic
								</a>
							</li>
							<li>
								Инстаграм:{" "}
								<a className="text-black" href="@doctor_surov">
									@doctor_surov
								</a>
							</li>
							<li>
								e-mail:{" "}
								<a className="text-black" href="mailto:something@mail.ru">
									something@mail.ru
								</a>
							</li>
						</ul>

						<div className="flex flex-wrap gap-5 mt-7">
							<img
								className="w-28 md:w-32"
								src="https://doctorsurov.ru/wp-content/uploads/2024/11/qr-kod-whatsapp-200x200.png"
								alt=""
							/>
							<img
								className="w-28 md:w-32"
								src="https://doctorsurov.ru/wp-content/uploads/2024/11/qr-kod-whatsapp-200x200.png"
								alt=""
							/>
							<img
								className="w-28 md:w-32"
								src="https://doctorsurov.ru/wp-content/uploads/2024/11/qr-kod-whatsapp-200x200.png"
								alt=""
							/>
						</div>
					</div>
				</div>

				{/* --- Savol berish bo‘limi --- */}
				<div className="flex flex-col lg:flex-row items-start my-10 gap-10">
					{/* Map */}
					<div className="flex-1 w-full">
						<iframe
							className="w-full rounded-xl"
							height="350"
							loading="lazy"
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47932.986087444464!2d69.13931184863281!3d41.33470930000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8bfe2c9dfdb7%3A0x4e70e6b88f98e874!2sMARS%20IT%20Tinchlik!5e0!3m2!1sen!2s!4v1756127022116!5m2!1sen!2s"
						></iframe>
					</div>

					{/* Form */}
					<form className="flex-1 flex flex-col items-start gap-5 w-full">
						<h2 className="text-xl md:text-2xl">Задать вопрос доктору</h2>

						<Input className="p-5 border rounded-full" placeholder="Ваше имя" />

						<div className="flex flex-col md:flex-row w-full gap-4">
							<Input
								className="p-5 border rounded-full md:flex-1"
								placeholder="Ваш email"
							/>
							<Input
								className="p-5 border rounded-full md:flex-1"
								placeholder="Ваш номер телефона"
							/>
						</div>

						<Textarea
							className="min-h-[180px] rounded-[20px]"
							placeholder="Напишите своё сообщение..."
						/>

						<div className="flex items-center gap-3">
							<Checkbox id="terms" />
							<Label htmlFor="terms">
								Согласен на обработку персональных данных
							</Label>
						</div>

						<Button className="rounded-full px-10 py-5">Отправить</Button>
					</form>
				</div>
			</div>
		</>
	);
}
