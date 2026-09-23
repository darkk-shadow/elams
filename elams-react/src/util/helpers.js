export const enumToString = (str) => {
  if (!str) return '';
  return str.replaceAll("_"," ")
    .toLowerCase() 
    .split(' ')    
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');   
}