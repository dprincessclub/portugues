/* ============================================================
   data.js — программа курса, ресурсы и методики.
   Здесь можно редактировать и добавлять своё: слова, тесты, юниты.
   Формат слов:  "португальский=русский; следующее слово=перевод"
   Формат теста: [вопрос, [варианты], номер_правильного_с_нуля]
   ============================================================ */

const LEVELS = {
  A1: { name: "A1", title: "Старт с нуля", desc: "Звуки, знакомство, семья, еда, распорядок дня. К концу уровня ты сможешь представиться, заказать еду и рассказать о своём дне." },
  A2: { name: "A2", title: "Повседневное общение", desc: "Описание людей, покупки, город, прошедшее время, здоровье, чувства. Ты сможешь поддержать простой разговор и написать короткое сообщение." },
  B1: { name: "B1", title: "Уверенный разговор", desc: "Поездки, планы, сослагательное наклонение, мнения, работа, культура. Ты сможешь объяснить свою точку зрения и понимать медленную речь." }
};

const UNITS = [
/* ======================= A1 ======================= */
{
  id: "u1", lvl: "A1", t: "Приветствия и звуки", pt: "Cumprimentos e sons",
  goal: "Читать португальские слова и здороваться в любое время суток.",
  w: "oi=привет; olá=здравствуйте; bom dia=доброе утро; boa tarde=добрый день; boa noite=добрый вечер, спокойной ночи; tchau=пока; até logo=до скорого; obrigado / obrigada=спасибо (говорит мужчина / женщина); por favor=пожалуйста (в просьбе); desculpa=извини; prazer=приятно познакомиться; tudo bem?=как дела? всё хорошо?",
  ph: [["Oi, tudo bem?","Привет, как дела?"],["Tudo bem, e você?","Хорошо, а ты?"],["Muito prazer!","Очень приятно!"],["De nada.","Не за что."]],
  g: `<p><b>Ударение</b> обычно падает на предпоследний слог. Если над буквой есть значок (á, ê, ô), ударение на ней.</p>
<ul>
<li><b>ã, õ</b> — носовые звуки: <i>pão</i>, <i>mãe</i>, <i>não</i>.</li>
<li><b>lh</b> читается как мягкое «ль»: <i>filho</i>. <b>nh</b> — как «нь»: <i>banho</i>.</li>
<li><b>r</b> в начале слова и <b>rr</b> звучат как хрипловатое «х»: <i>rua</i>, <i>carro</i>. Между гласными <b>r</b> — лёгкое «р».</li>
<li>В бразильском варианте <b>di</b> и <b>ti</b> звучат как «джи» и «чи»: <i>dia</i>, <i>tio</i>.</li>
<li><b>s</b> между гласными — «з»: <i>casa</i>. <b>x</b> часто «ш»: <i>xícara</i>. <b>ç</b> — «с».</li>
</ul>
<p><b>Obrigado / obrigada.</b> Мужчина говорит <i>obrigado</i>, женщина — <i>obrigada</i>.</p>`,
  q: [["Женщина благодарит. Что она скажет?",["obrigado","obrigada","obrigade"],1],["Что значит «tchau»?",["здравствуйте","спасибо","пока"],2],["Как читается «lh» в слове filho?",["мягкое «ль»","«лх»","твёрдое «л»"],0],["Что вы скажете утром?",["Boa noite","Bom dia","Até logo"],1]],
  wr: "Напиши мини-диалог из 4–6 реплик: утро, вы встречаете нового знакомого. Используй bom dia, tudo bem, prazer.",
  yt: "cumprimentos em português brasileiro iniciantes"
},
{
  id: "u2", lvl: "A1", t: "Знакомство и глагол SER", pt: "Apresentações",
  goal: "Назвать своё имя, страну, профессию и спросить то же у собеседника.",
  w: "nome=имя; sobrenome=фамилия; país=страна; cidade=город; profissão=профессия; amigo / amiga=друг / подруга; estudante=студент / студентка; brasileiro / brasileira=бразилец / бразильянка; russo / russa=русский / русская; solteiro / solteira=не женат / не замужем; de onde=откуда; também=тоже",
  ph: [["Qual é o seu nome?","Как тебя зовут?"],["Meu nome é Anna.","Меня зовут Анна."],["De onde você é?","Откуда ты?"],["Eu sou da Rússia.","Я из России."]],
  g: `<p><b>SER</b> — «быть» для постоянных признаков: имя, национальность, профессия, характер.</p>
<table class="conj"><tr><td>eu <b>sou</b></td><td>nós <b>somos</b></td></tr><tr><td>você / ele / ela <b>é</b></td><td>vocês / eles / elas <b>são</b></td></tr></table>
<p>Примеры: <i>Eu sou russa.</i> <i>Ela é estudante.</i> <i>Nós somos amigos.</i></p>
<p>Вопросы: <i>Qual é o seu nome?</i> — <i>Meu nome é…</i> / <i>De onde você é?</i> — <i>Eu sou de…</i></p>
<p>Местоимение <b>você</b> («ты» или «вы») в Бразилии используют почти везде. В разговоре часто говорят <b>a gente</b> вместо «nós».</p>`,
  q: [["Eu ___ russa.",["sou","é","são"],0],["Ela ___ estudante.",["sou","é","somos"],1],["Nós ___ amigos.",["somos","são","é"],0],["Как спросить «откуда ты?»",["Onde você está?","De onde você é?","Quem é você?"],1]],
  wr: "Напиши 5 предложений о себе: имя, откуда ты, профессия. Начни с «Meu nome é…» и «Eu sou…».",
  yt: "apresentação pessoal português brasileiro iniciante"
},
{
  id: "u3", lvl: "A1", t: "Числа и возраст", pt: "Números e idade",
  goal: "Считать до ста, назвать возраст и телефон.",
  w: "um / uma=один / одна; dois / duas=два / две; três=три; quatro=четыре; cinco=пять; seis=шесть; sete=семь; oito=восемь; nove=девять; dez=десять; vinte=двадцать; cem=сто",
  ph: [["Quantos anos você tem?","Сколько тебе лет?"],["Eu tenho vinte e cinco anos.","Мне двадцать пять лет."],["Qual é o seu telefone?","Какой у тебя телефон?"],["Mais devagar, por favor.","Помедленнее, пожалуйста."]],
  g: `<p><b>11–19:</b> onze, doze, treze, catorze, quinze, dezesseis, dezessete, dezoito, dezenove.</p>
<p><b>Десятки:</b> vinte, trinta, quarenta, cinquenta, sessenta, setenta, oitenta, noventa, cem.</p>
<p>Составные числа соединяются через <b>e</b>: <i>vinte e um</i> (21), <i>trinta e cinco</i> (35).</p>
<p><b>Возраст</b> в португальском выражается глаголом <b>TER</b> («иметь»), а не «быть»: <i>Eu tenho 25 anos.</i></p>
<p>Единицы и двойки меняются по роду: <i>um amigo / uma amiga</i>, <i>dois amigos / duas amigas</i>.</p>`,
  q: [["Как сказать «мне 25 лет»?",["Eu sou vinte e cinco anos","Eu tenho vinte e cinco anos","Eu estou vinte e cinco anos"],1],["Какое число «quinze»?",["14","15","50"],1],["___ amigas (две подруги)",["dois","duas","dos"],1],["Как будет «тридцать»?",["três","treze","trinta"],2]],
  wr: "Напиши, сколько тебе лет, сколько лет трём близким людям, и продиктуй свой номер телефона словами.",
  yt: "números em português brasileiro"
},
{
  id: "u4", lvl: "A1", t: "Артикли и существительные", pt: "Artigos e substantivos",
  goal: "Различать род существительных и правильно ставить артикль.",
  w: "casa=дом; livro=книга; mesa=стол; carro=машина; cadeira=стул; janela=окно; porta=дверь; gato=кот; cachorro=собака; água=вода; café=кофе; pão=хлеб",
  ph: [["Isto é uma casa.","Это дом."],["O livro está na mesa.","Книга на столе."],["Eu quero um café e um pão.","Я хочу кофе и хлеб."],["Tem água?","Есть вода?"]],
  g: `<p>Существительные бывают <b>мужского</b> (обычно на -o) и <b>женского</b> (обычно на -a) рода. Учи слово сразу с артиклем: <i>o livro</i>, <i>a casa</i>.</p>
<table class="conj"><tr><td></td><td>муж.</td><td>жен.</td></tr><tr><td>определённый</td><td>o / os</td><td>a / as</td></tr><tr><td>неопределённый</td><td>um / uns</td><td>uma / umas</td></tr></table>
<p><b>Множественное число:</b> добавляем -s: <i>livro → livros</i>. Слова на -ão чаще дают -ões / -ães: <i>pão → pães</i>. На -l: <i>animal → animais</i>. На -r и -z: <i>flor → flores</i>.</p>
<p><b>Слияние с предлогами:</b> em + o = <b>no</b>, em + a = <b>na</b>, de + o = <b>do</b>, de + a = <b>da</b>. <i>O livro está <u>na</u> mesa.</i></p>
<p>Исключения по роду: <i>o dia</i>, <i>o mapa</i>, <i>a mão</i>.</p>`,
  q: [["___ casa (дом)",["o","a","um"],1],["Множественное число от «livro»",["livros","livroes","livras"],0],["Множественное число от «pão»",["pãos","pães","pões"],1],["«no» — это сочетание…",["em + o","de + o","a + o"],0]],
  wr: "Опиши свою комнату: что в ней есть? Используй o / a / um / uma: «Na minha casa tem uma mesa…».",
  yt: "artigos definidos indefinidos português brasileiro para estrangeiros"
},
{
  id: "u5", lvl: "A1", t: "Семья и глагол TER", pt: "Família",
  goal: "Рассказать о семье и сказать, что у тебя есть.",
  w: "família=семья; pai=отец; mãe=мать; irmão=брат; irmã=сестра; filho / filha=сын / дочь; avô=дедушка; avó=бабушка; marido=муж; esposa=жена; namorado / namorada=парень / девушка (в отношениях); tio / tia=дядя / тётя",
  ph: [["Eu tenho uma irmã.","У меня есть сестра."],["Minha família é grande.","Моя семья большая."],["Ele é meu namorado.","Он мой парень."],["Você tem filhos?","У тебя есть дети?"]],
  g: `<p><b>TER</b> — «иметь», «у меня есть».</p>
<table class="conj"><tr><td>eu <b>tenho</b></td><td>nós <b>temos</b></td></tr><tr><td>você / ele / ela <b>tem</b></td><td>vocês / eles / elas <b>têm</b></td></tr></table>
<p>Обрати внимание: <i>tem</i> (ед.ч.) и <i>têm</i> (мн.ч., с «шляпкой») звучат по-разному.</p>
<p><b>Притяжательные:</b> <i>meu / minha</i> (мой / моя), <i>seu / sua</i> (твой, ваш), <i>nosso / nossa</i> (наш). Они согласуются с предметом, а не с владельцем: <i>meu pai</i>, <i>minha mãe</i>.</p>
<p>Чтобы уточнить «его» или «её», говорят <b>dele</b> / <b>dela</b>: <i>o irmão dela</i>.</p>`,
  q: [["___ mãe (моя мама)",["meu","minha","meus"],1],["Ela ___ dois filhos.",["tem","tenho","têm"],0],["Elas ___ um gato.",["tem","têm","temos"],1],["Как сказать «его брат»?",["o irmão dele","o irmão eu","o irmão ele"],0]],
  wr: "Расскажи о своей семье (5 предложений): кто в ней, сколько им лет. Используй tenho, meu, minha.",
  yt: "família em português brasileiro vocabulário"
},
{
  id: "u6", lvl: "A1", t: "Где что находится: ESTAR", pt: "Lugares e localização",
  goal: "Спросить, где что-то находится, и понять разницу между SER и ESTAR.",
  w: "aqui=здесь; ali=там; perto=близко; longe=далеко; escola=школа; trabalho=работа; mercado=магазин, рынок; praia=пляж; rua=улица; hotel=отель; banheiro=туалет, ванная; onde=где",
  ph: [["Onde fica o banheiro?","Где туалет?"],["Eu estou em casa.","Я дома."],["O hotel fica perto da praia.","Отель недалеко от пляжа."],["Ele está no trabalho.","Он на работе."]],
  g: `<p><b>ESTAR</b> — «быть» для состояния и местонахождения.</p>
<table class="conj"><tr><td>eu <b>estou</b></td><td>nós <b>estamos</b></td></tr><tr><td>você / ele / ela <b>está</b></td><td>vocês / eles / elas <b>estão</b></td></tr></table>
<p><b>SER</b> — суть, постоянное: <i>Ele é alto.</i> <b>ESTAR</b> — состояние сейчас: <i>Ele está cansado.</i> Положение: <i>Eu estou em casa.</i></p>
<p>Для зданий и мест часто используют <b>ficar</b>: <i>O banco fica perto.</i> Вопрос: <i>Onde fica…?</i></p>
<p>Смысл меняется: <i>Ele é chato</i> (он вообще зануда) и <i>Ele está chato</i> (сегодня ведёт себя занудно).</p>`,
  q: [["Eu ___ cansada hoje.",["sou","estou","tenho"],1],["Ela ___ brasileira.",["é","está","têm"],0],["Как спросить «где туалет?»",["Onde fica o banheiro?","Quem é o banheiro?","Onde tem eu banheiro?"],0],["Nós ___ em casa.",["somos","estamos","temos"],1]],
  wr: "Опиши, где находятся 5 мест рядом с твоим домом: «O mercado fica perto…», «Eu estou…».",
  yt: "ser e estar português brasileiro iniciantes"
},
{
  id: "u7", lvl: "A1", t: "Глаголы в настоящем времени", pt: "Verbos no presente",
  goal: "Спрягать правильные глаголы на -ar, -er, -ir и говорить, что ты делаешь.",
  w: "falar=говорить; morar=жить, проживать; trabalhar=работать; estudar=учиться, изучать; comer=есть; beber=пить; ler=читать; escrever=писать; assistir=смотреть (фильм, ТВ); viver=жить; aprender=учить, узнавать; entender=понимать",
  ph: [["Eu não entendo.","Я не понимаю."],["Você fala inglês?","Ты говоришь по-английски?"],["Eu moro em Moscou.","Я живу в Москве."],["Estou estudando português.","Я учу португальский."]],
  g: `<p>Отбрасываем окончание -ar / -er / -ir и добавляем свои:</p>
<table class="conj"><tr><td></td><td>-ar (falar)</td><td>-er (comer)</td><td>-ir (partir)</td></tr>
<tr><td>eu</td><td>fal<b>o</b></td><td>com<b>o</b></td><td>part<b>o</b></td></tr>
<tr><td>você / ele / ela</td><td>fal<b>a</b></td><td>com<b>e</b></td><td>part<b>e</b></td></tr>
<tr><td>nós</td><td>fal<b>amos</b></td><td>com<b>emos</b></td><td>part<b>imos</b></td></tr>
<tr><td>vocês / eles</td><td>fal<b>am</b></td><td>com<b>em</b></td><td>part<b>em</b></td></tr></table>
<p><b>Отрицание:</b> <i>não</i> перед глаголом: <i>Eu não falo inglês.</i></p>
<p><b>Вопрос</b> — просто интонация: <i>Você fala português?</i></p>
<p><b>«Прямо сейчас»:</b> <i>estar + глагол с -ndo</i>: <i>Estou estudando.</i> В Бразилии так говорят очень часто.</p>`,
  q: [["Eu ___ português. (falar)",["fala","falo","falamos"],1],["Nós ___ pão. (comer)",["comemos","comem","como"],0],["Как сказать «я не понимаю»?",["Eu não entendo","Eu entendo não","Não eu entendo"],0],["Eles ___ no Brasil. (morar)",["moram","mora","moro"],0]],
  wr: "Напиши 6 предложений о своём обычном дне, используя глаголы на -ar, -er и -ir.",
  yt: "verbos presente português brasileiro iniciantes"
},
{
  id: "u8", lvl: "A1", t: "Еда и предпочтения", pt: "Comida e preferências",
  goal: "Заказать еду, сказать, что любишь и чего хочешь.",
  w: "arroz=рис; feijão=фасоль; carne=мясо; frango=курица; peixe=рыба; salada=салат; fruta=фрукт; suco=сок; cerveja=пиво; sobremesa=десерт; cardápio=меню; a conta=счёт",
  ph: [["Eu queria um café, por favor.","Я бы хотел(а) кофе, пожалуйста."],["A conta, por favor.","Счёт, пожалуйста."],["Eu adoro chocolate.","Я обожаю шоколад."],["O que você recomenda?","Что ты порекомендуешь?"]],
  g: `<p><b>GOSTAR DE</b> — «нравиться, любить». После <i>gostar</i> всегда предлог <b>de</b>: <i>Eu gosto de café.</i> <i>Ele gosta de cozinhar.</i> Сильнее: <i>adorar</i> (обожать).</p>
<p><b>QUERER</b> — хотеть: <i>quero, quer, queremos, querem.</i></p>
<p><b>Вежливо</b> просят так: <i>Eu queria um café</i> или <i>Eu gostaria de um café</i> — это звучит мягче, чем «Eu quero».</p>
<p>Полезно в ресторане: <i>Pode trazer o cardápio?</i> <i>Quanto é?</i> <i>Tem sobremesa?</i></p>
<p><b>Не любишь:</b> <i>Eu não gosto de peixe.</i></p>`,
  q: [["Eu gosto ___ café.",["de","em","a"],0],["Как вежливо сказать «я бы хотела кофе»?",["Eu queria um café","Eu quer café","Me café"],0],["Что значит «a conta»?",["счёт","сдача","меню"],0],["Ele ___ suco. (querer)",["quer","quero","querem"],0]],
  wr: "Напиши, что ты любишь есть и пить, и составь диалог из 4 реплик: заказ ужина в ресторане.",
  yt: "restaurante português brasileiro conversação"
},
{
  id: "u9", lvl: "A1", t: "Дни, распорядок и планы", pt: "Rotina e planos",
  goal: "Назвать дни недели и рассказать о ближайших планах.",
  w: "segunda-feira=понедельник; sábado=суббота; domingo=воскресенье; hoje=сегодня; amanhã=завтра; ontem=вчера; manhã=утро; tarde=день, вторая половина дня; noite=вечер, ночь; semana=неделя; fim de semana=выходные; sempre=всегда",
  ph: [["Vamos ao cinema?","Давай сходим в кино?"],["Amanhã eu vou trabalhar.","Завтра я иду на работу."],["O que você vai fazer no sábado?","Что ты будешь делать в субботу?"],["Eu sempre tomo café de manhã.","Я всегда пью кофе по утрам."]],
  g: `<p><b>IR</b> — «идти, ехать»: <i>vou, vai, vamos, vão.</i></p>
<p><b>Ближайшее будущее:</b> <i>ir + инфинитив</i>. <i>Eu vou estudar amanhã.</i> <i>Elas vão viajar no sábado.</i> Так говорят о планах почти всегда.</p>
<p><b>Vamos + инфинитив</b> = «давай(те)…»: <i>Vamos sair?</i> <i>Vamos comer?</i></p>
<p><b>Предлоги времени:</b> <i>na segunda</i> (в понедельник), <i>de manhã</i> (утром), <i>à noite</i> (вечером), <i>no fim de semana</i> (в выходные).</p>
<p>Дни недели (кроме субботы и воскресенья) заканчиваются на -feira: <i>terça-feira</i>, <i>quarta-feira</i>. В речи часто говорят просто «segunda», «terça».</p>
<p><b>Как часто:</b> <i>sempre</i> (всегда), <i>às vezes</i> (иногда), <i>nunca</i> (никогда).</p>`,
  q: [["Eu ___ estudar amanhã.",["vou","vai","vão"],0],["Что значит «Vamos ao cinema?»",["Мы идём в кино","Давай сходим в кино?","Куда пойдём?"],1],["Что значит «ontem»?",["завтра","сегодня","вчера"],2],["Elas ___ viajar no sábado.",["vai","vão","vamos"],1]],
  wr: "Напиши свой план на следующую неделю по дням: «Na segunda eu vou…», «Na terça…».",
  yt: "dias da semana rotina português brasileiro iniciantes"
},
/* ======================= A2 ======================= */
{
  id: "u10", lvl: "A2", t: "Внешность и характер", pt: "Descrição de pessoas",
  goal: "Описать человека и сравнить двух людей.",
  w: "alto=высокий; baixo=невысокий; bonito / bonita=красивый / красивая; simpático=приятный, милый; engraçado=смешной; inteligente=умный; tímido=застенчивый; divertido=весёлый, забавный; carinhoso=ласковый; jovem=молодой; olhos=глаза; cabelo=волосы",
  ph: [["Ele é alto e muito simpático.","Он высокий и очень приятный."],["Ela tem cabelo comprido.","У неё длинные волосы."],["Você é mais engraçado do que eu.","Ты смешнее меня."],["Ele tem olhos castanhos.","У него карие глаза."]],
  g: `<p><b>Прилагательные согласуются</b> с существительным по роду и числу: <i>bonito / bonita / bonitos / bonitas</i>.</p>
<p>Прилагательные на <b>-e</b> и <b>-l</b> не меняют род: <i>inteligente</i>, <i>legal</i>. Во множественном числе: <i>inteligentes</i>, <i>legais</i>.</p>
<p>Обычно прилагательное стоит <b>после</b> существительного: <i>um homem alto</i>, <i>uma mulher simpática</i>.</p>
<p><b>Усиление:</b> <i>muito</i> (очень), <i>bem</i> (довольно), <i>um pouco</i> (немного): <i>Ele é bem divertido.</i></p>
<p><b>Сравнение:</b> <i>mais… do que</i> (больше чем), <i>menos… do que</i>, <i>tão… quanto</i> (так же… как). <i>Melhor</i> — лучше, <i>pior</i> — хуже.</p>
<p>Внешность описывают через <b>ter</b>: <i>Ela tem olhos verdes.</i></p>`,
  q: [["Ela é ___. (bonito)",["bonito","bonita","bonitas"],1],["Eles são ___. (inteligente)",["inteligente","inteligentes","inteligentas"],1],["Как сказать «выше, чем я»?",["mais alto do que eu","alto mais eu","mais alto como eu"],0],["«Tem olhos castanhos» значит…",["у него карие глаза","у него карий нос","он смотрит вниз"],0]],
  wr: "Опиши внешность и характер близкого человека (6 предложений) и сравни двух людей.",
  yt: "descrever pessoas português brasileiro"
},
{
  id: "u11", lvl: "A2", t: "Покупки и деньги", pt: "Compras",
  goal: "Спросить цену, размер, способ оплаты и скидку.",
  w: "loja=магазин; preço=цена; caro=дорогой; barato=дешёвый; dinheiro=деньги; cartão=карта; troco=сдача; tamanho=размер; roupa=одежда; camiseta=футболка; sapato=туфля, обувь; desconto=скидка",
  ph: [["Quanto custa?","Сколько стоит?"],["Posso pagar com cartão?","Можно оплатить картой?"],["Tem um tamanho maior?","Есть размер побольше?"],["Está muito caro.","Слишком дорого."]],
  g: `<p><b>Указательные слова:</b> <i>este / esta</i> (этот — рядом со мной), <i>esse / essa</i> (этот — рядом с тобой), <i>aquele / aquela</i> (тот — далеко). Без существительного: <i>isto, isso, aquilo</i>.</p>
<p>В разговорной речи чаще всего слышно <i>esse / essa</i> и <i>isso</i>: <i>Quanto custa isso?</i></p>
<p><b>Сотни:</b> cem, duzentos, trezentos, quatrocentos, quinhentos, mil. Для женского рода: <i>duzentas, trezentas</i>.</p>
<p><b>Нужно:</b> <i>Preciso de um tamanho M.</i> (после <i>precisar</i> — предлог <b>de</b>).</p>
<p><b>Фразы в магазине:</b> <i>Posso experimentar?</i> (можно примерить?) <i>Tem desconto?</i> <i>Só estou olhando.</i> (я просто смотрю).</p>`,
  q: [["Что значит «Quanto custa?»",["Где находится?","Сколько стоит?","Когда откроется?"],1],["Как спросить «можно картой?»",["Posso pagar com cartão?","Eu cartão pagar?","Pago cartão eu?"],0],["Противоположность слова «barato»",["caro","pequeno","novo"],0],["Какое число «duzentos»?",["20","200","2000"],1]],
  wr: "Напиши диалог в магазине одежды: спроси цену, размер, скидку и способ оплаты.",
  yt: "compras português brasileiro diálogo"
},
{
  id: "u12", lvl: "A2", t: "Город и транспорт", pt: "Cidade e transporte",
  goal: "Спросить дорогу и понять простые указания.",
  w: "ônibus=автобус; metrô=метро; táxi=такси; aeroporto=аэропорт; estação=станция; passagem=билет, проезд; direita=право, справа; esquerda=лево, слева; reto=прямо; esquina=угол, перекрёсток; mapa=карта; trânsito=пробки, движение",
  ph: [["Como chego ao aeroporto?","Как добраться до аэропорта?"],["Siga reto e vire à direita.","Идите прямо и поверните направо."],["Onde fica a estação de metrô?","Где станция метро?"],["Quanto é a passagem?","Сколько стоит проезд?"]],
  g: `<p><b>Предлоги:</b> <i>em</i> (в, на), <i>de</i> (из, от), <i>para / pra</i> (в, к, для), <i>por</i> (через, по), <i>a</i> (к — после ir, chegar).</p>
<p>Слияние: <i>a + o = ao</i>, <i>a + a = à</i>. <i>Vou ao aeroporto.</i> <i>Vou à praia.</i></p>
<p><b>Транспорт:</b> <i>ir de ônibus</i> (ехать на автобусе), <i>pegar o metrô</i> (сесть на метро).</p>
<p><b>Указания</b> (императив): <i>siga</i> (идите), <i>vire</i> (поверните), <i>pegue</i> (садитесь), <i>desça</i> (выходите), <i>entre</i> (входите).</p>
<p><i>Vire à direita</i> — поверните направо. <i>Siga reto</i> — идите прямо. <i>É a segunda rua à esquerda.</i></p>`,
  q: [["Что значит «Siga reto»?",["Идите прямо","Поверните направо","Остановитесь"],0],["Как сказать «я еду на автобусе»?",["Eu vou de ônibus","Eu vou no ônibus eu","Eu ônibus vou"],0],["Что значит «Vire à esquerda»?",["Поверните налево","Идите назад","Поверните направо"],0],["Para ir ___ aeroporto?",["ao","no","do"],0]],
  wr: "Объясни по-португальски дорогу от своего дома до ближайшей остановки или станции метро.",
  yt: "como pedir direções português brasileiro"
},
{
  id: "u13", lvl: "A2", t: "Прошедшее время: правильные глаголы", pt: "Pretérito perfeito",
  goal: "Рассказать, что ты сделала вчера или на прошлой неделе.",
  w: "já=уже; ainda não=ещё нет; semana passada=на прошлой неделе; ano passado=в прошлом году; primeiro=сначала; depois=потом; antes=раньше, до; viagem=поездка; férias=отпуск, каникулы; comprar=покупать; chegar=приходить, прибывать; conhecer=знакомиться, знать (место, человека)",
  ph: [["Ontem eu comprei um livro.","Вчера я купил(а) книгу."],["Eu já almocei.","Я уже пообедал(а)."],["Ainda não chegamos.","Мы ещё не приехали."],["Como foi a viagem?","Как прошла поездка?"]],
  g: `<p><b>Pretérito perfeito</b> — завершённое действие в прошлом («сделал», «пришёл»).</p>
<table class="conj"><tr><td></td><td>-ar (falar)</td><td>-er (comer)</td><td>-ir (partir)</td></tr>
<tr><td>eu</td><td>fal<b>ei</b></td><td>com<b>i</b></td><td>part<b>i</b></td></tr>
<tr><td>você / ele / ela</td><td>fal<b>ou</b></td><td>com<b>eu</b></td><td>part<b>iu</b></td></tr>
<tr><td>nós</td><td>fal<b>amos</b></td><td>com<b>emos</b></td><td>part<b>imos</b></td></tr>
<tr><td>vocês / eles</td><td>fal<b>aram</b></td><td>com<b>eram</b></td><td>part<b>iram</b></td></tr></table>
<p>Для <i>nós</i> форма прошлого с -ar совпадает с настоящим: <i>falamos</i>. Время понятно по контексту (<i>ontem</i>, <i>semana passada</i>).</p>
<p><b>Маркеры:</b> <i>ontem, semana passada, ano passado, já, ainda não</i>.</p>
<p>Порядок рассказа: <i>primeiro… depois… no final…</i></p>`,
  q: [["Ontem eu ___. (falar)",["falei","falo","falarei"],0],["Ela ___ arroz. (comer, прошедшее)",["come","comeu","comia"],1],["Eles ___ cedo. (chegar, прошедшее)",["chegam","chegaram","chegarão"],1],["Что значит «ainda não»?",["уже","ещё нет","никогда"],1]],
  wr: "Расскажи, что ты делала на прошлой неделе (6 предложений в pretérito perfeito).",
  yt: "pretérito perfeito português brasileiro estrangeiros"
},
{
  id: "u14", lvl: "A2", t: "Прошедшее время: неправильные глаголы", pt: "Pretérito perfeito irregular",
  goal: "Использовать самые частые неправильные глаголы в прошлом.",
  w: "fazer=делать; ir=идти, ехать; ter=иметь; ver=видеть; dar=давать; dizer=сказать; vir=приходить; poder=мочь; saber=знать; querer=хотеть; sair=выходить, уходить; estar=быть, находиться",
  ph: [["Eu fui ao Brasil no ano passado.","В прошлом году я ездил(а) в Бразилию."],["O que você fez ontem?","Что ты делал(а) вчера?"],["Nós vimos um filme.","Мы посмотрели фильм."],["Ela disse que sim.","Она сказала «да»."]],
  g: `<p>Самые частые неправильные формы (eu / você, ele / nós / eles):</p>
<table class="conj"><tr><td><b>ser / ir</b></td><td>fui / foi / fomos / foram</td></tr>
<tr><td><b>ter</b></td><td>tive / teve / tivemos / tiveram</td></tr>
<tr><td><b>fazer</b></td><td>fiz / fez / fizemos / fizeram</td></tr>
<tr><td><b>estar</b></td><td>estive / esteve / estivemos / estiveram</td></tr>
<tr><td><b>ver</b></td><td>vi / viu / vimos / viram</td></tr>
<tr><td><b>dar</b></td><td>dei / deu / demos / deram</td></tr>
<tr><td><b>dizer</b></td><td>disse / disse / dissemos / disseram</td></tr></table>
<p><b>Ser</b> и <b>ir</b> в прошедшем совпадают: <i>Eu fui ao mercado</i> (я ходил) и <i>Eu fui professor</i> (я был учителем). Различить помогает контекст.</p>`,
  q: [["Ontem eu ___ ao cinema.",["fui","fiz","vi"],0],["Ela ___ muito trabalho. (ter, прошедшее)",["tem","teve","tinha"],1],["Nós ___ o filme. (ver, прошедшее)",["vemos","vimos","viram"],1],["Eles ___ a verdade. (dizer, прошедшее)",["dizem","disseram","dizeram"],1]],
  wr: "Расскажи о последней поездке или выходных, используя минимум 4 неправильных глагола (fui, fiz, vi, tive).",
  yt: "pretérito perfeito irregulares português brasileiro"
},
{
  id: "u15", lvl: "A2", t: "Здоровье и тело", pt: "Saúde e corpo",
  goal: "Объяснить, что болит, и попросить о помощи.",
  w: "cabeça=голова; mão=рука (кисть); braço=рука (от плеча); perna=нога; barriga=живот; dor=боль; médico=врач; remédio=лекарство; febre=температура, жар; gripe=грипп; farmácia=аптека; doente=больной",
  ph: [["Estou com dor de cabeça.","У меня болит голова."],["Preciso de um médico.","Мне нужен врач."],["Onde fica a farmácia?","Где аптека?"],["Estou com febre.","У меня температура."]],
  g: `<p><b>Estar com + существительное</b> — состояние: <i>Estou com fome</i> (голоден), <i>com sede</i> (хочу пить), <i>com frio</i>, <i>com calor</i>, <i>com sono</i>, <i>com febre</i>.</p>
<p><b>Боль:</b> <i>dor de cabeça</i> (головная), <i>dor de barriga</i>, <i>dor de dente</i>. Или глаголом: <i>Minha cabeça dói.</i> <i>Meus pés doem.</i></p>
<p><b>Нужно / надо:</b> <i>Preciso ir ao médico.</i> (precisar + инфинитив) · <i>Tenho que descansar.</i> (ter que + инфинитив).</p>
<p><b>Совет:</b> <i>Você deveria descansar.</i> (тебе стоило бы отдохнуть).</p>
<p>У врача: <i>Há quanto tempo você sente isso?</i> (как давно ты это чувствуешь?)</p>`,
  q: [["Как сказать «у меня болит голова»?",["Estou com dor de cabeça","Eu tenho cabeça dor","Sou dor de cabeça"],0],["«Estou com fome» значит…",["я голоден(на)","я хочу пить","мне жарко"],0],["Eu ___ ir ao médico.",["preciso","precisa","precisam"],0],["«Farmácia» — это…",["аптека","больница","магазин одежды"],0]],
  wr: "Напиши диалог у врача: объясни, что болит и с какого времени, и что тебе нужно.",
  yt: "no médico vocabulário português brasileiro"
},
{
  id: "u16", lvl: "A2", t: "Рассказ о прошлом: imperfeito", pt: "Pretérito imperfeito",
  goal: "Описывать детство, привычки и обстановку в прошлом.",
  w: "infância=детство; criança=ребёнок; antigamente=раньше, в старину; naquela época=в то время; costumar=иметь обыкновение; brincar=играть (о детях); lembrar=помнить, вспоминать; esquecer=забывать; mudar-se=переезжать; às vezes=иногда; todo dia=каждый день; quando=когда",
  ph: [["Quando eu era criança, eu morava no interior.","Когда я была ребёнком, я жила в провинции."],["Eu costumava ler muito.","Я раньше много читала."],["Naquela época não tinha internet.","В то время не было интернета."],["Eu me lembro bem disso.","Я хорошо это помню."]],
  g: `<p><b>Pretérito imperfeito</b> — прошлое «длительное»: привычки, описания, фон.</p>
<table class="conj"><tr><td></td><td>-ar (falar)</td><td>-er / -ir (comer)</td></tr>
<tr><td>eu / você / ele</td><td>fal<b>ava</b></td><td>com<b>ia</b></td></tr>
<tr><td>nós</td><td>fal<b>ávamos</b></td><td>com<b>íamos</b></td></tr>
<tr><td>vocês / eles</td><td>fal<b>avam</b></td><td>com<b>iam</b></td></tr></table>
<p><b>Неправильные (всего четыре):</b> <i>ser</i> — era, éramos, eram · <i>ter</i> — tinha · <i>vir</i> — vinha · <i>pôr</i> — punha.</p>
<p><b>Perfeito или imperfeito?</b> <i>Ontem eu estudei</i> (разовое, завершённое). <i>Quando eu era criança, eu estudava à noite</i> (регулярно, фон).</p>
<p>Часто идёт со словами: <i>antigamente, naquela época, sempre, todo dia, às vezes</i>.</p>`,
  q: [["Quando eu era criança, eu ___ muito. (brincar)",["brincava","brinquei","brincarei"],0],["Quando eu ___ 10 anos... (ter)",["tinha","tive","tenho"],0],["Ele ___ simpático. (ser, описание в прошлом)",["era","foi","é"],0],["Imperfeito используют для…",["привычек и описаний в прошлом","одного завершённого события","будущих планов"],0]],
  wr: "Расскажи о своём детстве (6–8 предложений): где жила, чем занималась, какой была.",
  yt: "pretérito imperfeito português brasileiro estrangeiros"
},
{
  id: "u17", lvl: "A2", t: "Чувства, отношения и свидания", pt: "Sentimentos e relacionamentos",
  goal: "Говорить о чувствах, приглашать на встречу и писать тёплые сообщения.",
  w: "saudade=тоска по кому-то; apaixonado / apaixonada=влюблённый / влюблённая; beijo=поцелуй; abraço=объятие; encontro=свидание, встреча; sentir=чувствовать; amar=любить; lindo / linda=прекрасный / прекрасная; querido / querida=дорогой / дорогая; coração=сердце; sorriso=улыбка; especial=особенный",
  ph: [["Estou com saudade de você.","Я скучаю по тебе."],["Eu gosto muito de você.","Ты мне очень нравишься."],["Quer sair comigo?","Хочешь погулять / сходить на свидание со мной?"],["Você é muito especial para mim.","Ты очень особенный для меня."]],
  g: `<p><b>Saudade</b> — особое слово: тоска по человеку, месту, времени. <i>Estou com saudade de você</i> или <i>Tenho saudades de você</i> — «я скучаю по тебе».</p>
<p><b>Gostar и amar.</b> <i>Eu gosto de você</i> — «ты мне нравишься» (мягко). <i>Eu te amo</i> — «я тебя люблю» (серьёзно). <i>Estou apaixonada por você</i> — «я в тебя влюблена».</p>
<p><b>Приглашение:</b> <i>Quer sair comigo?</i> Ответы: <i>Adoraria!</i> (с радостью!) <i>Claro!</i> <i>Talvez outro dia.</i> (может быть, в другой раз).</p>
<p><b>Сообщения:</b> <i>Bom dia, amor!</i> <i>Pensando em você.</i> <i>Beijos</i> / <i>Um beijo</i> / <i>Um abraço</i> в конце.</p>
<p><b>Комплименты:</b> <i>Você está linda hoje.</i> <i>Adoro seu sorriso.</i></p>`,
  q: [["Слово «saudade» ближе всего к…",["тоске по кому-то","скуке","радости"],0],["«Estou apaixonada por você» значит…",["я на тебя злюсь","я в тебя влюблена","я тебя жду"],1],["«Quer sair comigo?» значит…",["хочешь пойти со мной (гулять, на свидание)?","куда ты идёшь?","ты уже ушла?"],0],["«Beijos» в конце сообщения значит…",["целую","пока","спасибо"],0]],
  wr: "Напиши короткое тёплое сообщение близкому человеку (4–5 предложений): что ты чувствуешь, чем хочешь поделиться, и пригласи встретиться.",
  yt: "expressões de amor português brasileiro"
},
/* ======================= B1 ======================= */
{
  id: "u18", lvl: "B1", t: "Путешествия", pt: "Viagens",
  goal: "Забронировать жильё, решить проблемы в дороге и рассказать о поездке.",
  w: "reserva=бронь; passaporte=паспорт; bagagem=багаж; voo=рейс; embarque=посадка; hospedagem=проживание; diária=стоимость суток; passeio=прогулка, экскурсия; roteiro=маршрут; alugar=арендовать; cancelar=отменить; atrasar=задерживаться",
  ph: [["Eu gostaria de fazer uma reserva.","Я хотел(а) бы сделать бронь."],["O voo está atrasado.","Рейс задерживается."],["Qual é o horário do check-in?","Во сколько заселение?"],["Preciso alugar um carro.","Мне нужно арендовать машину."]],
  g: `<p><b>Perfeito и imperfeito вместе.</b> Фон — imperfeito, событие — perfeito: <i>Quando eu cheguei, estava chovendo.</i> <i>Eu dormia quando o telefone tocou.</i></p>
<p><b>Estava + -ndo</b> — действие в процессе в прошлом: <i>Eu estava esperando o ônibus.</i></p>
<p><b>Давнопрошедшее:</b> <i>tinha + причастие</i> — действие, завершённое раньше другого: <i>Eu já tinha saído.</i> Причастие: -ado (falar → falado), -ido (comer → comido).</p>
<p><b>Фразы:</b> <i>Há quartos disponíveis?</i> <i>O café da manhã está incluído?</i> <i>Posso cancelar a reserva?</i></p>`,
  q: [["Quando eu ___, estava chovendo. (chegar)",["cheguei","chegava","chegarei"],0],["«Bagagem» — это…",["багаж","билет","паспорт"],0],["Eu já ___ saído.",["tinha","tenho","terei"],0],["Как сказать «Я хотел бы сделать бронь»?",["Eu gostaria de fazer uma reserva","Eu quero reserva fazer","Faço eu reserva"],0]],
  wr: "Напиши письмо в отель: бронь на даты, вопросы про завтрак и время заселения.",
  yt: "viagem aeroporto hotel português brasileiro diálogo"
},
{
  id: "u19", lvl: "B1", t: "Будущее и условное наклонение", pt: "Futuro e condicional",
  goal: "Говорить о планах, мечтах и вежливо просить.",
  w: "plano=план; sonho=мечта; objetivo=цель; talvez=возможно; provavelmente=вероятно; se=если; pretender=намереваться; esperar=надеяться, ждать; conseguir=суметь, получиться; decidir=решать; mudar=менять; futuro=будущее",
  ph: [["Eu pretendo viajar no ano que vem.","Я собираюсь поехать в следующем году."],["Se eu tivesse tempo, eu viajaria mais.","Если бы у меня было время, я бы больше путешествовал(а)."],["Você poderia me ajudar?","Вы не могли бы мне помочь?"],["Talvez eu vá.","Возможно, я пойду."]],
  g: `<p><b>Futuro do presente:</b> инфинитив + -ei, -á, -emos, -ão: <i>falarei, falará, falaremos, falarão</i>. В живой речи его часто заменяет <i>ir + инфинитив</i> (<i>vou falar</i>), но в письме и новостях его много.</p>
<p><b>Condicional (futuro do pretérito):</b> инфинитив + -ia, -ia, -íamos, -iam: <i>falaria, comeria, partiria</i>. Нужен для вежливости и мечтаний: <i>Eu gostaria de…</i> <i>Você poderia…?</i> <i>Eu moraria no Rio.</i></p>
<p><b>Se + imperfeito do subjuntivo + condicional:</b> <i>Se eu tivesse tempo, eu viajaria.</i> («Если бы у меня было время…»). Пока достаточно узнавать эту конструкцию.</p>
<p><b>Вероятность:</b> <i>talvez, provavelmente, quem sabe</i>.</p>`,
  q: [["Eu ___ com ele amanhã. (falar, futuro do presente)",["falarei","falei","falava"],0],["Как вежливо попросить помощи?",["Você poderia me ajudar?","Você ajuda eu?","Ajudar me você?"],0],["«Talvez» значит…",["возможно","всегда","никогда"],0],["Eu ___ se tivesse dinheiro. (viajar)",["viajaria","viajarei","viajei"],0]],
  wr: "Напиши о своих планах на 5 лет (futuro) и о трёх «если бы…» (condicional).",
  yt: "futuro do presente condicional português brasileiro estrangeiros"
},
{
  id: "u20", lvl: "B1", t: "Subjuntivo: введение", pt: "Presente do subjuntivo",
  goal: "Выражать желание, надежду, сомнение и просьбу через subjuntivo.",
  w: "espero que=надеюсь, что; quero que=хочу, чтобы; é importante que=важно, чтобы; duvido que=сомневаюсь, что; embora=хотя; para que=для того чтобы; antes que=прежде чем; caso=на случай, если; tomara que=дай бог, чтобы; pode ser que=может быть, что; é possível que=возможно, что; é bom que=хорошо, что",
  ph: [["Espero que você goste.","Надеюсь, тебе понравится."],["Quero que você venha.","Хочу, чтобы ты пришёл."],["É importante que a gente converse.","Важно, чтобы мы поговорили."],["Tomara que dê certo!","Дай бог, чтобы получилось!"]],
  g: `<p><b>Как образовать:</b> берём форму <i>eu</i> настоящего времени (falo, como, parto), отбрасываем -o и меняем гласную:</p>
<table class="conj"><tr><td></td><td>-ar</td><td>-er / -ir</td></tr>
<tr><td>eu / você / ele</td><td>fal<b>e</b></td><td>com<b>a</b></td></tr>
<tr><td>nós</td><td>fal<b>emos</b></td><td>com<b>amos</b></td></tr>
<tr><td>vocês / eles</td><td>fal<b>em</b></td><td>com<b>am</b></td></tr></table>
<p><b>Неправильные:</b> ser — <i>seja</i> · estar — <i>esteja</i> · ter — <i>tenha</i> · ir — <i>vá</i> · fazer — <i>faça</i> · ver — <i>veja</i> · querer — <i>queira</i> · saber — <i>saiba</i> · dar — <i>dê</i>.</p>
<p><b>Когда нужен:</b> после желания, надежды, просьбы, эмоций, сомнения и после <i>talvez, embora, para que, antes que</i>. Обычно в предложении два субъекта и есть <b>que</b>.</p>
<p><i>Eu quero que você venha.</i> <i>Espero que ela goste.</i> <i>Talvez ele esteja em casa.</i></p>`,
  q: [["Espero que você ___. (gostar)",["goste","gosta","gostar"],0],["Quero que ela ___ amanhã. (vir)",["venha","vem","vinha"],0],["Talvez ele ___ em casa. (estar)",["esteja","está","estava"],0],["Subjuntivo используют после…",["желания, сомнения, эмоций","дат и чисел","приветствий"],0]],
  wr: "Напиши 6 предложений с subjuntivo: чего хочешь, на что надеешься, в чём сомневаешься.",
  yt: "subjuntivo presente português brasileiro estrangeiros"
},
{
  id: "u21", lvl: "B1", t: "Местоимения-дополнения и просьбы", pt: "Pronomes oblíquos e imperativo",
  goal: "Говорить «мне», «тебе», «его» и просить естественно, как в Бразилии.",
  w: "me=мне, меня; te=тебе, тебя; o / a=его / её; lhe=ему, ей (формально); nos=нам, нас; os / as=их; ajudar=помогать; emprestar=одалживать; mandar=отправлять; perguntar=спрашивать; contar=рассказывать; devolver=возвращать",
  ph: [["Me liga amanhã?","Позвонишь мне завтра?"],["Eu te amo.","Я тебя люблю."],["Vou te mandar uma mensagem.","Я отправлю тебе сообщение."],["Me conta tudo!","Расскажи мне всё!"]],
  g: `<p><b>Me, te</b> — самые частые: «мне / меня», «тебе / тебя». Ставятся перед глаголом: <i>Eu te vejo amanhã.</i> <i>Ele me ligou.</i></p>
<p><b>С инфинитивом:</b> <i>Vou te ligar.</i> <i>Quero te ver.</i> <i>Pode me ajudar?</i></p>
<p>В разговорном бразильском в начале фразы часто ставят <i>me</i>: <i>Me liga!</i> <i>Me conta!</i> В письменной речи это не принято.</p>
<p><b>«Его, её»:</b> в письме — <i>o / a</i> (<i>Eu o vi</i>), в разговоре чаще <i>ele / ela</i> после глагола (<i>Eu vi ele</i>). Формальное «ему / ей» — <i>lhe</i>.</p>
<p><b>Imperativo</b> (форма <i>você</i>): берём форму subjuntivo — <i>fale, coma, abra</i>. Отрицание: <i>não fale</i>. Неправильные: <i>vá, faça, seja</i>.</p>`,
  q: [["Как сказать «Я тебя люблю»?",["Eu te amo","Eu amo tu","Te eu amo"],0],["Как попросить «Позвони мне!» по-бразильски?",["Me liga!","Liga eu!","Me ligar!"],0],["Vou ___ ligar. (я позвоню тебе)",["te","tu","teu"],0],["Não ___ tão rápido! (falar, императив)",["fale","fala","falar"],0]],
  wr: "Напиши сообщение другу с просьбами в imperativo и местоимениями me / te (5–6 предложений).",
  yt: "pronomes oblíquos português brasileiro estrangeiros"
},
{
  id: "u22", lvl: "B1", t: "Мнения и связки", pt: "Opiniões e conectivos",
  goal: "Выразить мнение, согласиться, поспорить и связно изложить мысль.",
  w: "porque=потому что; por isso=поэтому; mas=но; no entanto=однако; apesar de=несмотря на; portanto=следовательно; além disso=кроме того; na minha opinião=на мой взгляд; concordo=согласен, согласна; discordo=не согласен, не согласна; por um lado=с одной стороны; ou seja=то есть",
  ph: [["Na minha opinião, é uma boa ideia.","На мой взгляд, это хорошая идея."],["Concordo com você.","Я согласен / согласна с тобой."],["Por um lado é caro, por outro lado é bom.","С одной стороны дорого, с другой хорошо."],["Apesar do preço, eu gostei.","Несмотря на цену, мне понравилось."]],
  g: `<p><b>Как выразить мнение:</b> <i>Na minha opinião…</i> · <i>Eu acho que…</i> · <i>Para mim…</i> · <i>Do meu ponto de vista…</i></p>
<p><b>Согласие и несогласие:</b> <i>Concordo.</i> · <i>Com certeza.</i> · <i>Em parte.</i> · <i>Não necessariamente.</i> · <i>Discordo.</i></p>
<p><b>Связки:</b> причина — <i>porque</i>; следствие — <i>por isso, portanto</i>; противопоставление — <i>mas, no entanto</i>; добавление — <i>além disso</i>; уступка — <i>apesar de, embora</i> (после <i>embora</i> — subjuntivo).</p>
<p><b>Четыре «почему»:</b> <i>Por que</i> (вопрос), <i>porque</i> (ответ «потому что»), <i>por quê</i> (в конце фразы), <i>porquê</i> (как существительное «причина»).</p>
<p>Структура мысли: <i>Primeiro… Além disso… No entanto… Por fim…</i></p>`,
  q: [["«Por isso» значит…",["поэтому","хотя","раньше"],0],["«Porque» используют, когда…",["отвечают «потому что»","задают вопрос «почему»","говорят «возможно»"],0],["«Concordo» значит…",["я согласен / согласна","я не знаю","я иду"],0],["После «embora» нужен…",["subjuntivo","pretérito perfeito","gerúndio"],0]],
  wr: "Выбери тему (например, «учить язык онлайн или с учителем») и напиши мини-эссе из 8–10 предложений со связками.",
  yt: "conectivos português brasileiro opinião"
},
{
  id: "u23", lvl: "B1", t: "Работа и карьера", pt: "Trabalho e carreira",
  goal: "Написать деловое письмо и пройти простое собеседование.",
  w: "emprego=работа (место); empresa=компания; chefe=начальник; colega=коллега; reunião=встреча, совещание; salário=зарплата; currículo=резюме; entrevista=собеседование; contrato=договор; prazo=срок; experiência=опыт; vaga=вакансия",
  ph: [["Estou escrevendo para pedir informações.","Пишу, чтобы запросить информацию."],["Segue o currículo em anexo.","Резюме прилагаю."],["Fico à disposição.","Остаюсь в вашем распоряжении."],["Qual é o prazo?","Какой срок?"]],
  g: `<p><b>Структура делового письма:</b> приветствие (<i>Prezado Sr. Silva,</i> / <i>Olá, Maria,</i>), цель (<i>Estou escrevendo para…</i>), суть, завершение (<i>Fico à disposição.</i>), подпись (<i>Atenciosamente,</i> / <i>Abraços,</i>).</p>
<p><b>Полезные обороты:</b> <i>Gostaria de saber…</i> · <i>Segue em anexo…</i> · <i>Agradeço desde já.</i> · <i>Fico no aguardo.</i></p>
<p><b>Последнее время:</b> <i>ter + причастие</i> показывает повторяющееся действие: <i>Tenho trabalhado muito</i> — «в последнее время я много работаю».</p>
<p><b>Страдательный залог:</b> <i>ser + причастие</i>: <i>O contrato foi assinado.</i> (договор подписан).</p>
<p><b>На собеседовании:</b> <i>Tenho três anos de experiência.</i> · <i>Meus pontos fortes são…</i> · <i>Por que você quer essa vaga?</i></p>`,
  q: [["«Prazo» значит…",["срок","цена","встреча"],0],["Письмо часто заканчивают словом «Atenciosamente». Оно значит…",["с уважением","до свидания навсегда","спасибо за еду"],0],["«Tenho trabalhado muito» значит…",["в последнее время я много работаю","вчера я хорошо поработал","завтра я буду работать"],0],["«Segue em anexo» значит…",["во вложении","срочно","конец письма"],0]],
  wr: "Напиши деловое письмо: запрос информации о вакансии, с темой, приветствием и подписью.",
  yt: "português brasileiro trabalho e-mail formal"
},
{
  id: "u24", lvl: "B1", t: "Культура и свободная речь", pt: "Cultura e conversa livre",
  goal: "Поддерживать разговор, реагировать, переспрашивать и рассказать о своём.",
  w: "notícia=новость; jornal=газета; música=музыка; filme=фильм; festa=праздник, вечеринка; carnaval=карнавал; feriado=праздничный день; tradição=традиция; opinião=мнение; debate=дискуссия; sociedade=общество; meio ambiente=окружающая среда",
  ph: [["Nossa, que legal!","Ничего себе, как здорово!"],["Como assim?","Что ты имеешь в виду?"],["Quer dizer que você vai embora?","То есть ты уезжаешь?"],["Eu concordo em parte.","Я согласен / согласна отчасти."]],
  g: `<p><b>Реакции в разговоре:</b> <i>Nossa!</i> (ничего себе!) · <i>Sério?</i> (серьёзно?) · <i>Que legal!</i> · <i>Puxa!</i> · <i>É mesmo?</i> (правда?) · <i>Que pena.</i> (как жаль).</p>
<p><b>Переспросить:</b> <i>Como assim?</i> · <i>Pode repetir?</i> · <i>Mais devagar, por favor.</i> · <i>O que significa…?</i></p>
<p><b>Уточнить смысл:</b> <i>Quer dizer…</i> · <i>Ou seja…</i> · <i>Você está dizendo que…?</i></p>
<p><b>Заполнители, чтобы подумать:</b> <i>então…</i> · <i>tipo…</i> · <i>sabe?</i> · <i>na verdade…</i></p>
<p><b>Финальный проект:</b> трёхминутный рассказ о себе, городе или любимом фильме. Запиши голосом, потом послушай и выпиши 5 ошибок.</p>`,
  q: [["«Nossa!» в разговоре значит…",["Ничего себе!","Наша!","До свидания"],0],["«Como assim?» значит…",["Что ты имеешь в виду?","Как дела?","Откуда?"],0],["«Feriado» — это…",["праздничный выходной","праздничный стол","фильм"],0],["«Quer dizer» значит…",["то есть","потому что","быстро"],0]],
  wr: "Подготовь трёхминутный рассказ на тему по выбору (о себе, о городе, о любимом фильме), запиши голосом и напиши ключевые тезисы.",
  yt: "conversa em português brasileiro intermediário legendado"
}
];

