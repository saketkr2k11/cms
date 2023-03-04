import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppData, DataType, DataTypeEnum} from '../lib/types';
import {RootState} from '../store/configureStore';
import {FlatList} from 'react-native-gesture-handler';
import {Colors} from '../lib/constants';
import {Switch, TextInput} from 'react-native-paper';
import {deleteSubItem, updateItemAttributeValue} from '../lib/actions';
import DatePickerComponent from './DatePickerComponent';
import _ from 'lodash';
import {isTablet} from 'react-native-device-info';

type Props = {
  itemId: string;
  titleFieldId: string;
  categoryId: string;
};

type Attribute = {
  title: string;
  dataType: DataType;
  value: string | number | boolean | Date | null;
  id: string;
};

const REG_EXP = new RegExp(/^\d+(?:\.\d\d?)?$/);
const SubListCardView = (props: Props) => {
  const dispatch = useDispatch();
  const storeData: AppData = useSelector((state: RootState) => state.appData);
  const {itemId, titleFieldId, categoryId} = props;
  const attributes: Attribute[] = [];
  storeData.categories[categoryId].attributesIdsList.forEach(attributeId => {
    attributes.push({
      id: attributeId,
      title: storeData.attributesMap[attributeId].title,
      dataType: storeData.attributesMap[attributeId].dataType,
      value: storeData.subItems[itemId][attributeId],
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

  const titleField = storeData?.subItems[itemId][titleFieldId];
  return (
    <View style={styles.main}>
      <View style={styles.card}>
        <Text style={styles.title}>
          {_.isEmpty(titleField) ? 'Unnamed Title' : titleField?.toString()}
        </Text>
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
    marginVertical: 15,
    marginRight: 8,
    width: isTablet() ? '49%' : '100%',
  },
  card: {
    backgroundColor: Colors.fullWhite,
    padding: 8,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
  },
  checkboxView: {flexDirection: 'row', alignItems: 'center'},
  checkboxViewWrapper: {
    marginVertical: 2,
  },
  checkboxText: {
    fontSize: 14,
    marginLeft: 10,
  },
  cardItems: {
    marginVertical: 2,
  },
  categoryDeletedIcon: {
    width: 14,
    height: 14,
    tintColor: Colors.sfpurple,
    marginHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
});
