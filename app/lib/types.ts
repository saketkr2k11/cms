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
  dataType: string;
  title: string | null;
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

export interface ITypography {
  fontSize: {
    tiny: number; //10
    normal: number; //12
    small: number; //14
    medium: number; //16
    average: number; //18
    big: number; //20
    title: number; //24
    subTitle: number; //32
    hero: number; //40
  };
}
