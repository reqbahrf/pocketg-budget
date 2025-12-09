const inputNumericFormatter = (e: React.ChangeEvent<HTMLInputElement>) => {
  const input = e.currentTarget;
  const oldValue = input.value;
  const selectionStart = input.selectionStart ?? 0;

  const rawValue = oldValue.replace(/,/g, '');

  if (rawValue === '') {
    if (oldValue !== '') {
      input.value = '';
      input.setSelectionRange(0, 0);
    }
    return;
  }

  let value = rawValue.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');

  const parts = value.split('.');
  if (parts.length > 1) {
    value = `${parts[0]}.${(parts[1] || '').substring(0, 2)}`;
  }

  const [integer, decimal] = value.split('.');
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const formattedValue =
    decimal !== undefined ? `${formattedInteger}.${decimal}` : formattedInteger;

  if (formattedValue !== oldValue) {
    input.value = formattedValue;

    let caretOffset = 0;
    if (
      oldValue.charAt(selectionStart - 1) === ',' &&
      formattedValue.length < oldValue.length
    ) {
      caretOffset = -1;
    }

    let newCaret =
      selectionStart + (formattedValue.length - oldValue.length) + caretOffset;

    newCaret = Math.max(0, Math.min(formattedValue.length, newCaret));
    input.setSelectionRange(newCaret, newCaret);
  }
};

export { inputNumericFormatter };
