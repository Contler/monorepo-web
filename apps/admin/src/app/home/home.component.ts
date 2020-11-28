import { Component, OnInit } from '@angular/core';
import { HotelService } from '@contler/core';
import { MatTableDataSource } from '@angular/material/table';
import { HotelEntity } from '@contler/entity';

@Component({
  selector: 'contler-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private hotelService: HotelService) {}

  displayColumns = ['name', 'city', 'country', 'state', 'guests', 'options'];
  dataSource = new MatTableDataSource<HotelEntity>();

  ngOnInit(): void {
    this.hotelService.getAllHotels().subscribe((data) => (this.dataSource.data = data));
  }
}
