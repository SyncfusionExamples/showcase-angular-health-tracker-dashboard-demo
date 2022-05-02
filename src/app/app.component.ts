import { Component, ViewChild } from '@angular/core';
import { Browser } from '@syncfusion/ej2-base';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import { AnimationModel } from '@syncfusion/ej2-progressbar';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { ChartComponent } from '@syncfusion/ej2-angular-charts';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { DashboardLayoutComponent } from '@syncfusion/ej2-angular-layouts';
import { AnimationSettingsModel, ButtonPropsModel, DialogComponent } from '@syncfusion/ej2-angular-popups';
import { CircularGaugeComponent, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-angular-circulargauge';
import { Slider, SliderChangeEventArgs } from '@syncfusion/ej2-inputs';
import { LinearGaugeComponent } from '@syncfusion/ej2-angular-lineargauge';

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
  public isBreakFastMenuAdded = false;
  public isSnack1MenuAdded = false;
  public isLunchMenuAdded = false;
  public isSnack2MenuAdded = false;
  public isDinnerMenuAdded = false;
  public breakFastRecom = 440;
  public snack1Recom = 165;
  public lunchRecom = 440;
  public snack2Recom = 165;
  public dinnerRecom = 440;
  public currentBreakFastMenu = [];
  public currentBreakFastCalories = 0;
  public currentLunchMenu = [];
  public currentLunchCalories = 0;
  public currentDinnerMenu = [];
  public currentDinnerCalories = 0;
  public currentSnack1Menu = [];
  public currentSnack1Calories = 0;
  public currentSnack2Menu = [];
  public currentSnack2Calories = 0;
  public consumedCalories = 0;
  public burnedCalories = 0;
  public fastStartTime;
  public fastEndTime;
  public consumedWaterCount = 0;
  public consumedWaterAmount = 0;
  public expectedWaterAmount = 2400;

  public breakfastMenu = [{ item: 'Banana', cal: 117 }, { item: 'Bread', cal: 136 }, { item: 'Boiled Egg', cal: 86 }, { item: 'Wheat Chapathi', cal: 146 }, { item: 'Dosa', cal: 302 }, { item: 'Tea', cal: 73 }, { item: 'Coffee', cal: 135 }, { item: 'Milk', cal: 167 }];
  public bfNutrition = [{}];
  public snackMenu = [{ item: 'Banana', cal: 117 }, { item: 'Apple', cal: 131 }, { item: 'Orange', cal: 62 }, { item: 'Samosa', cal: 349 }, { item: 'Peas', cal: 340 }, { item: 'Tea', cal: 73 }, { item: 'Coffee', cal: 135 }, { item: 'Biscuits', cal: 89 }];

  public lunchMenu = [{ item: 'Plain Rice', cal: 173 }, { item: 'Roti', cal: 97 }, { item: 'Moong Dal', cal: 342 }, { item: 'Mixed Vegetables', cal: 82 }, { item: 'Curd Rice', cal: 176 }, { item: 'Chicken Curry', cal: 359 }];

  @ViewChild('tab')
  public tabInstance: TabComponent;

  @ViewChild('default_dashboard')
  public dashBoardInstance: DashboardLayoutComponent;

  @ViewChild('diet_dashboard')
  public dietDashBoardInstance: DashboardLayoutComponent;

  @ViewChild('fasting_dashboard')
  public fastingDashBoardInstance: DashboardLayoutComponent;

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

  @ViewChild('AddMenuDialog')
  public menuDialog: DialogComponent;

  public dlgButtons: ButtonPropsModel[] = [{ click: this.dlgBtnClick.bind(this), buttonModel: { content: 'CANCEL', cssClass: 'e-flat' } }, { click: this.dlgBtnClick.bind(this), buttonModel: { content: 'ADD MENU', isPrimary: true } }];
  public header: string = 'Add Menu';
  public showCloseIcon: Boolean = true;
  public Dialogwidth: string = '700px';
  public height: string = '300px';
  public animationSettings: AnimationSettingsModel = { effect: 'Zoom' };
  public target: string = 'body';
  public hidden: Boolean = false;
  public headerText: Object = [{ 'text': 'ACTIVITIES', iconCss: 'icon-Activities', iconPosition: 'top' }, { 'text': 'DIET', iconCss: 'icon-Diet', iconPosition: 'top' }, { 'text': 'FASTING', iconCss: 'icon-Fasting', iconPosition: 'top' }, { 'text': 'PROFILE', iconCss: 'icon-Profile', iconPosition: 'top' }];

  public animation: AnimationModel = { enable: true, duration: 2000, delay: 0 };
  public trackThickness: number = 25;
  public progressThickness: number = 25;
  public labelStyle = { textAlignment: 'Center', text: this.heartRate + ' BPM', color: '#FFFFFF' };
  public progressColor = '#3881f5';
  public trackColor = '#FFFFFF';

  public Axes: Object[] = [
    {
      minimum: 0,
      maximum: 120,
      line: {
        width: 0,
      },
      majorTicks: {
        interval: 20,
        height: 5,
        color: '#FFFFFF',
      },
      minorTicks: {
        height: 0,
        interval: 20,
        color: '#FFFFFF',
      },
      opposedPosition: true,
      pointers: [
        {
          value: 80,
          height: 12,
          width: 12,
          placement: 'Near',
          offset: -20,
          markerType: 'Triangle',
          color: '#FFFFFF',
        },
      ],
      ranges: [
        {
          start: 0,
          end: 80,
          startWidth: 20,
          endWidth: 20,
          offset: -15,
          linearGradient: {
            startValue: '0%',
            endValue: '100%',
            colorStop: [
              { color: '#FFFFFF', offset: '0%', opacity: 1 },
              { color: '#2084FE', offset: '100%', opacity: 1 },
            ],
          },
        },
      ],
    },
  ];

  public Annotation: Object[] = [
    {
      content:
        '<div id="pointer" style="width:20px;"><h1 style="font-size:15px;">80</h1></div>',
      axisIndex: 0,
      axisValue: 80,
      y: -40,
      zIndex: '1',
    },
  ];

  public pieData: Object[] = [{ x: 'PROTEINS', y: 17, text: '17%', fill: '#4DD291' }, { x: 'FAT', y: 8, text: '8%', fill: '#901C53' },
  { x: 'CARBOHYDRATES', y: 22, text: '22%', fill: '#CB4967' }, { x: 'CALCIUM', y: 8, text: '8%', fill: '#E25641' },
  { x: 'SODIUM', y: 24, text: '24%', fill: '#FC892C' }, { x: 'IRON', y: 12, text: '12%', fill: '#FFC147' }];
  public piePalette = ['#4DD291', '#901C53', '#CB4967', '#E25641', '#FC892C', '#FFC147'];
  //Initializing Legend
  public pieLegendSettings: Object = {
    visible: false,
    position: 'Right',
    width: '60%', height: '20%',
    shapeHeight: 20, shapeWidth: 20
  };
  public pieChartHeight = this.isDevice ? '300px' : '400px';
  //Initializing DataLabel
  public dataLabel: Object = {
    visible: true,
    name: 'text',
    position: 'Inside',
    font: {
      fontWeight: '600',
      color: '#ffffff'
    }
  };
  // custom code end
  public startAngle: number = 325;
  public endAngle: number = 325;
  public pieTooltip: Object = { enable: true };

  public Container: Object = {
    width: 13,
    roundedCornerRadius: 5,
    type: 'Normal',
  };

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
  public chartData: Object[] = this.getChartData();
  public primaryXAxis: Object = {
    valueType: 'DateTime',
    labelFormat: 'MMM dd',
    intervalType: 'Days',
    interval: 1,
    edgeLabelPlacement: 'Shift',
    labelStyle: {
      size: '16px', color: '#56648A',
      fontFamily: 'Inter', fontWeight: '500'
    },
    majorGridLines: {
      width: 0
    },
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
  public weightChartWidth: string = Browser.isDevice ? '90%' : '100%';
  public weightChartData: Object[] = this.getWeightChartData();
  public weightChartPrimaryXAxis: Object = {
    valueType: 'DateTime',
    labelFormat: 'MMM',
    edgeLabelPlacement: 'Shift',
    labelStyle: {
      size: '16px', color: '#56648A',
      fontFamily: 'Inter', fontWeight: '500'
    },
    majorGridLines: {
      width: 0
    },
  };
  public weightChartPrimaryYAxis: Object = {
    labelFormat: '{value} KG',
    maximum: 120,
    interval: 20,
    minimum: 0,
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
  public weightChartMarker = { visible: true, height: 10, width: 10 };
  public tooltip = { enable: true, shared: true, format: '${series.name} : ${point.x} : ${point.y}' };
  public weightChartTooltip = { enable: true };
  public dropDownData: string[] = ['Weekly', 'Monthly'];

  @ViewChild('circulargauge')
  public circulargauge: CircularGaugeComponent;

  public lineStyle: Object = {
    width: 0
  };
  //Initializing LabelStyle
  public gaugeLabelStyle: Object = {
    position: 'Inside', useRangeColor: true,
    font: { size: '0px', color: 'white', fontFamily: 'Roboto', fontStyle: 'Regular' }
  };
  public ranges: Object[] = [
    {
      start: 0, end: 100,
      radius: '90%',
      startWidth: 30, endWidth: 30,
      color: '#CDD9E0',
      roundedCornerRadius: 20
    },
  ];
  public pointerRadialGradient: Object = {
    startValue: '0%',
    endValue: '100%',
    colorStop: [
      { color: '#FB5F64', offset: '0%', opacity: 0.9 },
      { color: '#FC9662', offset: '70%', opacity: 0.9 }]
  };
  public innerPointerRadialGradient: Object = {
    startValue: '0%',
    endValue: '100%',
    colorStop: [
      { color: '#FFFFFF', opacity: 0.35 },
      { color: '#FFFFFF', opacity: 0.35 }]
  };
  public pointers: Object[] = [
    {
      roundedCornerRadius: 20,
      value: 0,
      type: 'RangeBar',
      radius: '90%',
      linearGradient: this.pointerRadialGradient,
      border: {
        color: 'grey',
        width: 0
      },
      animation: {
        enable: false
      },
      pointerWidth: 30
    },
    {
      roundedCornerRadius: 5,
      value: 0,
      offset: 90,
      type: 'RangeBar',
      radius: '80%',
      pointerWidth: 4,
      linearGradient: this.innerPointerRadialGradient,
      border: {
        color: 'grey',
        width: 0
      },
      animation: {
        enable: false
      },
    }];
  public titleStyle: Object = { size: '18px' };
  public majorTicks: Object = {
    height: 0,
  };
  public minorTicks: Object = {
    height: 0
  };
  public tail: Object = {
    length: '18%', color: '#757575'
  };
  public pointerCap: Object = {
    radius: 7, color: '#757575'
  };
  public sliderValue = '14 : 24 : 00';

  // Set the date we're counting down to
  public countDownDate: any = new Date();
  public countStartDate: any = new Date();
  public diff = this.countDownDate.getTime() - this.countStartDate.getTime();

  // Update the count down every 1 second
  public x = setInterval(this.intervalFn.bind(this), 1000);

  intervalFn() {
    let now: any = new Date();
    let isToday = this.countStartDate.toDateString() == now.toDateString();
    this.fastStartTime = (isToday ? 'Today ' : 'Yesterday ') + this.countStartDate.toLocaleTimeString('en-US');
    isToday = this.countDownDate.toDateString() == now.toDateString();
    this.fastEndTime = (isToday ? 'Today ' : 'Tomorrow ') + this.countDownDate.toLocaleTimeString('en-US');
    let percent = Math.round(((now - this.countStartDate) / (this.countDownDate - this.countStartDate)) * 100);
    percent = percent > 100 ? 100 : percent;
    let left = this.countDownDate.getTime() - now.getTime();
    let leftHours = Math.floor((left % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    leftHours = leftHours < 0 ? 0 : leftHours;
    let leftMinutes = Math.floor((left % (1000 * 60 * 60)) / (1000 * 60));
    leftMinutes = leftMinutes < 0 ? 0 : leftMinutes;
    let distance = now.getTime() - this.countStartDate.getTime();
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    this.sliderValue = hours.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + " : " + minutes.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + " : " + seconds.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    if (distance > this.diff) {
      clearInterval(this.x);
      this.sliderValue = "Completed";
    }
    this.circulargauge.axes[0].annotations[1].angle = Math.round((percent / 100) * 340) + 10;
    this.circulargauge.axes[0].annotations[0].content = '<div class="e-fast-ellapsed">Ellapsed Time (' + percent + '%)</div><div class="e-fast-completed">' +
      this.sliderValue.toString() + '</div><div class="e-fast-left">Left ' + leftHours.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + 'h ' + leftMinutes.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + 'm</div>';
    this.circulargauge.axes[0].pointers[0].value = percent;
  }

  endFasting() {
    clearInterval(this.x);
    this.sliderValue = "Completed";
    this.circulargauge.axes[0].annotations[1].angle = 350;
    this.circulargauge.axes[0].annotations[0].content = '<div class="e-fast-ellapsed">Ellapsed Time (100%)</div><div class="e-fast-completed">' +
      this.sliderValue.toString() + '</div><div class="e-fast-left">Left 00h 00m</div>';
    this.circulargauge.axes[0].pointers[0].value = 100;
  }

  modifyFasting() {
    this.countStartDate = new Date();
    this.countDownDate = new Date(new Date().setMinutes(new Date().getMinutes() + 10));
    this.diff = this.countDownDate.getTime() - this.countStartDate.getTime();
    this.consumedWaterCount = 0;
    this.consumedWaterAmount = 0;
    this.gauge.axes[0].pointers[0].value = 0;
    this.x = setInterval(this.intervalFn.bind(this), 1000);
  }

  public annotaions: Object = [{
    angle: 0,
    zIndex: '1',
    radius: '0%'
  },
  {
    zIndex: '1',
    radius: '78%',
    content: '<div class="e-gauge-percent-img icon-Calories"></div>'
  }];

  @ViewChild('gauge')
  public gauge: LinearGaugeComponent;
  public gaugeOrientation = this.isDevice ? 'Vertical' : 'Horizontal';
  public gaugeHeight = this.isDevice ? '100%' : '200px';

  public waterGaugeAxes: Object[] = [
    {
      minimum: 0,
      maximum: 100,
      line: {
        width: 0,
      },
      labelStyle: {
        font: {
          opacity: 0,
        },
      },
      majorTicks: {
        interval: 10,
        color: '#3993F5',
        offset: 5,
      },
      minorTicks: {
        interval: 2,
        color: '#3993F5',
        offset: 5,
      },
      opposedPosition: true,
      pointers: [
        {
          value: 0,
          height: 40,
          width: 40,
          roundedCornerRadius: 25,
          type: 'Bar',
          color: '#61a9f7',
        },
      ],
    },
  ];

  public waterGaugeAnnotation: Object[] = this.isDevice ? [
    {
      content:
        '<div class="e-water-annotation-text">Poor</div>',
      axisIndex: 0,
      axisValue: 5,
      x: 60,
      zIndex: '1',
    },
    {
      content:
        '<div class="e-water-annotation-text">Good</div>',
      axisIndex: 0,
      axisValue: 40,
      x: 60,
      zIndex: '1',
    },
    {
      content:
        '<div class="e-water-annotation-text">Almost</div>',
      axisIndex: 0,
      axisValue: 70,
      x: 60,
      zIndex: '1',
    },
    {
      content:
        '<div class="e-water-annotation-text">Perfect!</div>',
      axisIndex: 0,
      axisValue: 95,
      x: 60,
      zIndex: '1',
    },
  ] : [
    {
      content:
        '<div class="e-water-annotation-text">Poor</div>',
      axisIndex: 0,
      axisValue: 5,
      y: 50,
      zIndex: '1',
    },
    {
      content:
        '<div class="e-water-annotation-text">Good</div>',
      axisIndex: 0,
      axisValue: 40,
      y: 50,
      zIndex: '1',
    },
    {
      content:
        '<div class="e-water-annotation-text">Almost</div>',
      axisIndex: 0,
      axisValue: 70,
      y: 50,
      zIndex: '1',
    },
    {
      content:
        '<div class="e-water-annotation-text">Perfect!</div>',
      axisIndex: 0,
      axisValue: 95,
      y: 50,
      zIndex: '1',
    },
  ];

  public waterGaugeContainer: Object = {
    width: 50,
    roundedCornerRadius: 30,
    type: 'RoundedRectangle',
    backgroundColor: '#3993F5',
  };


  minusClick() {
    this.consumedWaterCount = this.consumedWaterCount > 0 ? (this.consumedWaterCount - 1) : 0;
    this.consumedWaterAmount = this.consumedWaterCount * 150;
    let percent = Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100);
    let index = this.closestIndex(percent);
    let content = ['Poor', 'Good', 'Almost', 'Perfect!'];
    this.gauge.annotations[index].content = '<div class="e-water-annotation-text e-highlight-text">' + content[index] + '</div>';
    if (content[index + 1]) {
      this.gauge.annotations[index + 1].content = '<div class="e-water-annotation-text">' + content[index + 1] + '</div>';
    }
    this.gauge.axes[0].pointers[0].value = percent;
  }

  plusClick() {
    this.consumedWaterCount += 1;
    this.consumedWaterAmount = this.consumedWaterCount * 150;
    let percent = Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100);
    let index = this.closestIndex(percent);
    let content = ['Poor', 'Good', 'Almost', 'Perfect!'];
    this.gauge.annotations[index].content = '<div class="e-water-annotation-text e-highlight-text">' + content[index] + '</div>';
    if (content[index - 1]) {
      this.gauge.annotations[index - 1].content = '<div class="e-water-annotation-text">' + content[index - 1] + '</div>';
    }
    this.gauge.axes[0].pointers[0].value = percent;
  }

  updateAnnotationContent

  closestIndex(num) {
    let counts = [5, 40, 70, 95];
    var curr = counts[0],
      diff = Math.abs(num - curr),
      index = 0;
    for (var val = 0; val < counts.length; val++) {
      let newdiff = Math.abs(num - counts[val]);
      if (newdiff < diff) {
        diff = newdiff;
        curr = counts[val];
        index = val;
      }
    }
    return index;
  }

  dlgBtnClick(args) {
    this.menuDialog.hide();
  }

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

  addBtnClick(args) {
    // this.menuDialog.show();
    if (args.target.ej2_instances[0].element.classList.contains('e-breakfast-add-btn')) {
      this.currentBreakFastMenu = [];
      this.currentBreakFastCalories = 0;
      this.currentBreakFastMenu = this.breakfastMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
      this.currentBreakFastCalories = this.currentBreakFastMenu.reduce((a, b) => +a + +b.cal, 0);
      this.consumedCalories += this.currentBreakFastCalories;
      this.isBreakFastMenuAdded = true;
    } else if (args.target.ej2_instances[0].element.classList.contains('e-snack1-add-btn')) {
      this.currentSnack1Menu = [];
      this.currentSnack1Calories = 0;
      this.currentSnack1Menu = this.snackMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
      this.currentSnack1Calories = this.currentSnack1Menu.reduce((a, b) => +a + +b.cal, 0);
      this.consumedCalories += this.currentSnack1Calories;
      this.isSnack1MenuAdded = true;
    } else if (args.target.ej2_instances[0].element.classList.contains('e-lunch-add-btn')) {
      this.currentLunchMenu = [];
      this.currentLunchCalories = 0;
      this.currentLunchMenu = this.lunchMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
      this.currentLunchCalories = this.currentLunchMenu.reduce((a, b) => +a + +b.cal, 0);
      this.consumedCalories += this.currentLunchCalories;
      this.isLunchMenuAdded = true;
    } else if (args.target.ej2_instances[0].element.classList.contains('e-snack2-add-btn')) {
      this.currentSnack2Menu = [];
      this.currentSnack2Calories = 0;
      this.currentSnack2Menu = this.snackMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
      this.currentSnack2Calories = this.currentSnack2Menu.reduce((a, b) => +a + +b.cal, 0);
      this.consumedCalories += this.currentSnack2Calories;
      this.isSnack2MenuAdded = true;
    } else if (args.target.ej2_instances[0].element.classList.contains('e-dinner-add-btn')) {
      this.currentDinnerMenu = [];
      this.currentDinnerCalories = 0;
      this.currentDinnerMenu = this.lunchMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
      this.currentDinnerCalories = this.currentDinnerMenu.reduce((a, b) => +a + +b.cal, 0);
      this.consumedCalories += this.currentDinnerCalories;
      this.isDinnerMenuAdded = true;
    }
  }

  updateMenu() {
    this.consumedCalories = 0;
    this.currentBreakFastMenu = [];
    this.currentBreakFastCalories = 0;
    this.currentBreakFastMenu = this.breakfastMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
    this.currentBreakFastCalories = this.currentBreakFastMenu.reduce((a, b) => +a + +b.cal, 0);
    this.consumedCalories += this.currentBreakFastCalories;
    this.isBreakFastMenuAdded = true;
    this.currentSnack1Menu = [];
    this.currentSnack1Calories = 0;
    this.currentSnack1Menu = this.snackMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
    this.currentSnack1Calories = this.currentSnack1Menu.reduce((a, b) => +a + +b.cal, 0);
    this.consumedCalories += this.currentSnack1Calories;
    this.isSnack1MenuAdded = true;
    this.currentLunchMenu = [];
    this.currentLunchCalories = 0;
    this.currentLunchMenu = this.lunchMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
    this.currentLunchCalories = this.currentLunchMenu.reduce((a, b) => +a + +b.cal, 0);
    this.consumedCalories += this.currentLunchCalories;
    this.isLunchMenuAdded = true;
    this.currentSnack2Menu = [];
    this.currentSnack2Calories = 0;
    this.currentSnack2Menu = this.snackMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
    this.currentSnack2Calories = this.currentSnack2Menu.reduce((a, b) => +a + +b.cal, 0);
    this.consumedCalories += this.currentSnack2Calories;
    this.isSnack2MenuAdded = true;
    this.currentDinnerMenu = [];
    this.currentDinnerCalories = 0;
    this.currentDinnerMenu = this.lunchMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
    this.currentDinnerCalories = this.currentDinnerMenu.reduce((a, b) => +a + +b.cal, 0);
    this.consumedCalories += this.currentDinnerCalories;
    this.isDinnerMenuAdded = true;
  }

  resize() {
    if (this.chartInstance) {
      this.chartInstance.refresh();
    }
    if (this.gridInstance) {
      this.gridInstance.refresh();
    }
  }

  tabSelecting(e) {
    if (e.isSwiped) {
      e.cancel = true;
    }
  }

  dashBoardCreated() {
    if (Browser.isDevice) {
      if (this.tabInstance.selectedItem === 0) {
        this.dashBoardInstance.removePanel('profile-panel-id');
      } else if (this.tabInstance.selectedItem === 1) {
        this.dietDashBoardInstance.removePanel('diet-profile-panel-id');
      } else if (this.tabInstance.selectedItem === 2) {
        this.fastingDashBoardInstance.removePanel('fasting-profile-panel-id');
      }
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
    this.today = args.value;
    this.updateComponents();
  }

  onProfileDateChange(args) {
    this.today = args.value;
    this.updateComponents();
    let isToday = args.value.getDate() === new Date().getDate() && args.value.getMonth() === new Date().getMonth() && args.value.getFullYear() === new Date().getFullYear();
    if (!isToday) {
      this.updateMenu();
    } else {
      this.consumedCalories = 0;
      this.isBreakFastMenuAdded = false;
      this.isSnack1MenuAdded = false;
      this.isLunchMenuAdded = false;
      this.isSnack2MenuAdded = false;
      this.isDinnerMenuAdded = false;
    }
  }

  updateComponents() {
    this.steps = Math.round(Math.random() * (6000 - 1000) + 1000);
    this.heartRate = Math.round(Math.random() * (100 - 70) + 70);
    this.calories = Math.round(Math.random() * (3500 - 1000) + 1000);
    this.sleepInMinutes = Math.round(Math.random() * (480 - 300) + 300);
    this.sleepInHours = this.getSleepInHours(this.sleepInMinutes);
    this.gridData = this.getData();
    if (this.gridInstance) {
      this.gridInstance.dataSource = this.gridData;
    }
    this.chartData = this.getChartData();
    if (this.chartInstance) {
      this.chartInstance.series[0].dataSource = this.chartData;
      // this.chartInstance.series[1].dataSource = this.data;
      this.chartInstance.refresh();
    }
  }

  getSleepInHours(minutes: number) {
    return Math.floor(minutes / 60) + 'h' + ' ' + (minutes % 60) + 'm';
  }

  getChartData() {
    let count: number = (this.dropDownInstance && this.dropDownInstance.value === 'Monthly') ? 30 : 7;
    let sampleData: Object[] = [];
    for (let i = count - 1; i >= 0; i--) {
      let date = (this.today) ? new Date(this.today) : new Date();
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

  getWeightChartData() {
    let count: number = 12;
    let sampleData: Object[] = [];
    for (let i = count - 1; i >= 0; i--) {
      let date = (this.today) ? new Date(this.today) : new Date();
      let data: Object = {
        x: new Date(date.setMonth(date.getMonth() - i)),
        y: Math.round(80 + (i * 3))
      };
      sampleData.push(data);
    }
    return sampleData;
  }

  getData() {
    let workout: string[] = ['Running', 'Swimming', 'Walking', 'Yoga'];
    let average = [10, 18, 22];
    let hours = [8, 7, 6, 6];
    let minutes = [0, 0, 30, 0];
    let caloriesBurned = [10, 15, 30];
    let count: number = 1;
    this.burnedCalories = 0;
    let date = (this.today) ? new Date(this.today) : new Date();
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
        this.burnedCalories += workout[j] === 'Yoga' ? 0 : Math.round((data['Duration'] / caloriesBurned[j]) * 100);
      }
    }
    return sampleData;
  }
}
