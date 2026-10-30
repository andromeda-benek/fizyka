# Project Contract

## Cel projektu

Statyczny kreator pozwalający zaprojektować sylwetkę absolwenta fizyki na podstawie wybranych przedmiotów.

## Aktualny zakres

- nazwa i opis profilu absolwenta,
- sześć bloków przedmiotów z niezależnymi limitami,
- automatyczne blokowanie opcji po osiągnięciu limitu,
- responsywne drzewko wybranych kompetencji,
- tekstowy zapis profilu oraz kopiowanie do schowka,
- czyszczenie całego formularza.

## Stabilne zachowania — nie zmieniać bez zgody

- limity wyborów: 1, 2, 5, 1, 8 i 2,
- pełne nazwy przedmiotów,
- brak zewnętrznego backendu i przechowywania danych,
- aktualizacja drzewka i tekstu na bieżąco,
- działanie na GitHub Pages z podkatalogu `/fizyka/`.

## Pliki stabilne — nie zmieniać bez zgody

- `index.html`
- `styles.css`
- `app.js`
- `logic.mjs`

## Pliki, które można zmieniać przy typowych poprawkach

- `README.md`
- `tests/logic.test.mjs`

## Procedura zmiany

Przed zmianą należy określić problem, wskazać edytowane pliki, potwierdzić wpływ na stabilne zachowania i podać plan testów. Zmiana stabilnego pliku wymaga zgody użytkownika.

## Testy regresyjne

Po każdej zmianie sprawdzić:

- [ ] `npm test`
- [ ] brak błędów składni JavaScript,
- [ ] limity wszystkich bloków,
- [ ] aktualizację drzewka po zaznaczeniu i odznaczeniu,
- [ ] kopiowanie tekstu,
- [ ] układ mobilny i desktopowy,
- [ ] konsolę przeglądarki,
- [ ] działanie opublikowanej wersji GitHub Pages.

## Otwarte problemy

Brak.
