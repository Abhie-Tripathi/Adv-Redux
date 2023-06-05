import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

let isInitial = true

function App() {
  const dispatch = useDispatch();
  const showcart = useSelector((state) => state.ui.cartisvisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.shownotification({
          status: "pending",
          title: "Sending...",
          message: "Sending Cart Data",
        })
        );
      const responce = await fetch(
        "https://react-http-b7880-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!responce.ok) {
        dispatch(
          uiActions.shownotification({
            status: "error",
            title: "Error!",
            message: "Sent Cart Data Failed",
          })
        );
      }
      const responceData = await responce.json();
      dispatch(
        uiActions.shownotification({
          status: "sucess",
          title: "Success!",
          message: "Sent Cart Data Succesfully",
        })
      );
    };
    if(isInitial){
      isInitial = false
      return
    }
    sendCartData().catch((error) => {
      dispatch(
        uiActions.shownotification({
          status: "error",
          title: "Error!",
          message: "Sent Cart Data Failed",
        })
      );
    });
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
