export interface IStyles {
  width?: ValueUnits;
  height?: ValueUnits;
  border?: ValueUnits;
  borderRadius?: ValueUnits;
  borderColor?: ValueUnits;
  margin?: ValueUnits;
  padding?: ValueUnits;
  label?: ValueUnits;
  placeholder?: ValueUnits;
  value?: ValueUnits;
  checked?: ValueUnits;
}

export interface ValueUnits {
  value: string;
  units: string;
}
