import type { Option } from '@/components/Input/Select';

export default function processDisplayName<T extends Option[]>(options: T) {
  return options.reduce<Record<string, string>>((acc, option) => {
    acc[option.value] = option.optionName;
    return acc;
  }, {});
}
