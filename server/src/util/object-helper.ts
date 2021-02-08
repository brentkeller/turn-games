export const applyNewValues = (data: any, newData: any, fields: string[]) => {
  fields.forEach((field) => {
    if (newData.hasOwnProperty(field)) data[field] = newData[field];
  });
};
