const id = () => {
  let id = 0;
  return () => id++;
};

/**
 * Генерирует `id`.
 */
const genId = id();

export default genId;