import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async(dispatch) => {
    const fetchdata = async () => {
      const responce = await fetch(
        "https://react-http-b7880-default-rtdb.firebaseio.com/cart.json"
      );
      if(!responce.ok){
        throw new Error("Could not Fetch cart data")
      }
      const data = await responce.json()


      return(data)
    };
    try{
        const cartdata = await fetchdata()
        dispatch(cartActions.replaceCart(cartdata))
    }
    catch(error){
        dispatch(
            uiActions.shownotification({
              status: "error",
              title: "Error!",
              message: "Sent Cart Data Failed",
            })
          );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.shownotification({
        status: "pending",
        title: "Sending...",
        message: "Sending Cart Data",
      })
    );
    const sendRequest = async () => {
      const responce = await fetch(
        "https://react-http-b7880-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!responce.ok) {
        throw new Error("Sending cart data failed");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.shownotification({
          status: "sucess",
          title: "Success!",
          message: "Sent Cart Data Succesfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.shownotification({
          status: "error",
          title: "Error!",
          message: "Sent Cart Data Failed",
        })
      );
    }
  };
};
