// import React from 'react';
// import {Button, StyleSheet, Text, View} from 'react-native';
// import {NavigatorParams} from '../lib/types';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';

// type Props = NativeStackScreenProps<NavigatorParams, 'help'>;

// const HelpScreen = ({route, navigation}: Props) => {
//   const {itemId} = route.params;
//   return (
//     <View style={styles.main}>
//       <Text>Help Screen</Text>
//       <Text>{`itemId: ${itemId}`}</Text>
//       <Button
//         title="Go to help... again"
//         onPress={() =>
//           navigation.push('help', {
//             itemId: Math.floor(Math.random() * 1000),
//           })
//         }
//       />
//       <Button title="Go to Home" onPress={() => navigation.navigate('home')} />
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   main: {flex: 1, alignItems: 'center', justifyContent: 'center'},
// });

// export default HelpScreen;

import {View, Text} from 'react-native';
import React from 'react';

const HelpScreen = () => {
  return (
    <View>
      <Text>HelpScreen</Text>
    </View>
  );
};

export default HelpScreen;
