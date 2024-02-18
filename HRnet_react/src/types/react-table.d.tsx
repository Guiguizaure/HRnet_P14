// // src/types/react-table.d.ts

// declare module "react-table" {
//   export interface TableOptions<D extends object>
//     extends UseGlobalFiltersOptions<D>,
//       UsePaginationOptions<D>,
//       UseSortByOptions<D> {}

//   export type PluginHook<D extends object> = (hooks: Hooks<D>) => void;

//   export interface TableInstance<D extends object = {}>
//     extends UseGlobalFiltersInstanceProps<D>,
//       UsePaginationInstanceProps<D>,
//       UseSortByInstanceProps<D> {}

//   export interface TableState<D extends object = {}>
//     extends UseGlobalFiltersState<D>,
//       UsePaginationState<D>,
//       UseSortByState<D> {}

//   export interface ColumnInstance<D extends object = {}>
//     extends UseSortByColumnProps<D> {}

//   export interface Row<D extends object = {}> {}

//   export interface Cell<D extends object = {}, V = any> {}

//   // Define additional needed types here...

//   // Hooks
//   export function useTable<D extends object = {}>(
//     options: TableOptions<D>,
//     ...plugins: PluginHook<D>[]
//   ): TableInstance<D>;
//   export function useGlobalFilter<D extends object = {}>(hooks: Hooks<D>): void;
//   export function usePagination<D extends object = {}>(hooks: Hooks<D>): void;
//   // Add other hooks you use
// }

// src/types/react-table-config.d.ts
import { UsePaginationOptions, UseGlobalFiltersOptions } from "react-table";

declare module "react-table" {
  // Extend the TableOptions type
  export interface TableOptions<D extends object>
    extends UseGlobalFiltersOptions<D>,
      UsePaginationOptions<D> {}

  // Extend the instance type
  export interface TableInstance<D extends object = {}>
    extends UseGlobalFiltersInstanceProps<D>,
      UsePaginationInstanceProps<D> {}

  // Extend the state type
  export interface TableState<D extends object = {}>
    extends UseGlobalFiltersState<D>,
      UsePaginationState<D> {}
}