/* ------------------------------------------------------------
   Ресурсы: что для чего использовать
   ------------------------------------------------------------ */
const RESOURCES = [
  { group: "Слушать, как звучит слово", items: [
    { n: "Forvo", u: "https://forvo.com/languages/pt/", d: "Вбей слово и послушай, как его говорят носители. Выбирай записи с пометкой Brazil.", use: "Каждое новое слово: сначала послушай, потом повтори вслух 3 раза." },
    { n: "Reverso Context", u: "https://context.reverso.net/translation/portuguese-russian/", d: "Показывает слово в реальных предложениях с переводом.", use: "Когда не понятно, как слово используется. Копируй 1 хороший пример в свой словарь." }
  ]},
  { group: "Словари и спряжение", items: [
    { n: "Dicio", u: "https://www.dicio.com.br/", d: "Толковый словарь бразильского португальского: значения, синонимы, примеры, спряжение глагола.", use: "Когда нужно значение по-португальски или формы глагола." },
    { n: "Michaelis", u: "https://michaelis.uol.com.br/", d: "Двуязычный и толковый словарь бразильского варианта.", use: "Для спорных слов и устойчивых выражений." },
    { n: "Glosbe", u: "https://ru.glosbe.com/pt/ru/", d: "Португальско-русский словарь с примерами и аудио.", use: "Быстрый перевод слова на русский." },
    { n: "Reverso Conjugação", u: "https://conjugator.reverso.net/", d: "Таблицы спряжения глаголов во всех временах.", use: "Проверить форму глагола, пока не запомнила наизусть." }
  ]},
  { group: "Предложения и примеры", items: [
    { n: "Tatoeba", u: "https://tatoeba.org/ru/", d: "Огромная база коротких предложений с переводами, часть с озвучкой.", use: "Искать примеры с новым словом и брать готовые предложения для повторения." },
    { n: "Linguee", u: "https://www.linguee.com/portuguese-english", d: "Примеры из реальных текстов, переводы фраз.", use: "Для устойчивых выражений и формального языка." }
  ]},
  { group: "Видео и уроки на YouTube", items: [
    { n: "Easy Portuguese", u: "https://www.youtube.com/results?search_query=Easy+Portuguese+Brazil+street+interviews", d: "Интервью на улицах Бразилии с двойными субтитрами.", use: "Суббота: понять живую речь, выписать 3 фразы." },
    { n: "Português com Marcia Macedo", u: "https://www.youtube.com/results?search_query=Portugu%C3%AAs+com+Marcia+Macedo", d: "Спокойные объяснения грамматики бразильского португальского.", use: "Дни грамматики: смотри параллельно с учебником." },
    { n: "Semantica Portuguese", u: "https://www.youtube.com/results?search_query=Semantica+Portuguese", d: "Короткие уроки с простым бразильским португальским.", use: "Для A1–A2, когда нужен простой ритм." },
    { n: "Portuguese with Leo", u: "https://www.youtube.com/results?search_query=Portuguese+with+Leo", d: "Диалоги и ситуативная лексика.", use: "Отрабатывать разговорные сценки." },
    { n: "Идея поиска для каждого юнита", u: "https://www.youtube.com/", d: "В плане каждого дня аудирования есть готовая ссылка на поиск по теме юнита.", use: "Выбирай видео 5–10 минут, включай субтитры на португальском." }
  ]},
  { group: "Подкасты и чтение", items: [
    { n: "Speak Brazilian Portuguese", u: "https://speakbrazilianportuguese.com/", d: "Подкаст и сайт для начинающих и среднего уровня, бразильский вариант.", use: "Прогулки и дорога: слушай, потом перескажи одно предложение." },
    { n: "Café Brasil Podcast", u: "https://portalcafebrasil.com.br/", d: "Подкасты для носителей, лучше с уровня B1.", use: "Для аудирования на B1: слушай по 5 минут." }
  ]},
  { group: "Сериалы и песни", items: [
    { n: "Language Reactor", u: "https://www.languagereactor.com/", d: "Расширение для браузера: двойные субтитры в Netflix и YouTube, перевод по клику.", use: "Смотреть сериал по 10 минут и собирать фразы." },
    { n: "Песни с текстом", u: "https://www.youtube.com/results?search_query=m%C3%BAsica+brasileira+letra", d: "На YouTube ищи «música brasileira letra» — клипы с текстом.", use: "Слушать и подпевать: учит ритм и произношение." }
  ]},
  { group: "Живое общение", items: [
    { n: "Tandem", u: "https://tandem.net/", d: "Языковой обмен: общаешься с носителем, помогаешь с русским.", use: "С уровня A2: переписка, потом голосовые." },
    { n: "HelloTalk", u: "https://www.hellotalk.com/", d: "Ещё одно приложение для обмена, с исправлением сообщений.", use: "Писать 3 предложения в день и получать правки." },
    { n: "italki", u: "https://www.italki.com/", d: "Платформа с репетиторами и неформальными разговорными тьюторами.", use: "1 урок в неделю для живой практики и обратной связи." }
  ]},
  { group: "Карточки и проверка текстов", items: [
    { n: "Этот сайт", u: "#/review", d: "Свой словарь, повторения по интервалам, карточки и тесты по юнитам.", use: "Главный инструмент: каждый день." },
    { n: "Anki", u: "https://apps.ankiweb.net/", d: "Бесплатное приложение для карточек с интервальным повторением.", use: "Если захочешь вести карточки в телефоне. Экспорт словаря в CSV есть на странице словаря." },
    { n: "ИИ-ассистент (например, Claude)", u: "https://claude.ai/", d: "Можно попросить проверить твой короткий текст и объяснить ошибки.", use: "Вставь текст из дневника и спроси: «Исправь и объясни ошибки по-русски»." }
  ]}
];

