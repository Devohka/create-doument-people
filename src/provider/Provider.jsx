import { useSelector, useDispatch } from "react-redux";
import { showProviderEl } from "../redux/selectors";
import { ShowingP } from "../redux/actions";
import { addProviderReduser } from "../redux/actions";
import css from "./Provider.module.css";

function ProviderProduct() {
  const dispatch = useDispatch();
  const showProvider = useSelector(showProviderEl);
  console.log(showProvider);

  const addInfo = (e) => {
    e.preventDefault();
    const info = {

      home: e.currentTarget.elements.home.value,
      code: e.currentTarget.elements.code.value,
      pp: e.currentTarget.elements.providerPP.value,
      mfo: e.currentTarget.elements.mfo.value,
      tell: e.currentTarget.elements.tell.value,

      ppC: e.currentTarget.elements.customerPP.value,
    };

    dispatch(
      addProviderReduser(
        info.home,
        info.code,
        info.pp,
        info.mfo,
        info.tell,
        info.ppC
      )
    );
  };

  const showP = () => {
    dispatch(ShowingP(!showProvider));
  };

  return (
    <>
      <form className={css.formProduct} onSubmit={addInfo}>
        <h2>Постачальник</h2>
        <input
          className={css.formInput}
          type="text"
          name="home"
          placeholder="Юридична адреса"
        />
        <input
          className={css.formInput}
          type="text"
          name="code"
          placeholder="Код єдропоу"
        />
        <input
          className={css.formInput}
          type="text"
          name="providerPP"
          placeholder="p/p"
        />
        <input
          className={css.formInput}
          type="text"
          name="mfo"
          placeholder="МФО"
        />
        <input
          className={css.formInput}
          type="text"
          name="tell"
          placeholder="Тел.(записати через +380 000 000 000)"
        />
        <h2>Замовник</h2>
        <input
          className={css.formInput}
          type="text"
          name="customerPP"
          placeholder="p/p"
        />

        <button type="submit" className={css.formBtn}>
          Додати
        </button>
        <button type="button" className={css.formBtn} onClick={showP}>
          Назад
        </button>
      </form>
    </>
  );
}

export default ProviderProduct;
