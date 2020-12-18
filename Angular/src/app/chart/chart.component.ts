import { Component, AfterViewInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {

  constructor(private apiService: ApiService,    private router: Router) {
  }
  ngAfterViewInit(): void {
    this.getapidata();

  }

async getapidata(){
  this.apiService.getBudgets().subscribe((res: any) => {

    if(res.length==0){
      this.router.navigate(['/create-budget']);
    }
    else{
    for (var i= 0; i < res.length; i++){
      this.apiService.dataSource2.datasets[0].data[i]=res[i].value;
      this.apiService.dataSource2.labels[i]= res[i].name;
    }
    this.createChart();
  }
  });
}

createChart() {
  const canvas = document.getElementById('Chart') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  var myPieChart= new Chart(ctx, {
      type:'pie',
      data: this.apiService.dataSource2,
  });
}

}
