import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import htmlDocx from "html-docx-js/dist/html-docx";
import { saveAs } from "file-saver";
import css from "./Document.module.css";
import { ShowingD } from "../redux/actions";
import {
  inpersonEl,
  customerEl,
  basisEl,
  termEl,
  placeEl,
  codeEl,
  customerProviderEl,
  providerEl,
  productEl,
  showDEl,
} from "../redux/selectors";
import { useSelector } from "react-redux";
import { useExportToWord } from "../exportToWord";

function Document() {
  const dispatch = useDispatch();

  const numberToUAText = (amount) => {
    const ones = [
      "",
      "один",
      "два",
      "три",
      "чотири",
      "п’ять",
      "шість",
      "сім",
      "вісім",
      "дев’ять",
    ];
    const teens = [
      "десять",
      "одинадцять",
      "дванадцять",
      "тринадцять",
      "чотирнадцять",
      "п’ятнадцять",
      "шістнадцять",
      "сімнадцять",
      "вісімнадцять",
      "дев’ятнадцять",
    ];
    const tens = [
      "",
      "",
      "двадцять",
      "тридцять",
      "сорок",
      "п’ятдесят",
      "шістдесят",
      "сімдесят",
      "вісімдесят",
      "дев’яносто",
    ];
    const hundreds = [
      "",
      "сто",
      "двісті",
      "триста",
      "чотириста",
      "п’ятсот",
      "шістсот",
      "сімсот",
      "вісімсот",
      "дев’ятсот",
    ];
    const thousandsForms = ["тисяча", "тисячі", "тисяч"];
    const millionsForms = ["мільйон", "мільйони", "мільйонів"];

    const getForm = (number, forms) => {
      const n = Math.abs(number) % 100;
      const n1 = n % 10;
      if (n > 10 && n < 20) return forms[2];
      if (n1 > 1 && n1 < 5) return forms[1];
      if (n1 === 1) return forms[0];
      return forms[2];
    };

    const convertTriad = (num, feminine = false) => {
      let text = "";
      const h = Math.floor(num / 100);
      const t = Math.floor((num % 100) / 10);
      const o = num % 10;
      text += hundreds[h] ? hundreds[h] + " " : "";
      if (t > 1) text += tens[t] + " " + (ones[o] || "");
      else if (t === 1) text += teens[o] + " ";
      else text += ones[o] || "";
      if (feminine) text = text.replace("один", "одна").replace("два", "дві");
      return text.trim();
    };

    const parts = amount.toFixed(2).split(".");
    const hryvnia = parseInt(parts[0], 10);
    const kopiyky = parts[1];
    let text = "";

    if (hryvnia === 0) text = "нуль гривень";
    else {
      const millions = Math.floor(hryvnia / 1_000_000);
      const thousands = Math.floor((hryvnia % 1_000_000) / 1000);
      const remainder = hryvnia % 1000;

      if (millions > 0) {
        text += `${convertTriad(millions)} ${getForm(
          millions,
          millionsForms
        )} `;
      }

      if (thousands > 0) {
        text += `${convertTriad(thousands, true)} ${getForm(
          thousands,
          thousandsForms
        )} `;
      }

      text += `${convertTriad(remainder)} ${getForm(remainder, [
        "гривня",
        "гривні",
        "гривень",
      ])}`;
    }

    return `${amount.toFixed(2)} грн. ${kopiyky} коп. (${
      text.charAt(0).toUpperCase() + text.slice(1)
    } ${kopiyky} копійок)`;
  };

  const showD = useSelector(showDEl);
  console.log(showD);

  const showDF = () => {
    dispatch(ShowingD(!showD));
  };

  function updateName(name) {
    const nameAreey = name.split(" ");
    console.log(nameAreey);
    const upNameAreey = nameAreey.splice(0, 2);
    console.log(upNameAreey);
    const newAreeyName = [upNameAreey[0], upNameAreey[1].toUpperCase()];
    console.log(newAreeyName);
    const newTextName = newAreeyName.join(" ");
    console.log(newTextName);
    return newTextName;
  }

  const inperson = useSelector(inpersonEl);
  const customer = useSelector(customerEl);
  const basis = useSelector(basisEl);
  const term = useSelector(termEl);
  const place = useSelector(placeEl);
  const code = useSelector(codeEl);
  const customerProvider = useSelector(customerProviderEl);
  const provider = useSelector(providerEl);
  const product = useSelector(productEl);

  const contractRef = useRef(null);

  // функція експорту
  const { exportElementToWord } = useExportToWord();

  const buildCssTextForWord = () => {
    return `
      .${css.container} {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
  
      .${css.page} {
        width: 210mm;
        min-height: 297mm;
        margin: auto;
        padding: 25mm;
        padding-top: 0px;
        font-family: "Times New Roman", serif;
        font-size: 12pt;
        color: #000;
        background: #fff;
        box-sizing: border-box;
      }
  
      .${css.title} {
        text-align: center;
        font-weight: bold;
        text-transform: uppercase;
        margin-bottom: 15px;
      }
  
      .${css.centrText} {
        font-weight: bold;
        /* text-align: right; */
        /* font-style: italic; */
        font-size: 25pt;
       
       /* display: flex;
    justify-content: center; */
      }
      
      .${css.tableText} {
        margin-left: auto;
        margin-right: auto;
      }
      .${css.infoText} {
        display: flex;
      }

      .${css.dataText} {
        width: 135px;
      }
  
      .${css.subtitle} {
        border-bottom: 2px solid #000;
        font-weight: bold;
        font-style: italic;
        margin-bottom: 10px;
        text-align: right;
      }
  
      .${css.subtitlee} {
        border-bottom: 2px solid #000;
        font-weight: bold;
        font-style: italic;
        margin-bottom: 10px;
        text-align: center;
      }
  
      .${css.subtitleCentr} {
        width: 200px;
      }
  
      .${css.subtitleCenter} {
        margin-left: 250px;
        width: 150px;
      }
  
      .${css.text} {
        font-size: 11pt;
        margin-bottom: 10px;
        text-align: center;
      }
  
      .${css.sectionTitle} {
        text-align: center;
        font-weight: bold;
        margin-top: 15px;
        margin-bottom: 5px;
        text-transform: uppercase;
      }
  
      .${css.paragraph} {
        text-align: justify;
        line-height: 1.4;
        margin-bottom: 8px;
      }
  
      .${css.tableWrapper} {
        margin-top: 15px;
        margin-bottom: 15px;
      }
  
      .${css.tableWrappers} {
        margin-top: 75px;
        margin-bottom: 15px;
      }
  
      .${css.table} {
        width: 100%;
        border-collapse: collapse;
        font-size: 11pt;
      }
  
      .${css.table} th,
      .${css.table} td {
        width: 50%;

        padding: 6px;
        vertical-align: top;
      }
  
      .${css.tablse} th,
      .${css.tablse} td {
        border-collapse: collapse;
        font-size: 11pt;
        border: 1px solid black;
        padding: 6px;
        vertical-align: top;

      }
  

      .${css.signatures} {
        line-height: 2;
        font-weight: bold;
      }
  
      .${css.signature} {
        margin-top: 25px;
        display: flex;
      }
  
      .${css.signatureText} {
        border-top: 2px solid #000;
      }
  
      .${css.signatureName} {
        margin-left: auto;
      }
  
      .${css.footerInfo} {
        width: 250px;
        margin-bottom: 25px;
        margin-left: auto;
      }
  
      /* списки без маркерів */
      ul {
        list-style: none;
        padding-left: 0;
        margin-left: 0;
      }
    `;
  };

  const handleExport = () => {
    const cssText = buildCssTextForWord();

    exportElementToWord({
      element: contractRef.current,
      cssText,
      filename: "ДОГОВІР ПРО ЗАКУПІВЛЮ ТОВАРУ",
    });
  };
  // --- Зберегти як Word ---

  const handlePrint = () => {
    window.print();
  };

  const totalProductSum = product.reduce((acc, pro) => {
    console.log(acc, pro.cost, pro.numder);
    return acc + pro.cost * pro.number;
  }, 0);

  return (
    <div className={css.container}>
      {/* --- Кнопки --- */}
      <div className={css.buttons}>
        <button className={css.btn} onClick={handleExport}>
          Зберегти як Word
        </button>
        <button className={css.btn} onClick={handlePrint}>
          Друк
        </button>
        <button type="button" className={css.btn} onClick={showDF}>
          Назад
        </button>
      </div>

      {/* --- Вміст договору --- */}
      <div ref={contractRef}>
        {/* СТОРІНКА 1 */}
        <div className={css.page}>
          <table className={css.tableText}>
            <tbode>
              <tr>
                <td>
                  <p className={css.centrText}> ДОГОВІР №</p>

                  <p className={css.centrText}>ПРО ЗАКУПІВЛЮ ТОВАРУ</p>
                  <br/>
                </td>
              </tr>
            </tbode>
          </table>

          {/* <h1 className={css.title}>
            <span className={css.centrText}>ДОГОВІР №</span> ПРО ЗАКУПІВЛЮ
            ТОВАРУ
          </h1> */}

          <table>
            <tbode>
              <tr>
                <td>
                  <p className={css.subtitlee}> с. Видричка .</p>
                  <p className={css.text}>(місце укладення договору)</p>
                </td>
                <td className={css.dataText}></td>
                <td className={css.dataText}></td>
                <td className={css.dataText}>
                  <p className={css.subtitle}>2025p.</p>
                  <p className={css.text}>(дата)</p>
                </td>
              </tr>
            </tbode>
          </table>
          {/* <div className={css.infoText}>
            <div className={css.subtitleCentr}>
              <p className={css.subtitlee}> с. Видричка .</p>
              <p className={css.text}>(місце укладення договору)</p>
            </div>
            <div className={css.subtitleCenter}>
              <p className={css.subtitle}>2025p.</p>
              <p className={css.text}>(дата)</p>
            </div>
          </div> */}

          <p className={css.paragraph}>
            <span>
              Відділ освіти, культури, сім’ї, молоді та спорту Богданської
              сільської ради
            </span>
            , в особі {inperson.job} {inperson.name}, що  діє на підставі 
            Положення про відділ освіти, культури, сім’ї, молоді та спорту
            Богданської сільської ради що затверджено рішенням сесії Богданської
            сільської ради від 24 листопада 2020 року №10 з внесеними
            доповненнями рішенням сесії Богданської сільської ради від 10 грудня
            2020 року №24 (далі – Замовник), з однієї сторони, і {customer.job}{" "}
            в особі {customer.name}, що діє на підставі {basis}. (далі –
            Учасник), керуючись Законом України «Про публічні закупівлі» (зі
            змінами) з урахуванням постанови Кабінету Міністрів України від 12
            жовтня 2022 року № 1178 «Про затвердження особливостей здійснення
            публічних закупівель товарів, робіт і послуг для замовників,
            передбачених Законом України &quot;Про публічні закупівлі&quot;, на
            період дії правового режиму воєнного стану в Україні та протягом 90
            днів з дня його припинення або скасування», Цивільним кодексом
            України з іншої сторони, разом – Сторони, уклали цей договір про
            таке:
          </p>

          <h2 className={css.sectionTitle}>1. ПРЕДМЕТ ДОГОВОРУ</h2>
          <p className={css.paragraph}>
            1.1.Учасник зобов’язується у 2025 році, поставити Замовникові товар,
            а саме:{" "}
            {product.map((pro) => {
              return (
                <>
                  <spun>
                    {pro.name}
                    {", "}
                  </spun>
                </>
              );
            })}
            що зазначений в накладній - за кодом ДК 021:2015: {code}, а Замовник
            — прийняти і оплатити такі товари.
          </p>
          <p className={css.paragraph}>
            1.2.Ціна та кількість товару зазначені в специфікації, що додається
            до цього Договору (Додаток №1).
          </p>
          <p className={css.paragraph}>
            1.3. Обсяги товару можуть бути зменшені залежно від рельного
            фінансування видатків.
          </p>

          <h2 className={css.sectionTitle}>2. ЯКІСТЬ ПОСТАВКИ ТОВАРІВ</h2>
          <p className={css.paragraph}>
            2.1.Учасник повинен виконати передбачені цим договором товари,
            якість яких відповідає умовам чинного законодавства.
          </p>

          <h2 className={css.sectionTitle}>3. ЦІНА ДОГОВОРУ</h2>
          <p className={css.paragraph}>
            3.1.Сума договору становить:
            {numberToUAText(totalProductSum)} без ПДВ.
          </p>
          <p className={css.paragraph}>
            3.2. Постачальник не вправі збільшувати узгоджену ціну в
            односторонньому порядку.
          </p>
          <p className={css.paragraph}>
            3.3.Сума цього Договору може бути зменшена Покупцем залежно від
            реального фінансування своїх видатків. Підписання Покупцем складеної
            Постачальником додаткової угоди до Договору свідчить про досягнення
            Сторонами згоди про нову ціну Товару.
          </p>

          <h2 className={css.sectionTitle}>4. ПОРЯДОК ЗДІЙСНЕННЯ ОПЛАТИ</h2>
          <p className={css.paragraph}>
            4.1.Розрахунки проводяться шляхом оплати Замовником поставленої
            продукції після пред’явлення Учасником накладної на оплату
            продукції.
          </p>
          <p className={css.paragraph}>
            4.2.Усі платіжні документи за контрактом оформляються з дотриманням
            вимог законодавства.
          </p>
          <p className={css.paragraph}>
            4.3.Замовник не несе відповідальності за несвоєчасну оплату товару
            через затримку оплати відповідних платежів управлінням Державної
            казначейської служби України.
          </p>

          <h2 className={css.sectionTitle}>5. ПОСТАВКА ТОВАРУ</h2>
          <p className={css.paragraph}>
            5.1. Строк поставки Товару: з моменту підписання договору та до{" "}
            {term} року.
          </p>
          <p className={css.paragraph}>
            5.2.Місце поставки Товару: {place}, згідно накладної.
          </p>
          <p className={css.paragraph}>
            5.3.Продавець зобов’язується самостійно доставити Товар
            власним/орендованим транспортом, або за допомогою служби доставки.
          </p>

          <h2 className={css.sectionTitle}>6. ПРАВА ТА ОБОВ’ЯЗКИ СТОРІН</h2>
          <p className={css.paragraph}>6.1. Замовник зобов’язаний:</p>
          <p className={css.paragraph}>
            6.1.1.Своєчасно та в повному обсязі сплачувати за поставлені товари;
          </p>
          <p className={css.paragraph}>
            6.1.2. Приймати поставлені товари згідно з накладними;
          </p>
          <p className={css.paragraph}>6.2. Замовник має право:</p>
          <p className={css.paragraph}>
            6.2.1.У разі невиконання зобов’язань Учасником Замовник має право
            достроково розірвати цей договір, повідомивши про це учасника ;
          </p>
          <p className={css.paragraph}>
            6.2.2. Контролювати поставку товару у строки, встановлені цим
            договором;
          </p>
          <p className={css.paragraph}>
            6.2.3.Зменшувати обсяг поставки товару та загальну вартість договору
            залежно від реального фінансування видатків. У такому разі сторони
            вносять відповідні зміни до договору;
          </p>
          <p className={css.paragraph}>
            6.2.4.Розірвати договір в односторонньому порядку у зв’язку з
            відсутністю подальшої потреби в закупівлі товарів, робіт і послуг,
            зменшення або збільшення обсягів у придбанні певних товарів, робіт
            та послуг, зменшення або відсутність бюджетних асигнувань,
            скорочення видатків та кошторисних призначень, перерозподілу
            бюджетних коштів/субвенцій, тощо&quot;.
          </p>
          <p className={css.paragraph}>
            6.2.5.Повернути рахунок виконавцеві без здійснення оплати в разі
            неналежного оформлення документів, зазначених у пунктах 4.2., 4.3.
            контракту (відсутність печатки, підписів тощо);
          </p>
          <p className={css.paragraph}>6.3.Учасник зобов’язаний:</p>
          <p className={css.paragraph}>
            6.3.1.Забезпечити поставку товару у строки, встановлені цим
            договором;
          </p>
          <p className={css.paragraph}>
            6.3.2.Забезпечити поставку товару , якість яких відповідає умовам,
            встановленим цим договором;
          </p>
          <p className={css.paragraph}>6.4. Учасник має право:</p>
          <p className={css.paragraph}>
            6.4.1.Своєчасно та в повному обсязі отримувати плату за поставлені
            товари;
          </p>
          <p className={css.paragraph}>6.4.2. На дострокову поставку товару;</p>
          <p className={css.paragraph}>
            6.4.3.У разі невиконання зобов’язань Замовником Учасник має право
            достроково розірвати цей договір, повідомивши про це учасника;
          </p>

          <h2 className={css.sectionTitle}>7. ВІДПОВІДАЛЬНІСТЬ СТОРІН</h2>
          <p className={css.paragraph}>
            7.1.У разі невиконання або неналежного виконання своїх зобов’язань
            за договором сторони несуть відповідальність, передбачену законами
            та договором.
          </p>

          <h2 className={css.sectionTitle}>8. ОБСТАВИНИ НЕПЕРЕБОРНОЇ СИЛИ</h2>
          <p className={css.paragraph}>
            8.1.Сторони звільняються від відповідальності за невиконання або
            неналежне виконання зобов’язань за договором у разі виникнення
            обставин непереборної сили, які не існували під час укладання
            договору та виникли поза волею сторін (аварія, катастрофа, стихійне
            лихо, епідемія, епізоотія, війна, інша небезпечна подія).
          </p>
          <p className={css.paragraph}>
            8.2.Сторона, що не може виконувати зобов’язання за контрактом
            унаслідок дії обставин непереборної сили, повинна повідомити про це
            іншу сторону у письмовій формі.
          </p>

          <h2 className={css.sectionTitle}>9. ВИРІШЕННЯ СПОРІВ</h2>
          <p className={css.paragraph}>
            9.1.У випадку виникнення спорів або розбіжностей сторони
            зобов’язуються вирішувати їх шляхом взаємних переговорів та
            консультацій.
          </p>
          <p className={css.paragraph}>
            9.2.У разі недосягнення сторонами згоди спори (розбіжності)
            вирішуються у судовому порядку.
          </p>

          <h2 className={css.sectionTitle}>10. СТРОК ДІЇ ДОГОВОРУ</h2>
          <p className={css.paragraph}>
            10.1.Договір набирає чинності з моменту його підписання Сторонами і
            діє до 31 грудня 2025 року, а в частині розрахунків - до повного
            виконання Сторонами передбачених Договором фінансових зобов’язань.
          </p>
          <p className={css.paragraph}>
            10.2. Договір укладається і підписується у _2-х_ примірниках, що
            мають однакову юридичну силу.
          </p>

          <h2 className={css.sectionTitle}>11. ІНШІ УМОВИ</h2>
          <p className={css.paragraph}>
            11.1.У випадках, не передбачених цим Договором, Сторони керуються
            чинним законодавством України.
          </p>
          <p className={css.paragraph}>
            11.2.Після підписання Договору всі попередні переговори, угоди і
            протоколи про наміри з питань, так чи інакше зв&#39;язаних з цим
            Договором, втрачають юридичну силу.
          </p>
          <p className={css.paragraph}>
            11.3.Жодна із Сторін не має права передавати свої права за цим
            Договором третій Стороні без письмової згоди іншої Сторони.
          </p>
          <p className={css.paragraph}>
            11.4.У випадку зміни місцезнаходження Покупець зобов&#39;язаний
            письмово протягом трьох діб повідомити про це Продавця.
          </p>
          <p className={css.paragraph}>
            11.5. Істотні умови договору про закупівлю не можуть здійснюватися
            після його підписання до виконання зобов&#39;язань сторонами в
            повному обсязі, крім випадків:
          </p>

          <ul>
            <li>
              <p className={css.paragraph}>
                1) зменшення обсягів закупівлі, зокрема з урахуванням фактичного
                обсягу видатків замовника;
              </p>
            </li>
            <li>
              <p className={css.paragraph}>
                2) погодження зміни ціни за одиницю товару в договорі про
                закупівлю у разі коливання ціни такого товару на ринку, що
                відбулося з моменту укладення договору про закупівлю або
                останнього внесення змін до договору про закупівлю в частині
                зміни ціни за одиницю товару. Зміна ціни за одиницю товару
                здійснюється пропорційно коливанню ціни такого товару на ринку
                (відсоток збільшення ціни за одиницю товару не може перевищувати
                відсоток коливання (збільшення) ціни такого товару на ринку) за
                умови документального підтвердження такого коливання та не
                повинна призвести до збільшення суми, визначеної в договорі про
                закупівлю на момент його укладення;
              </p>
            </li>
            <li>
              <p className={css.paragraph}>
                3) покращення якості предмета закупівлі за умови, що таке
                покращення не призведе до збільшення суми, визначеної в договорі
                про закупівлю;
              </p>
            </li>
            <li>
              <p className={css.paragraph}>
                4) продовження строку дії договору про закупівлю та строку
                виконання зобов’язань щодо передачі товару, виконання робіт,
                надання послуг у разі виникнення документально підтверджених
                об’єктивних обставин, що спричинили таке продовження, у тому
                числі обставин непереборної сили,затримки фінансування витрат
                замовника, за умови, що такі зміни не призведуть до збільшення
                суми, визначеної в договорі про закупівлю;
              </p>
            </li>
            <li>
              <p className={css.paragraph}>
                5) погодження зміни ціни в договорі про закупівлю в бік
                зменшення (без зміни кількості (обсягу) та якості товарів, робіт
                і послуг);
              </p>
            </li>
            <li>
              <p className={css.paragraph}>
                6) зміни ціни в договорі про закупівлю у зв’язку з зміною ставок
                податків і зборів та/або зміною умов щодо надання пільг з
                оподаткування – пропорційно до зміни таких ставок та/або пільг з
                оподаткування, а також у зв’язку з зміною системи оподаткування
                пропорційно до зміни податкового навантаження внаслідок зміни
                системи оподаткування;
              </p>
            </li>
            <li>
              <p className={css.paragraph}>
                7) зміни встановленого згідно із законодавством органами
                державної статистики індексу споживчих цін, зміни курсу
                іноземної валюти, зміни біржових котирувань або показників
                Platts, ARGUS, регульованих цін (тарифів), нормативів,
                середньозважених цін на електроенергію на ринку “на добу
                наперед”, що застосовуються в договорі про закупівлю, у разі
                встановлення в договорі про закупівлю порядку зміни ціни;
              </p>
            </li>
            <li>
              <p className={css.paragraph}>
                8) зміни умов у зв’язку із застосуванням положень частини шостої
                статті 41 Закону.
              </p>
            </li>
          </ul>

          <h2 className={css.sectionTitle}>
            12. МІСЦЕЗНАХОДЖЕННЯ ТА БАНКІВСЬКІ РЕКВІЗИТИ СТОРІН
          </h2>
          <div className={css.tableWrapper}>
            <table className={css.table}>
              <thead>
                <tr>
                  <th>ЗАМОВНИК</th>
                  <th>ПОСТАЧАЛЬНИК</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Відділ освіти, культури, сім’ї, молоді та спорту Богданської
                    сільської ради
                    <br />
                    <br />
                    Юридична адреса:
                    <br /> 90646, Україна, Закарпатська обл.
                    <br /> Рахівський р-н, с.Видричка вул. Набережна, буд.29
                    <br />
                    Код ЄДРПОУ: 44070742
                    <br />
                    {customerProvider.pp.map((prov) => {
                      return (
                        <>
                          p/p- {prov}
                          <br />
                        </>
                      );
                    })}
                    <br />
                    МФО: 820172 в ДКСУ м.Київ
                    <br />
                    {inperson.job}
                    <br />
                    <table className={css.tablee}>
                      <tbode>
                        <tr>
                          <td>
                            <p className={css.signatureText}>(підпис)</p>
                          </td>
                          <td>
                            <p className={css.signatureName}>
                              {updateName(inperson.name)}
                            </p>
                          </td>
                        </tr>
                      </tbode>
                    </table>
                    <br />
                    м.п.
                  </td>

                  <td>
                    {customer.job}
                    <br />
                    {customer.name}
                    <br />
                    Юридична адреса:
                    <br /> {provider.home}
                    <br />
                    Код ЄДРПОУ: {provider.code}
                    <br />
                    р/р: {provider.pp}
                    <br />
                    МФО: {provider.mfo}
                    <br />
                    {provider.tel}
                    <br />
                    {customer.job}
                    <br />
                    <table className={css.tablee}>
                      <tbode>
                        <tr>
                          <td>
                            <p className={css.signatureText}>(підпис)</p>
                          </td>
                          <td>
                            <p className={css.signatureName}>
                              {updateName(customer.name)}
                            </p>
                          </td>
                        </tr>
                      </tbode>
                    </table>
                    <br />
                    м.п.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* СТОРІНКА 2 */}
        <div className={css.page}>
          <div className={css.footerInfo}>
            <p className={css.paragraph}>Додаток № 1</p>
            <p className={css.paragraph}>До Договору № ______________</p>
            <p>від «_____» _____________ 2025р.</p>
          </div>

          <h3 className={css.sectionTitle}>СПЕЦИФІКАЦІЯ</h3>

          <div className={css.tableWrapper}>
            <table className={css.tablse}>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Найменування товару</th>
                  <th>Од. вим.</th>
                  <th>Кількість</th>
                  <th>Ціна за одиницю (грн.)</th>
                  <th>Сума (грн.)</th>
                </tr>
              </thead>
              <tbody>
                {product.map((pro) => {
                  return (
                    <>
                      <tr>
                        <td>{pro.id}</td>
                        <td>{pro.name}</td>
                        <td>шт</td>
                        <td>{pro.number}</td>
                        <td>{pro.cost}</td>
                        <td>{pro.number * pro.cost}</td>
                      </tr>
                    </>
                  );
                })}

                <tr>
                  <td
                    colSpan="5"
                    style={{ textAlign: "right", fontWeight: "bold" }}
                  >
                    Разом:
                  </td>
                  <td>{totalProductSum}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className={css.paragraph}>
            Загальна сума Договору складає: {numberToUAText(totalProductSum)}{" "}
            без ПДВ.
          </p>

          <div className={css.tableWrappers}>
            <table className={css.table}>
              <thead>
                <tr>
                  <th>ЗАМОВНИК</th>
                  <th>ПОСТАЧАЛЬНИК</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Відділ освіти, культури, сім’ї, молоді та спорту Богданської
                    сільської ради
                    <br />
                    <br />
                    Юридична адреса:
                    <br /> 90646, Україна, Закарпатська обл.
                    <br /> Рахівський р-н, с.Видричка вул. Набережна, буд.29
                    <br />
                    Код ЄДРПОУ: 44070742
                    <br />
                    {customerProvider.pp.map((prov) => {
                      return (
                        <>
                          p/p- {prov}
                          <br />
                        </>
                      );
                    })}
                    <br />
                    МФО: 820172 в ДКСУ м.Київ
                    <br />
                    {inperson.job}
                    <br />
                    <table className={css.tablee}>
                      <tbode>
                        <tr>
                          <td>
                            <p className={css.signatureText}>(підпис)</p>
                          </td>
                          <td>
                            <p className={css.signatureName}>
                              {updateName(inperson.name)}
                            </p>
                          </td>
                        </tr>
                      </tbode>
                    </table>
                    <br />
                    м.п.
                  </td>

                  <td>
                    {customer.job}
                    <br />
                    {customer.name}
                    <br />
                    Юридична адреса:
                    <br /> {provider.home}
                    <br />
                    Код ЄДРПОУ: {provider.code}
                    <br />
                    р/р: {provider.pp}
                    <br />
                    МФО: {provider.mfo}
                    <br />
                    {provider.tel}
                    <br />
                    {customer.job}
                    <br />
                    <table className={css.tablee}>
                      <tbode>
                        <tr>
                          <td>
                            <p className={css.signatureText}>(підпис)</p>
                          </td>
                          <td>
                            <p className={css.signatureName}>
                              {updateName(customer.name)}
                            </p>
                          </td>
                        </tr>
                      </tbode>
                    </table>
                    {/* <div className={css.signature}>
                      <p className={css.signatureText}>(підпис)</p>
                      <p className={css.signatureName}>
                        {updateName(inperson.name)}
                      </p>
                    </div> */}
                    <br />
                    м.п.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Document;
