import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { HotelService } from 'hotel/services/hotel.service';
import { EmployerService } from 'hotel/employer/services/employer.service';
import { EmployerEntity } from '@contler/entity';

@Component({
  selector: 'contler-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  @ViewChild('scoreAverage', { static: true })
  private scoreContent: ElementRef<HTMLCanvasElement> | undefined;

  @ViewChild('bar', { static: true })
  private barContent: ElementRef<HTMLCanvasElement> | undefined;

  scoreAvg = 0;
  timeAvg = 0;
  private employees: EmployerEntity[] = [];

  constructor(private hotelService: HotelService, private employerService: EmployerService) {}

  ngOnInit() {
    this.loadAvgScore();
    this.loadAvgTime();
    this.employerService.getEmployers().subscribe(employees => {
      this.employees = employees
      this.loadCharBar(employees);
    });
  }

  loadAvgTime() {
    this.hotelService.getTime().subscribe(data => {
      if (data.length) {
        this.timeAvg = Number(data[0].avg);
      }
    });
  }

  loadAvgScore() {
    this.hotelService.getScore().subscribe(data => {
      if (data.length) {
        this.scoreAvg = Number(data[0].avg);
      }
      this.loadChartScore(this.scoreAvg);
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

  loadChartScore(value: number) {
    const char = new Chart(this.scoreContent!.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            borderWidth: 1,
            data: [5 - value, value],
            backgroundColor: ['#2ee0ce', '#fafafa'],
            borderColor: ['#000', '#000'],
          },
        ],
      },
      options: {
        cutoutPercentage: 80,
        tooltips: {
          enabled: false,
        },
      },
    });
  }
}