/* ------------------------------------------------------------
   Методики запоминания
   ------------------------------------------------------------ */
const METHODS = [
  { t: "Интервальные повторения",
    w: "Слово повторяется не подряд, а через растущие паузы: завтра, через 3 дня, через неделю, через месяц. Мозг запоминает то, что вспоминается с усилием.",
    h: "Заходи в раздел «Повторение» каждый день. Если слово забыла, нажми «Снова»: оно вернётся скоро. Если вспомнила легко, пауза вырастет.",
    s: "Раздел «Повторение»" },
  { t: "Активное вспоминание",
    w: "Лучше пытаться вспомнить, чем перечитывать. Усилие и есть тренировка памяти.",
    h: "Сначала закрой перевод и произнеси ответ вслух. Только потом смотри. В режиме «Писать ответ» можно вводить слово с клавиатуры.",
    s: "Повторение, режим «Писать ответ»" },
  { t: "Слово вместе с примером",
    w: "Слова по отдельности забываются быстро. Фраза запоминается вместе с грамматикой и порядком слов.",
    h: "В словаре всегда заполняй поле «Пример». Лучше свой, про себя: «Eu gosto de café com leite».",
    s: "Словарь, поле «Пример»" },
  { t: "Существительное с артиклем",
    w: "Род нельзя угадать с первого раза, поэтому учи слово сразу как «a casa», «o livro».",
    h: "В словаре пиши «a casa», а не «casa». В заметке помечай исключения (o dia, a mão).",
    s: "Словарь, поле «Заметка»" },
  { t: "Ассоциации и образы",
    w: "Яркая картинка в голове цепляется лучше, чем сухой перевод.",
    h: "Придумай созвучие с русским словом и нарисуй сценку. Например, «pão» (пау) — хлеб: представь, как хлеб говорит «пау!» и подпрыгивает. Чем глупее картинка, тем лучше.",
    s: "Словарь, поле «Заметка»" },
  { t: "Shadowing (повторение за диктором)",
    w: "Ты говоришь почти одновременно с носителем. Так лучше ложится ритм, интонация и произношение.",
    h: "Выбери 10–20 секунд видео. Послушай 2 раза, потом повторяй вместе с диктором. Включи запись голоса и сравни.",
    s: "День 4 каждого юнита" },
  { t: "Запись голоса",
    w: "Со стороны слышны ошибки, которые не замечаешь, пока говоришь.",
    h: "В день 5 запиши голосовое на 1 минуту. Через неделю послушай старую запись и сравни: прогресс очень заметен и мотивирует.",
    s: "День 5 каждого юнита" },
  { t: "Дневник из 3 предложений",
    w: "Письмо — самый быстрый способ превратить пассивные слова в активные.",
    h: "Каждый день пиши 3 предложения о своём дне, только из слов, которые уже знаешь. Ошибки — это нормально, потом их можно проверить.",
    s: "Дневник в разделе «Прогресс»" },
  { t: "Фразы-блоки (chunks)",
    w: "Носители говорят готовыми кусками: «tudo bem?», «por favor», «quer sair comigo?». Эти блоки не нужно собирать по словам.",
    h: "Учи фразы целиком, как одно слово. В словаре сохраняй блоки в поле «Португальский».",
    s: "Ключевые фразы в юнитах" },
  { t: "Темы и чередование",
    w: "Тематические группы помогают связывать слова, а чередование тем мешает мозгу «заснуть» на одном.",
    h: "Новые слова учи по темам юнита. А в повторении слова из разных тем перемешаны сами: так и должно быть.",
    s: "Курс и Повторение" },
  { t: "Журнал ошибок",
    w: "Одни и те же ошибки повторяются. Если их записывать, они быстро уходят.",
    h: "Заведи страницу в тетради: «неправильно → правильно → почему». Раз в неделю перечитывай.",
    s: "Тетрадь, 5 минут в воскресенье" }
];

