import type { CategoryValue } from './category';
export interface DonutData {
  series: Array<number>;
  labels: Array<CategoryValue>;
  color: Array<string>;
}
