import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/configureStore';
import {AppData} from '../lib/types';
import {Button} from 'react-native-paper';
import {addNewCategory} from '../lib/actions';
import _ from 'lodash';
import {FlatList} from 'react-native-gesture-handler';
import CategoryView from '../components/CategoryView';
import {isTablet} from 'react-native-device-info';

// type Props = NativeStackScreenProps<NavigatorParams, 'ManageCategory'>;

const ManageCategory = () => {
  const storeData: AppData = useSelector((state: RootState) => state.appData);
  const categoriesList: string[] = _.isEmpty(storeData?.categories)
    ? []
    : Object.keys(storeData?.categories);

  const dispatch = useDispatch();
  const renderAddBtn = () => {
    return (
      <View style={styles.btnView}>
        <Button
          mode="contained"
          onPress={() => {
            dispatch(addNewCategory());
          }}>
          Add new category
        </Button>
      </View>
    );
  };

  const renderItem = ({item}: {item: string}) => {
    return (
      <CategoryView
        category={storeData?.categories[item]}
        attributesMap={storeData.attributesMap}
      />
    );
  };

  return (
    <View style={styles.main}>
      {categoriesList.length === 0 && (
        <Text style={styles.emptyText}> No category to show</Text>
      )}

      <FlatList
        data={categoriesList}
        renderItem={renderItem}
        keyExtractor={item => item}
        style={styles.cardView}
        numColumns={isTablet() ? 2 : 1}
      />
      {renderAddBtn()}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    marginTop: 100,
  },
  btnView: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  cardView: {
    width: '100%',
  },
});

export default ManageCategory;