/* Как сохранять материалы */
const SAVE_TIPS = [
  "Слово записывай в формате: артикль + слово, перевод, пример, заметка (род, ударение, картинка).",
  "Один хороший пример лучше трёх переводов. Бери предложения из видео, песен и сериалов.",
  "Папка в телефоне «Португальский»: скриншоты полезных фраз и таблиц, голосовые записи по неделям.",
  "Тетрадь: слева слово, справа пример. Раз в неделю закрывай левую колонку и вспоминай.",
  "Раз в неделю делай резервную копию: Настройки, затем «Скачать копию данных»."
];

/* Мотивирующие сообщения */
const MOTIVATION = [
  "Каждые 10 минут сегодня экономят час усилий завтра.",
  "Ты не обязана быть идеальной, достаточно прийти сегодня.",
  "Ошибки в португальском — это просто ступеньки. Продолжай.",
  "Маленький шаг каждый день сильнее большого раз в месяц.",
  "Твой мозг запоминает лучше всего, когда ты возвращаешься к слову снова.",
  "Говори вслух, даже если одна. Голос тренируется как мышца.",
  "Сегодняшнее «не понимаю» — завтрашнее «поняла».",
  "Пара слов, сказанных на чужом языке, согревают сильнее, чем сотня переведённых.",
  "Не сравнивай себя с другими. Сравни себя с собой вчерашней.",
  "Нет сил? Сделай только повторение. Пять минут тоже считаются.",
  "Улыбка и «Oi, tudo bem?» открывают больше дверей, чем идеальная грамматика.",
  "Ты уже знаешь больше, чем в день старта."
];

