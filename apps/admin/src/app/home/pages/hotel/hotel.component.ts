import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileInput } from 'ngx-material-file-input';
import { AngularFireStorage } from '@angular/fire/storage';
import { filter, finalize, map, switchMap, tap } from 'rxjs/operators';
import firebase from 'firebase/app';
import 'firebase/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Color, ColorAdapter } from '@angular-material-components/color-picker';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService, SpecialZoneService } from '@contler/core';
import { EmployerEntity, HotelEntity, SpecialZoneHotelEntity } from '@contler/entity';
import TaskState = firebase.storage.TaskState;
import { concat } from 'rxjs';

@Component({
  selector: 'contler-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss'],
})
export class HotelComponent implements OnInit {
  hotelForm: FormGroup;
  imageSrc: string;
  load = false;
  loadDelete = false;
  edit = false;

  private hotel: HotelEntity;
  specialZones: SpecialZoneHotelEntity[] = [];

  constructor(
    route: ActivatedRoute,
    formBuild: FormBuilder,
    private fireStorage: AngularFireStorage,
    private snackBar: MatSnackBar,
    private hotelService: HotelService,
    private router: Router,
    private specialZoneService: SpecialZoneService,
  ) {
    this.hotelForm = formBuild.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      colorPrimary: ['', Validators.required],
      colorSecondary: ['', Validators.required],
      city: ['', Validators.required],
      textPrimary: ['', Validators.required],
      textSecondary: ['', Validators.required],
      file: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    concat(
      this.loadDefaultSpecialZone(),
      route.params.pipe(
        filter((p) => !!p['id']),
        map((p) => p['id']),
        switchMap((id) => this.hotelService.getHotel(id)),
        tap((hotel) => this.loadHotelData(hotel)),
      ),
    ).subscribe();
  }

  ngOnInit(): void {}

  save() {
    this.load = true;
    const { colorPrimary, colorSecondary, textPrimary, textSecondary } = this.hotelForm.value;
    const file = (this.hotelForm.value.file as FileInput).files[0];
    this.loadFile(file, this.hotelForm.value.name)
      .pipe(
        map((data) => {
          return {
            email: this.hotelForm.value.email,
            password: this.hotelForm.value.password,
            hotelName: this.hotelForm.value.name,
            hotelLogo: data,
            name: 'admin',
            color: `#${(colorPrimary as Color).hex}`,
            colorSecond: `#${(colorSecondary as Color).hex}`,
            colorText: `#${(textPrimary as Color).hex}`,
            colorTextSecond: `#${(textSecondary as Color).hex}`,
            city: this.hotelForm.value.city,
            country: this.hotelForm.value.country,
            special: this.specialZones,
          };
        }),
        switchMap((req) => this.hotelService.createHotel(req)),
        finalize(() => (this.load = false)),
      )
      .subscribe(() => {
        this.snackBar.open('Hotel creado', 'Cerrar', { duration: 3000 });
        this.router.navigate(['home']);
      });
  }

  updateHotel() {
    this.load = true;
    const { colorPrimary, colorSecondary, textPrimary, textSecondary, file } = this.hotelForm.value;
    this.hotel.name = this.hotelForm.value.name;
    this.hotel.country = this.hotelForm.value.country;
    this.hotel.city = this.hotelForm.value.city;
    this.hotel.color = `#${(colorPrimary as Color).hex}`;
    this.hotel.colorSecond = `#${(colorSecondary as Color).hex}`;
    this.hotel.colorText = `#${(textPrimary as Color).hex}`;
    this.hotel.colorTextSecond = `#${(textSecondary as Color).hex}`;
    this.hotel.specialZones = this.specialZones;
    if (file) {
      const nFile = (file as FileInput).files[0];
      this.loadFile(nFile, this.hotel.name)
        .pipe(
          switchMap((data) => this.hotelService.updateHotel({ ...this.hotel, logo: data })),
          finalize(() => (this.load = false)),
        )
        .subscribe(() => {
          this.snackBar.open('Hotel Actualizado', 'Cerrar', { duration: 3000 });
          this.router.navigate(['home']);
        });
    } else {
      this.hotelService
        .updateHotel(this.hotel)
        .pipe(finalize(() => (this.load = false)))
        .subscribe(() => {
          this.snackBar.open('Hotel Actualizado', 'Cerrar', { duration: 3000 });
          this.router.navigate(['home']);
        });
    }
  }

  deleteHotel() {
    this.loadDelete = true;
    this.hotelService
      .deleteHotel(this.hotel.uid)
      .pipe(finalize(() => (this.loadDelete = false)))
      .subscribe(() => {
        this.router.navigate(['home']);
      });
  }

  loadImage(e: Event) {
    const file = (e.target as HTMLInputElement).files[0];
    const fr = new FileReader();
    fr.onload = (er) => {
      this.imageSrc = er.target.result as string;
    };
    fr.readAsDataURL(file);
  }

  private loadFile(file: File, path: string) {
    const ref = this.fireStorage.ref(path);
    const task = ref.put(file);
    this.snackBar.open('Subiendo imagen', 'Cerrar', { duration: 3000 });
    return task.snapshotChanges().pipe(
      filter((snap) => snap.state === TaskState.SUCCESS),
      switchMap(() => ref.getDownloadURL()),
      finalize(() => this.snackBar.open('Imagen subida', 'Cerrar', { duration: 3000 })),
    );
  }

  private loadHotelData(hotel: HotelEntity) {
    this.hotel = hotel;
    this.specialZones = hotel.specialZones.length > 0 ? hotel.specialZones : this.specialZones;
    this.edit = true;
    this.hotelForm.removeControl('email');
    this.hotelForm.removeControl('password');
    this.hotelForm.get('file').setValidators(null);
    this.hotelForm.setValue({
      name: hotel.name,
      country: hotel.country,
      colorPrimary: new ColorAdapter().parse(hotel.color),
      colorSecondary: new ColorAdapter().parse(hotel.colorSecond),
      city: hotel.city,
      textPrimary: new ColorAdapter().parse(hotel.colorText),
      textSecondary: new ColorAdapter().parse(hotel.colorTextSecond),
      file: '',
    });
    this.imageSrc = hotel.logo;
  }

  private loadDefaultSpecialZone() {
    return this.specialZoneService.getSpecialZone().pipe(
      map((spz) => spz.map((sp) => ({ zone: sp, status: false } as SpecialZoneHotelEntity))),
      tap((data) => (this.specialZones = data)),
    );
  }
}
