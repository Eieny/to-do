import declensionCountable from '../declension';

describe('Тестирование склонения исчисляемого существительного', () => {
  const declensions = {
    nominative: 'яблоко',
    genitiveSingle: 'яблока',
    genitivePlural: 'яблок',
  };

  it('Должно вернуть существительное в им.п.', () => {
    expect(declensionCountable(1, declensions)).toBe('яблоко');
    expect(declensionCountable(21, declensions)).toBe('яблоко');
    expect(declensionCountable(101, declensions)).toBe('яблоко');
  });

  it('Должно вернуть существительное в р.п. ед.ч.', () => {
    expect(declensionCountable(2, declensions)).toBe('яблока');
    expect(declensionCountable(4, declensions)).toBe('яблока');
    expect(declensionCountable(24, declensions)).toBe('яблока');
    expect(declensionCountable(103, declensions)).toBe('яблока');
  });

  it('Должно вернуть существительное в р.п. мн.ч.', () => {
    expect(declensionCountable(5, declensions)).toBe('яблок');
    expect(declensionCountable(10, declensions)).toBe('яблок');
    expect(declensionCountable(17, declensions)).toBe('яблок');
    expect(declensionCountable(20, declensions)).toBe('яблок');
    expect(declensionCountable(111, declensions)).toBe('яблок');
  });
});
