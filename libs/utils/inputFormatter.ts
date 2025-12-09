const customInputNumericInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const oldValue = e.currentTarget.value;
  const selectionStart = e.currentTarget.selectionStart ?? 0;
  if (!oldValue) return;
  const rawValue = oldValue.replace(/,/g, '');
  let caretOffset = 0;

  if (oldValue[selectionStart - 1] === ',') {
    caretOffset = -1;
  }

  let value = rawValue.replace(/[^0-9.]/g, '');
  const parts = value.split('.');
  if (parts.length > 2) {
    value = `${parts[0]}.${parts[1]}`;
  }
  if (value.includes('.')) {
    const [integerPart, decimalPart] = value.split('.');
    value = `${integerPart}.${(decimalPart || '').substring(0, 2)}`;
  }

  const [integer, decimal] = value.split('.');
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const formattedValue =
    decimal !== undefined ? `${formattedInteger}.${decimal}` : formattedInteger;

  if (formattedValue !== oldValue) {
    e.currentTarget.value = formattedValue;

    let newCaret =
      selectionStart + (formattedValue.length - oldValue.length) + caretOffset;
    newCaret = Math.max(0, Math.min(formattedValue.length, newCaret));
    e.currentTarget.setSelectionRange(newCaret, newCaret);
  }
};

export { customInputNumericInput };
