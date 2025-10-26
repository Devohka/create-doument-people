import css from "./App.module.css";
import Document from "./document/Document.jsx";
function App() {
  return (
    <>
      <form className={css.formSubmit}>
        <h2 className={css.submitText}>Відправляй значення у Document</h2>
        <ul className={css.submitList}>
          <li>
            <input type="text" className={css.submitInput} placeholder="Робота особи представника"/>
          </li>
          <li>
            <input type="text" className={css.submitInput} placeholder="Ім'я представника"/>
          </li>
          <li>
            <input type="text" className={css.submitInput} placeholder="Робота фізичної ос."/>
          </li>
          <li>
            <input type="text" className={css.submitInput} placeholder="Ім'я фізичної ос."/>
          </li>
          <li>
            <input type="text" className={css.submitInput} placeholder="Діє на підставі"/>
          </li>
          <li>
          <button className={css.submitInput} type="click">Товари</button>
          </li>
          <li>
            <input type="text" className={css.submitInput} placeholder="Дата(записати за прикладом(1.01.1101))"/>
          </li>
          <li>
            <input type="text" className={css.submitInput} placeholder="Місце поставки товару"/>
          </li>
          <li>
          <button className={css.submitInput} type="click">Постачальник</button>
          </li>
        </ul>
        <button className={css.submitButton} type="submit">Відправити</button>
      </form>
      {/* <Document></Document> */}
    </>
  );
}

export default App;
