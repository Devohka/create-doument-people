import css from "./App.module.css";
import Document from "./document/Document.jsx";
import { useSelector, useDispatch } from "react-redux";
import { inpersonEl, customerEl, basisEl, termEl, placeEl, showModalEl, codeEl, showProviderEl, customerProviderEl, providerEl, productEl, showDEl } from "./redux/selectors";
import ModalProduct from "./modalProduct/ModalProduct";
import ProviderProduct from "./provider/Provider";


import { addInperson, Showing, ShowingP, ShowingD  } from "./redux/actions";

const array = [
  { cost: 34, num: 4 },
  { cost: 334, num: 4 },
];

// const totalSum = array.reduce((acc, item) => acc + item.cost * item.num, 0);

// console.log(totalSum);


function App() {

  const dispatch = useDispatch();

const inperson = useSelector(inpersonEl);
console.log(inperson);
const customer = useSelector(customerEl);
console.log(customer)
const showMod = useSelector(showModalEl);
console.log(showMod);
const showProvider = useSelector(showProviderEl);
console.log(showProvider);
const provider = useSelector(providerEl);
console.log(provider);
const customerProvider = useSelector(customerProviderEl);
console.log(customerProvider);
const product = useSelector(productEl);
console.log(product);
const showD = useSelector(showDEl);
console.log(showD);



const showF = () => {
  dispatch(Showing(!showMod));
};

const showP = () => {
  dispatch(ShowingP(!showProvider));
};
const showDF = () => {
  dispatch(ShowingD(!showD));
};

const addInfo = (e) => {
  e.preventDefault();
  const info = {
   nameIn: e.currentTarget.elements.nameIn.value,
   jobIn: e.currentTarget.elements.jobIn.value,
   nameCus: e.currentTarget.elements.name.value,
   jobCus: e.currentTarget.elements.job.value,
   basis: e.currentTarget.elements.basis.value,
   term: e.currentTarget.elements.term.value,
   place: e.currentTarget.elements.place.value,
   code: e.currentTarget.elements.code.value,
  }

  dispatch(addInperson(info.nameIn, info.jobIn, info.nameCus, info.jobCus, info.basis, info.term, info.place, info.code));

};

  return (
    <>

{showMod ? <ModalProduct/> : console.log("no show")}
{showProvider ? <ProviderProduct/> : console.log("no show")}
{!showD ? ( <form className={css.formSubmit} onSubmit={addInfo}>
        <h2 className={css.submitText}>Відправляй значення у Document</h2>
        <ul className={css.submitList}>
        <li>
            <input
              type="text"
              className={css.submitInput}
              placeholder="Ім'я представника" name="nameIn"
            />
          </li>
          <li>
            <input
              type="text"
              className={css.submitInput}
              placeholder="Робота особи представника" name="jobIn"
            />
          </li>
          <li>
            <input
              type="text"
              className={css.submitInput}
              placeholder="Робота фізичної ос." name="name"
            />
          </li>
          <li>
            <input
              type="text"
              className={css.submitInput}
              placeholder="Ім'я фізичної ос." name="job"
            />
          </li>
          <li>
            <input
              type="text"
              className={css.submitInput}
              placeholder="Діє на підставі" name="basis"
            />
          </li>
          <li>
            <input
              type="text"
              className={css.submitInput}
              placeholder="Код ДК" name="code"
            />
          </li>
          <li>
            <button className={css.submitInput} type="button" onClick={showF}>
              Товари
            </button>
          </li>
          <li>
            <input
              type="text"
              className={css.submitInput}
              placeholder="Термін(записати за прикладом(1.01.1101))" name="term"
            />
          </li>
          <li>
            <input
              type="text"
              className={css.submitInput}
              placeholder="Місце поставки товару" name="place"
            />
          </li>
          <li>
            <button className={css.submitInput} type="button" onClick={showP}>
              Постачальник
            </button>
          </li>
        </ul>
        <button className={css.submitButton} type="submit">
          Відправити
        </button>
        <button className={css.submitButton} type="button" onClick={showDF}>
          Переглянути файл
        </button>
      </form>) :  <Document></Document>}
     
     


    </>
  );
}

export default App;
