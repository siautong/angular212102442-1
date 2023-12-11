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
          var tempatTanggalLahir =
            element.TempatLahir + ',' + element.TanggalLahir;
          var row = [
            element.NIM,
            element.Nama,
            element.JenisKelamin,
            tempatTanggalLahir,
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
      '&statusPernikahan=' +
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
