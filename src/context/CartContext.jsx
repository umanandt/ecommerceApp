import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useEffect, useState} from 'react';

export const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [carts, setCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    try {
      let cartItem = await AsyncStorage.getItem('carts');
      cartItem = cartItem ? JSON.parse(cartItem) : [];
      setCarts(cartItem);
      calculateTotalSum(cartItem);
    } catch (error) {
      console.error('Failed to load cart items', error);
    }
  };

  const addToCart = async item => {
    try {
      let cartItems = await AsyncStorage.getItem('carts');

      cartItems = cartItems ? JSON.parse(cartItems) : [];
      const isExist = cartItems.some(cart => cart.id === item.id);
      console.log(isExist);
      if (isExist) {
        cartItems.push(item);

        setCarts(cartItems);
        await AsyncStorage.setItem('carts', JSON.stringify(cartItems));
        calculateTotalSum(cartItems);
      }
    } catch (error) {
      console.error('Failed to add item to cart', error);
    }
  };

  const deleteCart = async item => {
    try {
      const newItems = carts.filter(cart => cart.id !== item.id);
      setCarts(newItems);
      await AsyncStorage.setItem('carts', JSON.stringify(newItems));
      calculateTotalSum(newItems);
    } catch (error) {
      console.error('Failed to delete item from cart', error);
    }
  };

  const calculateTotalSum = cartItems => {
    const total = cartItems.reduce((amount, item) => amount + item.price, 0);

    setTotalPrice(total);
  };

  const value = {
    carts,
    addToCart,
    totalPrice,
    deleteCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
