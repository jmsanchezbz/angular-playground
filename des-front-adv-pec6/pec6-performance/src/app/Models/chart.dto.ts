export interface ChartData {
  labels: string[];
  datasets: DataSet[];
}

export interface DataSet {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor?: string[];
}
