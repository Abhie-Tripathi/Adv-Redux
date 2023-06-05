import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import Notification from "./components/UI/Notification";
import { sendCartData,fetchCartData } from "./store/cart-actions";

let isInitial = true

function App() {
  const dispatch = useDispatch();
  const showcart = useSelector((state) => state.ui.cartisvisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);


  useEffect(()=>{
    dispatch(fetchCartData())
  },[dispatch])
  
  useEffect(() => {
    if(isInitial){
      isInitial = false
      return
    }
    if(cart.ischanged){
    dispatch(sendCartData(cart))}
  }, [cart, dispatch]);
  
  

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showcart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
