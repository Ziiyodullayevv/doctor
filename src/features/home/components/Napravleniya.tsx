import { Button } from "@/components/ui/button";

export default function Napravleniya() {
  return (
    <div className="mx-auto px-10">
      <section>
        <div className="text-center">
          <h1 className="text-[26px]">Направления</h1>
          <span className="w-[40px] inline-block h-[2px] bg-primary"></span>
          <h2 className="text-[16px] text-[#767676]">
            Основные направления моей деятельности
          </h2>
        </div>
        <div className="s-parent mt-30 flex gap-10">
          <div className="s-bola border-3 rounded-2xl p-[30px] flex relative flex-col items-center">
            <div className="absolute -top-20 w-[100px] rounded-full overflow-hidden">
              <img
                className=" w-full bg-[#F1F1F1] inline-block p-[20px]"
                src="https://doctorsurov.ru/wp-content/uploads/2024/09/icons8-galochka-512.svg"
                alt=""
              />
            </div>
            <div className="text-center">
              <h2 className="text-[18px] font-medium">Генитальная хирургия</h2>
              <p className="text-[16px] text-gray-700">
                Гипоспадия любой сложности, эписпадия, стриктура уретры,
                искривление полового члена, скрытый половой член.
              </p>
            </div>
            <Button className="absolute h-10 -bottom-5">Подробнее</Button>
          </div>
          <div className="s-bola border-3 rounded-2xl p-[30px] flex relative flex-col items-center">
            <div className="absolute -top-20 w-[100px] rounded-full overflow-hidden">
              <img
                className=" w-full bg-[#F1F1F1] inline-block p-[20px]"
                src="https://doctorsurov.ru/wp-content/uploads/2024/09/icons8-galochka-512.svg"
                alt=""
              />
            </div>
            <div className="text-center">
              <h2 className="text-[18px] font-medium">Генитальная хирургия</h2>
              <p className="text-[16px] text-gray-700">
                Гипоспадия любой сложности, эписпадия, стриктура уретры,
                искривление полового члена, скрытый половой член.
              </p>
            </div>
            <Button className="absolute h-10 -bottom-5">Подробнее</Button>
          </div>

          <div className="s-bola border-3 rounded-2xl p-[30px] flex relative flex-col items-center">
            <div className="absolute -top-20 w-[100px] rounded-full overflow-hidden">
              <img
                className=" w-full bg-[#F1F1F1] inline-block p-[20px]"
                src="https://doctorsurov.ru/wp-content/uploads/2024/09/icons8-galochka-512.svg"
                alt=""
              />
            </div>
            <div className="text-center">
              <h2 className="text-[18px] font-medium">Генитальная хирургия</h2>
              <p className="text-[16px] text-gray-700">
                Гипоспадия любой сложности, эписпадия, стриктура уретры,
                искривление полового члена, скрытый половой член.
              </p>
            </div>
            <Button className="absolute h-10 -bottom-5">Подробнее</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
