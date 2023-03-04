import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {AppData, Category} from '../lib/types';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/configureStore';
import _ from 'lodash';
import {addSubItemsToCategory} from '../lib/actions';
import {FlatList} from 'react-native-gesture-handler';
import SubListCardView from '../components/SubListCardView';
import {isTablet} from 'react-native-device-info';

type Props = {
  route: {
    params: {
      categoryId: string;
      name: string;
      titleField: string;
    };
  };
};

const CategoryListView = ({route}: Props) => {
  const dispatch = useDispatch();
  const categoryId = route?.params?.categoryId;
  const storeData: AppData = useSelector((state: RootState) => state.appData);
  const category: Category | null = _.isEmpty(storeData?.categories[categoryId])
    ? null
    : storeData?.categories[categoryId];

  const subItemsList = _.isEmpty(category) ? [] : category.subItemIds || [];

  const renderItem = ({item}: {item: string}) => {
    return (
      <SubListCardView
        itemId={item}
        titleFieldId={route?.params?.titleField}
        categoryId={route?.params?.categoryId}
      />
    );
  };

  return (
    <View style={styles.main}>
      <View style={styles.topHeader}>
        <Text style={styles.topHeaderTitle}> {category?.title}</Text>
        <Button
          mode="contained"
          style={styles.addBtn}
          onPress={() => {
            category?.id && dispatch(addSubItemsToCategory(category.id));
          }}>
          ADD NEW ITEM
        </Button>
      </View>
      {subItemsList.length === 0 && (
        <Text style={styles.emptyLine}>No items to show</Text>
      )}
      <FlatList
        data={subItemsList}
        renderItem={renderItem}
        keyExtractor={item => item}
        numColumns={isTablet() ? 2 : 1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginHorizontal: 10,
  },
  addBtn: {
    borderRadius: 4,
    width: 170,
  },
  topHeaderTitle: {
    fontSize: 24,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  emptyLine: {
    alignSelf: 'center',
    marginVertical: 20,
  },
});

export default CategoryListView;
