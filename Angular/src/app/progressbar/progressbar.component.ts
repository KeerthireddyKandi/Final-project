import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css']
})
export class ProgressbarComponent implements OnInit {

  Budget:any = [];
  constructor(private apiService: ApiService,    private router: Router, private userService: UserService) {
    this.readBudget();
  }
  ngOnInit() {}

  readBudget(){
    this.apiService.getBudgets().subscribe((data) => {
     this.Budget = data;
    })
  }
}









