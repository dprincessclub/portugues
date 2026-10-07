/* ============================================================
   app.js — логика сайта. Данные хранятся в браузере (localStorage).
   ============================================================ */
(function () {
"use strict";

/* ---------- Утилиты ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const pad = n => String(n).padStart(2, "0");
const ymd = d => d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
const today = () => ymd(new Date());
const parseYmd = s => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
const addDays = (s, n) => { const d = parseYmd(s); d.setDate(d.getDate() + n); return ymd(d); };
const daysBetween = (a, b) => Math.round((parseYmd(b) - parseYmd(a)) / 86400000);
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const plural = (n, f) => { const a = Math.abs(n) % 100, b = a % 10; return n + " " + (a > 10 && a < 20 ? f[2] : b > 1 && b < 5 ? f[1] : b === 1 ? f[0] : f[2]); };
const wordsRu = n => plural(n, ["слово", "слова", "слов"]);
const uid = () => "w" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const byId = id => UNITS.find(u => u.id === id);
const normalize = s => String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zа-я0-9 ]/gi, "").replace(/\s+/g, " ").trim();

/* ---------- Состояние ---------- */
const KEY = "ptbr_study_v1";
let memOnly = false;
const DEFAULT = () => ({
  v: 1, name: "", start: today(), words: [], done: {}, log: {}, diary: [], quiz: {}, badges: {}, welcomed: false,
  settings: { goal: 30, newPerDay: 10, remind: "20:00", dir: "mixed", typing: false, notify: false }
});
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return fix(JSON.parse(raw));
  } catch (e) { memOnly = true; }
  return DEFAULT();
}
function fix(s) {
  const d = DEFAULT();
  s = Object.assign(d, s || {});
  s.settings = Object.assign(d.settings, s.settings || {});
  ["words", "diary"].forEach(k => { if (!Array.isArray(s[k])) s[k] = []; });
  ["done", "log", "quiz", "badges"].forEach(k => { if (!s[k] || typeof s[k] !== "object") s[k] = {}; });
  return s;
}
let S = load();
let warned = false;
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); }
  catch (e) {
    memOnly = true;
    if (!warned) { warned = true; setTimeout(() => toast("Браузер не сохраняет данные. Скачай копию в настройках."), 50); }
  }
}

/* ---------- Курс: дни ---------- */
const DAYS = [
  { n: 1, t: "Новые слова, часть 1", tasks: [
    { t: "Прочитай слова 1–6 вслух", m: 5 },
    { t: "Послушай каждое слово на Forvo", m: 5 },
    { t: "Добавь слова в «Мой словарь»", m: 3, act: "add1" },
    { t: "Пройди карточки этой части", m: 10, act: "cards1" },
    { t: "Придумай по предложению с двумя словами и запиши в тетрадь", m: 7 }] },
  { n: 2, t: "Грамматика", tasks: [
    { t: "Прочитай объяснение", m: 10 },
    { t: "Перепиши 3 примера от руки", m: 5 },
    { t: "Пройди тест по грамматике", m: 10, act: "quiz" },
    { t: "Сделай повторение слов", m: 5, act: "srs" }] },
  { n: 3, t: "Новые слова, часть 2 и фразы", tasks: [
    { t: "Прочитай слова 7–12 вслух", m: 5 },
    { t: "Послушай каждое слово на Forvo", m: 5 },
    { t: "Добавь слова в «Мой словарь»", m: 3, act: "add2" },
    { t: "Пройди карточки этой части", m: 10, act: "cards2" },
    { t: "Выучи 4 ключевые фразы", m: 7 }] },
  { n: 4, t: "Слушаем и повторяем", tasks: [
    { t: "Посмотри видео по теме (ссылка ниже)", m: 10, act: "yt" },
    { t: "Повтори 5 фраз вслух вместе с диктором", m: 10 },
    { t: "Выпиши 3 новых слова в свой словарь", m: 5, act: "dict" },
    { t: "Сделай повторение слов", m: 5, act: "srs" }] },
  { n: 5, t: "Пишем и говорим", tasks: [
    { t: "Выполни письменное задание", m: 12, act: "write" },
    { t: "Запиши голосовое на 1 минуту и послушай себя", m: 8 },
    { t: "Сверь трудные слова на Forvo", m: 5 },
    { t: "Сделай повторение слов", m: 5, act: "srs" }] },
  { n: 6, t: "Итоги юнита", tasks: [
    { t: "Пройди карточки: все слова юнита", m: 10, act: "cardsAll" },
    { t: "Пройди итоговый тест юнита", m: 10, act: "quizAll" },
    { t: "Сделай повторение слов", m: 5, act: "srs" },
    { t: "Отметь, что получилось легко, а что трудно", m: 5 }] },
  { n: 7, t: "Лёгкий день", tasks: [
    { t: "Пробеги глазами слова и грамматику юнита", m: 10 },
    { t: "Напиши 3 предложения о своём дне со словами юнита", m: 10, act: "write" },
    { t: "Сделай повторение слов", m: 5, act: "srs" },
    { t: "Отдохни. Ты молодец, отметь неделю", m: 5 }] }
];
const TASKS_PER_UNIT = DAYS.reduce((a, d) => a + d.tasks.length, 0);

function parseWords(u) {
  if (!u._w) u._w = u.w.split(";").map(s => s.trim()).filter(Boolean).map(s => { const i = s.indexOf("="); return { pt: s.slice(0, i).trim(), ru: s.slice(i + 1).trim() }; });
  return u._w;
}
function forvoUrl(pt) {
  const w = String(pt).split("/")[0].replace(/[?!.,]/g, "").trim().toLowerCase().replace(/\s+/g, "_");
  return "https://forvo.com/word/" + encodeURIComponent(w) + "/#pt";
}
const taskKey = (u, n, i) => u + "." + n + "." + i;
const isDone = (u, n, i) => !!S.done[taskKey(u, n, i)];
function dayDone(u, n) { return DAYS[n - 1].tasks.every((t, i) => isDone(u.id, n, i)); }
function dayTasksDone(u, n) { return DAYS[n - 1].tasks.filter((t, i) => isDone(u.id, n, i)).length; }
function unitDone(u) { for (let n = 1; n <= 7; n++) if (!dayDone(u, n)) return false; return true; }
function unitTasksDone(u) { let c = 0; for (let n = 1; n <= 7; n++) c += dayTasksDone(u, n); return c; }
const unitPct = u => Math.round(unitTasksDone(u) / TASKS_PER_UNIT * 100);
function nextTarget() { for (const u of UNITS) for (let n = 1; n <= 7; n++) if (!dayDone(u, n)) return { u, n }; return null; }
function taskMinutes(key) { const p = key.split("."); const d = DAYS[+p[1] - 1]; const t = d && d.tasks[+p[2]]; return t ? t.m : 0; }

/* ---------- Активность, серия, XP ---------- */
function activity() {
  const m = {};
  const g = d => m[d] || (m[d] = { min: 0, tasks: 0, rev: 0, add: 0, quiz: 0 });
  for (const k in S.done) { const d = S.done[k]; if (!d) continue; const a = g(d); a.min += taskMinutes(k); a.tasks++; }
  for (const d in S.log) { const a = g(d); a.rev += S.log[d].rev || 0; a.quiz += S.log[d].quiz || 0; }
  for (const w of S.words) if (w.created) g(w.created).add++;
  return m;
}
const hasAct = a => !!(a && (a.tasks || a.rev || a.add || a.quiz));
function streaks(act) {
  const t = today();
  let cur = 0, d = hasAct(act[t]) ? t : addDays(t, -1);
  while (hasAct(act[d])) { cur++; d = addDays(d, -1); }
  const dates = Object.keys(act).filter(k => hasAct(act[k])).sort();
  let best = 0, run = 0, prev = null;
  for (const x of dates) { run = prev && daysBetween(prev, x) === 1 ? run + 1 : 1; if (run > best) best = run; prev = x; }
  return { cur, best, days: dates.length };
}
const TITLES = ["Новичок", "Путешественница", "Знаток слов", "Разговорница", "Болтунья", "Мастер фраз", "Эксперт", "Бразильянка в душе"];
function totals() {
  let tasks = 0, days = 0, units = 0, rev = 0, mins = 0, mature = 0, perfect = false, diary = S.diary.length;
  for (const k in S.done) if (S.done[k]) { tasks++; mins += taskMinutes(k); }
  const lv = { A1: 0, A2: 0, B1: 0 }, lvTotal = { A1: 0, A2: 0, B1: 0 };
  UNITS.forEach(u => {
    let ud = true;
    for (let n = 1; n <= 7; n++) { if (dayDone(u, n)) days++; else ud = false; }
    lvTotal[u.lvl]++;
    if (ud) { units++; lv[u.lvl]++; }
  });
  for (const d in S.log) rev += S.log[d].rev || 0;
  S.words.forEach(w => { if ((w.ivl || 0) >= 21) mature++; });
  for (const k in S.quiz) if (S.quiz[k] >= 100) perfect = true;
  let q = 0; for (const k in S.quiz) q += Math.round(S.quiz[k] / 10);
  const xp = tasks * 5 + days * 20 + rev + q + S.words.length * 2;
  return { tasks, days, units, rev, mins, mature, perfect, diary, lv, lvTotal, xp, words: S.words.length };
}
function xpInfo(t) {
  t = t || totals();
  const lvl = Math.floor(Math.sqrt(t.xp / 40)) + 1;
  const base = (lvl - 1) * (lvl - 1) * 40, next = lvl * lvl * 40;
  return { xp: t.xp, lvl, base, next, pct: Math.round((t.xp - base) / (next - base) * 100), title: TITLES[Math.min(lvl - 1, TITLES.length - 1)] };
}

