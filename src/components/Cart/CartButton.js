import classes from './CartButton.module.css';
import { uiActions } from '../../store/ui-slice';
import {useDispatch,useSelector} from "react-redux"

const CartButton = (props) => {
  const totalQuantity = useSelector((state)=>state.cart.totalQuantity)
  const dispatch = useDispatch()
  const togglecarthandler = () =>{
    dispatch(uiActions.toggle())
  }
  return (
    <button onClick={togglecarthandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
