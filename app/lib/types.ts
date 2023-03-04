export type NavigatorParams = {
  Dashboard: undefined;
  ManageCategory: undefined;
  CategoryListView: {
    categoryId: string;
    name: string;
    titleField: string;
  };
};

export type DataTypeModel = {
  dataType: DataType;
  title: string;
};

export type AttributesMap = Record<string, DataTypeModel>;

export const DataTypeEnum = {
  text: 'text',
  date: 'date',
  number: 'number',
  checkbox: 'checkbox',
};

export type DataType = 'text' | 'date' | 'number' | 'checkbox';

export type AttributesValueMap = Record<
  string,
  string | number | boolean | Date | null
>;

export type Category = {
  id: string;
  attributesIdsList: string[];
  title: string;
  titleField: null | string;
  subItemIds: string[];
};

export type AppData = {
  categories: Record<string, Category>;
  attributesMap: AttributesMap;
  subItems: Record<string, AttributesValueMap>;
};