/* ============================================================
   «Вне сети»: фраза дня, бразильские чаты и похвала
   ============================================================ */

// Фраза дня: pt — фраза, ru — перевод, n — маленькая подсказка по языку
const FRASES = [
  { pt: "Desliga o celular e liga a vida.", ru: "Выключи телефон и включи жизнь.", n: "desligar — выключать, ligar — включать. Приставка des- переворачивает смысл." },
  { pt: "Saudade é o amor que fica.", ru: "Саудаде — это любовь, которая остаётся.", n: "fica — от ficar, «оставаться». Одно из самых нужных слов в языке." },
  { pt: "Uma carta vale mais que mil mensagens.", ru: "Одно письмо стоит больше тысячи сообщений.", n: "vale mais que — «стоит больше, чем». Удобно сравнивать что угодно." },
  { pt: "Quem ama, cuida.", ru: "Кто любит, тот заботится.", n: "cuidar — заботиться. Cuidado! — «осторожно!»" },
  { pt: "Devagar se vai ao longe.", ru: "Тише едешь — дальше будешь.", n: "devagar — медленно. Пригодится: «Fala mais devagar, por favor»." },
  { pt: "Você é suficiente.", ru: "Тебя уже достаточно.", n: "suficiente не меняется по роду: подходит и ей, и ему." },
  { pt: "Ler é viajar sem sair do lugar.", ru: "Читать — значит путешествовать, не выходя из дома.", n: "sem + инфинитив = «не делая»: sem sair — «не выходя»." },
  { pt: "Tudo vai dar certo.", ru: "Всё получится.", n: "dar certo — «получиться, сработать». Бразильцы говорят это постоянно." },
  { pt: "O silêncio também é resposta.", ru: "Молчание — тоже ответ.", n: "também — тоже. Ударение на последний слог: tam-BÉM." },
  { pt: "Hoje eu escolho a mim.", ru: "Сегодня я выбираю себя.", n: "a mim — «меня» с ударением, чтобы подчеркнуть, кого именно." },
  { pt: "Respira. Amanhã é outro dia.", ru: "Дыши. Завтра будет новый день.", n: "respira — разговорное повелительное от respirar." },
  { pt: "Quem quer, dá um jeito.", ru: "Кто хочет, тот найдёт способ.", n: "dar um jeito — очень бразильское «как-нибудь устроить, найти выход»." },
  { pt: "Cada dia é uma página nova.", ru: "Каждый день — новая страница.", n: "página — женский род, поэтому nova, а не novo." },
  { pt: "O que é seu vai encontrar você.", ru: "Твоё тебя найдёт.", n: "vai + инфинитив — самое простое будущее время: vai encontrar." },
  { pt: "Calma, você está indo bem.", ru: "Спокойно, у тебя хорошо получается.", n: "estar + -ndo — действие прямо сейчас: está indo, «идёшь»." },
  { pt: "O amor mora nos detalhes.", ru: "Любовь живёт в мелочах.", n: "morar — жить где-то. Onde você mora? — «Где ты живёшь?»" },
  { pt: "Menos tela, mais céu.", ru: "Меньше экрана, больше неба.", n: "menos / mais — меньше / больше. Tela — экран." },
  { pt: "Um bom livro é um abraço.", ru: "Хорошая книга — это объятие.", n: "abraço — объятие. В переписке: «um abraço!» — «обнимаю!»" },
  { pt: "Seja leve.", ru: "Будь лёгкой.", n: "seja — повелительное от ser, «быть». Leve — лёгкий." },
  { pt: "Eu mereço reciprocidade.", ru: "Я заслуживаю взаимности.", n: "merecer — заслуживать. Você merece! — «Ты заслуживаешь!»" },
  { pt: "Quem é de verdade, aparece.", ru: "Настоящие люди не пропадают.", n: "de verdade — «настоящий». Aparecer — появляться." },
  { pt: "Escreve para você mesma hoje.", ru: "Напиши сегодня самой себе.", n: "você mesma — «ты сама». Для мужчины: você mesmo." },
  { pt: "A vida acontece fora da tela.", ru: "Жизнь происходит за пределами экрана.", n: "fora de — «вне, снаружи». Fora da tela — «вне экрана»." },
  { pt: "Coração tranquilo, mente leve.", ru: "Спокойное сердце, лёгкая голова.", n: "tranquilo — бразильское «спокойно, без проблем». Tá tranquilo!" },
  { pt: "Pequenos passos também chegam.", ru: "Маленькие шаги тоже приводят к цели.", n: "chegar — прибывать, доходить. Cheguei! — «Я пришла!»" },
  { pt: "Bom dia, flor do dia!", ru: "Доброе утро, цветочек!", n: "Так ласково здороваются в Бразилии. Буквально: «цветок дня»." },
  { pt: "O melhor ainda está por vir.", ru: "Лучшее ещё впереди.", n: "estar por vir — «предстоять, быть впереди»." },
  { pt: "Fala comigo, eu estou aqui.", ru: "Поговори со мной, я рядом.", n: "comigo — «со мной». Contigo — «с тобой»." },
  { pt: "Quem se importa, responde.", ru: "Кому не всё равно, тот отвечает.", n: "importar-se — быть небезразличным. Não me importo — «мне всё равно»." },
  { pt: "Sorria, você está aprendendo.", ru: "Улыбнись, ты учишься.", n: "aprender — учиться. Aprendendo — «учишься прямо сейчас»." },
  { pt: "Cartas não têm «visualizado».", ru: "У писем не бывает «прочитано».", n: "visualizado — так в бразильских мессенджерах пишут «просмотрено»." },
  { pt: "Abraço apertado vale mais que emoji.", ru: "Крепкое объятие стоит больше эмодзи.", n: "apertado — крепкий, тесный. Aperta! — «Сожми!»" },
  { pt: "Hoje é dia de ler um capítulo.", ru: "Сегодня день, чтобы прочитать главу.", n: "capítulo — глава. Ударение на «пи»: ca-PÍ-tu-lo." },
  { pt: "Tudo tem seu tempo.", ru: "Всему своё время.", n: "tempo — и «время», и «погода». Que tempo bom! — «Какая хорошая погода!»" },
  { pt: "Faça hoje o que te faz bem.", ru: "Делай сегодня то, от чего тебе хорошо.", n: "fazer bem — «идти на пользу». Isso me faz bem — «Мне от этого хорошо»." },
  { pt: "Você não está sozinha.", ru: "Ты не одна.", n: "sozinha — «одна» (ж. р.), sozinho — «один» (м. р.)." },
  { pt: "Amor de verdade não some.", ru: "Настоящая любовь не исчезает.", n: "sumir — исчезать. Ele sumiu — «он пропал». Да, это про гостинг." },
  { pt: "Primeiro eu, depois o celular.", ru: "Сначала я, потом телефон.", n: "primeiro… depois… — «сначала… потом…». Удобно для любых планов." },
  { pt: "Coragem é falar, mesmo com medo.", ru: "Смелость — это говорить, даже когда страшно.", n: "mesmo com — «даже с». Medo — страх." },
  { pt: "Devagarinho também chega.", ru: "Потихонечку тоже доберёшься.", n: "-inho делает слово ласковым: devagar → devagarinho, café → cafezinho." }
];

