import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AttributesMap, Category} from '../lib/types';
import {TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {
  addNewAttribute,
  deleteAttribute,
  deleteCategory,
  updateAttributeDataType,
  updateAttributeTitle,
  updateCategoryTitle,
  updateCategoryTitleField,
} from '../lib/actions';
import {Colors} from '../lib/constants';
import {FlatList} from 'react-native-gesture-handler';
import AddNewFieldMenu, {Menu} from './AddNewFieldMenu';
import {isTablet} from 'react-native-device-info';

type Props = {
  category: Category;
  attributesMap: AttributesMap;
};

const DATA_FIELDS = [
  {displayText: 'Text', internalValue: 'text'},
  {displayText: 'Date', internalValue: 'date'},
  {displayText: 'Checkbox', internalValue: 'checkbox'},
  {displayText: 'Number', internalValue: 'number'},
];

const CategoryView = (props: Props) => {
  const {category, attributesMap} = props;
  const {title} = category;
  const dispatch = useDispatch();

  const renderAttributes = ({item}: {item: string}) => {
    //item == attribute id
    const attributeField = attributesMap[item];
    return (
      <View style={styles.fieldRow}>
        <TextInput
          label="field"
          mode="outlined"
          value={attributeField.title}
          style={styles.flex}
          onChangeText={text =>
            dispatch(updateAttributeTitle(text, item, category.id))
          }
        />
        <AddNewFieldMenu
          labelStyle={styles.addNewAttributeBtn}
          viewstyle={styles.addBtn}
          title={attributeField.dataType}
          menus={DATA_FIELDS}
          onPress={newType => {
            if (newType !== attributeField.dataType) {
              dispatch(updateAttributeDataType(newType, item, category.id));
            }
            return;
          }}
        />
        <Pressable onPress={() => dispatch(deleteAttribute(item, category.id))}>
          <Image
            source={require('../images/delete.png')}
            style={styles.fieldDeletedIcon}
          />
        </Pressable>
      </View>
    );
  };

  const getTitleModel = () => {
    if (category?.titleField && attributesMap[category?.titleField]?.title) {
      return ` TITLE FIELD:${attributesMap[category?.titleField]?.title}`;
    }
    return 'TITLE FIELD: UNNAMED FIELD';
  };

  const getTitleFieldDateField = () => {
    const items: Menu[] = [];
    category.attributesIdsList.forEach(attributeId => {
      items.push({
        internalValue: attributeId,
        displayText: attributesMap[attributeId].title,
      });
    });
    return items;
  };

  return (
    <View style={styles.main}>
      <Text style={styles.title}>{title}</Text>

      <TextInput
        label="Category name"
        mode="outlined"
        value={title}
        onChangeText={text => dispatch(updateCategoryTitle(text, category.id))}
      />
      <FlatList
        data={category?.attributesIdsList || []}
        renderItem={renderAttributes}
      />
      <AddNewFieldMenu
        labelStyle={styles.titleModelBtn}
        viewstyle={styles.titleModelView}
        title={getTitleModel()}
        menus={getTitleFieldDateField()}
        onPress={id => {
          dispatch(updateCategoryTitleField(id, category.id));
        }}
      />
      <View style={styles.row}>
        <AddNewFieldMenu
          labelStyle={styles.addNewAttributeBtn}
          viewstyle={styles.addBtn}
          title="ADD NEW FIELD"
          menus={DATA_FIELDS}
          onPress={type => {
            dispatch(addNewAttribute(category.id, type));
          }}
        />
        <Pressable
          style={styles.row}
          onPress={() => dispatch(deleteCategory(category.id))}>
          <Image
            source={require('../images/delete.png')}
            style={styles.categoryDeletedIcon}
          />
          <Text>REMOVE</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CategoryView;

const styles = StyleSheet.create({
  main: {
    marginBottom: 15,
    backgroundColor: Colors.fullWhite,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginRight: 10,
    width: isTablet() ? '49%' : '100%',
  },
  title: {
    marginBottom: 10,
    fontSize: 18,
  },
  fieldRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  fieldBtn: {
    backgroundColor: Colors.fullWhite20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    marginTop: 10,
  },
  fieldDeletedIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.fullBlack,
    marginRight: 5,
  },
  fieldBtnTitle: {
    textTransform: 'capitalize',
    color: Colors.sfpurple,
  },
  flex: {flex: 1, marginRight: 5},
  addNewAttributeBtn: {
    marginVertical: 5,
  },
  addBtn: {
    color: Colors.sfpurple,
    marginVertical: 15,
    borderRadius: 4,
  },
  titleModelBtn: {
    marginVertical: 5,
    color: Colors.fullWhite,
  },
  titleModelView: {
    color: Colors.fullWhite,
    marginVertical: 5,
    borderRadius: 4,
    backgroundColor: Colors.passionFruit,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryDeletedIcon: {
    width: 14,
    height: 14,
    tintColor: Colors.sfpurple,
    marginHorizontal: 15,
  },
});
