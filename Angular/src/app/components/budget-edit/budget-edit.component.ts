import { Budget } from '../../model/Budget';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from '../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-budget-edit',
  templateUrl: './budget-edit.component.html',
  styleUrls: ['./budget-edit.component.css']
})

export class BudgetEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  budgetData: Budget[];
  BudgetProfile: any = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec']

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateBudget();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getBudget(id);
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      value: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      month: ['', [Validators.required]],
      expense: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  updateProfile(e) {
    this.editForm.get('month').setValue(e, {
      onlySelf: true
    })
  }

  get myForm() {
    return this.editForm.controls;
  }

  getBudget(id) {
    this.apiService.getBudget(id).subscribe(data => {
      this.editForm.setValue({
        name: data['name'],
        value: data['value'],
        month: data['month'],
        expense: data['expense'],
      });
    });
  }

  updateBudget() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      value: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      month: ['', [Validators.required]],
      expense: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateBudget(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/visualise');
          }, (error) => {
            console.log(error)
          })
      }
    }
  }
  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
}
