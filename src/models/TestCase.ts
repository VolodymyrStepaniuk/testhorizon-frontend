export interface TestCase {
  id: number;
  title: string;
  steps: string;
  expectedResult: string;
  description?: string;
}
