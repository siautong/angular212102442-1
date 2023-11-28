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



<div class="wrapper">
  <app-header></app-header>
  <app-sidebar moduleName="mahasiswa"></app-sidebar>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header)-->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-@ text-dark">Mahasiswa</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
              <li class="breadcrumb-item active">Mahasiswa</li>
            </ol>
          </div>
          <!-- /.col-->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- /.content-header-->
    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- Main row -->
        <div class="row">
          <button
            id="tambahButton"
            class="btn btn-primary mb-2"
            (click)="showTambahModal()"
          >
            <i class="fa fa-plus"></i>
            Tambah
          </button>
          <div class="table-responsive">
            <table
              id="table1"
              class="table table-hover table-bordered table-striped"
            >
              <thead>
                <tr>
                  <th>NIM</th>
                  <th>Nama</th>
                  <th>Jenis Kelamin</th>
                  <th>Tempat, Tanggal Lahir</th>
                  <th>JP</th>
                  <th>Alamat</th>
                  <th>Status</th>
                  <th>Tahun Masuk</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
        <!--/.row (main row) -->
      </div>
      <!-- /.container-fluid-->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
  <app-footer></app-footer>
</div>
<div class="modal" id="tambahModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header bg-primary">
        <h5 class="modal-title">
          <i class="fa fa-plus"></i>
          Mahasiswa Baru
        </h5>
        <button class="close" data-dismiss="modal">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-12 col-1g-12 col-xs-12">
            <label>NIM</label>
            <input type="text" id="nimText" class="form-control" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 col-1g-12 col-xs-12">
            <label>Nama</label>
            <input type="text" id="namaText" class="form-control" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 col-1g-12 col-xs-12">
            <label>Jenis Kelamin</label>
            <select id="jenisKelaminSelect" class="form-control">
              <option value="Laki Laki">Laki Laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 col-1g-12 col-xs-12">
            <label>Tempat Lahir</label>
            <input type="text" id="tempatLahirText" class="form-control" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 col-1g-12 col-xs-12">
            <label>Tanggal Lahir (yyyy-mm-dd)</label>
            <input type="text" id="tanggalLahirText" class="form-control" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 col-1g-12 col-xs-12">
            <label>Jurusan / Prodi</label>
            <select id="jpSelect" class="form-control">
              <option value="SI/SI">SI/SI</option>
              <option value="TI/TI">TI/TI</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 col-1g-12 col-xs-12">
            <label>Alamat</label>
            <input type="text" id="alamatText" class="form-control" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 col-1g-12 col-xs-12">
            <label>Status Pernikahan</label>
            <select id="statusNikahSelect" class="form-control">
              <option value="Belum Menikah">Belum Menikah</option>
              <option value="Menikah">Menikah</option>
              <option value="Duda">Duda</option>
              <option value="Janda">Janda</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 col-1g-12 col-xs-12">
            <label>Tahun Masuk</label>
            <input type="number" id="tahunMasukText" class="form-control" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" (click)="postRecord()">
            <i class="fa fa-save"></i>
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
