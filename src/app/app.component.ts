import { Component, ViewChild } from '@angular/core';
import { Browser } from '@syncfusion/ej2-base';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import { AnimationModel } from '@syncfusion/ej2-progressbar';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { ChartComponent } from '@syncfusion/ej2-angular-charts';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { DashboardLayoutComponent } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'fitness-app';
  public isDevice = Browser.isDevice;
  public mediaQuery: string = 'max-width: 1200px';
  public today: Date = new Date();
  public maxDate: Date = new Date();
  public cellSpacing: number[] = [10, 20];
  public steps: number = 1240;
  public heartRate: number = 80;
  public calories: number = 1205;
  public sleepInMinutes: number = 350;
  public sleepInHours: string = this.getSleepInHours(this.sleepInMinutes);
  public todaysWorkoutPercent = 80;

  @ViewChild('tab')
  public tabInstance: TabComponent;

  @ViewChild('default_dashboard')
  public dashBoardInstance: DashboardLayoutComponent;

  @ViewChild('ddlelement')
  public dropDownInstance: DropDownListComponent;

  @ViewChild('chart')
  public chartInstance: ChartComponent;

  @ViewChild('grid')
  public gridInstance: GridComponent;

  @ViewChild('datepicker')
  public dateInstance: DatePickerComponent;

  @ViewChild('profiledate')
  public profileDateInstance: DatePickerComponent;

  public headerText: Object = [{ 'text': 'ACTIVITIES', iconCss: 'icon-Activities', iconPosition: 'top' }, { 'text': 'DIET', iconCss: 'icon-Diet', iconPosition: 'top' }, { 'text': 'FASTING', iconCss: 'icon-Fasting', iconPosition: 'top' }, { 'text': 'PROFILE', iconCss: 'icon-Profile', iconPosition: 'top' }];

  public animation: AnimationModel = { enable: true, duration: 2000, delay: 0 };
  public trackThickness: number = 15;
  public progressThickness: number = 15;
  public segmentCount: number = 50;
  public gapWidth: number = 5;

  public rangeLinearGradient: object = {
    startValue: '0%',
    endValue: '100%',
    colorStop: [{ color: '#FFFFFF', offset: '0%', opacity: 1 },
    { color: '#2084FE', offset: '100%', opacity: 1 }
    ]
  };

  public container: object = {
    width: 50, offset: 30,
    border: { width: 0 }
  };

  public axes: Object[] = [{
    minimum: 0,
    maximum: 120,
    line: {
      width: 0
    },
    majorTicks: {
      interval: 20,
      height: 0
    },
    minorTicks: {
      height: 0
    },
    labelStyle: {
      font: {
        color: '#FFFFFF',
      }, offset: 25
    },
    pointers: [
      {
        value: 80, height: 15,
        width: 15, placement: 'Near',
        offset: -35, markerType: 'Triangle',
        color: '#2084FE',
        animationDuration: 1000
      }
    ],
    ranges: [{
      start: 0, end: 80,
      startWidth: 20, endWidth: 20,
      color: '#2084FE',
      linearGradient: this.rangeLinearGradient
    }]
  }];

  public chartArea: Object = {
    border: {
      width: 0
    }
  };
  public palette = ['#F547A8'];
  public headerPlacement = Browser.isDevice ? 'Bottom' : 'Top';
  public width: string = Browser.isDevice ? '100%' : '60%';
  public chartWidth: string = Browser.isDevice ? '90%' : '100%';
  public datePickerWidth: string = Browser.isDevice ? '120px' : '200px';
  public data: Object[] = this.getChartData();
  public primaryXAxis: Object = {
    valueType: 'DateTime',
    labelFormat: 'MMM dd',
    intervalType: 'Days',
    edgeLabelPlacement: 'Shift',
    labelStyle: {
      size: '16px', color: '#56648A',
      fontFamily: 'Inter', fontWeight: '500'
    },
    majorGridLines: {
      width: 0
    },
    stripLines: [
      {
        start: new Date(this.today.setDate(this.today.getDate() - 2)),
        end: new Date(this.today.setDate(this.today.getDate() - 1)),
        isSegmented: true,
        segmentStart: 0,
        segmentEnd: this.todaysWorkoutPercent,
        color: '#F547A8',
        zIndex: 'Over',
        size: 5, sizeType: 'Days'
      },
    ],
  };
  public primaryYAxis: Object = {
    labelFormat: '{value}%',
    maximum: 100,
    interval: 20,
    labelStyle: {
      size: '16px', color: '#56648A',
      fontFamily: 'Inter', fontWeight: '500'
    },
    majorGridLines: {
      dashArray: "10,5"
    }
  };
  public gridData: Object[] = this.getData();
  public legendSettings = { position: 'Top' };
  public crosshair = { enable: true, lineType: 'Vertical', dashArray: "10,5" };
  public marker = { visible: true, height: 15, width: 15 };
  public tooltip = { enable: true, shared: true, format: '${series.name} : ${point.x} : ${point.y}' };
  public dropDownData: string[] = ['Weekly', 'Monthly'];

  created() {
    let iconDiv = document.createElement('div');
    iconDiv.className = 'e-tab-header-icon-div';
    let iconSpan = document.createElement('span');
    iconSpan.className = 'e-tab-header-icon icon-Logo';
    iconDiv.appendChild(iconSpan);
    let titleDiv = document.createElement('div');
    titleDiv.className = 'e-tab-title';
    titleDiv.innerText = "GOFIT";
    let containerDiv = document.createElement('div');
    containerDiv.className = 'e-tab-header-icon-container';
    containerDiv.appendChild(iconDiv);
    containerDiv.appendChild(titleDiv);
    this.tabInstance.element.querySelector('.e-tab-header').prepend(containerDiv)
  }

  select(e) {
    if (e.isSwiped) {
      e.cancel = true;
    }
  }

  dashBoardCreated() {
    if (Browser.isDevice) {
      this.dashBoardInstance.removePanel('profile-panel-id');
    }
  }

  customiseCell(args) {
    if (args.column.field === 'Completion') {
      args.cell.classList.add('completion-color');
    }
  }

  onDropDownChange(args) {
    this.chartInstance.series[0].dataSource = this.getChartData();
    this.chartInstance.refresh();
  }

  onDateChange(args) {
    this.updateComponents();
    this.today = args.value;
  }

  onProfileDateChange(args) {
    this.updateComponents();
    this.dateInstance.value = args.value;
  }

  updateComponents() {
    this.steps = Math.round(Math.random() * (6000 - 1000) + 1000);
    this.heartRate = Math.round(Math.random() * (100 - 70) + 70);
    this.calories = Math.round(Math.random() * (3500 - 1000) + 1000);
    this.sleepInMinutes = Math.round(Math.random() * (480 - 300) + 300);
    this.sleepInHours = this.getSleepInHours(this.sleepInMinutes);
    this.gridInstance.dataSource = this.getData();
    this.chartInstance.series[0].dataSource = this.chartInstance.series[1].dataSource = this.getChartData();
    this.chartInstance.refresh();
  }

  getSleepInHours(minutes: number) {
    return Math.floor(minutes / 60) + 'h' + ' ' + (minutes % 60) + 'm';
  }

  getChartData() {
    let count: number = (this.dropDownInstance && this.dropDownInstance.value === 'Monthly') ? 30 : 7;
    let sampleData: Object[] = [];
    for (let i = count - 1; i >= 0; i--) {
      let date = (this.dateInstance && this.dateInstance.value) ? new Date(this.dateInstance.value) : new Date();
      let data: Object = {
        x: new Date(date.setDate(date.getDate() - i)),
        y: Math.random() * (90 - 50) + 50
      };
      sampleData.push(data);
      if (i == 0) {
        this.todaysWorkoutPercent = data['y'];
      }
    }
    return sampleData;
  }

  getData() {
    let workout: string[] = ['Running', 'Swimming', 'Walking', 'Yoga'];
    let average = [10, 18, 22];
    let hours = [8, 7, 6, 6];
    let minutes = [0, 0, 30, 0];
    let count: number = 1;
    let date = (this.dateInstance && this.dateInstance.value) ? this.dateInstance.value : new Date();
    let sampleData: Object[] = [];
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < workout.length; j++) {
        date.setHours(hours[j]);
        date.setMinutes(minutes[j]);
        let distance = workout[j] === 'Yoga' ? '' : workout[j] === 'Running' ? Math.random() * (5 - 1) + 1 : Math.random() * (2 - 1) + 1;
        let data: Object = {
          Workout: workout[j],
          Distance: distance,
          Duration: workout[j] === 'Yoga' ? Math.random() * (30 - 10) + 10 : ((distance as number) * average[j]),
          Date: date,
          Completion: Math.random() * (30 - 10) + 10
        };
        sampleData.push(data);
      }
    }
    return sampleData;
  }
}
