import {ActionTypes} from './actionTypes';

export const addNewCategory = () => {
  return {
    type: ActionTypes.ADD_NEW_CATEGORY,
  };
};

export const updateCategoryTitle = (text: string, categoryId: string) => {
  return {
    type: ActionTypes.UPDATE_CATEGORY_TITLE,
    payload: {
      text,
      categoryId,
    },
  };
};

export const updateAttributeDataType = (
  type: string,
  attributeId: string,
  categoryId: string,
) => {
  return {
    type: ActionTypes.UPDATE_ATTRIBUTES_DATA_TYPE,
    payload: {
      attributeId,
      type,
      categoryId,
    },
  };
};

export const updateAttributeTitle = (
  text: string,
  attributeId: string,
  categoryId: string,
) => {
  return {
    type: ActionTypes.UPDATE_ATTRIBUTES_TITLE,
    payload: {
      text,
      attributeId,
      categoryId,
    },
  };
};

export const addNewAttribute = (categoryId: string, type: string) => {
  return {
    type: ActionTypes.ADD_NEW_ATTRIBUTE,
    payload: {
      categoryId,
      type,
    },
  };
};

export const deleteAttribute = (attributeId: string, categoryId: string) => {
  return {
    type: ActionTypes.DELETE_ATTRIBUTE,
    payload: {
      attributeId,
      categoryId,
    },
  };
};

export const deleteCategory = (categoryId: string) => {
  return {
    type: ActionTypes.DELETE_CATEGORY,
    payload: {
      categoryId,
    },
  };
};

export const updateCategoryTitleField = (
  attributeId: string,
  categoryId: string,
) => {
  return {
    type: ActionTypes.UPDATE_CATEGORY_TITLE_FIELD,
    payload: {
      categoryId,
      attributeId,
    },
  };
};

export const addSubItemsToCategory = (categoryId: string) => {
  return {
    type: ActionTypes.ADD_NEW_ITEM_TO_SUBLIST,
    payload: {
      categoryId,
    },
  };
};

export const resetAppData = () => {
  return {
    type: ActionTypes.RESET_APP_DATA,
  };
};

export const updateItemAttributeValue = (
  value: string | Date | number | boolean,
  attributeId: string,
  subItemId: string,
) => {
  return {
    type: ActionTypes.UPDATE_ITEM_ATTRIBUTES_VALUE,
    payload: {
      value,
      attributeId,
      subItemId,
    },
  };
};

export const deleteSubItem = (subItemId: string, categoryId: string) => {
  return {
    type: ActionTypes.DELETE_SUB_ITEM,
    payload: {
      subItemId,
      categoryId,
    },
  };
};
