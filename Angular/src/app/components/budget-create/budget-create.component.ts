import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-budget-create',
  templateUrl: './budget-create.component.html',
  styleUrls: ['./budget-create.component.css']
})

export class BudgetCreateComponent implements OnInit {
  submitted = false;
  budgetForm: FormGroup;
  BudgetProfile:any = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec']

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private userService: UserService,
    private apiService: ApiService
  ) {
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.budgetForm = this.fb.group({
      name: ['', [Validators.required]],
      value: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      month: ['', [Validators.required]],
      expense: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  updateProfile(e){
    this.budgetForm.get('month').setValue(e, {
      onlySelf: true
    })
  }

  get myForm(){
    return this.budgetForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.budgetForm.valid) {
      return false;
    } else {
      this.apiService.createBudget(this.budgetForm.value).subscribe(
        (res) => {
          console.log('Employee successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/visualise'))
        }, (error) => {
          console.log(error);
        });
    }
  }
  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
}
