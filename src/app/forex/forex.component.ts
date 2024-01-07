import { Component, AfterViewInit, OnInit, Renderer2 } from '@angular/core';
import { formatCurrency } from '@angular/common';
import { HttpClient } from '@angular/common/http';



declare const $: any;

@Component({
  selector: 'app-forex',
  templateUrl: './forex.component.html',
  styleUrls: ['./forex.component.css']
})

export class ForexComponent implements OnInit, AfterViewInit{
private _table1 : any;

constructor(private renderer: Renderer2, private http: HttpClient) { }

ngAfterViewInit(): void {
  this.renderer.removeClass(document.body, "sidebar-open");
  this.renderer.addClass(document.body, "sidebar-closed");

  this._table1 = $("#table1").DataTable
(
  {
    "columnDefs":
    [
      {
        "targets": 2,
        "className" : "text-right"
      }
    ]
  }
);

this.getData();
}

ngOnInit(): void {
}

getData(): void {
  console.log("getData()");

  var url = "https://openexchangerates.org/api/latest.json?app_id=777c479435a74e108378cad4f9ed1c6d";

  this.http.get(url)
  .subscribe((data: any) => {
    console.log(data);


    var rates = data.rates;
    console.log(rates);

    var idr = rates.IDR;
    var idr2 = formatCurrency(idr, "en-US","","USD");
    console.log("USD" + idr2);

    var row = [1, "USD", idr2 ];
    this._table1.row.add(row);

    var sgd=rates.IDR / rates.SGD;
    var sgd2 = formatCurrency(sgd, "en-US", "", "SGD");
    console.log("SGD: + sgd2");
    row = [ 2, "SGD", sgd2 ];
    this._table1.row.add(row);

    var bnd=rates. IDR / rates.BND;
    var bnd2=formatCurrency (bnd, "en-US","", "BND");
    console.log("BND : "+ bnd2);
    row = [ 3, "BND", bnd2 ];
    this._table1.row.add(row);

    var hkd=rates.IDR / rates.HKD;
    var hkd2=formatCurrency(hkd, "en-US","", "HKD");
    console.log("HKD: "+ hkd2);
    row = [ 4, "HKD", hkd2 ];
    this._table1.row.add(row);

    var btc = rates. IDR / rates.BTC;
    var btc2 = formatCurrency(btc, "en-US","", "BTC");
    console.log("BTC: " + btc2);
    row = [ 5, "BTC", btc2 ];
    this._table1.row.add(row);

    var azn = rates. IDR / rates.AZN;
    var azn2 = formatCurrency(azn, "en-US","", "AZN");
    console.log("AZN: " + azn2);
    row = [ 6, "AZN", azn2 ];
    this._table1.row.add(row);

    var afn = rates. IDR / rates.AFN;
    var afn2 = formatCurrency(afn, "en-US","", "AFN");
    console.log("AFN: " + afn2);
    row = [ 7, "AFN", afn2 ];
    this._table1.row.add(row);

    var all = rates. IDR / rates.ALL;
    var all2 = formatCurrency(btc, "en-US","", "ALL");
    console.log("ALL: " + all2);
    row = [ 8, "ALL", all2 ];
    this._table1.row.add(row);

    var amd = rates. IDR / rates.AMD;
    var amd2 = formatCurrency(amd, "en-US","", "AMD");
    console.log("AMD: " + amd2);
    row = [ 9, "AMD", amd2 ];
    this._table1.row.add(row);

    var ang = rates. IDR / rates.ANG;
    var ang2 = formatCurrency(ang, "en-US","", "ANG");
    console.log("ANG: " + ang2);
    row = [ 10, "ANG", ang2 ];
    this._table1.row.add(row);

    this._table1.draw(false);
    });
  }
}
