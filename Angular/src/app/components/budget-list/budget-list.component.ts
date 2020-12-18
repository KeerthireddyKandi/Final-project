import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.css']
})

export class BudgetListComponent implements OnInit {

  Budget:any = [];

  constructor(private apiService: ApiService, private router: Router, private userService: UserService) {
    this.readBudget();
  }

  ngOnInit() {}

  readBudget(){
    this.apiService.getBudgets().subscribe((data) => {
     this.Budget = data;

    })
  }

  removeBudget(budget, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteBudget(budget._id).subscribe((data) => {
          this.Budget.splice(index, 1);
          window.location.reload();
        }
      )
    }
  }
  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
}
