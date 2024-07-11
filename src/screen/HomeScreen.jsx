import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import Category from '../components/Category';
import ProductCard from '../components/ProductCard';
import data from '../data/data.json';

const categories = ['Trending', 'New', 'All', 'Top Brands', 'Balanciaga'];

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState();
  const [products, setProducts] = useState(data.products);
  const [isLiked, setIsLiked] = useState(false);

  // to check liked/not liked
  // ...opearto copies the all the data
  //islikd true means one property goes from
  // not liked to liked

  const handleLiked = item => {
    const newProducts = products.map((prod) => {
      if (prod.id === item.id) {
        return {
          ...prod,
          isLiked: true,
        };
      }
   
      return prod;
    });
    setProducts(newProducts);
  };

  return (
    <LinearGradient colors={['#FDF0F3', '#FFFBFC']} style={styles.container}>
      <Header />

      <FlatList
        numColumns={2}
        ListHeaderComponent={
          <>
            <Text style={styles.matchText}>Match your Style </Text>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Fontisto name={'search'} fontSize={26} color={'#C0C0C0'} />
              </View>
              <TextInput style={styles.textInput} placeholder="Search" />
            </View>
            <FlatList
              data={categories}
              renderItem={({item}) => (
                <Category
                  item={item}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              )}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </>
        }
        data={products}
        renderItem={({item}) => (
          <ProductCard item={item} handleLiked={handleLiked} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 150,
        }}
      />

      {/* <View>
          style={{
            flexDirection: 'row',
          }}>
          <ProductCard path={require('../assets/girl1.png')} />
          <ProductCard path={require('../assets/girl2.png')} />
        </View>*/}
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  matchText: {
    fontSize: 28,
    color: '#000000',
    marginTop: 25,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
  },
  iconContainer: {
    marginHorizontal: 20,
  },
  textInput: {
    flex: 1,
  },
});
