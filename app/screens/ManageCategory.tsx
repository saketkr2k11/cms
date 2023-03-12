import {View, Text, StyleSheet} from 'react-native';
import React, {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Category, AttributesMap} from '../lib/types';
import {Button} from 'react-native-paper';
import {addNewCategory} from '../lib/actions';
import _ from 'lodash';
import {FlatList} from 'react-native-gesture-handler';
import CategoryView from '../components/CategoryView';
import dimensions, {isTablet} from '../utility/dimensions';
import {getAttributesMap, getCategories} from '../selectors';
import {typography} from '../utility/typography';

// type Props = NativeStackScreenProps<NavigatorParams, 'ManageCategory'>;

const ManageCategory = () => {
  const categories: Record<string, Category> = useSelector(getCategories);

  const attributesMap: AttributesMap = useSelector(getAttributesMap);

  const categoriesList: string[] = _.isEmpty(categories)
    ? []
    : Object.keys(categories);

  const dispatch = useDispatch();

  const addNewCategoryOnPress = () => {
    dispatch(addNewCategory());
  };

  const renderAddBtn = () => {
    return (
      <View style={styles.btnView}>
        <Button mode="contained" onPress={addNewCategoryOnPress}>
          Add new category
        </Button>
      </View>
    );
  };

  const renderItem = ({item}: {item: string}) => {
    const itemsAttributeIds = categories[item].attributesIdsList || [];
    let filteredAttributesMap: AttributesMap = itemsAttributeIds.reduce(
      (acc, current) => {
        return {...acc, [current]: attributesMap[current]};
      },
      {},
    );

    return (
      <CategoryView
        category={categories[item]}
        attributesMap={filteredAttributesMap}
      />
    );
  };

  const numberOfCardsToShown: number = useMemo(() => (isTablet ? 2 : 1), []);

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
        numColumns={numberOfCardsToShown}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<Footer />}
      />
      {renderAddBtn()}
    </View>
  );
};

const Footer = () => <View style={styles.footer} />;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    margin: dimensions.viewWidth(10),
    alignItems: 'center',
  },
  emptyText: {
    fontSize: typography.fontSize.big,
    marginTop: dimensions.viewHeight(100),
  },
  btnView: {
    position: 'absolute',
    bottom: dimensions.viewHeight(10),
    left: 0,
    right: 0,
  },
  cardView: {
    width: '100%',
  },
  footer: {
    marginBottom: dimensions.viewHeight(50),
  },
});

export default ManageCategory;
