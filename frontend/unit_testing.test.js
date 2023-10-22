import setName from './src/components/SetName'; // Adjust the path as needed

test('setName should modify the string', () => {
  // Reset the stdName variable to its initial value
  setName('Name_Default');

  // Modify stdName using the setName function
  const modifiedName = setName('Modified_Name');

  // After calling setName, the exported stdName should be equal to 'Modified_Name'
  expect(modifiedName).toEqual('Modified_Name');
});
