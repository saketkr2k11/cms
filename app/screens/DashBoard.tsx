import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {AppData} from '../lib/types';
import {useSelector} from 'react-redux';
import {RootState} from '../store/configureStore';
import _ from 'lodash';
import {FlatList} from 'react-native-gesture-handler';
import CategoryListView from './CategoryListView';

const DashBoard = () => {
  const storeData: AppData = useSelector((state: RootState) => state.appData);
  const categoriesList = _.isEmpty(storeData?.categories)
    ? []
    : Object.keys(storeData?.categories);

  const renderItem = ({item}: {item: string}) => {
    return (
      <View>
        <CategoryListView
          key={item}
          route={{
            params: {
              categoryId: item,
              name: storeData.categories[item].title,
              titleField: storeData.categories[item].titleField || '',
            },
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.main}>
      {categoriesList.length === 0 && <Text>No data found</Text>}
      <FlatList
        data={categoriesList}
        renderItem={renderItem}
        keyExtractor={item => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginVertical: 15,
  },
});

export default DashBoard;
