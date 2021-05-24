import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  EventEmitter,
  Renderer2,
} from '@angular/core';
import * as Chart from 'chart.js';
import { HotelService } from '@contler/hotel/services/hotel.service';
import { EmployerService } from '@contler/hotel/employer/services/employer.service';
import { EmployerEntity, HotelEntity } from '@contler/entity';
import { first } from 'rxjs/operators';

declare var ldBar: any;

@Component({
  selector: 'contler-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  @ViewChild('scoreProgress', { static: true })
  private scoreProgress: ElementRef<HTMLCanvasElement> | undefined;
  @ViewChild('bar', { static: true })
  private barContent: ElementRef<HTMLCanvasElement> | undefined;

  scoreAvg = 0;
  timeAvg: string | undefined;
  employees: EmployerEntity[] = [];
  private hotel: HotelEntity;

  constructor(
    private hotelService: HotelService,
    private employerService: EmployerService,
    private renderer2: Renderer2,
  ) {}

  ngOnInit() {
    this.hotelService.getScore().subscribe((data) => {
      const bar1 = new ldBar('#myItem1', {
        max: 5,
        precision: 0.01,
      });
      if (data.length) {
        bar1.set(data[0].avg);
      }
    });
    this.hotelService.getTime().subscribe((time) => {
      this.timeAvg = time;
    });
    this.employerService.getEmployers().subscribe((employees) => {
      this.employees = employees;
      if (employees && employees.length) {
        this.hotel = employees[0]!.hotel;
      }
      this.loadCharBar(employees);
      // score progress with color primary from hotel
      this.renderer2.setAttribute(
        this.scoreProgress!.nativeElement!.children[0]!.children[1].children[0],
        'stroke',
        this.hotel.color,
      );
      this.renderer2.setAttribute(
        this.scoreProgress!.nativeElement!.children[0]!.children[1].children[0],
        'stroke-width',
        '2',
      );
      this.renderer2.removeClass(
        this.scoreProgress!.nativeElement!.children[0]!.children[1].children[0],
        'baseline',
      );

      this.renderer2.setAttribute(
        this.scoreProgress!.nativeElement!.children[0]!.children[2].children[0],
        'stroke',
        this.hotel.color,
      );
      this.renderer2.removeClass(
        this.scoreProgress!.nativeElement!.children[0]!.children[2].children[0],
        'baseline',
      );
    });
  }

  loadCharBar(employees: EmployerEntity[]) {
    const char = new Chart(this.barContent!.nativeElement, {
      type: 'bar',
      data: {
        labels: employees.map((emp) => emp.name),
        datasets: [
          {
            label: 'Calificación',
            data: employees.map((emp) => emp.averageScore),
            backgroundColor: employees.map(() => (this.hotel ? this.hotel!.color : '#2ee0ce')),
          },
        ],
      },
    });
  }
}
