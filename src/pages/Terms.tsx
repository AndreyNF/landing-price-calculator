import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useSeoMeta } from "@/hooks/useSeoMeta";

export default function Terms() {
  const navigate = useNavigate();
  useSeoMeta("/terms");

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-white)" }}>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-8 text-sm font-body transition-opacity hover:opacity-70"
          style={{ color: "var(--blue)" }}
        >
          <Icon name="ArrowLeft" size={16} />
          Назад
        </button>

        <h1 className="font-display text-3xl mb-2" style={{ color: "var(--navy)" }}>
          Пользовательское соглашение
        </h1>
        <p className="font-body text-sm mb-10" style={{ color: "var(--text-muted)" }}>
          Редакция от 28 апреля 2026 г.
        </p>

        <div className="space-y-8 font-body text-sm leading-relaxed" style={{ color: "var(--text)" }}>

          <section>
            <h2 className="font-display text-lg mb-3" style={{ color: "var(--navy)" }}>
              1. Общие положения
            </h2>
            <p>
              Настоящее Пользовательское соглашение (далее — Соглашение) регулирует отношения между
              Непубличным акционерным обществом «ИВА ПЛЮС» (далее — Исполнитель) и физическим или
              юридическим лицом (далее — Пользователь), использующим сайт advokat-vsem.ru
              (далее — Сайт).
            </p>
            <p className="mt-2">
              Использование Сайта означает безоговорочное согласие с условиями настоящего Соглашения.
              Если Пользователь не принимает условия Соглашения, он обязан прекратить использование Сайта.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg mb-3" style={{ color: "var(--navy)" }}>
              2. Сведения об Исполнителе
            </h2>
            <ul className="space-y-1 list-none">
              <li><span style={{ color: "var(--text-muted)" }}>Полное наименование:</span> Непубличное акционерное общество «ИВА ПЛЮС»</li>
              <li><span style={{ color: "var(--text-muted)" }}>ИНН / КПП:</span> 6678116490 / 667901001</li>
              <li><span style={{ color: "var(--text-muted)" }}>ОГРН:</span> 1216600075251 (выдан 16.12.2021)</li>
              <li><span style={{ color: "var(--text-muted)" }}>Юридический адрес:</span> 620024, Свердловская область, г. Екатеринбург, ул. Бисертская, д. 29, офис 14/6</li>
              <li><span style={{ color: "var(--text-muted)" }}>Генеральный директор:</span> Тихомирова Екатерина Викторовна</li>
              <li><span style={{ color: "var(--text-muted)" }}>Сайт:</span> advokat-vsem.ru</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg mb-3" style={{ color: "var(--navy)" }}>
              3. Предмет Соглашения
            </h2>
            <p>
              Исполнитель предоставляет Пользователю доступ к информационным материалам Сайта и
              возможность направить заявку на оказание юридических услуг в сфере защиты
              интеллектуальной собственности и взаимодействия с налоговыми органами.
            </p>
            <p className="mt-2">
              Оформление заявки через форму на Сайте не является офертой и не влечёт автоматического
              заключения договора на оказание услуг. Договор считается заключённым с момента подписания
              сторонами соответствующего документа.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg mb-3" style={{ color: "var(--navy)" }}>
              4. Права и обязанности Пользователя
            </h2>
            <p>Пользователь вправе:</p>
            <ul className="mt-2 space-y-1 list-disc pl-5">
              <li>использовать Сайт в целях получения информации об услугах Исполнителя;</li>
              <li>направлять заявки и вопросы через форму обратной связи;</li>
              <li>получать ответы на свои обращения в разумные сроки.</li>
            </ul>
            <p className="mt-3">Пользователь обязуется:</p>
            <ul className="mt-2 space-y-1 list-disc pl-5">
              <li>предоставлять достоверные сведения при заполнении форм;</li>
              <li>не использовать Сайт в противоправных целях;</li>
              <li>не нарушать работу Сайта и его инфраструктуры.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg mb-3" style={{ color: "var(--navy)" }}>
              5. Права и обязанности Исполнителя
            </h2>
            <p>Исполнитель вправе:</p>
            <ul className="mt-2 space-y-1 list-disc pl-5">
              <li>изменять содержание Сайта без предварительного уведомления;</li>
              <li>ограничивать доступ к Сайту в случае нарушения настоящего Соглашения;</li>
              <li>вносить изменения в Соглашение с публикацией новой редакции на Сайте.</li>
            </ul>
            <p className="mt-3">Исполнитель обязуется:</p>
            <ul className="mt-2 space-y-1 list-disc pl-5">
              <li>обеспечивать доступность Сайта в штатном режиме работы;</li>
              <li>обрабатывать персональные данные в соответствии с Политикой конфиденциальности;</li>
              <li>рассматривать поступившие заявки в разумные сроки.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg mb-3" style={{ color: "var(--navy)" }}>
              6. Интеллектуальная собственность
            </h2>
            <p>
              Все материалы Сайта (тексты, изображения, логотипы, дизайн) являются собственностью
              НАО «ИВА ПЛЮС» либо используются на законных основаниях. Копирование, воспроизведение
              или распространение материалов без письменного согласия Исполнителя запрещено.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg mb-3" style={{ color: "var(--navy)" }}>
              7. Ограничение ответственности
            </h2>
            <p>
              Сайт предоставляется «как есть». Исполнитель не гарантирует бесперебойную работу Сайта
              и не несёт ответственности за технические сбои, действия третьих лиц или обстоятельства
              непреодолимой силы.
            </p>
            <p className="mt-2">
              Информация на Сайте носит общий ознакомительный характер и не является юридической
              консультацией по конкретному делу.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg mb-3" style={{ color: "var(--navy)" }}>
              8. Персональные данные
            </h2>
            <p>
              Обработка персональных данных Пользователя осуществляется в соответствии с{" "}
              <a href="/privacy" className="underline hover:opacity-70 transition-opacity" style={{ color: "var(--blue)" }}>
                Политикой конфиденциальности
              </a>
              , являющейся неотъемлемой частью настоящего Соглашения.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg mb-3" style={{ color: "var(--navy)" }}>
              9. Применимое право и споры
            </h2>
            <p>
              Соглашение регулируется законодательством Российской Федерации. Все споры
              разрешаются путём переговоров, а при недостижении согласия — в суде по месту
              нахождения Исполнителя (г. Екатеринбург).
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg mb-3" style={{ color: "var(--navy)" }}>
              10. Изменение Соглашения
            </h2>
            <p>
              Исполнитель вправе в одностороннем порядке изменять условия настоящего Соглашения.
              Новая редакция вступает в силу с момента публикации на Сайте. Продолжение использования
              Сайта означает принятие изменений.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg mb-3" style={{ color: "var(--navy)" }}>
              11. Контакты
            </h2>
            <p>По вопросам, связанным с настоящим Соглашением, обращайтесь:</p>
            <ul className="mt-2 space-y-1 list-none">
              <li><span style={{ color: "var(--text-muted)" }}>Организация:</span> НАО «ИВА ПЛЮС»</li>
              <li><span style={{ color: "var(--text-muted)" }}>Адрес:</span> 620024, г. Екатеринбург, ул. Бисертская, д. 29, офис 14/6</li>
              <li><span style={{ color: "var(--text-muted)" }}>Сайт:</span> advokat-vsem.ru</li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}