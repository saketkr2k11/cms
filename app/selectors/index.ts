import {RootState} from '../store/configureStore';

export const getCategories = (store: RootState) => store.appData?.categories;
export const getAttributesMap = (store: RootState) =>
  store.appData?.attributesMap;

export const getSubList = (store: RootState) => store.appData?.subItems;
