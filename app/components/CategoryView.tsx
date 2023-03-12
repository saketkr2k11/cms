import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
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
import dimensions, {isTablet} from '../utility/dimensions';
import {typography} from '../utility/typography';

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

  const textChange = (text: string, attributeId: string) => {
    dispatch(updateAttributeTitle(text, attributeId, category.id));
  };

  const onAddNewField = (
    newType: string,
    dataType: string,
    attributeId: string,
  ) => {
    if (newType !== dataType) {
      dispatch(updateAttributeDataType(newType, attributeId, category.id));
    }
  };

  const deletePress = (attributeId: string) => {
    dispatch(deleteAttribute(attributeId, category.id));
  };

  const renderAttributes = ({item}: {item: string}) => {
    //item == attribute id
    const attributeField = attributesMap[item];
    return (
      <View style={styles.fieldRow}>
        <TextInput
          label="field"
          mode="outlined"
          value={attributeField?.title || ''}
          style={styles.flex}
          onChangeText={text => textChange(text, item)}
        />
        <AddNewFieldMenu
          labelStyle={styles.addNewAttributeBtn}
          viewstyle={styles.addBtn2}
          title={attributeField.dataType}
          menus={DATA_FIELDS}
          onPress={newType =>
            onAddNewField(newType, attributeField.dataType, item)
          }
        />
        <Pressable
          onPress={() => deletePress(item)}
          style={styles.fieldDeletedIconView}>
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
      if (attributesMap[attributeId]?.title) {
        items.push({
          internalValue: attributeId,
          displayText: attributesMap[attributeId]?.title || '',
        });
      }
    });
    return items;
  };

  const doUpdateCategoryTitle = (value: string) => {
    dispatch(updateCategoryTitle(value, category.id));
  };

  const doAddNewAttribute = useCallback(
    (type: string) => {
      dispatch(addNewAttribute(category.id, type));
    },
    [category.id, dispatch],
  );

  return (
    <View style={styles.main}>
      <Text style={styles.title}>{title}</Text>

      <TextInput
        label="Category name"
        mode="outlined"
        value={title}
        onChangeText={text => doUpdateCategoryTitle(text)}
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
          onPress={type => doAddNewAttribute(type)}
        />
        <Pressable
          style={styles.row}
          hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}
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

function propsAreEqual(prev: Props, next: Props) {
  return (
    JSON.stringify(prev.attributesMap) === JSON.stringify(next.attributesMap) &&
    JSON.stringify(prev.category) === JSON.stringify(next.category)
  );
}
const MemoizedCategoryView = React.memo(CategoryView, propsAreEqual);

export default MemoizedCategoryView;

const styles = StyleSheet.create({
  main: {
    marginBottom: dimensions.viewHeight(15),
    backgroundColor: Colors.fullWhite,
    paddingVertical: dimensions.viewHeight(5),
    paddingHorizontal: dimensions.viewWidth(8),
    marginRight: dimensions.viewWidth(10),
    width: isTablet ? '49%' : '100%',
  },
  title: {
    marginBottom: dimensions.viewHeight(18),
    fontSize: typography.fontSize.average,
  },
  fieldRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: dimensions.viewHeight(5),
    height: dimensions.viewHeight(50),
  },
  fieldBtn: {
    backgroundColor: Colors.fullWhite20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: dimensions.viewWidth(5),
    margin: dimensions.viewWidth(5),
    marginTop: dimensions.viewHeight(10),
  },
  fieldDeletedIcon: {
    width: dimensions.viewWidth(24),
    height: dimensions.viewHeight(24),
    tintColor: Colors.fullBlack,
  },
  fieldDeletedIconView: {
    height: dimensions.viewHeight(50),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: dimensions.viewWidth(5),
  },
  fieldBtnTitle: {
    textTransform: 'capitalize',
    color: Colors.sfpurple,
  },
  flex: {
    flex: 1,
    marginRight: dimensions.viewWidth(5),
    height: dimensions.viewHeight(50),
  },
  addNewAttributeBtn: {
    marginVertical: dimensions.viewHeight(5),
  },
  addBtn: {
    color: Colors.sfpurple,
    marginVertical: dimensions.viewHeight(5),
    borderRadius: dimensions.viewWidth(4),
  },
  addBtn2: {
    color: Colors.sfpurple,
    borderRadius: dimensions.viewWidth(4),
    height: dimensions.viewHeight(50),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: dimensions.viewHeight(4),
  },
  titleModelBtn: {
    marginVertical: dimensions.viewHeight(5),
    color: Colors.fullWhite,
  },
  titleModelView: {
    color: Colors.fullWhite,
    marginVertical: dimensions.viewHeight(5),
    borderRadius: dimensions.viewWidth(4),
    backgroundColor: Colors.passionFruit,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryDeletedIcon: {
    width: dimensions.viewWidth(14),
    height: dimensions.viewHeight(14),
    tintColor: Colors.sfpurple,
    marginLeft: dimensions.viewWidth(25),
    marginRight: dimensions.viewWidth(10),
  },
});
