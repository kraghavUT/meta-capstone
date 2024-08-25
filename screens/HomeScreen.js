import { useEffect, useState, useCallback, useMemo } from "react";
// prettier-ignore
import {Text, View, StyleSheet, SectionList, Alert, Image, Pressable, FlatList, ScrollView} from "react-native";
import { Searchbar } from "react-native-paper";
import debounce from "lodash.debounce";
// prettier-ignore
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { filterMenuItems, selectAllMenu } from "../database";

import {colors} from '../constants/colors'

import Item from '../components/Item'
const sections = ["starters", "mains", "desserts"];



 const Home = ({ navigation }) => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    orderStatuses: false,
    passwordChanges: false,
    specialOffers: false,
    newsletter: false,
    image: "",
  });

  const setProfileInfo = async () => {
    const fname = await AsyncStorage.getItem('firstName');
    const lName = await AsyncStorage.getItem('lastName')
    const emailAddress = await AsyncStorage.getItem('emailAddress')

    setProfile({
                    firstName: fname || '',
                    lastName: lName || '',
                    email: emailAddress || ''
                });
  }
  useEffect(() => {
    setProfileInfo()
  }, []);


  const [menuItems, setMenuItems] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filterCategories, setFilterCategories] = useState([]);


  const loadMenu = async () => {
    try {
      const menuItems = await selectAllMenu();
      setMenuItems(menuItems);
  
      setFilterCategories([
        ...new Set(
          menuItems?.map(
            (i) => i.category?.charAt(0).toUpperCase() + i.category?.slice(1)
          )
        ),
      ]);
    } catch (err) {
      console.error(`There was an error selecting all menu items: ${err}`);
    }
  };

  useEffect(() => {
    loadMenu();
  }, []);

  const onFilterClick = (item) => {
    const indexOfItem = activeFilters.indexOf(item);
    if (indexOfItem > -1) {
      const newActiveFilters = activeFilters.filter(
        (_, index) => index !== indexOfItem
      );
      setActiveFilters(newActiveFilters);
    } else {
      setActiveFilters((activeFilters) => [...activeFilters, item]);
    }
  };

  const filterMenu = () =>
    filterMenuItems(activeFilters, searchInput).then(setMenuItems);

  useEffect(() => {
    const debouncedFilterMenu = debounce(filterMenu, 500);
    debouncedFilterMenu();
  }, [searchInput]);

  useEffect(() => {
    filterMenu();
  }, [activeFilters]);
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../assets/littleLemonLogo.png')}
          accessible={true}
          accessibilityLabel={"Little Lemon Logo"}
        />
        <Pressable
          style={styles.avatar}
          onPress={() => navigation.navigate('Profile',  {profile} )}
        >
        
        <View style={styles.avatarEmpty}>
          <Text style={styles.avatarEmptyText}>
            {profile.firstName && Array.from(profile.firstName)[0]}
            {profile.lastName && Array.from(profile.lastName)[0]}
          </Text>
        </View>
        </Pressable>
      </View>
      <View style={styles.heroSection}>
        <Text style={styles.heroHeader}>Little Lemon</Text>
        <View style={styles.heroBody}>
          <View style={styles.heroContent}>
            <Text style={styles.heroHeader2}>Chicago</Text>
            <Text style={styles.heroText}>
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twist.
            </Text>
          </View>
          <Image
            style={styles.heroImage}
            source={require('../assets/restaraunt.png')}
            accessibilityLabel={"Little Lemon Food"}
          />
        </View>
        <Searchbar
          placeholder="Search"
          placeholderTextColor="#333333"
          onChangeText={setSearchInput}
          style={styles.searchBar}
          iconColor="#333333"
          inputStyle={{ color: "#333333" }}
          elevation={0}
        />
        
      </View>
      <Text style={styles.delivery}>ORDER FOR DELIVERY!</Text>
      <View style={styles.filtersContainer}>
        <ScrollView style={styles.filterScrollView} horizontal>
          {filterCategories.map((item, index) => {
            const isSelected = activeFilters.indexOf(item) > -1;
            return (
              <Pressable
                style={{
                  ...styles.filterButton,
                  backgroundColor: isSelected ? colors.GREEN : colors.GRAY,
                }}
                key={index}
                onPress={() => onFilterClick(item)}
              >
                <Text
                  style={{
                    ...styles.filterButtonText,
                    color: isSelected ? colors.GRAY : colors.GREEN,
                  }}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
        <FlatList
        data={menuItems}
        renderItem={({ item }) => (
     
            <Item
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
            
            />
        )
        }
        keyExtractor={(item, index) => item.name + index}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 0.5,
              width: "90%",
              backgroundColor: "grey",
              alignSelf: "center",
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight,
  },
  header: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#dee3e9",
  },
  logo: {
    height: 50,
    width: 150,
    resizeMode: "contain",
  },
  searchBar: {
    marginTop: 15,
    backgroundColor: "#e4e4e4",
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  avatar: {
    flex: 1,
    position: "absolute",
    right: 10,
    top: 10,
  },
  
  filtersContainer: {
    padding: 10,
    paddingRight: -20,
    borderBottomColor: colors.BLACK,
  },
  filterScrollView: { 
    marginTop: 10, display: "flex"
  },
  filterButton: {
    color: colors.BLACK,
    borderRadius: 10,
    marginRight: 12,
  },
  filterButtonText: {
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  avatarEmpty: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#0b9a6a",
    alignItems: "center",
    justifyContent: "center",
  },
  heroSection: {
    backgroundColor: "#495e57",
    padding: 15,
  },
  heroHeader: {
    color: "#f4ce14",
    fontSize: 54,
  },
  heroHeader2: {
    color: "#fff",
    fontSize: 30,
  },
  heroText: {
    color: "#fff",
    fontSize: 14,
  },
  heroBody: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heroContent: {
    flex: 1,
  },
  heroImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  delivery: {
    fontSize: 18,
    padding: 15,
  },
});

export default Home