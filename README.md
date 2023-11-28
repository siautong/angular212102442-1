# Angular212102442

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-mahasiswa',
  templateUrl: './mahasiswa.component.html',
  styleUrls: ['./mahasiswa.component.css'],
})
export class MahasiswaComponent implements OnInit, AfterViewInit {
  data: any;
  table1: any;
  render: any;
  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.table1 = $('#table1').DataTable();
    this.bind_mahasiswa();
  }

  ngOnInit(): void {}

  bind_mahasiswa(): void {
    this.http
      .get('https://stmikpontianak.net/011100862/tampilMahasiswa.php')
      .subscribe((data: any) => {
        console.log(data);
        this.table1.clear();
        data.forEach((element: any) => {
          var tempatTanggallahir =
            element.Tempatlahir + ',' + element.Tanggallahir;
          var row = [
            element.NIM,
            element.Nama,
            element.JenisKelamin,
            tempatTanggallahir,
            element.JP,
            element.Alamat,
            element.StatusNikah,
            element.TahunMasuk,
          ];
          this.table1.row.add(row);
        });
        this.table1.draw(false);
      });
  }
  showTambahModal(): void {
    $('#tambahModal').modal('show');
  }
  postRecord(): void {
    var alamat = $('#alamatText').val();
    var jenisKelamin = $('#jenisKelaminSelect').val();
    var jp = $('#jpSelect').val();
    var nama = $('#namaText').val();
    var nim = $('#nimText').val();
    var statusNikah = $('#statusNikahSelect').val();
    var tahunMasuk = $('#tahunMasukText').val();
    var tempatLahir = $('#tempatLahirText').val();
    var tanggalLahir = $('#tanggalLahirText').val();

    if (nim.legth == 0) {
      alert('NIM belum diisi ');
      return;
    }
    if (nama.length == 0) {
      alert('Nama belum diisi');
      return;
    }
    if (tempatLahir.length == 0) {
      alert('Tempat Lahir belum diisi');
      return;
    }
    if (tanggalLahir.length == 0) {
      alert('Tanggal Lahir belum diisi');
      return;
    }
    if (alamat.length == 0) {
      alert('Alamat belum diisi');
      return;
    }
    if (tahunMasuk.length == 0) {
      alert('Tahun Masuk belum diisi');
      return;
    }
    if (jenisKelamin.length == 0) {
      alert('Jenis Kelamin belum diisi');
      return;
    }

    alamat = encodeURIComponent(alamat);
    jenisKelamin = encodeURIComponent(jenisKelamin);
    jp = encodeURIComponent(jp);
    nama = encodeURIComponent(nama);
    nim = encodeURIComponent(nim);
    statusNikah = encodeURIComponent(statusNikah);
    tahunMasuk = encodeURIComponent(tahunMasuk);
    tempatLahir = encodeURIComponent(tempatLahir);
    tanggalLahir = encodeURIComponent(tanggalLahir);

    var url =
      'https://stmikpontianak.net/011100862/tambahMahasiswa.php' +
      '?alamat=' +
      alamat +
      '&jenisKelamin=' +
      jenisKelamin +
      '&jp=' +
      jp +
      '&nama=' +
      nama +
      '&nim=' +
      nim +
      '&statusNikah=' +
      statusNikah +
      '&tahunMasuk=' +
      tahunMasuk +
      '&tempatLahir=' +
      tempatLahir +
      '&tanggalLahir=' +
      tanggalLahir;

    this.http.get(url).subscribe((data: any) => {
      console.log(data);
      alert(data.status + '-->' + data.message);
      this.bind_mahasiswa();
      $('#tambahModal').modal('hide');
    });
  }
}
