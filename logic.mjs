export function selectSubject(currentSelected, subject, limit, checked) {
  const selected = [...currentSelected];
  const exists = selected.includes(subject);

  if (!checked) {
    return {
      selected: selected.filter((item) => item !== subject),
      accepted: true,
    };
  }

  if (exists) return { selected, accepted: true };
  if (selected.length >= limit) return { selected, accepted: false };

  return { selected: [...selected, subject], accepted: true };
}

export function countSelected(selected) {
  return selected.length;
}

export function buildProfileText({ name, description, blocks }) {
  const cleanName = name.trim() || 'Bez nazwy';
  const cleanDescription = description.trim() || 'Brak opisu.';
  const selectedBlocks = blocks.filter((block) => block.selected.length > 0);

  const lines = [cleanName.toLocaleUpperCase('pl-PL'), '', cleanDescription, '', 'WYBRANE UMIEJĘTNOŚCI I PRZEDMIOTY'];

  if (selectedBlocks.length === 0) {
    lines.push('', 'Nie wybrano jeszcze żadnych przedmiotów.');
    return lines.join('\n');
  }

  selectedBlocks.forEach((block) => {
    lines.push('', `${block.title} (semestr ${block.semester})`);
    block.selected.forEach((subject) => lines.push(`• ${subject}`));
  });

  return lines.join('\n');
}
