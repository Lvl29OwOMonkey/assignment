let stdName = "Name_Default";

export default function setName(inputString: string): string {
  const modifiedString = inputString;
  stdName = modifiedString;
  return stdName; // Return the modified string
}