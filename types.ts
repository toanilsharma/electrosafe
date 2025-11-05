
export type ToolCategory = 'all' | 'arc-flash' | 'shock-hazard' | 'compliance' | 'dc-systems' | 'ac-systems';

export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  categories: ToolCategory[];
  status: 'available' | 'coming-soon';
}
