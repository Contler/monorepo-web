import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { HotelService } from 'hotel/services/hotel.service';
import { EmployerService } from 'hotel/employer/services/employer.service';
import { EmployerEntity } from '@contler/entity';

declare var ldBar: any;

@Component({
  selector: 'contler-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {

  @ViewChild('bar', { static: true })
  private barContent: ElementRef<HTMLCanvasElement> | undefined;

  scoreAvg = 0;
  timeAvg: string | undefined;
  employees: EmployerEntity[] = [];

  constructor(private hotelService: HotelService, private employerService: EmployerService) {}

  ngOnInit() {
    this.hotelService.getScore().subscribe(data => {
      const bar1 = new ldBar('#myItem1', {
        max: 5,
        precision: 0.01,
      });
      if (data.length) {
        bar1.set(data[0].avg);
      }
    });
    this.hotelService.getTime().subscribe(time => {
      this.timeAvg = time;
    });
    this.employerService.getEmployers().subscribe(employees => {
      this.employees = employees;
      this.loadCharBar(employees);
    });
  }

  loadCharBar(employees: EmployerEntity[]) {
    const char = new Chart(this.barContent!.nativeElement, {
      type: 'bar',
      data: {
        labels: employees.map(emp => emp.name),
        datasets: [
          {
            label: 'Calificación',
            data: employees.map(emp => emp.averageScore),
            backgroundColor: employees.map(() => '#2ee0ce'),
          },
        ],
      },
    });
  }
}
