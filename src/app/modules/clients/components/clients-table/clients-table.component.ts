import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {ClientsService} from "../../../core/services/clients.service";
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatNoDataRow } from "@angular/material/table";
import {Client} from "../../../core/models/client.model";
import {MatPaginator} from "@angular/material/paginator";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import {debounceTime, distinctUntilChanged, map, merge, startWith, Subscription, switchMap} from "rxjs";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { HighlightDirective } from '../../../shared/directives/highlight.directive';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-clients-table',
    templateUrl: './clients-table.component.html',
    styleUrl: './clients-table.component.scss',
    standalone: true,
    imports: [MatFormField, MatLabel, MatInput, ReactiveFormsModule, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatSortHeader, HighlightDirective, MatButton, RouterLink, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatNoDataRow, MatPaginator]
})
export class ClientsTableComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['lp', 'firstname', 'surname', 'email', 'buttons'];
  dataSource!: MatTableDataSource<Client>;
  totalCount = 0;
  filterValue = new FormControl('', {nonNullable: true});
  sub = new Subscription();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private clientService: ClientsService
  ) {
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

   this.sub.add(
     merge(this.sort.sortChange, this.paginator.page)
       .pipe(
         startWith({}),
         switchMap(() => {
           const pageIndex = this.paginator.pageIndex + 1;
           const itemsPerPage = this.paginator.pageSize;
           const sortDirection = this.sort.direction;
           const sortColumnname = this.sort.active;

           return this.clientService.getClients(pageIndex, itemsPerPage, sortDirection, sortColumnname);
         }),
         map(data => {
           this.totalCount = data.totalCount
           return data.clients;
         }),
       )
       .subscribe((clients) => {
         this.dataSource = new MatTableDataSource<Client>(clients);
       })
   );

   this.sub.add(
     this.filterValue.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe({
       next: (val) => {
         const value = val?.trim()
         this.applyFilter(value)
       }
     })
   );
  }

  applyFilter(val: string) {
    const pageIndex = this.paginator.pageIndex + 1;
    const itemsPerPage = this.paginator.pageSize;
    const sortDirection = this.sort.direction;
    const sortColumnname = this.sort.active;
    this.clientService.getClients(pageIndex, itemsPerPage, sortDirection, sortColumnname, val)
      .subscribe({
        next: (resp) => {
          this.totalCount = resp.totalCount;
          this.dataSource = new MatTableDataSource<Client>(resp.clients)
        }
      })

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
