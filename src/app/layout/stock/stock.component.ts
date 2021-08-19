import { Component, OnInit, ViewChild } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { ChartsModule, Color, BaseChartDirective, Label } from 'ng2-charts';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as pluginAnnotations from 'chartjs-plugin-annotation';


import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  providers: [
    DatePipe
  ]
})
export class StockComponent implements OnInit {
  forSaleChart: any = {};
  forCarddata: any = {};
  forSaletotalprogression: any = {};
  startDate: any;
  endDate: any;
  today: any = new Date();
  linechartDataArray: any = {};
  cardchartDataArray: any = {};
  letmetry: any = [];
  linechartDataArrayTotalProgression: any = {};
  planData: number[];
  actualData: number[];
  forecastData: number[];
  totalsaleData: number[];
  maximumData: number[];
  minimumData: number[];
  ClosingData: number[];
  SafetyData: number[];
  ClosingDataTotalProgression: number[];
  productlist = [];
  response;
  reportform: FormGroup;
  DepotId: any;
  collection = { data: [] };
  public CardData: ChartDataSets[] = [
    {
      data: [100], label: 'Min Fill'
    }
  ]
  //CardData: any

  public lineChartData: ChartDataSets[] = [
    { data: [110, 110, 110, 110, 110, 110, 110], label: 'VTEGSL91R Min Fill', borderDash: [4] },
    { data: [400, 400, 400, 400, 400, 400, 400], label: 'VTEGSL91R Max Fill', borderDash: [4] },
    { data: [180, 280, 300, 90, 500, 270, -100], label: 'VTEGSL91R' },
    { data: [0, 0, 0, 0, 30, 50, 10], label: 'VTEGSL91R Safety' }
  ];
  public lineTProgressChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = ['2019, 6, 11', '2019, 6, 19', '2019, 6, 26', '2019, 7, 3', '2019, 7, 10', '2019, 7, 17', '2019,7, 17'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          display: true
        },
        type: 'time',
        time: {
          unit: 'day',
          unitStepSize: 1,
          round: 'day',
          tooltipFormat: 'MMM DD, YYYY',
          displayFormats: {
            hour: 'MMM DD, YYYY'
          }
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Volume in KL',
          fontSize: 15,
        },
        gridLines: {
          display: true
        }, ticks: {
          min: 0,
          max: 100,
          stepSize: 20,
          fontColor: 'rgb(255,255,255)',
          fontSize: 15,
          callback: function (value) {
            return value + '%';
          }
        }

      }]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: this.today,
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'Today'
          }
        },
      ],
    },
  };

  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'rgb(255,0,0)',
      pointBackgroundColor: 'rgb(255,0,0)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // red
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'rgb(255,149,80)',
      pointBackgroundColor: 'rgba(255,149,80,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,149,80,0.8)'
    }
  ];

  public lineChartColorstotal: Color[] = [

    { // red
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'rgb(255,0,0)',
      pointBackgroundColor: 'rgb(255,0,0)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }

  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  products: string;
  products1: string;
  products2: string;

  depots: string;
  totalStockChartLabel: Array<any>;
  totalStockChartData: Array<any>;
  totalStockChartOptions: any;
  totalStockChartType: any = 'line';
  totalStockChartDSLType: any = 'line';
  totalStockChartDSLData: { data: number[]; label: string; fill: boolean; }[];
  totalStockChartDSLLabel: string[];
  totalStockChartDSLOptions: any;
  lineChartDSLColors: any;

  constructor(private router: Router, private rest: RestapiService, private toastr: ToastrService, private fb: FormBuilder, private datepipe: DatePipe) {
    this.createForm();
  }

  ngOnInit() {

    debugger;
    this.getEndDate(this.today);
    this.getToday(this.today);

    let postData1 = {
      listcall: ''
    };//check:1
    this.rest.sendPostRequest('authorizeddepotlist', JSON.stringify(postData1)).subscribe(res => {

      this.response = res;
      this.collection.data = this.response;

      if (this.collection.data.length > 0) {
        let postDatacard = {
          depotid: this.collection.data[0].DEPOT_ID,
          fromdate: this.datepipe.transform(new Date(), "yyyy-MM-dd"),
          todate: this.datepipe.transform(new Date(), "yyyy-MM-dd"),
          productid: 'all',
          type: 'actualforcast'
        }
        this.rest.sendPostRequest('getstockdashboardcard', JSON.stringify(postDatacard)).subscribe(res => {
          this.forCarddata = res;

          //this.forSaleChart = JSON.parse(this.forSaleChart.Dsl);
          this.setDataForCards(this.forCarddata);



        });
        let postData = {
          depotid: this.collection.data[0].DEPOT_ID,
          fromdate: this.datepipe.transform(new Date(), "yyyy-MM-dd"),
          todate: this.datepipe.transform(new Date(), "yyyy-MM-dd"),
          productid: 'all',
          type: 'actualforcast'
        }
        this.rest.sendPostRequest('getstockdashboardinit', JSON.stringify(postData)).subscribe(res => {
          this.forSaleChart = res;
          //this.forSaleChart = JSON.parse(this.forSaleChart.Dsl);
          this.setDataForActualChart(this.forSaleChart);



        });

        // let postData1={
        //   depotid:this.collection.data[0].DEPOT_ID,  
        //   fromdate: this.datepipe.transform(new Date(), "yyyy-MM-dd"),
        //   todate: this.datepipe.transform(new Date(), "yyyy-MM-dd"),
        //   productid:'all',
        //   type:'actualforcast'
        //   }
        // this.rest.sendPostRequest('getstocktotalprogressinit',JSON.stringify(postData1)).subscribe(res=>{
        //   this.forSaletotalprogression=res;
        //   this.setDataForTotalProgressionChart (this.forSaletotalprogression);




        // });
      }

    });







    this.initChart(this.minimumData, this.maximumData, this.ClosingData, this.SafetyData);
    this.initTotalChart('');
    this.initTotalChartDSL('');


  }

  onSubmit(form) {
    this.forSaleChart = [];
    this.setDataForActualChart(this.forSaleChart);

    this.forSaletotalprogression = [];
    this.setDataForTotalProgressionChart(this.forSaletotalprogression);
    this.today = this.datepipe.transform(form.value.todaydate, "MM/dd/yyyy");


    let postDatacard = {
      depotid: form.value.depotname,
      fromdate: this.datepipe.transform(form.value.fromdate, "yyyy-MM-dd"),
      todate: this.datepipe.transform(form.value.todate, "yyyy-MM-dd"),
      productid: form.value.productid,
      type: 'actualforcast'
    }
    this.rest.sendPostRequest('getstockdashboardcardonrange', JSON.stringify(postDatacard)).subscribe(res => {

      this.forCarddata = res;
      //this.forSaleChart = JSON.parse(this.forSaleChart.Dsl);
      this.setDataForCards(this.forCarddata);


    });
    if (form.value.depotname == 'all') {

      let postData1 = {
        depotid: form.value.depotname,
        fromdate: this.datepipe.transform(form.value.fromdate, "yyyy-MM-dd"),
        todate: this.datepipe.transform(form.value.todate, "yyyy-MM-dd"),
        productid: form.value.productid,
        type: 'actualforcast'
      }
      this.rest.sendPostRequest('getstockdashtotalprogressiononrange', JSON.stringify(postData1)).subscribe(res => {
        this.forSaletotalprogression = res;
        this.setDataForTotalProgressionChart(this.forSaletotalprogression);



      });
    } else {

      let postData = {
        depotid: form.value.depotname,
        fromdate: this.datepipe.transform(form.value.fromdate, "yyyy-MM-dd"),
        todate: this.datepipe.transform(form.value.todate, "yyyy-MM-dd"),
        productid: form.value.productid,
        type: 'actualforcast'
      }
      this.rest.sendPostRequest('getstockdashboardonrange', JSON.stringify(postData)).subscribe(res => {
        this.forSaleChart = res;
        this.setDataForActualChart(this.forSaleChart);



      });
    }


  }
  createForm() {

    this.reportform = this.fb.group({
      depotname: ['', Validators.required],
      productid: ['', Validators.required],
      fromdate: ['', Validators.required],
      todate: ['', Validators.required],
      todaydate: ['', Validators.required]
    });

  }
  emptyValue(fromdate) {

    if (fromdate > this.reportform.controls['todate'].value) {
      this.reportform.controls['todate'].setValue('');
    }
  }
  emptyValue1(fromdte) {
    //this.todateState=1;
    if (fromdte > this.reportform.controls['todte'].value) {
      this.reportform.controls['todte'].setValue('');
    }
  }
  assigntoday(form) {
    //this.todateState=1;
    debugger;
    this.reportform.controls['todaydate'].setValue('');
    this.today = this.datepipe.transform(form.value.todaydate, "yyyy-MM-dd");
    this.datepipe.transform(form.value.fromdate, "yyyy-MM-dd")


  }
  setDataForTotalProgressionChart(data) {
    this.linechartDataArrayTotalProgression = {};
    for (let key in data) {
      this.lineTProgressChartData = [
        { data: [], label: key + " Closing Balance" },

      ];
      this.linechartDataArrayTotalProgression[key] = {};
      this.linechartDataArrayTotalProgression[key].label = data[key].map((el) => el.date);

      this.ClosingDataTotalProgression = data[key].map((el) => el.ClosingBalance);

      this.lineTProgressChartData[0].data = this.ClosingDataTotalProgression;
      this.linechartDataArrayTotalProgression[key].data = this.lineTProgressChartData;


    }

    this.lineChartOptions.scales = {
      xAxes: [{
        gridLines: {
          display: true
        },
        type: 'time',
        time: {
          unit: 'day',
          unitStepSize: 1,
          round: 'day',
          tooltipFormat: 'MMM DD, YYYY',
          displayFormats: {
            hour: 'MMM DD, YYYY'
          }
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Volume in KL',
          fontSize: 15,
        },
        gridLines: {
          display: true
        }
      }]
    };

    this.lineChartOptions.annotation.annotations[0].value = this.today;

  }
  setDataForCards(data) {
    this.cardchartDataArray = {};
    this.letmetry = [];
    for (let key in data) {
      this.letmetry.push(key);

      this.CardData = [{ data: [], label: key + " Min Fill", borderDash: [4] },
      { data: [], label: key + " Max Fill", borderDash: [4] },
      { data: [], label: key + " Closing Balance" },
      { data: [], label: key + " Safety Days" }];
      this.cardchartDataArray[key] = {};
      this.cardchartDataArray[key].label = data[key].map((el) => el.date);

      this.planData = data[key].map((el) => el.PlanValue);

      this.actualData = data[key].map((el) => el.ActualValue);

      this.forecastData = data[key].map((el) => el.TotalForecastValue);

      this.totalsaleData = data[key].map((el) => el.TotalSaleValue);

      this.CardData[0].data = this.planData;
      this.CardData[1].data = this.actualData;
      this.CardData[2].data = this.forecastData;
      this.CardData[3].data = this.totalsaleData;

      this.cardchartDataArray[key].data = this.CardData;




    }



  }
  setDataForActualChart(data) {
    this.linechartDataArray = {};
    for (let key in data) {
      this.lineChartData = [
        { data: [], label: key + " Min Fill", borderDash: [4] },
        { data: [], label: key + " Max Fill", borderDash: [4] },
        { data: [], label: key + " Closing Balance" },
        { data: [], label: key + " Safety Days" }
      ];
      this.linechartDataArray[key] = {};
      this.linechartDataArray[key].label = data[key].map((el) => el.date);

      this.minimumData = data[key].map((el) => el.Minimumval);

      this.maximumData = data[key].map((el) => el.Maximumval);

      this.ClosingData = data[key].map((el) => el.ClosingBalance);

      this.SafetyData = data[key].map((el) => el.SafetyDays);

      this.lineChartData[0].data = this.minimumData;
      this.lineChartData[1].data = this.maximumData;
      this.lineChartData[2].data = this.ClosingData;
      this.lineChartData[3].data = this.SafetyData;
      this.linechartDataArray[key].data = this.lineChartData;


    }

    this.lineChartOptions.scales = {
      xAxes: [{
        gridLines: {
          display: true
        },
        type: 'time',
        time: {
          unit: 'day',
          unitStepSize: 1,
          round: 'day',
          tooltipFormat: 'MMM DD, YYYY',
          displayFormats: {
            hour: 'MMM DD, YYYY'
          }
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Volume in KL',
          fontSize: 15,
        },
        gridLines: {
          display: true
        }
      }]
    };

    this.lineChartOptions.annotation.annotations[0].value = this.today;

  }

  getproductlistfordepot(depotid: string): void {

    this.DepotId = depotid;
    alert("all option" + this.DepotId);

    let postData = {
      depotid: depotid,
    };
    //Sending Request For Getting The product List For Add BulkStock

    this.rest.sendPostRequest('getProductsforrepots', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespProductListbBulkStock(res),
        error => this.GetErrorProductListBulkStock(error));
    //}
  }
  GetRespProductListbBulkStock(resp) {

    // this.pustproductlist=resp;
    this.productlist = resp;

    if (this.productlist.length !== 0) {
    }
    else {
      // this.productid=null;
      this.toastr.error("No Products Are Configured With Selected Depot !!! ");
      setTimeout(() => {
        this.toastr.clear();
      }, 2000);

      setTimeout(() => {
        // this.router.navigate(['/allreports']);

      }, 2000);

    }


  }
  //Getting Error For ProductList To Add BulkStock
  GetErrorProductListBulkStock(error) {
    if (localStorage.getItem("TOKEN") === null) {
      this.toastr.error("Session Time Out Please Login Again....");
      setTimeout(() => {
        this.toastr.clear();
      }, 1500);
      setTimeout(() => {
        this.router.navigate(['/login']);

      }, 2000);

    }


  }
  initChart(minimumData: number[], maximumData: number[], ClosingData: number[], SafetyData: number[]) {


  }
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {

  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {

  }
  onProductChanged() {

    let sd = [304, 371, 342, 347];
    let fd = [357, 350, 342, 347];
    let md = [357, 350, 342, 347];
    let nd = [357, 350, 342, 347];
    if (this.products === 'GSL91R') {
      sd = [304, 371, 342, 347];
      fd = [357, 350, 342, 347];
      md = [357, 350, 342, 347];
      nd = [357, 350, 342, 347];
    } else if (this.products === 'DSL') {
      sd = [314, 351, 342, 327];
      fd = [327, 350, 322, 337];
      md = [357, 350, 342, 347];
      nd = [357, 350, 342, 347];
    } else {
      sd = [334, 321, 342, 367];
      fd = [357, 310, 352, 347];
      md = [357, 350, 342, 347];
      nd = [357, 350, 342, 347];
    }
    this.initChart(fd, sd, md, nd);
  }
  onDepotChange() {

    let sd = [324, 361, 352, 327];
    let fd = [327, 330, 322, 347];
    let md = [357, 350, 342, 347];
    let nd = [357, 350, 342, 347];
    if (this.depots === 'VTE') {
      sd = [304, 371, 342, 347];
      fd = [357, 350, 342, 347];
      nd = [357, 350, 342, 347];
    } else if (this.depots === 'MNG') {
      sd = [314, 331, 342, 367];
      fd = [327, 320, 322, 357];
      nd = [357, 350, 342, 347];
    } else {
      sd = [324, 351, 342, 367];
      fd = [357, 310, 332, 347];
      nd = [357, 350, 342, 347];
    }
    this.initChart(fd, sd, md, nd);
  }
  getStartDate(date) {
    this.startDate = this.convertFormatOfDate(date);

  }
  getEndDate(date: any) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    dt = dt + 10;
    if (dt > 21) {
      dt = dt - 30;
      month = month + 1;
    }
    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    this.endDate = dt + '-' + month + '-' + year;

  }
  getToday(date) {
    this.today = this.convertFormatOfDate(date);

  }
  convertFormatOfDate(date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    return month + '/' + dt + '/' + year;
  }
  downloadPng(event) {
    html2canvas(document.querySelector('#capture')).then(savChart => {

      const chart = document.createElement('a');
      chart.href = savChart.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
      chart.download = 'chart.png';
      chart.click();
    });
  }
  downloadPdf(event) {
    const anchor = event.target;
    html2canvas(document.querySelector('#capture')).then(savChart => {

      const chart = document.createElement('a');
      chart.href = savChart.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
      const pdf = new jsPDF();
      pdf.addImage(chart.href, 'jpg', 5, 20);
      pdf.save('chart.pdf');

    });

  }
  downloadJpg(event) {

    html2canvas(document.querySelector('#capture')).then(savChart => {

      const chart = document.createElement('a');
      chart.href = savChart.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
      chart.download = 'chart.jpg';
      chart.click();
    });
  }
  initTotalChart(data) {

    // this.totalStockChartLabel = [];
    this.totalStockChartData = [
      { data: [280, 280, 280, 280, 280, 280, 280, 280, 280, 280, 280, 280, 280, 280, 280, 280], label: 'MAX', fill: false },
      { data: [10, 315, 246, 248, 265, 210, 256, 198, 288, 246, 299, 256, 205, 153, 101, 49], label: 'TOTAL91R', fill: false },
      { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'MIN', fill: false }
    ];
    this.totalStockChartLabel = [
      '2019-01-24', '2019-01-25', '2019-01-26', '2019-01-27', '2019-01-28', '2019-01-29', '2019-01-30', '2019-01-31',
      '2019-02-1', '2019-02-2', '2019-02-3', '2019-02-4', '2019-02-5', '2019-02-6', '2019-02-7', '2019-02-8'
    ];
    this.totalStockChartOptions = {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
          },
        }],
        xAxes: [{
          gridLines: { display: false }
        }],
      },
      annotation: {
        annotations: [
          {
            type: 'line',
            borderDash: [3],
            mode: 'vertical',
            scaleID: 'x-axis-0',
            value: '2019-02-2',
            borderColor: 'grey',
            label: {
              content: 'TODAY',
              enabled: true,
              position: 'top'
            }
          }
        ]
      }
    };
  }
  totalStockChartHover(event) {

  }
  totalStockChartClicked(event) {

  }
  totalStockChartDSLHover(event) {

  }
  totalStockChartDSLClicked(event) {

  }

  initTotalChartDSL(data) {

    // this.totalStockChartLabel = [];
    this.totalStockChartDSLData = [
      { data: [280, 280, 280, 280, 280, 280, 280, 280, 280, 280, 280, 280, 280, 280, 280, 280], label: 'MAX', fill: false },
      { data: [10, 315, 246, 248, 265, 210, 256, 198, 288, 246, 299, 256, 205, 153, 101, 49], label: 'TOTAL91R', fill: false },
      { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'MIN', fill: false }
    ];
    this.totalStockChartDSLLabel = [
      '2019-01-24', '2019-01-25', '2019-01-26', '2019-01-27', '2019-01-28', '2019-01-29', '2019-01-30', '2019-01-31',
      '2019-02-1', '2019-02-2', '2019-02-3', '2019-02-4', '2019-02-5', '2019-02-6', '2019-02-7', '2019-02-8'
    ];
    this.totalStockChartDSLOptions = {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
          },
        }],
        xAxes: [{
          gridLines: { display: false }
        }],
      },
      annotation: {
        annotations: [
          {
            type: 'line',
            borderDash: [3],
            mode: 'vertical',
            scaleID: 'x-axis-0',
            value: '2019-02-2',
            borderColor: 'grey',
            label: {
              content: 'TODAY',
              enabled: true,
              position: 'top'
            }
          }
        ]
      }
    };
    this.lineChartDSLColors = [
      {
        borderColor: 'blue',
      },
      {
        borderColor: 'rgba(107,142,35,1)',
      },
      {
        borderColor: 'rgba(255,0,0,1)',
      },
    ];
  }
}
