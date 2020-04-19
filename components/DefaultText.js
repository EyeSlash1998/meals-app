import React from 'react';
import { Text, StyleSheet } from 'react-native';

const DefaultText = props => {
  return <Text style = {{...styles.textstyle, ...props.style}}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  textstyle: {
    fontFamily: 'open-sans'
  }
});

export default DefaultText;