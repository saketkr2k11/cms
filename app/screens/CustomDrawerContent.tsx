import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import _ from 'lodash';
import React from 'react';
import {useSelector} from 'react-redux';
import {Category} from '../lib/types';
import {getCategories} from '../selectors';

export default function CustomDrawerContent(
  props: DrawerContentComponentProps,
) {
  const categories: Record<string, Category> = useSelector(getCategories);
  const categoriesList = _.isEmpty(categories) ? [] : Object.keys(categories);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Dashboard"
        onPress={() => props.navigation.navigate('Dashboard')}
      />
      {categoriesList.map(categoryId => (
        <DrawerItem
          key={categoryId}
          label={categories[categoryId].title}
          onPress={() =>
            props?.navigation?.navigate('CategoryListView', {
              categoryId,
              name: categories[categoryId].title,
              titleField: categories[categoryId].titleField,
            })
          }
        />
      ))}
      <DrawerItem
        label="Manage Category"
        onPress={() => props.navigation.navigate('ManageCategory')}
      />
    </DrawerContentScrollView>
  );
}
