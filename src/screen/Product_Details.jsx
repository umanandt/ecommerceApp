import {useContext, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CartContext} from '../context/CartContext';

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';

const sizes = ['S', 'M', 'L', 'XL'];
const colorsArray = [
  '#91A1B0',
  '#B11D1D',
  '#1F44A3',
  '#9F632A',
  '#1D752B',
  '#000000',
];

const Product_Details = () => {
  const {addToCart} = useContext(CartContext);
  const route = useRoute();
  const navigation = useNavigation();  
  const product = route.params.itemDetails;
 
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);


  const handleAddToCart = () => {
    product.size = selectedSize;
    product.color = selectedColor;
    addToCart(product);
    navigation.navigate('CART');
  };

  return (
    <LinearGradient colors={['#FDF0F3', '#FFFBFC']} style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
      </View>

      <Image source={{uri: product.image}} style={styles.coverImage} />
      <View style={styles.contentConatiner}>
        <Text style={styles.title}> {product.title}</Text>
        <Text style={styles.price}>{product.price}</Text>
      </View>
      {/* size container */}

      <Text style={[styles.title, styles.sizeText]}>Size</Text>

      <View style={styles.sizeContainer}>
        {sizes.map((size, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.sizeValueContainer}
              onPress={() => {
                setSelectedSize(size);
              }}>
              <Text
                style={[
                  styles.sizeValue,
                  selectedSize == size && {color: '#E55B5B'},
                ]}>
                {size}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* color container */}
      <Text style={[styles.title, styles.colorText]}>Colors</Text>

      <View style={styles.colorContainer}>
        {colorsArray.map((color, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedColor(color);
              }}
              style={[
                styles.circleBorder,
                selectedColor == color && {borderColor: color, borderWidth: 2},
              ]}>
              <View style={[styles.circle, {backgroundColor: color}]} />
            </TouchableOpacity>
          );
        })}
      </View>

      {/* button container */}

      <TouchableOpacity
        style={styles.button}
        onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Product_Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 'auto',
  },
  headerContainer: {padding: 20},

  coverImage: {width: '100%', height: 360},

  contentConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    color: '#444444',
    fontWeight: '500',
    marginTop: 10,
  },
  price: {
    color: '#4D4C4C',
    marginTop: 10,
  },
  sizeText: {
    marginHorizontal: 20,
  },
  sizeContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  sizeValueContainer: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  sizeValue: {
    fontSize: 18,
    fontWeight: '600',
  },

  colorContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  colorText: {
    marginHorizontal: 20,
    marginVertical: 10,
    marginTop: 10,
  },
  circle: {
    height: 36,
    width: 36,
    borderRadius: 18,
    marginHorizontal: 10,
  },
  circleBorder: {
    height: 48,
    width: 48,
    borderRadius: 24,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    backgroundColor: '#E96E6E',
    padding: 10,
    margin: 10,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
});
