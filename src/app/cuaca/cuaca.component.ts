import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';

declare const $ : any;
declare const moment : any;

@Component({
  selector: 'app-cuaca',
  templateUrl: './cuaca.component.html',
  styleUrls: ['./cuaca.component.css']
})
export class CuacaComponent implements OnInit, AfterViewInit {
  private table1: any;
  datePipe: any;

  constructor(private renderer: Renderer2, private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.renderer.removeClass(document.body, 'sidebar-open');
    this.renderer.addClass(document.body, 'sidebar-closed');

    this.table1 = $('#table1').DataTable(
      {
        'columnDefs': [
          {
            'targets': 0,
            'render': function (data: string) {
              var d = new Date(data + ' UTC');
              var year = d.getFullYear();
              var month = (d.getMonth() + 1).toString().padStart(2, '0');
              var day = d.getDate().toString().padStart(2, '0');
              var hours = d.getHours().toString().padStart(2, '0');
              var minutes = d.getMinutes().toString().padStart(2, '0');

              var html = year + '-' + month + '-' + day + '<br>' + hours + ':' + minutes + ' WIB';
              return html;
            }
          },
          {
            'targets': 1,
            'render': function (data: string) {
              var html = "<img src='" + data + "'>";
              return html;
            }
          },
          {
            'targets': 2,
            'render': function (data: string) {
              var array = data.split('||');
              var cuaca = array[0];
              var deskripsi = array[1];
              var html = '<strong>' + cuaca + '</strong><br>' + deskripsi;
              return html;
            }
          }
        ]
      }
    );
    this.bind_table1();
  }

  setSun(data: any): void {
    var city = data.city;
    $('#sunrise').html(this.convertTimestamp(city.sunrise));
    $('#sunset').html(this.convertTimestamp(city.sunset));
  }

  convertTimestamp(timestamp: any): any {
    var date = new Date(timestamp * 1000);
    const formattedTime = date.toLocaleDateString('id-ID') + ' ' + date.toLocaleTimeString('id-ID');
    return formattedTime;
  }

  bind_table1(): void {
    this.http.get('https://api.openweathermap.org/data/2.5/forecast?id=1630789&appid=6e6850fde9cd8d166b42db0009d994f3').subscribe((data: any) => {
      console.log(data);

      var list = data.list;
      console.log(list);

      this.table1.clear();

      list.forEach((element: any) => {
        var weather = element.weather[0];
        console.log(weather);

        var iconUrl = 'https://openweathermap.org/img/wn/' + weather.icon + '@2x.png';
        var cuacaDeskripsi = weather.main + '||' + weather.description;

        var main = element.main;
        console.log(main);

        var tempMin = this.kelvinTocelcius(main.temp_min);
        console.log('Temp Min: ' + tempMin);

        var tempMax = this.kelvinTocelcius(main.temp_max);
        console.log('Temp Max: ' + tempMax);

        var temp = tempMin + '⁰C - ' + tempMax + '⁰C';

        var row = [
          element.dt_txt,
          iconUrl,
          cuacaDeskripsi,
          temp
        ];

        this.table1.row.add(row);
      });

      this.table1.draw(false);
      this.setSun(data);
    });
  }

  kelvinTocelcius(kelvin: any): any {
    var celcius = kelvin - 273.15;
    celcius = Math.round(celcius * 100) / 100;
    return celcius;
  }


  ngOnInit(): void {
  }


}
