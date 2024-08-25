import {
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';

const Item = ({ name, price, description, image }) => {
    
  return(   
    <View style={styles.item}>
      <View style={styles.itemBody}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
      <Image
        style={styles.itemImage}
        source={{
          uri: image
        }}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
    paddingVertical: 10,
  },
  itemBody: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    color: "#000000",
    paddingBottom: 5,
  },
  description: {
    color: "#495e57",
    paddingRight: 5,
  },
  price: {
    fontSize: 20,
    color: "#EE9972",
    paddingTop: 5,
  },
  itemImage: {
    width: 100,
    height: 100,
  },
});

export default Item