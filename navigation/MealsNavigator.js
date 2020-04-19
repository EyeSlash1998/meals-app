import React from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { Platform, Text } from 'react-native';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoriesMealScreen from '../screens/CategoriesMealScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FilterScreen from '../screens/FilterScreen';
import Colors from '../constants/Colors';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'


const defaultStackOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
    // width: 250
    width: Dimensions.get('window').width / 1.5
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
}

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: {
        headerTitle: 'Meal Categories'
      }
    },
    CategoriesMeal: {
      screen: CategoriesMealScreen
    },
    MealDetail: {
      screen: MealDetailScreen
    },
  },
  {
    // initialRouteName: 'Categories',
    // mode: 'modal'
    defaultNavigationOptions: defaultStackOptions
  }
);

const FavNavigator = createStackNavigator({
  Favorites: FavoritesScreen,
  MealDetail: MealDetailScreen
}, {
  defaultNavigationOptions: defaultStackOptions
});

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals!</Text> : 'Meals!',
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='md-restaurant' size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.primaryColor
    }
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Favorites!</Text> : 'Favorites!',
      tabBarIcon: (tabInfo) => {
        return <MaterialIcons name='favorite' size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: 'red'
    }
  }
};

const MealsFavTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
      //activeTintColor: Colors.accentColor,
      activeColor: Colors.accentColor,
      shifting: true,
      // barStyle: {
      //   backgroundColor: 'white'
      // }
    })
    : createBottomTabNavigator(
      tabScreenConfig,
      {
        tabBarOptions: {
          labelStyle: {
            fontFamily: 'open-sans'
          },
          activeTintColor: Colors.accentColor
        }
      });

const FiltersNavigator = createStackNavigator({
  Filters: FilterScreen
}, {
  // navigationOptions: {
  //   drawerLabel: 'Filters!!!'
  // },
  defaultNavigationOptions: defaultStackOptions
});

const MainNavigator = createDrawerNavigator({
  MealsFav: {
    screen: MealsFavTabNavigator,
    navigationOptions: {
      drawerLabel: 'Meals'
    }
  },
  Filters: {
    screen: FiltersNavigator,
    navigationOptions: {
      drawerLabel: 'Filter Meal'
    }
  }
}, {
  contentOptions: {
    activeTintColor: Colors.accentColor,
    labelStyle: {
      fontFamily: 'open-sans-bold',
    }
  }
});

export default createAppContainer(MainNavigator);
