export const SELECT_LIBRARY = 'SELECT_LIBRARY';

export const selectLibrary = (libraryId) => {
  return {
    type: SELECT_LIBRARY,
    payload: libraryId
  };
};
