import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Category} from '../lib/types';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import {FlatList} from 'react-native-gesture-handler';
import CategoryListView from './CategoryListView';
import dimensions from '../utility/dimensions';
import {getCategories} from '../selectors';

const DashBoard = () => {
  const categories: Record<string, Category> = useSelector(getCategories);
  const categoriesList = _.isEmpty(categories) ? [] : Object.keys(categories);

  const renderItem = ({item}: {item: string}) => {
    return (
      <View>
        <CategoryListView
          key={item}
          route={{
            params: {
              categoryId: item,
              name: categories[item].title,
              titleField: categories[item].titleField || '',
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
    marginVertical: dimensions.viewHeight(15),
  },
});

export default DashBoard;
