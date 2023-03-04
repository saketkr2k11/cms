import {Keyboard, Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {Colors} from '../lib/constants';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

type Props = {
  onDateSelect: (dt: Date) => void;
  date: string;
  label: string;
};
const DatePickerComponent = ({onDateSelect, date, label}: Props) => {
  const [show, setShow] = useState(false);
  return (
    <View style={styles.main}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <TextInput
          label={label}
          keyboardType="number-pad"
          mode="outlined"
          value={date ? moment(date).format('DD-MMM-yyyy') : ''}
          style={styles.text}
          editable={false}
        />
      </TouchableWithoutFeedback>

      <Pressable
        style={styles.dateView}
        onPress={() => {
          setShow(true);
        }}
      />
      <DateTimePickerModal
        isVisible={show}
        mode="date"
        onConfirm={(dt: Date) => {
          setShow(false);
          onDateSelect(dt);
        }}
        onCancel={() => {
          setShow(false);
        }}
      />
    </View>
  );
};

export default DatePickerComponent;

const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 40,
  },
  dateView: {
    backgroundColor: Colors.transparent,
    height: 40,
  },
  main: {
    marginBottom: 10,
  },
});
