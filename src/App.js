import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meth from "./components/Meth/Meth";
import CartProvider from "./store/CartProvider";

function App() {

  const [showCart, setShowCart] = useState(false);
  
  const showingCart = () => {
    setShowCart(true);
  };

  const closingCart = () => {
    setShowCart(false);
  }

  return (
    <CartProvider>
      <Header onShowCart={showingCart}/>
      {showCart && <Cart onCloseCart={closingCart}/>}
      <Meth/>
    </CartProvider>
  );
}

export default App;
