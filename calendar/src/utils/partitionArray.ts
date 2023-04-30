

const partitionArray = (array: any[], lengthGroup: number) => {
  const partitionedArray = array.reduce(
    (particionado, elemento, indice) => {
      const indexGroup = Math.floor(indice / lengthGroup);
      if (!particionado[indexGroup]) {
        particionado[indexGroup] = [];
      }
      particionado[indexGroup].push(elemento);
      return particionado;
    },
    []
  );
  return partitionedArray;
}

export { partitionArray };