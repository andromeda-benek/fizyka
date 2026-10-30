import { selectSubject, buildProfileText } from './logic.mjs';

const BLOCKS = [
  {
    title: 'Blok programistyczny', semester: 4, limit: 1,
    subjects: [
      'Obliczenia inżynierskie w środowiskach Mathematica i MATLAB',
      'Zaawansowane programowanie w C++',
      'Zaawansowane programowanie w Pythonie',
    ],
  },
  {
    title: 'Blok rozszerzeń', semester: 5, limit: 2,
    subjects: [
      'Fizyka jądrowa z elementami technologii kwantowych 2',
      'Fizyka materiałów 2',
      'Fizyka medyczna 2',
      'Inżynieria danych i modelowanie interdyscyplinarne 2',
      'Optyka i fotonika 2',
    ],
  },
  {
    title: 'Blok ogólno-narzędziowy', semester: 5, limit: 5,
    subjects: [
      'Analiza szeregów czasowych',
      'Fizyka kwantowa 2',
      'Fizyka przemian fazowych i zjawisk krytycznych',
      'Fizyka układów nieliniowych',
      'Fizyka zjawisk transportu',
      'Komputerowe systemy pomiarowe',
      'Laboratorium sieci neuronowych',
      'Materiały optyczne i ich właściwości',
      'Matlab w projektowaniu elementów optycznych',
      'Obliczenia kwantowe',
      'Oddziaływanie fal elektromagnetycznych z materią',
      'Podstawy chemii',
      'Półprzewodniki i ich zastosowania',
      'Programowanie obiektowe w Java',
      'Programowanie zaawansowane w C#',
      'Wprowadzenie do komputerowych metod symulacji',
      'Wprowadzenie do uczenia maszynowego',
      'Wstęp do optyki numerycznej',
      'Wybrane działy matematyki',
    ],
  },
  {
    title: 'Blok elektroniki cyfrowej', semester: 5, limit: 1,
    subjects: [
      'Podstawy systemów mikroprocesorowych',
      'Podstawy systemów wbudowanych',
      'Wprowadzenie do LabVIEW i układów kontrolno-pomiarowych',
    ],
  },
  {
    title: 'Blok specjalistyczny', semester: 6, limit: 8,
    subjects: [
      'Algorytmy ewolucyjne',
      'Analiza danych w środowisku CERN ROOT',
      'Chemia ciała stałego',
      'Data science w medycynie',
      'Dozymetria i ochrona radiologiczna',
      'Informatyka optyczna i holografia',
      'Jonika ciała stałego i fotowoltaika',
      'Laboratorium technik jądrowych',
      'Laboratorium układów złożonych',
      'Mechanika kwantowa układów wielu cząstek',
      'Metody obliczeniowe w fizyce fazy skondensowanej',
      'Modelowanie i projektowanie układów optycznych',
      'Modelowanie procesów społecznych',
      'Optyka dyfrakcyjna i fourierowska',
      'Pakiet R w analizie i wizualizacji danych',
      'Podstawy fotoniki światłowodowej',
      'Podstawy inżynierii kwantowej',
      'Podstawy sieci komputerowych oraz HPC',
      'Podstawy teorii informacji',
      'Podstawy układów programowalnych FPGA',
      'Procesy stochastyczne',
      'Projektowanie i programowanie baz danych',
      'Prototypowanie urządzeń medycznych',
      'Symulacje w biologii i medycynie',
      'Techniki pomiarowe w diagnostyce medycznej',
      'Technologie obrazowania',
      'Układy optoelektroniczne',
      'Wprowadzenie do optyki nieliniowej',
      'Wstęp do energetyki jądrowej z elementami bezpieczeństwa jądrowego',
      'Wstęp do nadprzewodnictwa i magnetyzmu',
      'Wytwarzanie i charakteryzacja ciał stałych',
      'Zaawansowana analiza sygnału',
    ],
  },
  {
    title: 'Blok ogólno-specjalistyczny-narzędziowy', semester: 7, limit: 2,
    subjects: [
      'Biofizyka radiacyjna',
      'Fizyka kwantowa 2',
      'Fizyka przemian fazowych i zjawisk krytycznych',
      'Fizyka układów nieliniowych',
      'Informacja kwantowa i cyberbezpieczeństwo',
      'Komputerowe systemy pomiarowe',
      'Laboratorium sieci neuronowych',
      'Materiały optyczne i ich właściwości',
      'Obliczenia kwantowe',
      'Oddziaływanie fal elektromagnetycznych z materią',
      'Optyka i fizjologia widzenia z elementami optometrii',
      'Podstawy chemii',
      'Pola kwantowe w fizyce',
      'Półprzewodniki i ich zastosowania',
      'Rozwiązania MedTech',
      'Wprowadzenie do uczenia maszynowego',
      'Wybrane działy matematyki',
    ],
  },
];

const state = {
  selected: BLOCKS.map(() => []),
};

const elements = {
  name: document.querySelector('#profile-name'),
  description: document.querySelector('#profile-description'),
  descriptionCount: document.querySelector('#description-count'),
  blocks: document.querySelector('#subject-blocks'),
  tree: document.querySelector('#skill-tree'),
  output: document.querySelector('#profile-output'),
  copy: document.querySelector('#copy-button'),
  copyStatus: document.querySelector('#copy-status'),
  reset: document.querySelector('#reset-button'),
};

