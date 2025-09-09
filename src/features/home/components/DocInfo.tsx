export default function DocInfo() {
  return (
    <div>
      <section>
        <div className="container mx-auto px-10">
          <div className="flex ">
            <div className="l">
              <img
                src="https://doctorsurov.ru/wp-content/uploads/2024/09/plasticheskij-hirurg-surov-roman.png"
                alt=""
              />
            </div>
            <div className="r ">
              <h1>Доктор Суров Роман Викторович</h1>
              <span className="w-[40px] inline-block h-[2px] bg-primary"></span>
              <h2>Уролог-андролог</h2>
              <p>
                Пластический хирург, детский уролог-андролог, лечение
                гипоспадии. Реконструктивная и пластическая хирургия. Врач
                высшей квалификационной категории. Кандидат медицинских наук.
                Член Европейского общества детских урологов (ESPU).
                Реконструктивная и пластическая хирургия у взрослых и детей.
              </p>
              <h2>
                Провожу операции в Bios clinic и Морозовской ДГКБ г. Москвы
              </h2>
              <div className="btns flex">
                <div className="flex border bg-primary">
                  <button className="">Подробнее обо мне</button>
                  <img src="./mover.svg" alt="" />
                </div>
                <div className="">
                  <h2>Задать вопрос:</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
