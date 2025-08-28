import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SavingsPlan } from 'src/app/models/savingsplan.model';
import { SavingsplanService } from 'src/app/services/savingsplan.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-managerviewsavingsplan',
  templateUrl: './managerviewsavingsplan.component.html',
  styleUrls: ['./managerviewsavingsplan.component.css']
})
export class ManagerviewsavingsplanComponent implements OnInit {
  savingsPlanId: number;
  savingsPlan: SavingsPlan = {
    Name: '',
    GoalAmount: 0,
    TimeFrame: 0,
    RiskLevel: 'Low',
    Description: '',
    Status: ''
  };
  savingsPlans: SavingsPlan[] = [];

  columnDefs = [
    { field: 'SavingsPlanId', headerName: 'ID', flex : 1 },
    { field: 'Name', headerName: 'Plan Name', flex : 2 },
    { field: 'GoalAmount', headerName: 'Goal Amount', flex : 2 },
    { field: 'TimeFrame', headerName: 'Time Frame (Years)', flex : 2 },
    { field: 'RiskLevel', headerName: 'Risk Level', flex : 2 },
    { field: 'Status', headerName: 'Status', flex : 1 },
    {
      headerName: 'Actions',   
      cellRenderer: (params: any) => {
        return `
          <button class="btn btn-sm btn-primary update-btn">Update</button>
          <button class="btn btn-sm btn-danger delete-btn">Delete</button>
        `;
      }
    }
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };

  constructor(
    private service: SavingsplanService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllSavingsPlans();
  }

  getAllSavingsPlans() {
    this.service.getAllSavingsPlans().subscribe((data) => {
      this.savingsPlans = data;
    });
  }

  updateSavingsPlan(savingsPlanID: number) {
    this.router.navigate([`/managereditsavingsplan/${savingsPlanID}`]);
  }

  deleteSavingsPlan(id: number) {
    this.service.deleteSavingsPlan(id).subscribe(() => {
      this.getAllSavingsPlans();
    });
  }

  confirmDelete(savingsPlan: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteSavingsPlan(savingsPlan.SavingsPlanId);
        Swal.fire('Deleted!', 'Your savings plan has been deleted.', 'success');
      }
    });
  }

  onCellClicked(event: any) {
    if (event.colDef.headerName === 'Actions') {
      const targetClass = event.event.target.className;
  
      if (targetClass.includes('delete-btn')) {
        this.confirmDelete(event.data);
      } else if (targetClass.includes('update-btn')) {
        this.updateSavingsPlan(event.data.SavingsPlanId);
      }
    }
  }
  

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
