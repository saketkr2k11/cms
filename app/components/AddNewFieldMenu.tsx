import * as React from 'react';
import {TextStyle} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Button, Menu} from 'react-native-paper';

export type Menu = {
  displayText: string;
  internalValue: string;
};

type Props = {
  onPress: (val: string) => void;
  title: string;
  labelStyle: TextStyle;
  viewstyle: TextStyle;
  menus: Menu[];
};
const AddNewFieldMenu = ({
  onPress = () => {},
  title = '',
  labelStyle = {},
  viewstyle = {},
  menus = [],
}: Props) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const onTap = (val: string) => {
    onPress(val);
    closeMenu();
  };

  const renderItem = ({item}: {item: Menu}) => {
    return (
      <Menu.Item
        onPress={() => {
          onTap(item.internalValue);
        }}
        title={item.displayText}
      />
    );
  };
  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchorPosition="top"
      anchor={
        <Button
          mode="outlined"
          onPress={openMenu}
          labelStyle={labelStyle}
          style={viewstyle}>
          {title}
        </Button>
      }>
      <FlatList
        data={menus}
        renderItem={renderItem}
        keyExtractor={item => item.internalValue}
      />
    </Menu>
  );
};
// export default AddNewFieldMenu;

function propsAreEqual(prev: Props, next: Props) {
  return (
    JSON.stringify(prev.menus) === JSON.stringify(next.menus) &&
    JSON.stringify(prev.title) === JSON.stringify(next.title)
  );
}
const MemoizedAddNewFieldMenu = React.memo(AddNewFieldMenu, propsAreEqual);

export default MemoizedAddNewFieldMenu;
