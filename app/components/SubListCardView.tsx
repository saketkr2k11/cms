import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  AttributesMap,
  AttributesValueMap,
  Category,
  DataTypeEnum,
} from '../lib/types';
import {FlatList} from 'react-native-gesture-handler';
import {Colors} from '../lib/constants';
import {Switch, TextInput} from 'react-native-paper';
import {deleteSubItem, updateItemAttributeValue} from '../lib/actions';
import DatePickerComponent from './DatePickerComponent';
import _ from 'lodash';
import dimensions, {isTablet} from '../utility/dimensions';
import {getAttributesMap, getCategories, getSubList} from '../selectors';
import moment from 'moment';
import {typography} from '../utility/typography';

type Props = {
  itemId: string;
  titleFieldId: string;
  categoryId: string;
};

type Attribute = {
  title: string;
  dataType: string;
  value: string | number | boolean | Date | null;
  id: string;
};

const REG_EXP = new RegExp(/^\d+(?:\.\d\d?)?$/);
const SubListCardView = (props: Props) => {
  const dispatch = useDispatch();
  const categories: Record<string, Category> = useSelector(getCategories);

  const attributesMap: AttributesMap = useSelector(getAttributesMap);
  const subItems: Record<string, AttributesValueMap> = useSelector(getSubList);

  const {itemId, titleFieldId, categoryId} = props;
  const attributes: Attribute[] = [];
  categories[categoryId].attributesIdsList.forEach((attributeId: string) => {
    attributes.push({
      id: attributeId,
      title: attributesMap[attributeId].title || '',
      dataType: attributesMap[attributeId].dataType,
      value: subItems[itemId][attributeId],
    });
  });

  const renderCardItem = ({item}: {item: Attribute}) => {
    const {id, title, dataType, value} = item;
    return (
      <View style={styles.cardItems}>
        {renderAttributes(id, title, dataType, value)}
      </View>
    );
  };

  const renderAttributes = (
    id: string,
    title: string,
    dataType: string,
    value: string | number | boolean | Date | null,
  ) => {
    if (dataType === DataTypeEnum.text) {
      return (
        <View>
          <TextInput
            label={title}
            mode="outlined"
            value={value?.toString() || ''}
            onChangeText={text =>
              dispatch(updateItemAttributeValue(text, id, itemId))
            }
          />
        </View>
      );
    }
    if (dataType === DataTypeEnum.number) {
      return (
        <View>
          <TextInput
            label={title}
            keyboardType="number-pad"
            mode="outlined"
            value={value?.toString() || ''}
            onChangeText={text => {
              if (text === '') {
                dispatch(updateItemAttributeValue(0, id, itemId));
              }
              if (REG_EXP.test(text)) {
                dispatch(updateItemAttributeValue(Number(text), id, itemId));
              }
            }}
          />
        </View>
      );
    }
    if (dataType === DataTypeEnum.checkbox) {
      return (
        <View style={styles.checkboxView}>
          <View style={styles.checkboxViewWrapper}>
            <Switch
              value={!!value}
              style={{transform: [{scaleX: 0.75}, {scaleY: 0.75}]}}
              onValueChange={() => {
                dispatch(updateItemAttributeValue(!value, id, itemId));
              }}
            />
          </View>

          <Text style={styles.checkboxText}>{title}</Text>
        </View>
      );
    }
    if (dataType === DataTypeEnum.date) {
      return (
        <View>
          <DatePickerComponent
            label={title}
            date={value?.toString() || ''}
            onDateSelect={date => {
              dispatch(updateItemAttributeValue(date, id, itemId));
            }}
          />
        </View>
      );
    }
    return;
  };

  const getTitleFieldText = () => {
    const titleField = subItems[itemId][titleFieldId];
    if (attributesMap[titleFieldId].dataType === 'date' && titleField != null) {
      return moment(new Date(titleField.toString())).format('DD-MMM-YYYY');
    }
    return titleField == null || titleField === ''
      ? 'Unnamed Title'
      : titleField?.toString();
  };
  return (
    <View style={styles.main}>
      <View style={styles.card}>
        <Text style={styles.title}>{getTitleFieldText()}</Text>
        <FlatList
          data={attributes}
          renderItem={renderCardItem}
          keyExtractor={({id}) => id}
        />
        <Pressable
          style={styles.row}
          onPress={() => dispatch(deleteSubItem(itemId, categoryId))}>
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

export default SubListCardView;

const styles = StyleSheet.create({
  main: {
    marginVertical: dimensions.viewHeight(15),
    marginRight: dimensions.viewWidth(8),
    width: isTablet ? '49%' : '100%',
  },
  card: {
    backgroundColor: Colors.fullWhite,
    padding: dimensions.viewWidth(8),
  },
  title: {
    fontSize: typography.fontSize.average,
    marginBottom: dimensions.viewHeight(5),
  },
  checkboxView: {flexDirection: 'row', alignItems: 'center'},
  checkboxViewWrapper: {
    marginVertical: dimensions.viewHeight(2),
  },
  checkboxText: {
    fontSize: typography.fontSize.small,
    marginLeft: dimensions.viewWidth(10),
  },
  cardItems: {
    marginVertical: dimensions.viewHeight(2),
  },
  categoryDeletedIcon: {
    width: dimensions.viewWidth(14),
    height: dimensions.viewHeight(14),
    tintColor: Colors.sfpurple,
    marginHorizontal: dimensions.viewWidth(15),
  },
  row: {
    flexDirection: 'row',
    marginTop: dimensions.viewHeight(10),
    alignItems: 'center',
  },
});
