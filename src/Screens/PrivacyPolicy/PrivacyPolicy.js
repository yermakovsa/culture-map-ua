import s from "./PrivacyPolicy.module.css";
import mainS from "../../App.module.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import i18n from "../../i18n";

export default function PrivacyPolicy() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
  
  return (
    <div className={`${s.main} ${mainS.mainDiv}`}>
      <Helmet>
        <title>{i18n.t('titles.privacy')}</title>
      </Helmet>
      <Header />
      <div className={mainS.container}>
        <div className={s.title}>Політика конфіденційності</div>
        <div className={s.text}>
          <h1>Загальні положення</h1>
          <p>
            Благодійний Фонд «СЕЙВ АРТ ЮА», яке зареєстроване і діє відповідно
            до вимог законодавства України (далі - «Фонд») приймає на себе
            зобов’язання стосовно захисту персональних даних всіх осіб, які
            відвідали цей сайт (далі - “Сайт), у зв'язку з чим прагне захищати
            конфіденційність персональних даних (відомостей чи сукупність
            відомостей про фізичну особу, яка ідентифікована або може бути
            ідентифікована), тим самим створивши і забезпечивши максимально
            комфортні умови використання Сайту кожному користувачеві. У цій
            Політиці конфіденційності та захисту персональних даних (далі –
            «Політика») встановлено порядок здійснення Фондом обробки
            персональних даних, види персональних даних, які збираються, цілі
            використання таких персональних даних, взаємодія Фонду з третіми
            особами, заходи безпеки для захисту персональних даних, умови
            доступу до персональних даних, а також контактна інформація для
            користувача щодо отримання доступу, внесення змін, блокування або
            видалення своїх персональних даних та звернення з будь-якими
            питаннями, які можуть виникнути у користувача щодо практики захисту
            персональних даних.
          </p>
          <h1>Збір та використання персональних даних</h1>
          <p>
            При використанні користувачем Сайту Фондом здійснюється обробка
            даних користувача, а саме:
          </p>
          <ul>
            <li>файли cookie;</li>
            <li>ір-адреси;</li>
            <li>параметри і налаштування інтернет-браузерів (User-agent).</li>
          </ul>
          <p>
            При відвідуванні Сайту фіксуються всі входи до системи. Інші
            відомості стосовно трафіку користувача не обробляються і не
            зберігаються. У будь-якому випадку, коли запитується необов'язкова
            до надання інформація, користувача буде повідомлено в момент збору
            такої інформації. Фонд не збирає персональні дані, що розкривають
            расову чи етнічну приналежність, політичні переконання, релігійні чи
            філософські вірування, чи членство в професійних спілках, генетичні
            дані, біометричні дані з метою єдиної ідентифікації фізичної особи,
            дані стосовно стану здоров’я чи дані про статеве життя фізичної
            особи чи її сексуальної орієнтації. Фонд збирає дані про статистику
            відвідування Сайту. Відомості можуть містити інформацію про
            з'єднання, трафік, браузер користувача, а також про дату, час,
            тривалість роботи в мережі Інтернет та знаходження на Сайті.
          </p>
          <h1>Обробка персональних даних</h1>
          <p>
            Обробка і зберігання наданих персональних даних здійснюється в
            дата-центрах, де розміщується обладнання, що забезпечує
            функціонування сервісів Сайту. Надані персональні дані обробляються
            і можуть зберігатись в базі персональних даних чи окремій таблиці
            бази даних Сайту.
          </p>
          <h1>Цілі використання персональних даних</h1>
          <p>
            Персональні дані користувача використовуються в цілях забезпечення
            надання Інтернет-сервісів Сайту, обміну інформацією/новинами,
            відносин у сфері реклами та комунікації.
          </p>
          <h1>Термін зберігання персональних даних</h1>
          <p>
            Персональні дані зберігаються терміном не більше, ніж це необхідно
            відповідно до мети їх обробки. Після того, як суб'єкт персональних
            даних перестав бути користувачем Сайту шляхом видалення свого
            облікового запису на Сайті, його персональні дані також автоматично
            видаляються.
          </p>
          <h1>Використання файлів cookie</h1>
          <p>
            Cookie - це текстовий файл або файли, що містять невеликий обсяг
            інформації, які надсилаються веб-браузеру і зберігаються на пристрої
            користувача. До таких пристроїв можна віднести комп'ютер, мобільний
            телефон або інший пристрій, за допомогою якого користувач відвідує
            Сайт. Файли cookie можуть бути вічними (вони називаються постійними
            файлами cookie) і зберігатися в комп'ютері поки користувач їх не
            видалить або тимчасовими (такі файли cookie називаються сесійними),
            тобто, зберігаються тільки до закриття браузера. Крім того, файли
            cookie поділяються на основні (вони встановлюються безпосередньо
            відвідуваним Сайтом) і сторонні (встановлюються іншими веб-сайтами).{" "}
          </p>
          <p>Важливо: </p>
          <ul>
            <li>
              при повторному відвідуванні користувачем Сайту, дані файлів cookie
              оновлюються;
            </li>
            <li>
              у більшості випадків, веб-браузер за замовчуванням допускає
              автоматичне зберігання файлів cookie на пристрої користувача;
            </li>
            <li>
              відключення файлів cookie може призвести до обмеження доступу до
              опублікованих матеріалів та/або неповноцінного функціонування
              сервісів Сайту.
            </li>
          </ul>
          <p>
            Фонд дбає про своїх користувачів і намагається зробити перебування
            на Сайті максимально комфортним. Для цього Фонду необхідно за
            допомогою файлів cookie проаналізувати поведінку, переваги і
            інтереси користувача. Такий аналіз допоможе Фонду поліпшити досвід
            взаємодії з Сайтом, визначити найбільш зручний інтерфейс і навігацію
            Сайту.
          </p>
          <p>Фонд використовує такі категорії файлів cookie:</p>
          <ul>
            <li>
              строго необхідні файли cookie - потрібні для пересування
              користувача по веб-сторінці, здійснення пошуку по Сайту,
              здійснення запам'ятовування попередніх дій користувача при
              переході на попередню сторінку в тій же сесії.
            </li>
            <li>
              експлуатаційні файли cookie - агрегують інформацію про те, як
              використовується Сайт. Ці дані зберігаються на пристрої
              користувача між сеансами веб-браузера. Прикладами таких даних
              можуть бути наступні метрики: час перебування на Сайті, найбільш
              часто відвідувані сторінки, розуміння, які саме розділи і сервіси
              Сайту були найбільш цікаві для користувача, наскільки ефективна та
              чи інша рекламна та/або маркетингова кампанія і т.д. Вся
              інформація, зібрана за допомогою експлуатаційних файлів cookie,
              призначена для статистичних та аналітичних задач. Деякі дані
              файлів cookie можуть надаватися третім сторонам, які мають дозвіл
              з боку веб-ресурсу і виключно для зазначених вище цілей.
            </li>
            <li>
              функціональні файли cookie - використовуються для збереження
              параметрів або конфігурацій, які зберігаються на пристрої
              користувача між сеансами веб-браузера. Дані файли cookie також
              дозволяють користувачам дивитися відео, брати участь в
              інтерактивах (опитування, голосування) та взаємодіяти з
              соціальними мережами. Щоб зробити більш приємними враження після
              відвідування ресурсу, зазначені файли cookie запам'ятовують надану
              користувачем інформацію, підвищуючи ефективність взаємодії з
              Сайтом.
            </li>
            <li>
              цільові файли cookie - використовуються для надання контенту, який
              може зацікавити користувача. Ці дані зберігаються на пристрої
              користувача між сеансами веб-браузера. Прикладами таких даних
              можуть бути наступні метрики: відстеження рекомендованого
              текстового, графічного, аудіо та відеоматеріалу, щоб уникнути
              повторного показу, управління цільовою рекламою, оцінка
              ефективності рекламних кампаній, інформація про відвідування
              користувачем інших ресурсів при переходах, а також інші параметри
              налаштування Сайту. Сайт може ділитися цією інформацією з іншими
              сторонами, включаючи медіа-клієнтів, рекламодавців, агентств і
              партнерів по суміжних бізнесах для того, щоб вони надавали якісну
              таргетовану рекламу.
            </li>
            <li>сookie-файли сторонніх сервісів і сервісів аналітики. </li>
          </ul>
          <p>
            Для оперативної доставки, більш якісного відображення і детального
            аналізу контенту на Сайті, Фонд користується послугами, які є
            власністю інших сторонніх компаній, таких як Facebook, Twitter,
            Instagram, Alphabet Inc., Gemius та інші. Наведені як приклад
            компанії можуть використовувати файли cookie на пристрої
            користувача, під час роботи на Сайті. Слід звернути увагу, що Сайт
            не може вплинути на роботу файлів cookie, які використовуються цими
            сервісами. Всі необхідні відомості про їх використання можна
            дізнатися, відвідавши відповідний ресурс.
          </p>
          <p>
            Умови використання Google Analytics -
            https://marketingplatform.google.com/about/analytics/terms/us/
          </p>
          <p>
            Політика конфіденційності сервісу TNS Україна викладена на сторінці
            https://tns-ua.com/konfidentsialnost
          </p>
          <p>
            Політика конфіденційності сервісу Gemius викладена на сторінці
            http://www.gemius.com.ua/politika-konfidencialnosti.html
          </p>
          <p>Управління файлами cookie: </p>
          <p>
            Основні веб-браузери (перераховані нижче) налаштовані на
            автоматичний прийом файлів cookie. Для того, щоб їх відключити
            скористайтеся функцією довідки в своєму браузері. Довідку можна
            викликати через меню або за допомогою кнопки F1.
          </p>
          <p>
            Microsoft Edge -
            https://privacy.microsoft.com/en-US/privacystatement
          </p>
          <p>
            Mozilla Firefox -
            https://www.mozilla.org/en-US/privacy/websites/#cookiesGoogle
          </p>
          <p>Chrome - https://support.google.com/chrome/answer/95647?hl=en</p>
          <p>
            Opera - https://help.opera.com/en/latest/web-preferences/#cookies
          </p>
          <p>
            Safari for macOS - https://support.apple.com/kb/PH21411?locale=en_US
          </p>
          <p>Важливо: </p>
          <p>
            конфігурація налаштування файлів cookie для веб-браузерів мобільних
            пристроїв може відрізнятися; варто нагадати, що повноцінна робота з
            Сайтом доступна тільки при використанні файлів cookie; відключення
            файлів cookie може привести до обмеження доступу до змісту і
            неповноцінного функціонування сервісів Сайту. Щоб звернутися до
            Фонду з приводу використання файлів cookie, відправте повідомлення
            по електронній пошті на INFO@SAVEARTUA.COM. Інформація про
            користувачів, яка отримана за допомогою файлів cookie, не продається
            і не поширюється у відкритому доступі, а також є власністю компанії,
            якій належить ресурс.{" "}
          </p>
          <h1>Взаємодія Сайту з іншими ресурсами</h1>
          <p>
            При використанні користувачем Сайту на його сторінках можуть бути
            присутніми коди інших інтернет ресурсів і третіх осіб, в результаті
            чого такі інтернет ресурси і треті особи отримують дані користувача.
            Отже, ці інтернет-ресурси можуть отримувати і обробляти інформацію,
            про те, що користувач відвідав ці сторінки, а також іншу інформацію,
            яку передає браузер користувача.{" "}
          </p>
          <p>Такими інтернет-ресурсами можуть бути: </p>
          <ul>
            <li>
              системи банеропоказів (наприклад, DoubleClick for Publishers,
              Admixer, AdRiver та ін.);
            </li>
            <li>
              соціальні плагіни мереж (наприклад, Discus, Facebook, Twitter,
              Google+);
            </li>
            <li>чат-боти (ManyChat, Chatfuel та ін.).</li>
          </ul>
          <p>
            Використання зазначених сервісів Фонду необхідно для оперативного
            аналізу відвідувань Сайту, внутрішньої і зовнішньої оцінки
            відвідуваності Сайту, глибини переглядів, активності користувачів.
            Дані, отримані від зазначених сервісів Фонд не зберігає і не
            обробляє. Відповідно, якщо користувач в силу будь-яких причин не
            бажає, щоб зазначені сервіси отримували доступ до його персональних
            даних, користувач може за власним бажанням вийти зі свого акаунта чи
            профілю, очистити файли cookie (через свій браузер).{" "}
          </p>
          <h1>Безпека неповнолітніх</h1>
          <p>
            Сайт не призначений для неповнолітніх користувачів. Фонд дуже
            серйозно ставиться до питань безпеки, особливо щодо осіб, які не
            досягли повноліття, у зв'язку з чим Фонд звертається до батьків із
            закликом пояснити своїм дітям про проблеми безпеки в Інтернеті, про
            їх конкретну мету і потребу у використанні Сайту.{" "}
          </p>
          <h1>Взаємодія Фонду з третіми особами стосовно персональних даних</h1>
          <p>
            Фонд не здійснює передачу персональних даних третім особам, крім
            випадків, коли така передача є вимогою законодавства, на прохання
            суб'єкта персональних даних або в інших випадках, викладених в цій
            Політиці. Фонд розуміє, що особиста інформація є цінністю і
            невід'ємним змістом, в тому числі, особистих немайнових прав
            будь-якої фізичної особи, тому вживає всіх можливих заходів для
            захисту особистої інформації користувачів, добровільно і усвідомлено
            переданої останніми Фонду. На Сайті можуть бути посилання на інші
            веб-сайти (виключно в інформаційних цілях). При переході по
            посиланню на інші веб-сайти дія цієї Політики на такі сайти
            поширюватися не буде. У зв'язку з чим Фонд рекомендує переглядати
            політику в сфері конфіденційності і персональних даних кожного
            веб-сайту перед тим, як передавати будь-які персональні дані, за
            якими Вас можуть ідентифікувати.{" "}
          </p>
          <h1>
            Конфіденційність активності суб'єкта персональних даних на Сайті
          </h1>
          <p>
            Відомості про активність (трафік) на Сайті користувачів, які
            проходять через мережу або електронну пошту користувача, захищені
            відповідно до законодавства.{" "}
          </p>
          <h1>Захист персональних даних</h1>
          <p>
            Фонд використовує загальноприйняті стандарти технологічного та
            операційного захисту інформації та персональних даних від втрати,
            неправильного використання, зміни або знищення. Однак, не дивлячись
            на всі зусилля, Фонд не може гарантувати абсолютну захищеність від
            будь-яких загроз, що виникають поза межами регулювання Фонду. Фонд
            забезпечує застосування всіх відповідних зобов'язань щодо дотримання
            конфіденційності, а також технічних і організаційних заходів безпеки
            для запобігання несанкціонованому або незаконному розголошенню або
            обробці такої інформації та даних, їх випадковій втраті, знищенню
            або пошкодженню. Фонд надає доступ до інформації і персональних
            даних тільки уповноваженим працівникам, які дали згоду на
            забезпечення конфіденційності такої інформації та даних відповідно
            до вимог Фонду. Поширення персональних даних без згоди суб'єкта
            персональних даних або уповноваженої ним особи дозволяється у
            випадках, визначених законом, і лише (якщо це необхідно) в інтересах
            національної безпеки, економічного добробуту та прав людини.{" "}
          </p>
          <h1>Умови доступу до персональних даних</h1>
          <p>
            Порядок доступу до персональних даних третіх осіб визначається
            умовами згоди користувача, наданої володільцю персональних даних, на
            обробку цих даних або відповідно до вимог закону. Користувач має
            право на одержання будь-яких відомостей про себе у будь-якого
            суб'єкта відносин, пов'язаних з персональними даними, за умови
            зазначення прізвища, ім'я та по батькові, місця проживання (місця
            перебування) і реквізитів документа, що посвідчує фізичну особу, яка
            подає запит, крім випадків, установлених законом. Доступ користувача
            до даних про себе здійснюється безоплатно.{" "}
          </p>
          <h1>Права суб'єкта персональних даних</h1>
          <p>
            Фонд доводить до відома користувача про його права як суб'єкта
            персональних даних, які врегульовані Законом України «Про захист
            персональних даних», а саме:{" "}
          </p>
          <p>
            1) знати про джерела збирання, місцезнаходження своїх персональних
            даних, мету їх обробки, місцезнаходження або місце проживання
            (перебування) володільця чи розпорядника персональних даних або дати
            відповідне доручення щодо отримання цієї інформації уповноваженим
            ним особам, крім випадків, встановлених законом;{" "}
          </p>
          <p>
            2) отримувати інформацію про умови надання доступу до персональних
            даних, зокрема інформацію про третіх осіб, яким передаються його
            персональні дані;{" "}
          </p>
          <p>3) на доступ до своїх персональних даних; </p>
          <p>
            4) отримувати не пізніш як за тридцять календарних днів з дня
            надходження запиту, крім випадків, передбачених законом, відповідь
            про те, чи обробляються його персональні дані, а також отримувати
            зміст таких персональних даних;{" "}
          </p>
          <p>
            5) пред'являти вмотивовану вимогу володільцю персональних даних із
            запереченням проти обробки своїх персональних даних;{" "}
          </p>
          <p>
            6) пред'являти вмотивовану вимогу щодо зміни або знищення своїх
            персональних даних будь-яким володільцем та розпорядником
            персональних даних, якщо ці дані обробляються незаконно чи є
            недостовірними;{" "}
          </p>
          <p>
            7) на захист своїх персональних даних від незаконної обробки та
            випадкової втрати, знищення, пошкодження у зв'язку з умисним
            приховуванням, ненаданням чи несвоєчасним їх наданням, а також на
            захист від надання відомостей, що є недостовірними чи ганьблять
            честь, гідність та ділову репутацію фізичної особи;{" "}
          </p>
          <p>
            8) звертатися із скаргами на обробку своїх персональних даних до
            Уповноваженого Верховної Ради України з прав людини або до суду;{" "}
          </p>
          <p>
            9) застосовувати засоби правового захисту в разі порушення
            законодавства про захист персональних даних;{" "}
          </p>
          <p>
            10) вносити застереження стосовно обмеження права на обробку своїх
            персональних даних під час надання згоди;{" "}
          </p>
          <p>11) відкликати згоду на обробку персональних даних; </p>
          <p>12) знати механізм автоматичної обробки персональних даних; </p>
          <p>
            13) на захист від автоматизованого рішення, яке має для нього
            правові наслідки.{" "}
          </p>
          <p>
            Для оновлення, отримання доступу, внесення змін, блокування або
            видалення своїх персональних даних, відкликання згоди на обробку
            персональних даних, які були Вами надані Фонду відповідно до цієї
            Політики, або в разі наявності будь-яких зауважень, побажань або
            претензій щодо Ваших персональних даних, які обробляються Фондом,
            будь ласка, звертайтеся до Фонду: електронною поштою на
            INFO@SAVEARTUA.COM.{" "}
          </p>
          <h1>Зміна Політики</h1>
          <p>
            До цієї Політики періодично та без попереднього повідомлення
            користувача про таке можуть вноситись зміни та доповнення, у тому
            числі, при зміні вимог законодавства. У випадку внесення істотних
            змін до цієї Політики Фондом буде розміщено повідомлення на Сайті та
            зазначено термін набрання цими змінами чинності. Якщо протягом
            зазначеного терміну Ви не відмовитеся від їх прийняття в письмовій
            формі, це означатиме, що Ви погоджуєтеся з відповідними змінами
            Політики. Просимо час від часу переглядати Політику для того, щоб
            бути в курсі будь-яких змін або доповнень.{" "}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
