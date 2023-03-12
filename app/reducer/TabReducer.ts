import {ActionTypes} from '../lib/actionTypes';
import createReducer, {Action} from '../lib/createReducer';
import produce from 'immer';
import uuid from 'react-native-uuid';
import {AppData, AttributesMap, AttributesValueMap} from '../lib/types';
import _ from 'lodash';

const INITIAL_STATE: AppData = {
  categories: {},
  attributesMap: {},
  subItems: {},
};

export const appData = createReducer(INITIAL_STATE, {
  [ActionTypes.RESET_APP_DATA]() {
    return {
      categories: {},
      attributesMap: {},
      subItems: {},
    };
  },
  [ActionTypes.ADD_NEW_CATEGORY](state: AppData) {
    const newState = produce(state, (draft: AppData) => {
      const {
        id,
        attributesIdsList,
        attributesMap,
        title,
        titleField,
        subItemIds,
      } = getNewCategoryItem();
      draft.categories[id] = {
        id,
        attributesIdsList,
        title,
        titleField,
        subItemIds,
      };
      draft.attributesMap = {...draft.attributesMap, ...attributesMap};
    });

    return newState;
  },

  [ActionTypes.UPDATE_CATEGORY_TITLE](state: AppData, action: Action) {
    const newState = produce(state, (draft: AppData) => {
      const {text, categoryId} = action.payload;
      draft.categories[categoryId].title = text;
    });
    return newState;
  },

  [ActionTypes.UPDATE_ATTRIBUTES_TITLE](state: AppData, action: Action) {
    const newState = produce(state, (draft: AppData) => {
      const {text, attributeId, categoryId} = action.payload;
      draft.attributesMap[attributeId].title = text;
      if (_.isEmpty(draft.categories[categoryId].titleField)) {
        draft.categories[categoryId].titleField = attributeId;
      }
    });
    return newState;
  },
  [ActionTypes.UPDATE_ATTRIBUTES_DATA_TYPE](state: AppData, action: Action) {
    const newState = produce(state, (draft: AppData) => {
      const {attributeId, type, categoryId} = action.payload;
      const previousTitle = draft.attributesMap[attributeId].title;

      delete draft.attributesMap[attributeId];
      const newAttributes = getNewAttribute(type);
      const oldList = draft.categories[categoryId].attributesIdsList || [];
      const index = oldList.findIndex((i: string) => i === attributeId);
      if (index > -1) {
        oldList[index] = newAttributes.attributeId;
        draft.attributesMap[newAttributes.attributeId] = {
          title: previousTitle,
          dataType: type,
        };
      }
    });
    return newState;
  },
  [ActionTypes.ADD_NEW_ATTRIBUTE](state: AppData, action: Action) {
    const newState = produce(state, (draft: AppData) => {
      const {categoryId, type} = action.payload;
      const {attributeId, attribute} = getNewAttribute(type);
      draft.attributesMap[attributeId] = {...attribute};
      draft.categories[categoryId].attributesIdsList.push(attributeId);
    });
    return newState;
  },
  [ActionTypes.DELETE_ATTRIBUTE](state: AppData, action: Action) {
    const newState = produce(state, (draft: AppData) => {
      const {attributeId, categoryId} = action.payload;
      draft.categories[categoryId].attributesIdsList = draft.categories[
        categoryId
      ].attributesIdsList.filter((i: string) => i !== attributeId);
      delete draft.attributesMap[attributeId];
      if (attributeId === draft.categories[categoryId]?.titleField) {
        draft.categories[categoryId].titleField = null;
      }
    });
    return newState;
  },
  [ActionTypes.DELETE_CATEGORY](state: AppData, action: Action) {
    const newState = produce(state, (draft: AppData) => {
      const {categoryId} = action.payload;
      delete draft.categories[categoryId];
    });
    return newState;
  },
  [ActionTypes.UPDATE_CATEGORY_TITLE_FIELD](state: AppData, action: Action) {
    const newState = produce(state, (draft: AppData) => {
      const {categoryId, attributeId} = action.payload;
      draft.categories[categoryId].titleField = attributeId;
    });
    return newState;
  },

  [ActionTypes.ADD_NEW_ITEM_TO_SUBLIST](state: AppData, action: Action) {
    const newState = produce(state, (draft: AppData) => {
      const {categoryId} = action.payload;
      const {subItemId, subItem} = getNewSubItem(
        draft.categories[categoryId].attributesIdsList,
      );
      if (!draft.categories[categoryId]?.subItemIds) {
        draft.categories[categoryId].subItemIds = [subItemId];
      } else {
        draft.categories[categoryId].subItemIds.push(subItemId);
      }
      draft.subItems[subItemId] = {...subItem};
    });
    return newState;
  },
  [ActionTypes.UPDATE_ITEM_ATTRIBUTES_VALUE](state: AppData, action: Action) {
    const newState = produce(state, (draft: AppData) => {
      const {value, attributeId, subItemId} = action.payload;
      draft.subItems[subItemId][attributeId] = value;
    });
    return newState;
  },
  [ActionTypes.DELETE_SUB_ITEM](state: AppData, action: Action) {
    const newState = produce(state, (draft: AppData) => {
      const {subItemId, categoryId} = action.payload;
      delete draft.subItems[subItemId];
      draft.categories[categoryId].subItemIds = draft.categories[
        categoryId
      ]?.subItemIds.filter(i => i !== subItemId);
    });
    return newState;
  },
});

const getNewCategoryItem = () => {
  const id = uuid.v4().toString();
  const attributeId = uuid.v4().toString();
  const attributesIdsList = [attributeId];
  const attributesMap: AttributesMap = {};
  attributesMap[attributeId] = {
    dataType: 'text',
    title: '',
  };
  return {
    id,
    attributesIdsList,
    attributesMap,
    title: 'New Category',
    titleField: null,
    subItemIds: [],
  };
};

const getNewAttribute = (type: string) => {
  const attributeId = uuid.v4().toString();
  const attribute = {
    dataType: type,
    title: type === 'text' ? '' : null,
  };
  return {
    attributeId,
    attribute,
  };
};

const getNewSubItem = (attributesIdsList: string[]) => {
  const subItemId = uuid.v4().toString();
  const attributesValuesMap: AttributesValueMap = {};
  attributesIdsList.forEach((attributesId: string) => {
    attributesValuesMap[attributesId] = null;
  });
  return {
    subItemId,
    subItem: attributesValuesMap,
  };
};
