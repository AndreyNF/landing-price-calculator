import { useEffect } from "react";

interface SeoMeta {
  title: string;
  description: string;
  canonical: string;
}

const PAGE_META: Record<string, SeoMeta> = {
  "/": {
    title: "Подготовка юридических документов за 24 часа — возражения ФНС, арбитраж | Legis24",
    description: "Юридический аналитический центр Legis24. Возражения на акт ФНС, судебные документы, арбитражные споры. Результат за 24 часа.",
    canonical: "https://advokat-vsem.ru/",
  },
  "/privacy": {
    title: "Политика конфиденциальности — Legis24",
    description: "Политика конфиденциальности сайта advokat-vsem.ru",
    canonical: "https://advokat-vsem.ru/privacy",
  },
  "/offer": {
    title: "Публичная оферта на юридические услуги — Legis24",
    description: "Публичная оферта Legis24 на оказание юридических услуг",
    canonical: "https://advokat-vsem.ru/offer",
  },
  "/terms": {
    title: "Пользовательское соглашение — Legis24",
    description: "Условия использования сайта advokat-vsem.ru",
    canonical: "https://advokat-vsem.ru/terms",
  },
  "/partner-help": {
    title: "Партнёрская программа для бухгалтеров — Legis24",
    description: "Партнёрская программа Legis24: передавайте кейсы клиентов, получайте 30% от гонорара",
    canonical: "https://advokat-vsem.ru/partner-help",
  },
  "/intellektualnaya-sobstvennost": {
    title: "Защита интеллектуальной собственности — иски и отзывы под ключ | Legis24",
    description: "Юридическая защита авторских прав и товарных знаков. Подготовка исков и отзывов за 24 часа.",
    canonical: "https://advokat-vsem.ru/intellektualnaya-sobstvennost",
  },
  "/vozrazhenie-na-akt-fns/": {
    title: "Возражение на акт ФНС под ключ — срок 24 ч | Legis24",
    description: "Подготовим возражение на акт камеральной или выездной проверки: анализ, позиция, документ. По РФ, фиксированная цена, срок от 24 часов.",
    canonical: "https://advokat-vsem.ru/vozrazhenie-na-akt-fns/",
  },
  "/otvet-na-trebovanie-fns/": {
    title: "Ответ на требование ФНС — подготовка за 24 ч | Legis24",
    description: "Ответы на требования о документах, пояснениях, НДС, прибыли, УСН. Поможем с форматом и сроками. Работаем по всей России онлайн.",
    canonical: "https://advokat-vsem.ru/otvet-na-trebovanie-fns/",
  },
  "/sudebnye-dokumenty/": {
    title: "Иск и отзыв в арбитражный суд за 24 часа | Legis24",
    description: "Исковые заявления, отзывы, уточнения требований. Налоговые и корпоративные споры. Для бизнеса и практикующих юристов по всей РФ.",
    canonical: "https://advokat-vsem.ru/sudebnye-dokumenty/",
  },
  "/nalogovye-spory/": {
    title: "Налоговые споры — защита бизнеса и документы за 24 ч | Legis24",
    description: "Сопровождение налоговых споров: возражения, ответы ФНС, иски в арбитраж. Аналитический центр Legis24, вся Россия.",
    canonical: "https://advokat-vsem.ru/nalogovye-spory/",
  },
  "/dlya-yuristov/": {
    title: "Подготовка документов для юристов — 24 ч | Legis24",
    description: "Иски, отзывы, возражения ФНС под дедлайн. Приоритетная очередь для коллег. White-label по запросу. По всей РФ.",
    canonical: "https://advokat-vsem.ru/dlya-yuristov/",
  },
};

export function useSeoMeta(path: string) {
  useEffect(() => {
    const meta = PAGE_META[path];
    if (!meta) return;

    document.title = meta.title;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.setAttribute("name", name); document.head.appendChild(el); }
      el.content = content;
    };

    const setProp = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.setAttribute("property", property); document.head.appendChild(el); }
      el.content = content;
    };

    const setCanonical = (href: string) => {
      let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!el) { el = document.createElement("link"); el.rel = "canonical"; document.head.appendChild(el); }
      el.href = href;
    };

    setMeta("description", meta.description);
    setCanonical(meta.canonical);
    setProp("og:url", meta.canonical);
    setProp("og:title", meta.title);
    setProp("og:description", meta.description);

    return () => {
      const defaultMeta = PAGE_META["/"];
      document.title = defaultMeta.title;
    };
  }, [path]);
}