/* ---------- SRS ---------- */
function nextState(w, r) {
  let ease = w.ease || 2.5, ivl = w.ivl || 0, reps = w.reps || 0, lapse = false;
  if (r === 0) { reps = 0; ivl = 0; ease = Math.max(1.3, ease - 0.2); lapse = true; }
  else if (r === 1) { ivl = ivl < 1 ? 1 : Math.max(1, Math.round(ivl * 1.2)); ease = Math.max(1.3, ease - 0.15); reps += 1; }
  else if (r === 2) { ivl = reps === 0 ? 1 : reps === 1 ? 3 : Math.max(1, Math.round(ivl * ease)); reps += 1; }
  else { ivl = reps === 0 ? 3 : reps === 1 ? 6 : Math.max(1, Math.round(ivl * ease * 1.3)); ease += 0.15; reps += 1; }
  return { ivl, ease, reps, lapse };
}
const ivlLabel = d => d <= 0 ? "сейчас" : d === 1 ? "1 день" : d < 30 ? d + " дн." : d < 365 ? Math.round(d / 30) + " мес." : "год";
function logDay(t) { return S.log[t] || (S.log[t] = { rev: 0, quiz: 0, newIntro: 0 }); }
function applyRating(w, r) {
  const t = today(), wasNew = !w.last, ns = nextState(w, r);
  w.ivl = ns.ivl; w.ease = ns.ease; w.reps = ns.reps; if (ns.lapse) w.lapses = (w.lapses || 0) + 1;
  w.due = addDays(t, ns.ivl); w.last = t;
  const l = logDay(t); l.rev = (l.rev || 0) + 1; if (wasNew) l.newIntro = (l.newIntro || 0) + 1;
  save();
}
function buildQueue() {
  const t = today();
  const due = S.words.filter(w => w.last && w.due <= t);
  const fresh = S.words.filter(w => !w.last);
  const left = Math.max(0, S.settings.newPerDay - ((S.log[t] && S.log[t].newIntro) || 0));
  return shuffle(due).concat(fresh.slice(0, left));
}
const dueCount = () => buildQueue().length;
const wordStatus = w => !w.last ? "new" : (w.ivl || 0) >= 21 ? "mature" : "learn";

/* ---------- Словарь: операции ---------- */
function addWord(pt, ru, extra) {
  pt = String(pt || "").trim(); ru = String(ru || "").trim();
  if (!pt || !ru) return false;
  if (S.words.some(w => w.pt.toLowerCase() === pt.toLowerCase())) return false;
  extra = extra || {};
  S.words.push({ id: uid(), pt, ru, tag: extra.tag || "", ex: extra.ex || "", note: extra.note || "", created: today(), due: today(), ivl: 0, ease: 2.5, reps: 0, lapses: 0, last: null });
  return true;
}
function addUnitWords(unitId, part) {
  const u = byId(unitId), ws = parseWords(u);
  const list = part === 1 ? ws.slice(0, 6) : part === 2 ? ws.slice(6) : ws;
  let c = 0; list.forEach(w => { if (addWord(w.pt, w.ru, { tag: u.t })) c++; });
  save(); return c;
}

/* ---------- Уведомления ---------- */
let toastTimer;
function toast(msg) {
  let t = $(".toast"); if (t) t.remove();
  t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); t.textContent = msg;
  document.body.appendChild(t); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.remove(), 3200);
}
function praise() {
  if (typeof ELOGIOS === "undefined" || !ELOGIOS.length) return;
  const e = ELOGIOS[Math.floor(Math.random() * ELOGIOS.length)];
  toast(e[0] + " " + e[1]);
  const t = $(".toast"); if (t) { t.classList.add("praise"); t.innerHTML = "<b>" + esc(e[0]) + "</b> " + esc(e[1]); }
}
function confetti() {
  praise();
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const colors = ["#6D1A2A", "#2E6150", "#A9B39A", "#D9B26F", "#FAF6F1"];
  for (let i = 0; i < 46; i++) {
    const s = document.createElement("span"); s.className = "confetti";
    s.style.left = Math.random() * 100 + "vw"; s.style.background = colors[i % colors.length];
    s.style.animationDelay = Math.random() * .5 + "s"; s.style.transform = "rotate(" + Math.random() * 360 + "deg)";
    document.body.appendChild(s); setTimeout(() => s.remove(), 2600);
  }
}

/* ---------- Достижения ---------- */
const BADGES = [
  { id: "first", e: "🌱", n: "Первый шаг", d: "Выполнено первое задание", t: s => s.tasks >= 1 },
  { id: "w10", e: "📒", n: "10 слов", d: "В словаре 10 слов", t: s => s.words >= 10 },
  { id: "w50", e: "📚", n: "50 слов", d: "В словаре 50 слов", t: s => s.words >= 50 },
  { id: "w150", e: "🗂", n: "150 слов", d: "В словаре 150 слов", t: s => s.words >= 150 },
  { id: "w300", e: "🏛", n: "300 слов", d: "В словаре 300 слов", t: s => s.words >= 300 },
  { id: "st3", e: "🔥", n: "Три дня подряд", d: "Серия 3 дня", t: s => s.best >= 3 },
  { id: "st7", e: "☀️", n: "Неделя подряд", d: "Серия 7 дней", t: s => s.best >= 7 },
  { id: "st30", e: "🌴", n: "Месяц подряд", d: "Серия 30 дней", t: s => s.best >= 30 },
  { id: "day1", e: "✅", n: "День без остатка", d: "Все задания дня выполнены", t: s => s.days >= 1 },
  { id: "unit1", e: "🎓", n: "Первый юнит", d: "Пройден первый юнит", t: s => s.units >= 1 },
  { id: "a1", e: "🥉", n: "Уровень A1", d: "Пройдены все юниты A1", t: s => s.lv.A1 >= s.lvTotal.A1 },
  { id: "a2", e: "🥈", n: "Уровень A2", d: "Пройдены все юниты A2", t: s => s.lv.A2 >= s.lvTotal.A2 },
  { id: "b1", e: "🥇", n: "Уровень B1", d: "Пройдены все юниты B1", t: s => s.lv.B1 >= s.lvTotal.B1 },
  { id: "q100", e: "🎯", n: "Тест без ошибок", d: "100% в тесте", t: s => s.perfect },
  { id: "r100", e: "🔁", n: "100 повторений", d: "100 карточек повторено", t: s => s.rev >= 100 },
  { id: "r500", e: "💪", n: "500 повторений", d: "500 карточек повторено", t: s => s.rev >= 500 },
  { id: "mature20", e: "🧠", n: "20 слов в долгой памяти", d: "Интервал больше 3 недель", t: s => s.mature >= 20 },
  { id: "diary5", e: "✍️", n: "5 записей в дневнике", d: "Пять писем и сочинений", t: s => s.diary >= 5 }
];
function badgeStats() { const t = totals(), st = streaks(activity()); return Object.assign({}, t, { best: st.best }); }
function checkBadges() {
  const s = badgeStats(); let any = false;
  BADGES.forEach(b => { if (!S.badges[b.id] && b.t(s)) { S.badges[b.id] = today(); any = true; toast("Новое достижение: " + b.n + " " + b.e); } });
  if (any) save();
}

