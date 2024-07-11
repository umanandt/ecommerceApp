import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';


const CartCard = ({item}) => {


  const {deleteCart} = useContext(CartContext)
  return (


    <View style={styles.container}>
      <Image source={{uri: item.image}} style={styles.coverImage} />

      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price}</Text>

        <View style={styles.circleSizeConatiner}>
          <View style={[styles.circle, {backgroundColor: item.color}]} />
          <View style={styles.sizeCircle}>
            <Text style={styles.sizeText}>{item.size}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => deleteCart(item)}>
        <FontAwesome6 name={'trash'} size={25} color={'#F68CB5'} 
        
        />
      </TouchableOpacity>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  coverImage: {
    height: 125,
    width: '25%',
    borderRadius: 20,
  },
  cardContent: {
    flex: 1,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
    color: '#444444',
    fontWeight: '500',
  },
  price: {
    color: '#797979',
    marginVertical: 10,
    fontSize: 18,
  },
  circle: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: '#7094C1',
  },
  circleSizeConatiner: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  sizeCircle: {
    backgroundColor: 'white',
    height: 32,
    width: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  sizeText: {
    fontSize: 18,
    fontWeight: '500',
  },
});
