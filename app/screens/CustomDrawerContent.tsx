import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import _ from 'lodash';
import React from 'react';
import {useSelector} from 'react-redux';
import {AppData} from '../lib/types';
import {RootState} from '../store/configureStore';

export default function CustomDrawerContent(
  props: DrawerContentComponentProps,
) {
  const storeData: AppData = useSelector((state: RootState) => state.appData);
  const categoriesList = _.isEmpty(storeData?.categories)
    ? []
    : Object.keys(storeData?.categories);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Dashboard"
        onPress={() => props.navigation.navigate('Dashboard')}
      />
      {categoriesList.map(categoryId => (
        <DrawerItem
          key={categoryId}
          label={storeData.categories[categoryId].title}
          onPress={() =>
            props?.navigation?.navigate('CategoryListView', {
              categoryId,
              name: storeData.categories[categoryId].title,
              titleField: storeData.categories[categoryId].titleField,
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
