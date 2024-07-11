import {useContext} from 'react';
import {CartContext} from '../context/CartContext';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import CartCard from '../components/CartCard';


const CartScreen = () => {
  const {carts, totalPrice} = useContext(CartContext);
  console.log("items in cart",carts);

  return (
    <LinearGradient colors={['#FDF0F3', '#FFFBFC']} style={styles.container}>
      <View style={styles.headerContainer}>
        <Header isCart={true} />
      </View>

      <FlatList
        data={carts}
        ListHeaderComponent={<></>}
        renderItem={({item}) => <CartCard item={item} />}
        keyExtractor={(item) => item.id}
        ListFooterComponent={
          <>
            <View style={styles.priceContainer}>
              <View style={styles.priceAndTitle}>
                <Text style={styles.text}>Total: </Text>
                <Text style={styles.text}>{totalPrice}</Text>
              </View>
              <View style={styles.priceAndTitle}>
                <Text style={styles.text}>Shipping:</Text>
                <Text style={styles.text}>$0.00</Text>
              </View>
            </View>
            <View style={styles.divider}>
              <View style={styles.priceAndTitle}>
                <Text style={styles.text}>Grand Total:</Text>
                <Text style={[styles.text, {color: 'black'}]}>
                  ${totalPrice}
                </Text>
              </View>
            </View>
          </>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Checkout</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 15,
  },

  priceContainer: {
    marginTop: 40,
  },
  priceAndTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  text: {
    color: '#757575',
    fontSize: 18,
  },
  divider: {
    borderWidth: 2,
    borderColor: '#C0C0C0',
  },
  button: {
    backgroundColor: '#E96E6E',
    padding: 10,
    margin: 3,
    borderRadius: 20,
    top: 0,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
});
