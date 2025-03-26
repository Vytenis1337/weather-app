const addMock = jest.fn();
const collectionMock = jest.fn(() => ({
  add: addMock,
}));

const firestoreMock = jest.fn(() => ({
  collection: collectionMock,
}));

module.exports = {
  firestore: firestoreMock,
  credential: {
    cert: jest.fn(),
  },
  initializeApp: jest.fn(),
  __mock: {
    addMock,
    collectionMock,
    firestoreMock,
  },
};