function createSubjectBlocks() {
  BLOCKS.forEach((block, blockIndex) => {
    const details = document.createElement('details');
    details.className = 'subject-block';
    if (blockIndex === 0) details.open = true;

    const summary = document.createElement('summary');
    const title = document.createElement('span');
    title.className = 'block-title';
    title.append(document.createTextNode(block.title));
    const meta = document.createElement('small');
    meta.textContent = `SEMESTR ${block.semester}`;
    title.append(meta);

    const counter = document.createElement('span');
    counter.className = 'block-counter';
    counter.dataset.counter = String(blockIndex);
    counter.textContent = `0 / ${block.limit}`;
    summary.append(title, counter);

    const list = document.createElement('div');
    list.className = 'subject-list';
    block.subjects.forEach((subject, subjectIndex) => {
      const label = document.createElement('label');
      label.className = 'subject-option';
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = subject;
      checkbox.dataset.block = String(blockIndex);
      checkbox.id = `subject-${blockIndex}-${subjectIndex}`;
      const text = document.createElement('span');
      text.textContent = subject;
      label.append(checkbox, text);
      list.append(label);
    });

    details.append(summary, list);
    elements.blocks.append(details);
  });
}

function profileBlocks() {
  return BLOCKS.map((block, index) => ({
    title: block.title,
    semester: block.semester,
    selected: state.selected[index],
  }));
}

function updateBlockControls(blockIndex) {
  const block = BLOCKS[blockIndex];
  const selected = state.selected[blockIndex];
  const full = selected.length >= block.limit;
  const counter = elements.blocks.querySelector(`[data-counter="${blockIndex}"]`);
  counter.textContent = `${selected.length} / ${block.limit}`;
  counter.classList.toggle('full', full);

  elements.blocks.querySelectorAll(`input[data-block="${blockIndex}"]`).forEach((checkbox) => {
    checkbox.disabled = full && !checkbox.checked;
  });
}

function renderTree() {
  const name = elements.name.value.trim() || 'Bez nazwy';
  const description = elements.description.value.trim() || 'Uzupełnij opis sylwetki absolwenta.';
  elements.tree.replaceChildren();

  const root = document.createElement('div');
  root.className = 'tree-root';
  const kicker = document.createElement('span');
  kicker.className = 'tree-kicker';
  kicker.textContent = 'Sylwetka absolwenta';
  const title = document.createElement('h3');
  title.textContent = name;
  const text = document.createElement('p');
  text.textContent = description;
  root.append(kicker, title, text);
  elements.tree.append(root);

  const selectedBlocks = profileBlocks().filter((block) => block.selected.length > 0);
  if (selectedBlocks.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'tree-empty';
    empty.textContent = 'Wybierz przedmioty, aby rozwinąć gałęzie kompetencji.';
    elements.tree.append(empty);
    return;
  }

  const branches = document.createElement('ul');
  branches.className = 'tree-branches';
  selectedBlocks.forEach((block) => {
    const branch = document.createElement('li');
    branch.className = 'tree-branch';
    const head = document.createElement('div');
    head.className = 'branch-head';
    const blockTitle = document.createElement('strong');
    blockTitle.textContent = block.title;
    const semester = document.createElement('span');
    semester.textContent = `SEM ${block.semester}`;
    head.append(blockTitle, semester);

    const leaves = document.createElement('ul');
    leaves.className = 'skill-leaves';
    block.selected.forEach((subject) => {
      const leaf = document.createElement('li');
      leaf.textContent = subject;
      leaves.append(leaf);
    });
    branch.append(head, leaves);
    branches.append(branch);
  });
  elements.tree.append(branches);
}

function render() {
  elements.descriptionCount.textContent = String(elements.description.value.length);
  const data = {
    name: elements.name.value,
    description: elements.description.value,
    blocks: profileBlocks(),
  };
  elements.output.textContent = buildProfileText(data);
  renderTree();
}

elements.blocks.addEventListener('change', (event) => {
  const checkbox = event.target.closest('input[type="checkbox"]');
  if (!checkbox) return;
  const blockIndex = Number(checkbox.dataset.block);
  const result = selectSubject(
    state.selected[blockIndex],
    checkbox.value,
    BLOCKS[blockIndex].limit,
    checkbox.checked,
  );
  if (!result.accepted) checkbox.checked = false;
  state.selected[blockIndex] = result.selected;
  updateBlockControls(blockIndex);
  render();
});

elements.name.addEventListener('input', render);
elements.description.addEventListener('input', render);

elements.copy.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(elements.output.textContent);
    elements.copyStatus.textContent = 'Skopiowano zapis do schowka.';
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(elements.output);
    selection.removeAllRanges();
    selection.addRange(range);
    elements.copyStatus.textContent = 'Zaznaczono tekst — użyj Ctrl+C lub ⌘C.';
  }
  window.setTimeout(() => { elements.copyStatus.textContent = ''; }, 3000);
});

elements.reset.addEventListener('click', () => {
  elements.name.value = '';
  elements.description.value = '';
  state.selected = BLOCKS.map(() => []);
  elements.blocks.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.checked = false;
    checkbox.disabled = false;
  });
  BLOCKS.forEach((_, index) => updateBlockControls(index));
  elements.name.focus();
  render();
});

createSubjectBlocks();
render();
