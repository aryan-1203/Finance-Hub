import { Component, OnInit } from '@angular/core';
import { ManagerLogService } from '../../services/manager-log.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-log',
  templateUrl: './manager-log.component.html',
  styleUrls: ['./manager-log.component.css']
})
export class ManagerLogComponent implements OnInit {
  columnDefs = [
    {
      headerName: 'User ID',
      field: 'UserId',
      sortable: true,
      filter: 'agNumberColumnFilter',
      flex: 1
    },
    {
      headerName: 'User Name',
      field: 'Username',
      sortable: true,
      filter: 'agTextColumnFilter',
      flex: 2
    },
    {
      headerName: 'Email Address',
      field: 'Email',
      sortable: true,
      filter: 'agTextColumnFilter',
      flex: 3
    },
    {
      headerName: 'Action',
      field: 'Action',
      sortable: true,
      filter: 'agSetColumnFilter',
      flex: 2
    },
    {
      headerName: 'Time Stamp',
      field: 'Timestamp',
      sortable: true,
      filter: 'agDateColumnFilter',
      flex: 4,
      valueFormatter: params => {
        const date = new Date(params.value);
        return date.toLocaleString(); // This gives medium format like "Jul 23, 2025, 12:49:58 AM"
      },
      filterParams: {
        comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
          const cellDate = new Date(cellValue);
          if (cellDate < filterLocalDateAtMidnight) return -1;
          if (cellDate > filterLocalDateAtMidnight) return 1;
          return 0;
        }
      }
    }    
  ];
  

  rowData: any[] = [];

  constructor(private logService: ManagerLogService, private router: Router) {}

  ngOnInit(): void {
    this.logService.getAllLogs().subscribe(data => {
      this.rowData = data;
    });
  }
}
