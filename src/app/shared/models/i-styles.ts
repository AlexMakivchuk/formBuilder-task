export interface IStyles {
  width?: ValueUnits;
  height?: ValueUnits;
  border?: ValueUnits;
  borderStyle?: ValueUnits;
  borderRadius?: ValueUnits;
  borderColor?: ValueUnits;
  fontWeight?: ValueUnits;
  fontSize?: ValueUnits;
  margin?: ValueUnits;
  padding?: ValueUnits;
  label?: ValueUnits;
  placeholder?: ValueUnits;
  color?: ValueUnits;
}

export interface ValueUnits {
  value: string;
  units?: string;
}
