import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-visualise',
  templateUrl: './visualise.component.html',
  styleUrls: ['./visualise.component.css']
})
export class VisualiseComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
  }
  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
}