// Как пишут в бразильских чатах: s — сокращение, f — полная форма, ru — смысл, ex — пример
const CHAT = [
  { s: "kkkkk", f: "смех", ru: "Бразильское «ахахах». Чем больше k, тем смешнее.", ex: "kkkkkk não acredito — ахахах, не верю" },
  { s: "rs", f: "risos", ru: "Тихий смешок, как «хех» или «)».", ex: "tô brincando rs — шучу)" },
  { s: "sdds", f: "saudades", ru: "«Скучаю». Самое тёплое сокращение в языке.", ex: "sdds de vc — скучаю по тебе" },
  { s: "bjs", f: "beijos", ru: "«Целую», как в конце письма.", ex: "boa noite, bjs — спокойной ночи, целую" },
  { s: "tmj", f: "tamo junto", ru: "«Мы вместе», «я с тобой», «держимся».", ex: "qualquer coisa, tmj — если что, я рядом" },
  { s: "vc", f: "você", ru: "«Ты». Пишут почти всегда так.", ex: "vc vem? — ты придёшь?" },
  { s: "blz", f: "beleza", ru: "«Окей», «договорились», «норм».", ex: "amanhã às 8? blz — завтра в 8? ок" },
  { s: "tb / tbm", f: "também", ru: "«Тоже».", ex: "eu tbm — я тоже" },
  { s: "pq", f: "porque / por que", ru: "И «почему», и «потому что».", ex: "pq vc sumiu? — почему ты пропал?" },
  { s: "fds", f: "fim de semana", ru: "«Выходные».", ex: "bora no fds? — пойдём на выходных?" },
  { s: "obg", f: "obrigado / obrigada", ru: "«Спасибо».", ex: "obg pelo livro! — спасибо за книгу!" },
  { s: "pfv", f: "por favor", ru: "«Пожалуйста».", ex: "me liga pfv — позвони мне, пожалуйста" },
  { s: "mds", f: "meu Deus", ru: "«Боже мой!» — удивление или восторг.", ex: "mds, que lindo — боже, какая красота" },
  { s: "msm", f: "mesmo", ru: "«Правда?», «реально».", ex: "sério msm? — серьёзно?" },
  { s: "deixar no vácuo", f: "оставить в вакууме", ru: "Прочитать и не ответить. Бразильский гостинг.", ex: "ele me deixou no vácuo — он оставил меня без ответа" },
  { s: "visualizou e não respondeu", f: "прочитал и не ответил", ru: "Тот самый статус, который читают дольше, чем сообщение.", ex: "visualizou às 21h — прочитал в 21:00" },
  { s: "dar um perdido", f: "пропасть, слиться", ru: "Когда человек молча исчезает.", ex: "ela deu um perdido — она пропала" },
  { s: "sumido / sumida", f: "пропащий / пропащая", ru: "Так пишут тому, кто давно не выходил на связь.", ex: "oi, sumida! — привет, пропащая!" },
  { s: "crush", f: "краш", ru: "Тот, кто нравится. Слово то же, что у нас.", ex: "meu crush curtiu meu story — краш лайкнул мою сторис" },
  { s: "ranço", f: "внезапная неприязнь", ru: "Когда человек резко перестаёт нравиться.", ex: "peguei ranço — он мне разонравился" }
];

// Похвала по-бразильски: показывается вместе с конфетти
const ELOGIOS = [
  ["Arrasou!", "Ты зажгла!"],
  ["Mandou bem!", "Отлично вышло!"],
  ["Tá voando!", "Ты летишь!"],
  ["Que orgulho!", "Как я тобой горжусь!"],
  ["Show de bola!", "Супер!"],
  ["Brilhou!", "Ты сияешь!"],
  ["Sensacional!", "Потрясающе!"],
  ["É isso aí!", "Так держать!"],
  ["Perfeito!", "Идеально!"],
  ["Muito bem, querida!", "Молодец, дорогая!"]
];
