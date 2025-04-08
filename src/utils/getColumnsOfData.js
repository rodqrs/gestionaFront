export function getColumnsOfData(data) {
  const columns = Object.keys(data).reduce((columns, key) => {
   const rowDb = data[key][0];
   if (rowDb) {
    columns[key] = Object.keys(rowDb).map((column) => {
     return {
      name: column,
      selector: (row) => row[column],
     };
    });
   } else {
    columns[key] = [];
   }
   return columns;
  }, {});
 
  return columns;
 }
 
 