/**
 * Склоняет исчисляемое существительное.
 *
 * @param count - число,
 * @param declensions - склонения.
 */
const declensionCountable = (
  count: number,
  declensions: {
    /**
     * Именительный падеж.
     */
    nominative: string;
    /**
     * Родительный падеж, единственное число.
     */
    genitiveSingle: string;
    /**
     * Родительный падеж, множественное число.
     */
    genitivePlural: string;
  }
): string => {
  const str = count.toString();

  if (
    str.endsWith('11') ||
    str.endsWith('12') ||
    str.endsWith('13') ||
    str.endsWith('14')
  )
    return declensions.genitivePlural;

  if (str.endsWith('1')) return declensions.nominative;

  if (str.endsWith('2') || str.endsWith('3') || str.endsWith('4'))
    return declensions.genitiveSingle;

  return declensions.genitivePlural;
};

export default declensionCountable;
