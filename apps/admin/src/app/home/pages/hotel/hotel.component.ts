import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileInput } from 'ngx-material-file-input';
import { AngularFireStorage } from '@angular/fire/storage';
import { filter, finalize, switchMap } from 'rxjs/operators';
import firebase from 'firebase/app';
import 'firebase/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import TaskState = firebase.storage.TaskState;
import { Color, ColorAdapter } from '@angular-material-components/color-picker';

@Component({
  selector: 'contler-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss'],
})
export class HotelComponent implements OnInit {
  hotelForm: FormGroup;
  imageSrc: string;

  constructor(
    formBuild: FormBuilder,
    private fireStorage: AngularFireStorage,
    private snackBar: MatSnackBar,
  ) {
    this.hotelForm = formBuild.group({
      name: ['Pappconr', Validators.required],
      country: ['Colombia', Validators.required],
      colorPrimary: [new ColorAdapter().parse('#000000'), Validators.required],
      colorSecondary: [new ColorAdapter().parse('#000000'), Validators.required],
      city: ['bogota', Validators.required],
      textPrimary: [new ColorAdapter().parse('#000000'), Validators.required],
      textSecondary: [new ColorAdapter().parse('#000000'), Validators.required],
      file: ['', Validators.required],
      email: ['hotel@pappcorn.com', Validators.required],
      password: ['123456', Validators.required],
    });
  }

  ngOnInit(): void {}

  save() {
    const { colorPrimary, colorSecondary, textPrimary, textSecondary } = this.hotelForm.value;
    const file = (this.hotelForm.value.file as FileInput).files[0];
    this.loadFile(file, 'pappcorn').subscribe((data) => {
      const req = {
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
      };
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
    this.snackBar.open('Subiendo imagen', 'Cerrar', { duration: 1000 });
    return task.snapshotChanges().pipe(
      filter((snap) => snap.state === TaskState.SUCCESS),
      switchMap(() => ref.getDownloadURL()),
      finalize(() => this.snackBar.open('Imagen subida', 'Cerrar', { duration: 1000 })),
    );
  }
}
