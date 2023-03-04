// import {View, Text, Button, StyleSheet} from 'react-native';
// import React from 'react';
// import {useSelector} from 'react-redux';
// import {RootState} from '../store/configureStore';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {NavigatorParams} from '../lib/types';

// type Props = NativeStackScreenProps<NavigatorParams, 'home'>;

// const HomeScreen = ({navigation}: Props) => {
//   const storeData = useSelector((state: RootState) => state.helpPageData);
//   return (
//     <View style={styles.main}>
//       <Text>Home Screen</Text>
//       <Button
//         title="Go to Help"
//         onPress={() => {
//           navigation.navigate('help', {
//             itemId: Math.floor(Math.random() * 1000),
//           });
//         }}
//       />
//       <Text>{JSON.stringify(storeData)}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   main: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default HomeScreen

import {View, Text} from 'react-native';
import React from 'react';

const HomeScreen = () => {
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
