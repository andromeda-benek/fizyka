import test from 'node:test';
import assert from 'node:assert/strict';

import {
  selectSubject,
  buildProfileText,
  countSelected,
} from '../logic.mjs';

test('selectSubject nie pozwala przekroczyć limitu bloku', () => {
  const first = selectSubject([], 'Python', 1, true);
  const second = selectSubject(first.selected, 'C++', 1, true);

  assert.deepEqual(first, { selected: ['Python'], accepted: true });
  assert.deepEqual(second, { selected: ['Python'], accepted: false });
});

test('selectSubject pozwala odznaczyć przedmiot po osiągnięciu limitu', () => {
  const result = selectSubject(['Python'], 'Python', 1, false);
  assert.deepEqual(result, { selected: [], accepted: true });
});

test('countSelected zwraca liczbę wybranych przedmiotów w każdym bloku', () => {
  assert.equal(countSelected(['A', 'B']), 2);
});

test('buildProfileText tworzy kompletny zapis nazwy, opisu i przedmiotów', () => {
  const text = buildProfileText({
    name: 'Fizyk danych',
    description: 'Łączy modelowanie z analizą danych.',
    blocks: [
      { title: 'Blok programistyczny', semester: 4, selected: ['Zaawansowane programowanie w Pythonie'] },
      { title: 'Blok rozszerzeń', semester: 5, selected: [] },
    ],
  });

  assert.match(text, /^FIZYK DANYCH/m);
  assert.match(text, /Łączy modelowanie z analizą danych\./);
  assert.match(text, /Blok programistyczny \(semestr 4\)/);
  assert.match(text, /• Zaawansowane programowanie w Pythonie/);
  assert.doesNotMatch(text, /Blok rozszerzeń/);
});

test('buildProfileText stosuje czytelne wartości zastępcze dla pustego formularza', () => {
  const text = buildProfileText({ name: '', description: '', blocks: [] });
  assert.match(text, /BEZ NAZWY/);
  assert.match(text, /Brak opisu\./);
  assert.match(text, /Nie wybrano jeszcze żadnych przedmiotów\./);
});