/* ---------- Роутер ---------- */
const NAV = [
  { id: "today", ic: "☀", t: "Сегодня" },
  { id: "course", ic: "📚", t: "Курс" },
  { id: "dict", ic: "📒", t: "Словарь" },
  { id: "review", ic: "🔁", t: "Повторение" },
  { id: "progress", ic: "🏆", t: "Прогресс" },
  { id: "guide", ic: "🧭", t: "Гид" }
];
function parseHash() { const p = (location.hash.replace(/^#\/?/, "") || "today").split("/"); return { page: p[0], a: p[1], b: p[2], c: p[3] }; }
function render() {
  const r = parseHash(); let html = "";
  try {
    switch (r.page) {
      case "course": html = pageCourse(); break;
      case "unit": html = pageUnit(r); break;
      case "dict": html = pageDict(); break;
      case "review": html = pageReview(); break;
      case "progress": html = pageProgress(); break;
      case "guide": html = pageGuide(r); break;
      default: html = pageToday();
    }
  } catch (e) { console.error(e); html = '<div class="card"><h2>Что-то пошло не так</h2><p>Обнови страницу. Если ошибка повторяется, скачай копию данных в настройках.</p></div>'; }
  $("#main").innerHTML = html;
  const cur = r.page === "unit" ? "course" : NAV.some(n => n.id === r.page) ? r.page : "today";
  const due = dueCount();
  $("#nav").innerHTML = NAV.map(n => '<a href="#/' + n.id + '"' + (n.id === cur ? ' aria-current="page"' : "") + '><span class="ic">' + n.ic + "</span>" + n.t + (n.id === "review" && due ? '<span class="badge">' + due + "</span>" : "") + "</a>").join("");
  const xi = xpInfo();
  $("#side-xp").innerHTML = "Уровень " + xi.lvl + ", " + esc(xi.title) + '<div class="bar sun" style="margin-top:6px"><i style="width:' + xi.pct + '%"></i></div><div class="small" style="margin-top:4px">' + xi.xp + " XP</div>";
  document.title = (due ? "(" + due + ") " : "") + "Português: курс из дневника Арины";
  if (r.page === "dict") renderDictList();
  const an = $("#ans"); if (an) an.focus();
}

/* ---------- Страница: Сегодня ---------- */
function ringSvg(pct) {
  const r = 62, c = 2 * Math.PI * r;
  return '<svg width="150" height="150" viewBox="0 0 150 150" aria-hidden="true"><circle cx="75" cy="75" r="' + r + '" fill="none" stroke="rgba(250,246,241,.16)" stroke-width="10"/><circle cx="75" cy="75" r="' + r + '" fill="none" stroke="#D9B26F" stroke-width="10" stroke-linecap="round" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + (c * (1 - Math.min(1, pct))).toFixed(1) + '"/></svg>';
}
function pageToday() {
  const act = activity(), t = today(), mins = (act[t] && act[t].min) || 0, goal = S.settings.goal;
  const st = streaks(act), xi = xpInfo(), nt = nextTarget(), due = dueCount(), h = new Date().getHours();
  const g = h < 12 ? ["Bom dia", "Доброе утро"] : h < 18 ? ["Boa tarde", "Добрый день"] : ["Boa noite", "Добрый вечер"];
  const quote = MOTIVATION[(Math.floor(Date.now() / 86400000)) % MOTIVATION.length];
  let streakMsg = st.cur > 0 ? "Серия: " + plural(st.cur, ["день", "дня", "дней"]) : st.best > 0 ? "С возвращением! Начнём новую серию" : "Начнём серию сегодня";
  const hero = '<section class="hero o1"><div><div class="greet">' + g[0] + (S.name ? ", " + esc(S.name) : "") + '!</div><div class="greet-ru">' + g[1] + '. Сегодня достаточно ' + goal + ' минут.</div><div class="chips"><span>' + streakMsg + "</span><span>Уровень " + xi.lvl + ", " + esc(xi.title) + "</span><span>" + xi.xp + ' XP</span></div></div><div class="ring">' + ringSvg(mins / goal) + '<div class="t"><b>' + Math.min(mins, 999) + '</b><small>из ' + goal + ' минут</small></div></div></section>';
  const quoteHtml = '<p class="quote o2">' + esc(quote) + "</p>";
  const tasks = nt
    ? '<div class="card o4"><div class="row between"><div><span class="chip sky">' + nt.u.lvl + '</span> <span class="muted small">Юнит ' + (UNITS.indexOf(nt.u) + 1) + " из " + UNITS.length + ': ' + esc(nt.u.t) + '</span></div><a class="btn ghost sm" href="#/unit/' + nt.u.id + '">Весь юнит</a></div>' + dayCard(nt.u, nt.n) + "</div>"
    : '<div class="card o4"><h2>Курс пройден!</h2><p>Ты прошла все 24 юнита. Дальше: повторяй слова, смотри сериалы с субтитрами и найди собеседника для разговоров. Подсказки в разделе «Гид».</p></div>';
  const review = '<div class="card o5"><h2>Повторение слов</h2>' +
    (due ? "<p>Сегодня ждут: <b>" + due + "</b>. Это займёт несколько минут.</p>" : S.words.length ? "<p>На сегодня всё повторено. Отличная работа!</p>" : "<p>В словаре пока пусто. Добавь слова из юнита или свои.</p>") +
    '<a class="btn" href="#/review">' + (due ? "Начать повторение" : "Открыть повторение") + '</a><p class="muted small" style="margin-top:12px">Нет сил на полный день? Только повторение тоже сохраняет серию.</p></div>';
  const wod = wordOfDay();
  const word = '<div class="card o6"><h2>Слово дня</h2>' + (wod ? '<div class="pt wod">' + esc(wod.pt) + '</div><p class="muted">' + esc(wod.ru) + '</p><div class="row"><a class="btn ghost sm" target="_blank" rel="noopener" href="' + forvoUrl(wod.pt) + '">Послушать на Forvo</a><button type="button" class="btn sm" data-a="addone" data-pt="' + esc(wod.pt) + '" data-ru="' + esc(wod.ru) + '" data-tag="' + esc(wod.tag) + '">В словарь</button></div>' : "<p>Появится после первых заданий.</p>") + "</div>";
  return '<div class="today"><div class="today-main">' + hero + quoteHtml + tasks + '</div><aside class="today-side" aria-label="На каждый день">' + fraseCard() + review + word + chatCard() + "</aside></div>";
}
const daySeed = () => Math.floor(Date.now() / 86400000);
function fraseCard() {
  if (typeof FRASES === "undefined" || !FRASES.length) return "";
  const f = FRASES[daySeed() % FRASES.length];
  return '<section class="frase o3" aria-labelledby="frase-h"><h2 id="frase-h" class="hand">frase do dia</h2>' +
    '<p class="frase-pt" lang="pt-BR">' + esc(f.pt) + '</p><p class="frase-ru">' + esc(f.ru) + '</p>' +
    '<p class="frase-note">' + esc(f.n) + '</p><div class="row">' +
    '<button type="button" class="btn sm" data-a="addone" data-pt="' + esc(f.pt) + '" data-ru="' + esc(f.ru) + '" data-tag="фраза дня">В словарь</button>' +
    '<a class="btn ghost sm" target="_blank" rel="noopener" href="https://dprincessclub.github.io/pismo/">Отправить письмом</a></div></section>';
}
let chatOff = 0;
function chatCard() {
  if (typeof CHAT === "undefined" || !CHAT.length) return "";
  const c = CHAT[(daySeed() * 7 + chatOff) % CHAT.length];
  return '<section class="card chat o7" aria-labelledby="chat-h"><div class="row between"><h2 id="chat-h">Как пишут в бразильских чатах</h2>' +
    '<button type="button" class="btn ghost sm" data-a="nextchat">Ещё одно</button></div>' +
    '<div class="bubble"><span class="bubble-s" lang="pt-BR">' + esc(c.s) + '</span><span class="bubble-f">' + esc(c.f) + '</span></div>' +
    '<p>' + esc(c.ru) + '</p><p class="muted chat-ex" lang="pt-BR">' + esc(c.ex) + '</p></section>';
}
function welcome() {
  if (S.welcomed) return;
  S.welcomed = true; save();
  openModal('<div class="welcome"><p class="hand welcome-hi">olá!</p>' +
    '<p class="welcome-text">я Арина. этот курс я собрала для себя — для вечеров, когда хотелось отвлечься от телефона и чужого молчания. теперь он и твой.</p>' +
    '<p class="muted">по 30 минут в день, без регистрации: только ты и португальский 🤍</p>' +
    '<p class="muted small">Прогресс хранится только в твоём браузере. Копию можно скачать в настройках.</p>' +
    '<div class="row"><button type="button" class="btn" data-a="close">Vamos! Начнём</button>' +
    '<a class="btn ghost" href="https://instagram.com/dprincessclub" target="_blank" rel="noopener">Мой дневник, @dprincessclub</a></div></div>');
}
function wordOfDay() {
  const nt = nextTarget(), u = nt ? nt.u : UNITS[UNITS.length - 1], ws = parseWords(u);
  const seed = Math.floor(Date.now() / 86400000); const w = ws[seed % ws.length];
  return { pt: w.pt, ru: w.ru, tag: u.t };
}

/* ---------- Карточка дня (общая) ---------- */
function wordListHtml(list) {
  return '<ul class="wordlist">' + list.map(w => '<li><span class="pt">' + esc(w.pt) + '</span><span class="ru">' + esc(w.ru) + '</span><a class="btn ghost sm" target="_blank" rel="noopener" href="' + forvoUrl(w.pt) + '" aria-label="Послушать ' + esc(w.pt) + '">🔊 Forvo</a></li>').join("") + "</ul>";
}
function phrasesHtml(u) { return u.ph.map(p => '<div class="phrase"><b>' + esc(p[0]) + "</b>" + esc(p[1]) + "</div>").join(""); }
const ACT_LABEL = { add1: "Добавить слова", add2: "Добавить слова", cards1: "Открыть карточки", cards2: "Открыть карточки", cardsAll: "Открыть карточки", quiz: "Начать тест", quizAll: "Начать тест", write: "К заданию", srs: "К повторению", dict: "В словарь", yt: "Открыть" };
function dayCard(u, n) {
  const d = DAYS[n - 1], ws = parseWords(u), done = dayTasksDone(u, n), total = d.tasks.length;
  let h = '<div class="day-head"><div><h2 style="margin:0">День ' + n + " из 7. " + esc(d.t) + '</h2><div class="muted small">' + d.tasks.reduce((a, t) => a + t.m, 0) + " минут, выполнено " + done + " из " + total + '</div></div></div><div class="bar"><i style="width:' + Math.round(done / total * 100) + '%"></i></div>';
  h += '<div style="margin-top:16px">';
  if (n === 1) h += wordListHtml(ws.slice(0, 6));
  else if (n === 2) h += '<div class="grammar">' + u.g + "</div>";
  else if (n === 3) h += wordListHtml(ws.slice(6)) + '<h3 style="margin-top:16px">Ключевые фразы</h3>' + phrasesHtml(u);
  else if (n === 4) h += '<p>Открой видео и включи субтитры. Выбери ролик на 5–10 минут и повторяй фразы вслух.</p><p><a class="btn sun" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=' + encodeURIComponent(u.yt) + '">Найти видео по теме на YouTube</a></p><h3>Фразы для повторения вслух</h3>' + phrasesHtml(u);
  else if (n === 5 || n === 7) h += '<div class="phrase"><b>Задание</b>' + esc(n === 5 ? u.wr : "Напиши 3 предложения о своём дне, используя слова этого юнита.") + '</div><label for="wr">Твой текст</label><textarea id="wr" placeholder="Пиши по-португальски. Ошибки — это нормально."></textarea><p style="margin-top:8px"><button type="button" class="btn sm" data-a="savewr" data-u="' + u.id + '" data-d="' + n + '">Сохранить в дневник</button></p>' + (n === 7 ? '<details style="margin-top:12px"><summary>Слова юнита</summary>' + wordListHtml(ws) + "</details>" : "");
  else if (n === 6) h += '<p>Сегодня закрепляем всё. Если слово не вспомнилось, это сигнал: оно уйдёт в повторение чаще.</p>' + wordListHtml(ws);
  h += "</div>";
  h += '<ul class="tasks">' + d.tasks.map((t, i) => {
    const dn = isDone(u.id, n, i), act = t.act && ACT_LABEL[t.act] ? t.act : "";
    let btn = "";
    if (act === "yt") btn = '<a class="btn sm" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=' + encodeURIComponent(u.yt) + '">Открыть</a>';
    else if (act === "srs") btn = '<a class="btn sm" href="#/review">' + ACT_LABEL.srs + "</a>";
    else if (act === "dict") btn = '<a class="btn sm" href="#/dict">' + ACT_LABEL.dict + "</a>";
    else if (act === "write") btn = '<button type="button" class="btn sm" data-a="focuswr">' + ACT_LABEL.write + "</button>";
    else if (act) btn = '<button type="button" class="btn sm" data-a="act" data-act="' + act + '" data-u="' + u.id + '" data-d="' + n + '">' + ACT_LABEL[act] + "</button>";
    return '<li class="task' + (dn ? " done" : "") + '"><input type="checkbox" id="t' + n + "_" + i + '" data-a="toggle" data-u="' + u.id + '" data-d="' + n + '" data-i="' + i + '"' + (dn ? " checked" : "") + '><label class="tt" for="t' + n + "_" + i + '">' + esc(t.t) + ' <span class="min">(' + t.m + ' мин)</span></label><span>' + btn + "</span></li>";
  }).join("") + "</ul>";
  return h;
}

/* ---------- Страница: Курс ---------- */
function pageCourse() {
  const t = totals(), nt = nextTarget();
  let out = '<h1>Курс от нуля до B1</h1><p class="muted">24 юнита, в каждом 7 дней по 30 минут. Идти можно по порядку или перескакивать, прогресс сохраняется.</p>';
  if (nt) out += '<div class="card"><div class="row between"><div><b>Продолжить:</b> ' + esc(nt.u.t) + ", день " + nt.n + '</div><a class="btn" href="#/unit/' + nt.u.id + "/day/" + nt.n + '">Открыть день</a></div></div>';
  ["A1", "A2", "B1"].forEach(lv => {
    const us = UNITS.filter(u => u.lvl === lv), L = LEVELS[lv];
    const pct = Math.round(us.reduce((a, u) => a + unitPct(u), 0) / us.length);
    out += '<section class="level"><div class="level-head"><span class="lv">' + lv + "</span><div><h2 style=\"margin:0\">" + esc(L.title) + '</h2><div class="muted small">' + t.lv[lv] + " из " + us.length + ' юнитов пройдено</div></div></div><p class="muted">' + esc(L.desc) + '</p><div class="bar" style="margin-bottom:14px"><i style="width:' + pct + '%"></i></div>';
    us.forEach(u => {
      const i = UNITS.indexOf(u) + 1, p = unitPct(u);
      out += '<a class="unit-card' + (p === 100 ? " done" : "") + '" href="#/unit/' + u.id + '"><span class="num">' + (p === 100 ? "✓" : i) + '</span><div><div class="ut">' + esc(u.t) + '</div><div class="muted small">' + esc(u.goal) + '</div><div class="bar"><i style="width:' + p + '%"></i></div></div><span class="muted small">' + p + "%</span></a>";
    });
    out += "</section>";
  });
  return out;
}

/* ---------- Страница: Юнит ---------- */
function pageUnit(r) {
  const u = byId(r.a); if (!u) return '<div class="card"><p>Юнит не найден. <a href="#/course">К курсу</a></p></div>';
  const i = UNITS.indexOf(u), tab = r.b === "day" ? "plan" : (r.b || "plan"), base = "#/unit/" + u.id;
  let out = '<p class="small"><a href="#/course">Курс</a> / ' + u.lvl + '</p><h1>' + (i + 1) + ". " + esc(u.t) + '</h1><p class="muted">' + esc(u.goal) + ' <span class="chip">' + esc(u.pt) + '</span></p>';
  out += '<div class="tabs">' + [["plan", "План на 7 дней"], ["words", "Слова"], ["grammar", "Грамматика"], ["test", "Тесты"]].map(x => '<a href="' + base + (x[0] === "plan" ? "" : "/" + x[0]) + '"' + (tab === x[0] ? ' aria-current="true"' : "") + ">" + x[1] + "</a>").join("") + "</div>";
  if (r.b === "day") {
    const n = Math.min(7, Math.max(1, +r.c || 1));
    out += '<div class="card">' + dayCard(u, n) + '</div><div class="row between"><a class="btn ghost" href="' + base + (n > 1 ? "/day/" + (n - 1) : "") + '">' + (n > 1 ? "День " + (n - 1) : "К плану") + "</a>" + (n < 7 ? '<a class="btn" href="' + base + "/day/" + (n + 1) + '">День ' + (n + 1) + "</a>" : (i + 1 < UNITS.length ? '<a class="btn" href="#/unit/' + UNITS[i + 1].id + '">Следующий юнит</a>' : "")) + "</div>";
    return out;
  }
  if (tab === "plan") {
    const nt = nextTarget();
    out += '<div class="bar" style="margin-bottom:6px"><i style="width:' + unitPct(u) + '%"></i></div><p class="muted small">Пройдено ' + unitPct(u) + '%</p><div class="days">';
    for (let n = 1; n <= 7; n++) out += '<a class="day-pill' + (dayDone(u, n) ? " done" : "") + (nt && nt.u === u && nt.n === n ? " cur" : "") + '" href="' + base + "/day/" + n + '"><b>' + n + "</b><small>" + esc(DAYS[n - 1].t.split(",")[0]) + "</small></a>";
    out += '</div><div class="card flat"><h3>Что будет в юните</h3><p>Слов: ' + parseWords(u).length + ". Ключевых фраз: " + u.ph.length + ". Вопросов в тесте: " + u.q.length + ' + вопросы по словам.</p><button type="button" class="btn ghost sm" data-a="resetunit" data-u="' + u.id + '">Пройти юнит заново</button></div>';
  } else if (tab === "words") {
    out += '<div class="card"><div class="row" style="margin-bottom:12px"><button type="button" class="btn sm" data-a="act" data-act="addAll" data-u="' + u.id + '">Добавить все в словарь</button><button type="button" class="btn sun sm" data-a="act" data-act="cardsFree" data-u="' + u.id + '">Карточки</button></div>' + wordListHtml(parseWords(u)) + '<h3 style="margin-top:18px">Ключевые фразы</h3>' + phrasesHtml(u) + "</div>";
  } else if (tab === "grammar") {
    out += '<div class="card grammar">' + u.g + "</div>";
  } else {
    out += '<div class="card"><h3>Тест по грамматике</h3><p class="muted">' + u.q.length + " вопроса. Лучший результат: " + (S.quiz[u.id + ":g"] != null ? S.quiz[u.id + ":g"] + "%" : "ещё нет") + '</p><button type="button" class="btn" data-a="act" data-act="quizFree" data-u="' + u.id + '">Начать</button></div><div class="card"><h3>Итоговый тест юнита</h3><p class="muted">Грамматика и слова. Лучший результат: ' + (S.quiz[u.id + ":a"] != null ? S.quiz[u.id + ":a"] + "%" : "ещё нет") + '</p><button type="button" class="btn sun" data-a="act" data-act="quizAllFree" data-u="' + u.id + '">Начать</button></div>';
  }
  return out;
}

/* ---------- Модальное окно ---------- */
function openModal(html) { $("#modal-body").innerHTML = html; $("#modal").classList.remove("hidden"); document.body.style.overflow = "hidden"; }
function closeModal() { $("#modal").classList.add("hidden"); document.body.style.overflow = ""; C = null; Z = null; render(); }

/* ---------- Карточки-знакомство ---------- */
let C = null;
function startCards(unitId, part, day, act) {
  const u = byId(unitId), ws = parseWords(u);
  const list = part === 1 ? ws.slice(0, 6) : part === 2 ? ws.slice(6) : ws;
  C = { u, q: shuffle(list), total: list.length, known: 0, show: false, day, act };
  renderCards();
}
function renderCards() {
  if (!C) return;
  if (!C.q.length) {
    if (C.day && C.act) autoMark(C.u.id, C.day, C.act);
    openModal('<h2>Карточки пройдены!</h2><p>Ты повторила ' + wordsRu(C.total) + '. Теперь добавь их в словарь, чтобы они попали в интервальные повторения.</p><div class="row"><button type="button" class="btn" data-a="close">Готово</button></div>'); C = null; return;
  }
  const w = C.q[0];
  openModal('<div class="prog-line"><div class="bar"><i style="width:' + Math.round(C.known / C.total * 100) + '%"></i></div><span class="small">' + C.known + " / " + C.total + '</span></div><div class="card flash"><div class="big">' + esc(w.pt) + "</div>" + (C.show ? '<div class="back">' + esc(w.ru) + '</div>' : "") + '<div><a class="btn ghost sm" target="_blank" rel="noopener" href="' + forvoUrl(w.pt) + '">🔊 Forvo</a></div></div>' + (C.show ? '<div class="row"><button type="button" class="btn pink" data-a="cardagain">Ещё раз</button><button type="button" class="btn" data-a="cardknow">Знаю</button></div>' : '<button type="button" class="btn sun" data-a="cardshow">Показать перевод</button>'));
}

/* ---------- Тесты ---------- */
let Z = null;
function mixQ(q) { const c = q.opts[q.ans], o = shuffle(q.opts); return { q: q.q, opts: o, ans: o.indexOf(c) }; }
function wordQs(u, count) {
  const ws = parseWords(u);
  return shuffle(ws).slice(0, count).map((w, i) => {
    const pool = shuffle(ws.filter(x => x !== w)).slice(0, 3);
    return i % 2 === 0 ? { q: "Что значит «" + w.pt + "»?", opts: [w.ru].concat(pool.map(x => x.ru)), ans: 0 } : { q: "Как по-португальски: «" + w.ru + "»?", opts: [w.pt].concat(pool.map(x => x.pt)), ans: 0 };
  });
}
function startQuiz(unitId, all, day, act) {
  const u = byId(unitId);
  let qs = u.q.map(q => ({ q: q[0], opts: q[1].slice(), ans: q[2] }));
  if (all) qs = qs.concat(wordQs(u, 8));
  Z = { u, all, qs: shuffle(qs).map(mixQ), i: 0, score: 0, picked: null, day, act };
  renderQuiz();
}
function renderQuiz() {
  if (!Z) return;
  if (Z.i >= Z.qs.length) {
    const pct = Math.round(Z.score / Z.qs.length * 100), k = Z.u.id + (Z.all ? ":a" : ":g");
    if (S.quiz[k] == null || pct > S.quiz[k]) S.quiz[k] = pct;
    logDay(today()).quiz = (logDay(today()).quiz || 0) + 1;
    save();
    if (Z.day && Z.act) autoMark(Z.u.id, Z.day, Z.act);
    const msg = pct === 100 ? "Без единой ошибки! Это сильный результат." : pct >= 70 ? "Хороший результат. Ошибки покажут, что повторить." : "Ничего страшного. Перечитай грамматику и пройди тест снова, так запоминается лучше.";
    openModal('<h2>Результат: ' + pct + '%</h2><p>Правильных ответов: ' + Z.score + " из " + Z.qs.length + ".</p><p>" + msg + '</p><div class="row"><button type="button" class="btn" data-a="quizretry">Ещё раз</button><button type="button" class="btn ghost" data-a="close">Закрыть</button></div>');
    if (pct === 100) confetti();
    return;
  }
  const q = Z.qs[Z.i];
  openModal('<div class="prog-line"><div class="bar"><i style="width:' + Math.round(Z.i / Z.qs.length * 100) + '%"></i></div><span class="small">' + (Z.i + 1) + " / " + Z.qs.length + '</span></div><div class="qtext">' + esc(q.q) + "</div>" + q.opts.map((o, i) => {
    let cls = "opt"; if (Z.picked != null) { if (i === q.ans) cls += " right"; else if (i === Z.picked) cls += " wrong"; }
    return '<button type="button" class="' + cls + '" data-a="pick" data-i="' + i + '"' + (Z.picked != null ? " disabled" : "") + ">" + esc(o) + "</button>";
  }).join("") + (Z.picked != null ? '<div class="row" style="margin-top:10px"><span class="verdict ' + (Z.picked === q.ans ? "ok" : "no") + '">' + (Z.picked === q.ans ? "Верно!" : "Правильный ответ: " + esc(q.opts[q.ans])) + '</span><button type="button" class="btn" data-a="qnext">Дальше</button></div>' : ""));
}

/* ---------- Автоотметка заданий ---------- */
function autoMark(unitId, n, act) {
  const d = DAYS[n - 1]; if (!d) return;
  const acts = act === "cardsFree" || act === "quizFree" ? [] : [act];
  for (const a of acts) {
    const i = d.tasks.findIndex((t, idx) => t.act === a && !isDone(unitId, n, idx));
    if (i >= 0) { setTask(unitId, n, i, true); }
  }
}
function setTask(unitId, n, i, val) {
  const u = byId(unitId), k = taskKey(unitId, n, i), was = !!S.done[k];
  if (val === was) return;
  if (val) S.done[k] = today(); else delete S.done[k];
  save();
  if (val && dayDone(u, n)) {
    confetti();
    toast(unitDone(u) ? "Юнит пройден! Ты огромная молодец 🎉" : "День " + n + " завершён! +20 XP");
  }
  checkBadges();
}

/* ---------- Страница: Словарь ---------- */
function allTags() { const s = new Set(UNITS.map(u => u.t)); S.words.forEach(w => w.tag && s.add(w.tag)); return Array.from(s); }
function pageDict() {
  const learned = S.words.filter(w => (w.ivl || 0) >= 21).length;
  return '<h1>Мой словарь</h1><p class="muted">Здесь живут все твои слова. Добавляй сама: чем больше своих примеров, тем лучше запоминание.</p>' +
    '<div class="stats"><div class="stat"><b>' + S.words.length + '</b>всего слов</div><div class="stat"><b>' + S.words.filter(w => !w.last).length + '</b>новых</div><div class="stat"><b>' + learned + '</b>в долгой памяти</div><div class="stat"><b>' + dueCount() + '</b>на повторение</div></div>' +
    '<div class="card"><h2 id="wf-title">Добавить слово</h2><form id="wf" autocomplete="off"><input type="hidden" id="wid"><div class="formgrid">' +
    '<div><label for="wpt">По-португальски</label><input type="text" id="wpt" placeholder="a casa" required></div>' +
    '<div><label for="wru">Перевод</label><input type="text" id="wru" placeholder="дом" required></div>' +
    '<div class="full"><label for="wex">Пример (лучше свой)</label><input type="text" id="wex" placeholder="Eu moro numa casa pequena."></div>' +
    '<div><label for="wtag">Тема</label><input type="text" id="wtag" list="tags" placeholder="Например, Еда"><datalist id="tags">' + allTags().map(t => '<option value="' + esc(t) + '">').join("") + '</datalist></div>' +
    '<div><label for="wnote">Заметка (род, картинка-ассоциация)</label><input type="text" id="wnote" placeholder="женский род"></div></div>' +
    '<div class="row" style="margin-top:12px"><button type="submit" class="btn" id="wsave">Добавить</button><button type="button" class="btn ghost hidden" id="wcancel" data-a="wcancel">Отмена</button><a class="btn ghost sm" target="_blank" rel="noopener" href="https://forvo.com/languages/pt/">Открыть Forvo</a></div></form></div>' +
    '<div class="card"><div class="filters"><div><label for="fq">Поиск</label><input type="text" id="fq" placeholder="слово, перевод, пример"></div><div><label for="ftag">Тема</label><select id="ftag"><option value="">Все темы</option>' + allTags().map(t => '<option value="' + esc(t) + '">' + esc(t) + "</option>").join("") + '</select></div><div><label for="fsort">Порядок</label><select id="fsort"><option value="new">Сначала новые</option><option value="az">По алфавиту</option><option value="due">По сроку повторения</option></select></div></div><div class="small muted" style="margin-bottom:6px"><span style="color:var(--sky)">●</span> новое &nbsp; <span style="color:var(--sun)">●</span> учу &nbsp; <span style="color:var(--green)">●</span> в долгой памяти</div><div id="dlist"></div></div>' +
    '<div class="card flat"><h3>Копия словаря</h3><div class="row"><button type="button" class="btn ghost sm" data-a="exportcsv">Скачать CSV</button><button type="button" class="btn ghost sm" data-a="exportjson">Скачать JSON</button><button type="button" class="btn ghost sm" data-a="importfile">Загрузить файл</button></div><p class="muted small" style="margin-top:8px">CSV с колонками: слово, перевод, тема, пример, заметка. Подходит и для импорта в Anki.</p></div>';
}
function renderDictList() {
  const box = $("#dlist"); if (!box) return;
  const q = normalize(($("#fq") || {}).value || ""), tag = ($("#ftag") || {}).value || "", sort = ($("#fsort") || {}).value || "new";
  let list = S.words.filter(w => (!tag || w.tag === tag) && (!q || normalize([w.pt, w.ru, w.ex, w.tag, w.note].join(" ")).includes(q)));
  list = (sort === "new" ? list.slice().reverse() : list.slice()).sort((a, b) => sort === "az" ? normalize(a.pt).localeCompare(normalize(b.pt)) : sort === "due" ? (a.due || "").localeCompare(b.due || "") : (b.created || "").localeCompare(a.created || "") || 0);
  if (!list.length) { box.innerHTML = '<p class="muted">' + (S.words.length ? "Ничего не найдено." : "Пока пусто. Добавь первое слово выше или загрузи слова юнита во вкладке «Слова» курса.") + "</p>"; return; }
  box.innerHTML = list.map(w => '<div class="wcard"><span class="dot ' + wordStatus(w) + '" title="' + wordStatus(w) + '"></span><div><div class="wp">' + esc(w.pt) + ' <span style="font-family:var(--f-body);font-weight:400">— ' + esc(w.ru) + "</span></div>" + (w.ex ? '<div class="we">' + esc(w.ex) + "</div>" : "") + '<div class="wn">' + (w.tag ? '<span class="chip sky">' + esc(w.tag) + "</span> " : "") + (w.note ? esc(w.note) + " " : "") + (w.last ? "Повтор: " + esc(w.due) : "") + '</div></div><div class="acts"><a target="_blank" rel="noopener" href="' + forvoUrl(w.pt) + '" title="Послушать на Forvo">🔊</a><button type="button" data-a="wedit" data-id="' + w.id + '" title="Изменить">✎</button><button type="button" data-a="wdel" data-id="' + w.id + '" title="Удалить">🗑</button></div></div>').join("");
}
function saveWordForm() {
  const id = $("#wid").value, pt = $("#wpt").value.trim(), ru = $("#wru").value.trim();
  if (!pt || !ru) return;
  const data = { pt, ru, ex: $("#wex").value.trim(), tag: $("#wtag").value.trim(), note: $("#wnote").value.trim() };
  if (id) { const w = S.words.find(x => x.id === id); if (w) Object.assign(w, data); save(); toast("Изменения сохранены"); }
  else if (addWord(pt, ru, data)) { save(); toast("Слово добавлено"); checkBadges(); }
  else { toast("Такое слово уже есть в словаре"); return; }
  resetWordForm(); render();
}
function resetWordForm() { ["wid", "wpt", "wru", "wex", "wtag", "wnote"].forEach(i => { const e = $("#" + i); if (e) e.value = ""; }); const t = $("#wf-title"); if (t) t.textContent = "Добавить слово"; const b = $("#wsave"); if (b) b.textContent = "Добавить"; const c = $("#wcancel"); if (c) c.classList.add("hidden"); }

/* ---------- Страница: Повторение ---------- */
let R = null;
function startReview() {
  const q = buildQueue(); if (!q.length) { toast("Сейчас повторять нечего"); return; }
  R = { q: q.map(w => w.id), total: q.length, done: 0, st: [0, 0, 0, 0], show: false, typed: null, dirs: {} };
  render();
}
function curDir(id) {
  if (!R.dirs[id]) R.dirs[id] = S.settings.dir === "mixed" ? (Math.random() < .5 ? "pr" : "rp") : S.settings.dir;
  return R.dirs[id];
}
function pageReview() {
  const due = dueCount(), s = S.settings;
  if (!R) {
    return '<h1>Повторение</h1><p class="muted">Слова возвращаются через растущие паузы. Чем увереннее ты отвечаешь, тем реже слово появляется.</p><div class="card"><div class="stats" style="margin-bottom:12px"><div class="stat"><b>' + due + '</b>карточек сегодня</div><div class="stat"><b>' + S.words.filter(w => !w.last).length + '</b>новых слов в словаре</div></div>' +
      '<div class="formgrid"><div><label for="sdir">Направление</label><select id="sdir" data-a="setdir"><option value="mixed"' + (s.dir === "mixed" ? " selected" : "") + '>Вперемешку</option><option value="pr"' + (s.dir === "pr" ? " selected" : "") + '>Португальский → русский</option><option value="rp"' + (s.dir === "rp" ? " selected" : "") + '>Русский → португальский</option></select></div><div><label for="styp">Писать ответ</label><select id="styp" data-a="settyping"><option value="0"' + (!s.typing ? " selected" : "") + '>Нет, показывать ответ</option><option value="1"' + (s.typing ? " selected" : "") + '>Да, набирать на клавиатуре</option></select></div></div>' +
      '<p style="margin-top:14px">' + (due ? '<button type="button" class="btn" data-a="startreview">Начать повторение</button>' : '<span class="verdict ok">На сегодня всё. Возвращайся завтра!</span>') + '</p>' + (S.words.length ? "" : '<p class="muted">Сначала добавь слова: в курсе или в <a href="#/dict">словаре</a>.</p>') + "</div>";
  }
  if (!R.q.length) {
    const t = R.st, xp = R.total;
    const h = '<h1>Готово!</h1><div class="card"><p>Повторено: <b>' + R.total + '</b> карточек.</p><p class="muted">Снова: ' + t[0] + ", трудно: " + t[1] + ", хорошо: " + t[2] + ", легко: " + t[3] + '.</p><p>Ты сделала сегодня важное дело: повторение укрепляет память лучше, чем новое чтение.</p><div class="row"><a class="btn" href="#/today">К плану на сегодня</a><button type="button" class="btn ghost" data-a="endreview">Закрыть</button></div></div>';
    if (!R.fin) { R.fin = true; const nt = nextTarget(); if (nt) autoMark(nt.u.id, nt.n, "srs"); confetti(); }
    return h;
  }
  const w = S.words.find(x => x.id === R.q[0]);
  if (!w) { R.q.shift(); return pageReview(); }
  const dir = curDir(w.id), typing = s.typing && dir === "rp";
  let front, back = "";
  if (dir === "pr") front = '<div class="big">' + esc(w.pt) + '</div><div><a class="btn ghost sm" target="_blank" rel="noopener" href="' + forvoUrl(w.pt) + '">🔊 Forvo</a></div>';
  else front = '<div class="big">' + esc(w.ru) + '</div><div class="muted">Вспомни по-португальски</div>';
  if (typing && !R.show) front += '<div style="max-width:340px;margin:0 auto;width:100%"><input type="text" id="ans" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Напиши ответ"></div><div><button type="button" class="btn" data-a="checkans">Проверить</button></div>';
  else if (!R.show) front += '<div><button type="button" class="btn sun" data-a="reveal">Показать ответ</button></div>';
  let sug = -1;
  if (R.show) {
    back = '<div class="back"><b>' + esc(dir === "pr" ? w.ru : w.pt) + "</b>" + (dir === "rp" ? ' <a class="btn ghost sm" target="_blank" rel="noopener" href="' + forvoUrl(w.pt) + '">🔊</a>' : "") + "</div>" + (w.ex ? '<div class="ex">' + esc(w.ex) + "</div>" : "") + (w.note ? '<div class="muted small">' + esc(w.note) + "</div>" : "");
    if (R.typed) { back = '<div class="verdict ' + R.typed.res + '">' + (R.typed.res === "ok" ? "Верно!" : R.typed.res === "mid" ? "Почти: проверь знаки над буквами" : "Не совпало. Ты ввела: " + esc(R.typed.val)) + "</div>" + back; sug = R.typed.res === "ok" ? 2 : R.typed.res === "mid" ? 1 : 0; }
  }
  const labels = ["Снова", "Трудно", "Хорошо", "Легко"];
  const rate = R.show ? '<div class="rate">' + labels.map((l, i) => '<button type="button" class="r' + i + (sug === i ? " sug" : "") + '" data-a="rate" data-r="' + i + '">' + l + "<small>" + ivlLabel(nextState(w, i).ivl) + "</small></button>").join("") + "</div>" : "";
  return '<div class="prog-line"><div class="bar"><i style="width:' + Math.round(R.done / R.total * 100) + '%"></i></div><span class="small">' + R.done + " / " + R.total + '</span></div><div class="card flash">' + front + back + "</div>" + rate + '<p style="margin-top:14px"><button type="button" class="btn ghost sm" data-a="endreview">Закончить на сегодня</button></p>';
}
function checkAnswer() {
  const w = S.words.find(x => x.id === R.q[0]), val = ($("#ans") || {}).value || "";
  const alts = w.pt.split("/").map(s => s.trim());
  let res = "no";
  if (alts.some(a => a.toLowerCase() === val.trim().toLowerCase())) res = "ok";
  else if (alts.some(a => normalize(a) === normalize(val)) && val.trim()) res = "mid";
  R.typed = { val, res }; R.show = true; render();
}

/* ---------- Страница: Прогресс ---------- */
function pageProgress() {
  const t = totals(), act = activity(), st = streaks(act), xi = xpInfo(t), td = today();
  let out = '<h1>Мой прогресс</h1>';
  out += '<div class="card"><div class="row between"><div><h2 style="margin:0">Уровень ' + xi.lvl + ", " + esc(xi.title) + '</h2><div class="muted small">' + xi.xp + " XP, до следующего уровня " + (xi.next - xi.xp) + '</div></div></div><div class="bar sun" style="margin-top:10px"><i style="width:' + xi.pct + '%"></i></div></div>';
  out += '<div class="stats"><div class="stat"><b>' + st.cur + '</b>дней подряд</div><div class="stat"><b>' + st.best + '</b>лучшая серия</div><div class="stat"><b>' + st.days + '</b>дней занятий</div><div class="stat"><b>' + Math.round(t.mins / 6) / 10 + '</b>часов занятий</div><div class="stat"><b>' + t.words + '</b>слов в словаре</div><div class="stat"><b>' + t.rev + '</b>повторений</div></div>';
  out += '<div class="card"><h2>Путь по уровням</h2>' + ["A1", "A2", "B1"].map(lv => { const us = UNITS.filter(u => u.lvl === lv), pct = Math.round(us.reduce((a, u) => a + unitPct(u), 0) / us.length); return '<div style="margin-bottom:12px"><div class="row between"><b>' + lv + " " + esc(LEVELS[lv].title) + '</b><span class="muted small">' + t.lv[lv] + " из " + us.length + " юнитов, " + pct + '%</span></div><div class="bar"><i style="width:' + pct + '%"></i></div></div>'; }).join("") + '<p class="muted small">Это прогресс по программе курса. Он показывает, сколько заданий ты прошла, а не результат официального экзамена.</p></div>';
  const mon = addDays(td, -((parseYmd(td).getDay() + 6) % 7)), start = addDays(mon, -15 * 7);
  let cells = "";
  for (let w = 0; w < 16; w++) for (let d = 0; d < 7; d++) {
    const dt = addDays(start, w * 7 + d), a = act[dt], v = a ? a.min + a.rev * .3 + a.add * .5 : 0;
    const l = v === 0 ? 0 : v < 8 ? 1 : v < 16 ? 2 : v < 30 ? 3 : 4;
    cells += '<i class="l' + l + (dt > td ? " fut" : "") + (dt === td ? " today" : "") + '" title="' + dt + (a ? ": " + a.min + " мин, повторений " + a.rev : "") + '"></i>';
  }
  out += '<div class="card"><h2>Календарь занятий</h2><div class="heat" role="img" aria-label="Календарь занятий за 16 недель">' + cells + '</div><p class="muted small">Каждый квадрат — день. Чем темнее, тем больше ты сделала. Пропуск ничего не обнуляет: возвращайся в любой момент.</p></div>';
  out += '<div class="card"><h2>Достижения</h2><div class="badges">' + BADGES.map(b => '<div class="bdg' + (S.badges[b.id] ? "" : " lock") + '"><span class="e">' + b.e + "</span><b>" + esc(b.n) + '</b><div class="small muted">' + esc(b.d) + "</div></div>").join("") + "</div></div>";
  out += '<div class="card"><h2>Дневник</h2>' + (S.diary.length ? S.diary.slice().reverse().map((e, i) => '<div class="diary-item"><div class="small muted">' + esc(e.date) + (e.unit ? ", " + esc(e.unit) : "") + ' <button type="button" class="btn ghost sm" data-a="deldiary" data-id="' + e.id + '">Удалить</button></div><p>' + esc(e.text) + "</p></div>").join("") : '<p class="muted">Тексты из заданий «Пишем и говорим» сохраняются здесь. Через месяц перечитай первую запись и увидишь рост.</p>') + "</div>";
  return out;
}

/* ---------- Страница: Гид ---------- */
function pageGuide(r) {
  const tab = r.a || "about";
  let out = '<h1>Гид по обучению</h1><div class="tabs">' + [["about", "О курсе"], ["resources", "Ресурсы"], ["methods", "Как запоминать"]].map(x => '<a href="#/guide' + (x[0] === "about" ? "" : "/" + x[0]) + '"' + (tab === x[0] ? ' aria-current="true"' : "") + ">" + x[1] + "</a>").join("") + "</div>";
  if (tab === "resources") {
    out += '<p class="muted">Что открывать и зачем. Произношение слов слушай на Forvo, остальное по необходимости.</p>' + RESOURCES.map(g => '<div class="card"><h2>' + esc(g.group) + "</h2>" + g.items.map(it => '<div class="res-item"><b><a href="' + esc(it.u) + '"' + (it.u.charAt(0) === "#" ? "" : ' target="_blank" rel="noopener"') + ">" + esc(it.n) + "</a></b><div>" + esc(it.d) + '</div><div class="small muted">Для чего: ' + esc(it.use) + "</div></div>").join("") + "</div>").join("");
  } else if (tab === "methods") {
    out += '<p class="muted">Как превратить слово из «понятно» в «могу сказать». Выбери 3–4 приёма и используй каждый день.</p><div class="card">' + METHODS.map(m => '<div class="method"><h3>' + esc(m.t) + "</h3><p>" + esc(m.w) + "</p><p><b>Как делать:</b> " + esc(m.h) + '</p><div class="small muted">Где на сайте: ' + esc(m.s) + "</div></div>").join("") + '</div><div class="card"><h2>Как сохранять материалы</h2><ul>' + SAVE_TIPS.map(s => "<li>" + esc(s) + "</li>").join("") + "</ul></div>";
  } else {
    const total = UNITS.length;
    out += '<div class="card"><h2>Как устроен курс</h2><p>' + total + ' юнитов по 7 дней, каждый день около 30 минут. Уровни: A1 — ' + UNITS.filter(u => u.lvl === "A1").length + ' юнитов, A2 — ' + UNITS.filter(u => u.lvl === "A2").length + ', B1 — ' + UNITS.filter(u => u.lvl === "B1").length + '. Всё на бразильском варианте португальского, как в твоём самоучителе.</p><p>В каждом юните: 12 слов, 4 ключевые фразы, короткая грамматика, тест, видео по теме, письменное задание.</p></div>' +
      '<div class="card"><h2>Формула дня на 30 минут</h2><ul><li>Около 10 минут: новое (слова или грамматика).</li><li>Около 10 минут: практика (карточки, тест, письмо).</li><li>5 минут: повторение слов.</li><li>5 минут: слушание или говорение вслух.</li></ul><p>Нет сил или времени? Сделай только повторение. Это 5 минут, и серия сохранится.</p></div>' +
      '<div class="card"><h2>Честно о сроках</h2><p>Программа рассчитана примерно на ' + Math.ceil(total * 7 / 30) + ' месяцев при ежедневных занятиях. Обычно говорят, что для уровня B1 нужно порядка 300–400 часов занятий. По этому плану это около 85 часов заданий, так что курс — это опорный каркас. Чтобы дойти до B1, продолжай слушать, читать и говорить: ресурсы подобраны в разделе «Ресурсы».</p><p>Если пройдёшь юниты, можно повторить любой из них заново с кнопки «Пройти юнит заново».</p></div>' +
      '<div class="card"><h2>Где хранятся данные</h2><p>Всё сохраняется в твоём браузере на этом устройстве. Никуда не отправляется. Чтобы перенести на телефон или другой компьютер, скачай копию данных в настройках и загрузи её там же. Раз в неделю делай копию.</p><p>Свои юниты и слова курса можно править в файле <code>data.js</code>.</p></div>';
  }
  return out;
}

/* ---------- Настройки ---------- */
function openSettings() {
  const s = S.settings;
  openModal('<h2>Настройки</h2><div class="stack"><div><label for="s-name">Как тебя зовут</label><input type="text" id="s-name" value="' + esc(S.name) + '"></div>' +
    '<div class="formgrid"><div><label for="s-goal">Цель в день, минут</label><input type="number" id="s-goal" min="5" max="180" value="' + s.goal + '"></div><div><label for="s-new">Новых слов в повторении в день</label><input type="number" id="s-new" min="0" max="100" value="' + s.newPerDay + '"></div></div>' +
    '<div><label for="s-time">Время напоминания</label><input type="time" id="s-time" value="' + esc(s.remind) + '"></div>' +
    '<div class="row"><button type="button" class="btn sun sm" data-a="ics">Скачать напоминание для календаря</button><button type="button" class="btn ghost sm" data-a="notify">' + (s.notify ? "Выключить уведомления" : "Включить уведомления в браузере") + '</button></div>' +
    '<p class="muted small">Календарь (файл .ics) напомнит каждый день, даже когда сайт закрыт: открой файл, и событие появится в Google Календаре, Apple Календаре или Outlook. Уведомления в браузере работают, пока вкладка с сайтом открыта.</p>' +
    '<hr style="border:0;border-top:1.5px dashed var(--line)"><div class="row"><button type="button" class="btn ghost sm" data-a="exportall">Скачать копию данных</button><button type="button" class="btn ghost sm" data-a="importfile">Загрузить копию или словарь</button></div>' +
    (memOnly ? '<p class="verdict no">Браузер не даёт сохранять данные на этой странице. Скачивай копию после занятий.</p>' : "") +
    '<div class="row between"><button type="button" class="btn pink sm" data-a="resetall">Стереть все данные</button><button type="button" class="btn" data-a="savesettings">Сохранить</button></div></div>');
}
function saveSettings() {
  S.name = ($("#s-name").value || "").trim().slice(0, 30);
  S.settings.goal = Math.max(5, Math.min(180, +$("#s-goal").value || 30));
  S.settings.newPerDay = Math.max(0, Math.min(100, +$("#s-new").value || 0));
  S.settings.remind = $("#s-time").value || "20:00";
  save(); closeModal(); toast("Настройки сохранены");
}

/* ---------- Файлы: экспорт и импорт ---------- */
function download(name, text, type) {
  const a = document.createElement("a"), b = new Blob([text], { type: type || "text/plain;charset=utf-8" });
  a.href = URL.createObjectURL(b); a.download = name; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}
const csvCell = v => '"' + String(v == null ? "" : v).replace(/"/g, '""') + '"';
function exportCSV() { download("slovar-portugues.csv", "\ufeff" + ["pt,ru,tag,example,note"].concat(S.words.map(w => [w.pt, w.ru, w.tag, w.ex, w.note].map(csvCell).join(","))).join("\r\n"), "text/csv;charset=utf-8"); }
function parseCSV(txt) {
  txt = txt.replace(/^\ufeff/, "");
  const first = txt.split(/\r?\n/)[0] || "";
  const delim = [",", ";", "\t"].map(d => [d, first.split(d).length]).sort((a, b) => b[1] - a[1])[0][0];
  const rows = []; let row = [], cur = "", q = false;
  for (let i = 0; i < txt.length; i++) {
    const c = txt[i];
    if (q) { if (c === '"') { if (txt[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
    else if (c === '"') q = true;
    else if (c === delim) { row.push(cur); cur = ""; }
    else if (c === "\n") { row.push(cur); rows.push(row); row = []; cur = ""; }
    else if (c !== "\r") cur += c;
  }
  if (cur || row.length) { row.push(cur); rows.push(row); }
  return rows.filter(r => r.some(x => x.trim()));
}
function importText(name, txt) {
  try {
    if (/\.json$/i.test(name) || txt.trim()[0] === "{" || txt.trim()[0] === "[") {
      const j = JSON.parse(txt);
      if (j && !Array.isArray(j) && (j.done || j.settings)) {
        if (!confirm("Заменить все текущие данные копией из файла?")) return;
        S = fix(j); save(); toast("Копия загружена"); render(); return;
      }
      const arr = Array.isArray(j) ? j : j.words || []; let c = 0;
      arr.forEach(w => { if (addWord(w.pt || w.word, w.ru || w.translation, { tag: w.tag, ex: w.ex || w.example, note: w.note })) c++; });
      save(); toast("Добавлено слов: " + c); render(); return;
    }
    const rows = parseCSV(txt); let c = 0;
    rows.forEach((r, i) => { if (i === 0 && /^(pt|слово|португальский|word)$/i.test((r[0] || "").trim())) return; if (addWord(r[0], r[1], { tag: r[2], ex: r[3], note: r[4] })) c++; });
    save(); toast("Добавлено слов: " + c); render();
  } catch (e) { toast("Не получилось прочитать файл"); console.error(e); }
}
function pickFile() {
  const i = document.createElement("input"); i.type = "file"; i.accept = ".csv,.json,.txt,text/csv,application/json";
  i.onchange = () => { const f = i.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => importText(f.name, String(r.result)); r.readAsText(f); };
  i.click();
}
function makeICS() {
  const [hh, mm] = (S.settings.remind || "20:00").split(":"), t = today().replace(/-/g, "");
  const tot = (+hh * 60 + +mm + 30) % 1440, end = pad(Math.floor(tot / 60)) + pad(tot % 60);
  const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const url = location.href.split("#")[0];
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Portugues//RU", "CALSCALE:GREGORIAN", "BEGIN:VEVENT", "UID:ptbr-" + Date.now() + "@portugues", "DTSTAMP:" + stamp, "DTSTART:" + t + "T" + hh + mm + "00", "DTEND:" + t + "T" + end + "00", "RRULE:FREQ=DAILY", "SUMMARY:Португальский: 30 минут и повторение слов", "DESCRIPTION:Открой сайт и пройди план на сегодня. " + url, "BEGIN:VALARM", "TRIGGER:PT0M", "ACTION:DISPLAY", "DESCRIPTION:Время учить португальский", "END:VALARM", "END:VEVENT", "END:VCALENDAR"].join("\r\n");
}
function notifyNow() {
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  const n = dueCount();
  try { new Notification("Português", { body: n ? "Ждут повторения: " + n + ". Заходи на 5 минут." : "Время для 30 минут португальского." }); } catch (e) { /* ignore */ }
}
function tickReminder() {
  if (!S.settings.notify) return;
  const now = new Date(), hm = pad(now.getHours()) + ":" + pad(now.getMinutes()), l = logDay(today());
  if (hm === S.settings.remind && !l.notified) { l.notified = 1; save(); notifyNow(); }
}

/* ---------- События ---------- */
document.addEventListener("click", e => {
  const el = e.target.closest("[data-a]"); if (!el) return;
  const a = el.dataset.a, u = el.dataset.u, d = +el.dataset.d;
  switch (a) {
    case "close": closeModal(); break;
    case "nextchat": chatOff++; { const c = $(".chat"); if (c) c.outerHTML = chatCard(); } break;
    case "settings": openSettings(); break;
    case "savesettings": saveSettings(); break;
    case "toggle": break; // обрабатывается в change
    case "focuswr": { const t = $("#wr"); if (t) { t.focus(); t.scrollIntoView({ block: "center" }); } break; }
    case "savewr": {
      const t = $("#wr"); if (!t || !t.value.trim()) { toast("Сначала напиши текст"); break; }
      S.diary.push({ id: uid(), date: today(), unit: byId(u).t, text: t.value.trim() }); save(); t.value = "";
      autoMark(u, d, "write"); toast("Сохранено в дневник"); checkBadges(); render(); break;
    }
    case "act": {
      const act = el.dataset.act;
      if (act === "add1" || act === "add2" || act === "addAll") { const c = addUnitWords(u, act === "add1" ? 1 : act === "add2" ? 2 : 0); toast(c ? "Добавлено слов: " + c : "Эти слова уже в словаре"); if (d) autoMark(u, d, act); checkBadges(); render(); }
      else if (act === "cards1") startCards(u, 1, d, act);
      else if (act === "cards2") startCards(u, 2, d, act);
      else if (act === "cardsAll") startCards(u, 0, d, act);
      else if (act === "cardsFree") startCards(u, 0);
      else if (act === "quiz") startQuiz(u, false, d, act);
      else if (act === "quizAll") startQuiz(u, true, d, act);
      else if (act === "quizFree") startQuiz(u, false);
      else if (act === "quizAllFree") startQuiz(u, true);
      break;
    }
    case "addone": { if (addWord(el.dataset.pt, el.dataset.ru, { tag: el.dataset.tag })) { save(); toast("Добавлено в словарь"); checkBadges(); } else toast("Уже есть в словаре"); break; }
    case "resetunit": if (confirm("Сбросить отметки этого юнита и пройти заново?")) { for (const k of Object.keys(S.done)) if (k.indexOf(u + ".") === 0) delete S.done[k]; save(); render(); } break;
    case "cardshow": if (C) { C.show = true; renderCards(); } break;
    case "cardknow": if (C) { C.q.shift(); C.known++; C.show = false; renderCards(); } break;
    case "cardagain": if (C) { C.q.push(C.q.shift()); C.show = false; renderCards(); } break;
    case "pick": if (Z && Z.picked == null) { Z.picked = +el.dataset.i; if (Z.picked === Z.qs[Z.i].ans) Z.score++; renderQuiz(); } break;
    case "qnext": if (Z) { Z.i++; Z.picked = null; renderQuiz(); } break;
    case "quizretry": if (Z) startQuiz(Z.u.id, Z.all, Z.day, Z.act); break;
    case "wedit": {
      const w = S.words.find(x => x.id === el.dataset.id); if (!w) break;
      $("#wid").value = w.id; $("#wpt").value = w.pt; $("#wru").value = w.ru; $("#wex").value = w.ex || ""; $("#wtag").value = w.tag || ""; $("#wnote").value = w.note || "";
      $("#wf-title").textContent = "Изменить слово"; $("#wsave").textContent = "Сохранить"; $("#wcancel").classList.remove("hidden"); $("#wpt").focus(); window.scrollTo({ top: 0, behavior: "smooth" }); break;
    }
    case "wcancel": resetWordForm(); break;
    case "wdel": if (confirm("Удалить это слово из словаря?")) { S.words = S.words.filter(x => x.id !== el.dataset.id); save(); render(); } break;
    case "exportcsv": exportCSV(); break;
    case "exportjson": download("slovar-portugues.json", JSON.stringify(S.words, null, 2), "application/json"); break;
    case "exportall": download("portugues-kopiya-" + today() + ".json", JSON.stringify(S, null, 2), "application/json"); break;
    case "importfile": pickFile(); break;
    case "ics": download("portugues-napominanie.ics", makeICS(), "text/calendar;charset=utf-8"); toast("Открой файл, чтобы добавить напоминание в календарь"); break;
    case "notify":
      if (S.settings.notify) { S.settings.notify = false; save(); openSettings(); break; }
      if (!("Notification" in window)) { toast("Этот браузер не поддерживает уведомления"); break; }
      Notification.requestPermission().then(p => { if (p === "granted") { S.settings.notify = true; save(); toast("Уведомления включены"); notifyNow(); openSettings(); } else toast("Разрешение не получено"); });
      break;
    case "resetall": if (confirm("Стереть весь прогресс и словарь? Это нельзя отменить.")) { S = DEFAULT(); save(); closeModal(); toast("Данные стёрты"); } break;
    case "startreview": startReview(); break;
    case "endreview": R = null; render(); break;
    case "reveal": R.show = true; R.typed = null; render(); break;
    case "checkans": checkAnswer(); break;
    case "rate": {
      const w = S.words.find(x => x.id === R.q[0]), r = +el.dataset.r; R.q.shift();
      applyRating(w, r); R.st[r]++;
      if (r === 0) R.q.push(w.id); else R.done++;
      R.show = false; R.typed = null; delete R.dirs[w.id]; checkBadges(); render(); break;
    }
  }
});
document.addEventListener("change", e => {
  const el = e.target.closest("[data-a]"); if (!el) return;
  if (el.dataset.a === "toggle") { setTask(el.dataset.u, +el.dataset.d, +el.dataset.i, el.checked); render(); }
  else if (el.dataset.a === "setdir") { S.settings.dir = el.value; save(); }
  else if (el.dataset.a === "settyping") { S.settings.typing = el.value === "1"; save(); }
});
document.addEventListener("submit", e => { if (e.target.id === "wf") { e.preventDefault(); saveWordForm(); } });
document.addEventListener("input", e => { if (["fq", "ftag", "fsort"].includes(e.target.id)) renderDictList(); });
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !$("#modal").classList.contains("hidden")) closeModal();
  if (e.key === "Enter" && e.target.id === "ans") { e.preventDefault(); checkAnswer(); }
});
$("#modal").addEventListener("click", e => { if (e.target.id === "modal") closeModal(); });
window.addEventListener("hashchange", () => { R = R && parseHash().page === "review" ? R : null; render(); window.scrollTo(0, 0); });

/* ---------- Старт ---------- */
if (!location.hash) location.hash = "#/today";
render();
setTimeout(welcome, 400);
setInterval(tickReminder, 30000);
if (S.settings.notify && "Notification" in window && Notification.permission === "granted") {
  const l = logDay(today());
  if (!l.notified && dueCount() > 0) { l.notified = 1; save(); setTimeout(notifyNow, 1500); }
}
setTimeout(checkBadges, 300);
})();
