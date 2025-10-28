import { useSelector, useDispatch } from "react-redux";
import { showModalEl, productEl } from "../redux/selectors";
import { Showing, addProduct } from "../redux/actions";
import css from "./ModalProduct.module.css";

function ModalProduct() {
  const dispatch = useDispatch();

  const showMod = useSelector(showModalEl);
  const product = useSelector(productEl);
  console.log(product);
  console.log(showMod);

  const showF = () => {
    dispatch(Showing(!showMod));
  };


const submitProduct = (e) => {
    e.preventDefault();
    const info = {
     name: e.currentTarget.elements.name.value,
     number: Number(e.currentTarget.elements.number.value),
     cost: Number(e.currentTarget.elements.cost.value),
     id: product.length + 1
    };
  
    dispatch(addProduct(info.name, info.number, info.cost, info.id));
  
};

  return (
    <>
      <form className={css.formProduct} onSubmit={submitProduct}>
        <ul className={css.formList}>
          {product.map((item) => {
            return (
              <>
                <li className={css.formItem}>
                    <p className={css.formText}>{item.name}</p>
                    <p className={css.formText}>{item.number}</p>
                    <p className={css.formText}>{item.cost}</p>
                </li>
              </>
            );
          })}
        </ul>
        <input
          className={css.formInput}
          type="text"
          name="name"
          placeholder="Назва товару"
        />
        <input
          className={css.formInput}
          type="number"
          name="number"
          placeholder="Кількість товару"
        />
        <input
          className={css.formInput}
          type="number"
          name="cost"
          placeholder="Ціна товару"
        />
        <button type="submit" className={css.formBtn} >
          Додати
        </button>
        <button type="button" className={css.formBtn} onClick={showF}>
          Назад
        </button>
      </form>
    </>
  );
}

export default ModalProduct;
