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
