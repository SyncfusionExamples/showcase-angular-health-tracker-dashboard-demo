import { Component, ViewChild, HostListener } from '@angular/core';
import { Browser } from '@syncfusion/ej2-base';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import { AnimationModel } from '@syncfusion/ej2-progressbar';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { AccumulationChartComponent, ChartComponent } from '@syncfusion/ej2-angular-charts';
import { DatePickerComponent, DateTimePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { AnimationSettingsModel, ButtonPropsModel, DialogComponent } from '@syncfusion/ej2-angular-popups';
import { CircularGaugeComponent } from '@syncfusion/ej2-angular-circulargauge';
import { LinearGaugeComponent } from '@syncfusion/ej2-angular-lineargauge';
import { RadioButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { SliderComponent } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'fitness-app';
  public isDevice = Browser.isDevice;
  public isSmallDevice = false;
  public innerWidth: any = window.innerWidth;
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
  public consumedWaterCount = 4;
  public consumedWaterAmount = 600;
  public expectedWaterAmount = 2400;
  public currentMenuHeader;
  public currentMenu;
  public currentTotalCal = 0;
  public currentRecom = 0;
  public currentQuantity = 1;
  public modifyHeaderTitle = "Change Your Weight";
  public modifyBtnGroup = ['KG', 'LB'];
  public currentWtUnit = 'KG';
  public currentHtUnit = 'CM';
  public currentAddedMenu;
  public isGoalEdit = false;
  public changeTimeBtnText = "CHANGE TIME";
  public currrentTheme = 'Light';
  public theme = 'Tailwind';
  public chartBackGround = '#FFFFFF';
  public weightSliderMin = 0;
  public weightSliderMax = 120;
  public heightSliderMin = 0;
  public heightSliderMax = 200;

  public breakfastMenu = [{ item: 'Banana', cal: 117 }, { item: 'Bread', cal: 136 }, { item: 'Boiled Egg', cal: 86 }, { item: 'Wheat Chapathi', cal: 146 }, { item: 'Dosa', cal: 302 }, { item: 'Tea', cal: 73 }, { item: 'Coffee', cal: 135 }, { item: 'Milk', cal: 167 }];
  public bfNutrition = [{}];
  public snackMenu = [{ item: 'Banana', cal: 117 }, { item: 'Apple', cal: 131 }, { item: 'Orange', cal: 62 }, { item: 'Samosa', cal: 349 }, { item: 'Peas', cal: 340 }, { item: 'Tea', cal: 73 }, { item: 'Coffee', cal: 135 }, { item: 'Biscuits', cal: 89 }];

  public lunchMenu = [{ item: 'Plain Rice', cal: 173 }, { item: 'Roti', cal: 97 }, { item: 'Moong Dal', cal: 342 }, { item: 'Mixed Vegetables', cal: 82 }, { item: 'Curd Rice', cal: 176 }, { item: 'Chicken Curry', cal: 359 }];

  public todayActivities = [{ activity: 'Morning Walk', duration: '30m', distance: '3.4km', percentage: '12%', time: '7:00 AM' },
  { activity: 'Water taken', amount: '2 Glasses', percentage: '6%', time: '7:40 AM' },
  { activity: 'Breakfast', amount: 'Toast Bread', percentage: '20%', time: '9:00 AM' },
  { activity: 'Water taken', amount: '1 Glasses', percentage: '3%', time: '9:40 AM' },
  { activity: 'Lunch', amount: 'Pizza', percentage: '20%', time: '1:00 PM' },
  { activity: 'Lunch Walk', duration: '30m', distance: '3.4km', percentage: '12%', time: '1:30 PM' }];

  public profileStats = { name: 'John Watson', age: 24, location: 'Australia', weight: 65, height: 165, goal: 65, email: 'john.watson@gmail.com', weightMes: 'kg', goalMes: 'kg', heightMes: 'cm' };

  @ViewChild('fitnesstab')
  public tabInstance: TabComponent;

  @ViewChild('chartdropdown')
  public dropDownInstance: DropDownListComponent;

  @ViewChild('activitychart')
  public chartInstance: ChartComponent;

  @ViewChild('weightchart')
  public weightChartInstance: ChartComponent;

  @ViewChild('piecontainer')
  public nutritionChartInstance: AccumulationChartComponent;

  @ViewChild('workoutgrid')
  public gridInstance: GridComponent;

  @ViewChild('datepicker')
  public dateInstance: DatePickerComponent;

  @ViewChild('profiledate')
  public profileDateInstance: DatePickerComponent;

  @ViewChild('AddMenuDialog')
  public menuDialog: DialogComponent;

  @ViewChild('FastingDialog')
  public fastingDialog: DialogComponent;

  @ViewChild('StartFastDatePicker')
  public fastingStartDateInstance: DateTimePickerComponent;

  @ViewChild('EndFastDatePicker')
  public fastingEndDateInstance: DateTimePickerComponent;

  @ViewChild('ProfileEditDialog')
  public editDialog: DialogComponent;

  @ViewChild('radiolight')
  public lightThemeRadio: RadioButtonComponent;

  @ViewChild('radiodark')
  public darkThemeRadio: RadioButtonComponent;

  @ViewChild('weightrange')
  public weightSlider: SliderComponent;

  @ViewChild('heightrange')
  public heightSlider: SliderComponent;
  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 820) {
      this.isSmallDevice = true;
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.innerWidth !== window.innerWidth) {
      this.innerWidth = window.innerWidth;
      if (this.innerWidth <= 820) {
        // if (!this.isSmallDevice) {
        // document.location.reload();
        // }
        this.isSmallDevice = true;
      } else {
        if (this.isSmallDevice) {
          // document.location.reload();
        }
        this.isSmallDevice = false;
      }
    }
  }

  public dlgButtons: ButtonPropsModel[] = [{ click: this.menuCancelBtnClick.bind(this), buttonModel: { content: 'CANCEL', cssClass: 'e-menu-cancel' } }, { click: this.menuDlgBtnClick.bind(this), buttonModel: { content: 'ADD MENU', cssClass: 'e-menu-add' } }];
  public fastingDlgButtons: ButtonPropsModel[] = [{ click: this.fastingCancelBtnClick.bind(this), buttonModel: { content: 'CANCEL', cssClass: 'e-fasting-cancel' } }, { click: this.fastingDlgBtnClick.bind(this), buttonModel: { content: 'START FASTING', cssClass: 'e-start-fast' } }];
  public fastingDialogeader: string = 'Fasting';
  public showCloseIcon: Boolean = true;
  public Dialogwidth: string = this.isDevice ? '100%' : '700px';
  public fastingDialogwidth: string = this.isDevice ? '100%' : '400px';
  public editDialogWidth = this.isDevice ? '100%' : '1000px'
  public height: string = this.isDevice ? '100%' : 'auto';
  public dlgPosition = { X: 'center', Y: 'center' };
  public editDlgPosition = this.isDevice ? { X: 'center', Y: 'top' } : { X: 'center', Y: 'center' };
  public animationSettings: AnimationSettingsModel = { effect: 'Zoom' };
  public target: string = 'body';
  public hidden: Boolean = false;
  public headerText: Object = [{ 'text': 'ACTIVITIES', iconCss: 'icon-Activities', iconPosition: 'top' }, { 'text': 'DIET', iconCss: 'icon-Diet', iconPosition: 'top' }, { 'text': 'FASTING', iconCss: 'icon-Fasting', iconPosition: 'top' }, { 'text': 'PROFILE', iconCss: 'icon-Profile', iconPosition: 'top' }];

  public animation: AnimationModel = { enable: true, duration: 2000, delay: 0 };
  public trackThickness: number = 25;
  public progressThickness: number = 25;
  public labelStyle = { textAlignment: 'Center', text: this.heartRate + ' BPM', color: '#FFFFFF' };
  public progressColor = '#3881f5';
  public segmentCount: number = this.isDevice ? 30 : 50;
  public trackColor = '#FFFFFF';
  public activityChartHeight = '55%';
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
  public pieLegendSettings: Object = {
    visible: false,
    position: 'Right',
    width: '60%', height: '20%',
    shapeHeight: 20, shapeWidth: 20
  };
  public pieChartWidth = '100%';
  public pieChartHeight = this.isDevice ? '100%' : '80%';
  public pieChartRadius = this.isDevice ? '90%' : '80%';
  public center = this.isDevice ? { x: '50%', y: '50%' } : { x: '50%', y: '50%' };
  public dataLabel: Object = {
    visible: true,
    name: 'text',
    position: 'Inside',
    font: {
      fontWeight: '600',
      color: '#ffffff'
    }
  };
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
  public headerPlacement = this.isSmallDevice ? 'Bottom' : 'Top';
  public width: string = this.isDevice ? '100%' : '60%';
  public chartWidth: string = this.isDevice ? '98%' : '97%';
  public gridWidth: string = this.isDevice ? '97%' : '96.5%';
  public gridColumnWidth = this.isDevice ? 150 : 200;
  public datePickerWidth: string = '100%';
  public chartDietData: Object[] = this.getChartData();
  public chartData: Object[] = this.getChartData();
  public primaryXAxis: Object = {
    valueType: 'DateTime',
    labelFormat: 'MMM dd',
    intervalType: 'Days',
    interval: 1,
    edgeLabelPlacement: 'Shift',
    labelIntersectAction: 'Hide',
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
    interval: 50,
    labelStyle: {
      size: '16px', color: '#56648A',
      fontFamily: 'Inter', fontWeight: '500'
    },
    majorGridLines: {
      dashArray: "10,5"
    }
  };
  public weightChartWidth: string = this.isDevice ? '90%' : '100%';
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
  public crosshair = { enable: true, lineType: 'Vertical', dashArray: "10,5", line: { color: '#EE4769' } };
  public marker = { visible: true, height: 15, width: 15 };
  public weightChartMarker = { visible: true, height: 10, width: 10 };
  public tooltip = { enable: true, shared: true, format: '${series.name} : ${point.x} : ${point.y}' };
  public weightChartTooltip = { enable: true };
  public dropDownData: string[] = ['Weekly', 'Monthly'];

  @ViewChild('fastingGaugeId')
  public circulargauge: CircularGaugeComponent;
  public circularGaugeRadius = this.isDevice ? '100%' : '100%';
  public lineStyle: Object = {
    width: 0
  };
  //Initializing LabelStyle
  public gaugeLabelStyle: Object = {
    position: 'Inside', useRangeColor: true,
    font: { size: '0px', color: 'white', fontFamily: 'Roboto', fontStyle: 'Regular' }
  };

  public pointerRadialGradient: Object = {
    startValue: '0%',
    endValue: '100%',
    colorStop: [
      { color: '#FB5F64', offset: '0%', opacity: 0.9 },
      { color: '#FC9662', offset: '70%', opacity: 0.9 }]
  };
  public ranges: Object[] = [
    {
      start: 0,
      end: 100,
      radius: '100%',
      startWidth: 30,
      endWidth: 30,
      color: '#C0C0C0',
      roundedCornerRadius: 15,
    },
    {
      start: 0,
      end: 100,
      radius: '100%',
      startWidth: 30,
      endWidth: 30,
      color: '#E0E0E0',
      roundedCornerRadius: 15,
      linearGradient: this.pointerRadialGradient,
    },
    {
      start: 2,
      end: 98,
      radius: '94%',
      startWidth: 5,
      endWidth: 5,
      roundedCornerRadius: 5,
      color: '#FFFFFF',
      opacity: 0.35
    },
  ];
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
  public sliderValue = "Completed";

  // Set the date we're counting down to
  public countStartDate: any = new Date().getHours() >= 17 ? new Date(new Date().setHours(18, 0, 0, 0)) : new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(18, 0, 0, 0));
  public countDownDate: any = new Date().getHours() >= 17 ? new Date(new Date().setHours(this.countStartDate.getHours() + 16, 0, 0, 0)) : new Date(new Date(new Date().setDate(this.countStartDate.getDate())).setHours(this.countStartDate.getHours() + 16, 0, 0, 0));
  public diff = 16;

  public minimumDate = new Date(new Date().setHours(0, 0, 0));
  public maximumDate = new Date(new Date().setHours(this.minimumDate.getHours() + 24, 0, 0));

  // Update the count down every 1 second
  public x = setInterval(this.intervalFn.bind(this), 1000);

  public annotaions: Object = this.isDevice ? [{
    angle: 0,
    zIndex: '1',
    radius: '0%'
  },
  {
    zIndex: '1',
    radius: '91%',
    angle: 350,
    content: '<div class="e-gauge-percent-img icon-Calories"></div>'
  },
  {
    zIndex: '1',
    radius: '91%',
    angle: 60,
    content: '<div class="e-gauge-status-img icon-Diet"></div>'
  },
  {
    zIndex: '1',
    radius: '91%',
    angle: 280,
    content: '<div class="e-gauge-status-img icon-Thunder"></div>'
  }] : [{
    angle: 0,
    zIndex: '1',
    radius: '0%'
  },
  {
    zIndex: '1',
    radius: '90%',
    angle: 350,
    content: '<div class="e-gauge-percent-img icon-Calories"></div>'
  },
  {
    zIndex: '1',
    radius: '90%',
    angle: 60,
    content: '<div class="e-gauge-status-img icon-Diet"></div>'
  },
  {
    zIndex: '1',
    radius: '90%',
    angle: 280,
    content: '<div class="e-gauge-status-img icon-Thunder"></div>'
  }];

  @ViewChild('waterGaugeId')
  public gauge: LinearGaugeComponent;
  public gaugeOrientation = this.isDevice ? 'Vertical' : 'Horizontal';
  public gaugeHeight = this.isDevice ? '100%' : '250px';
  public gaugeWidth = '100%';

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
          value: Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100),
          height: 60,
          width: 60,
          roundedCornerRadius: 40,
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
    width: 70,
    roundedCornerRadius: 50,
    type: 'RoundedRectangle',
    backgroundColor: '#3993F5',
  };

  @ViewChild('weightgauge')
  public weightGauge: CircularGaugeComponent;
  public rangeLinearGradient: object = {
    startValue: '0%',
    endValue: '100%',
    colorStop: [
      { color: '#4075F2', offset: '0%' },
      { color: '#FB9906', offset: '35%' },
      { color: '#F9623A', offset: '70%' },
      { color: '#C24287', offset: '100%' },
    ]
  };
  public weightGaugeMinorTicks: Object = {
    width: 0
  };
  public weightGaugeMajorTicks: Object = {
    interval: 10, height: 5, offset: 20, position: 'Inside'
  };
  public ticks: Object = {
    width: 0
  };
  public weightGaugeLineStyle: Object = {
    width: 0
  };
  public weightGaugeCenterX = this.isDevice ? (this.innerWidth < 450 ? '30%' : '60%') : '35%';
  public weightGaugeCenterY = this.isDevice ? '50%' : '50%';
  public weightGaugeBackground = '#FFF7EC';
  public weightGaugeStartAngle: Object = 210;
  public weightGaugeEndangle: Object = 150;
  public weightGaugeMinimum: Object = 0;
  public weightGaugeMaximum: Object = 120;
  public weightGaugeRadius: Object = '85%';
  public weightGaugeLabelStyle: Object = {
    font: {
      fontFamily: 'Roboto',
      size: '0px',
      fontWeight: 'Regular'
    },
    offset: 10
  };
  public weightGaugePointers: Object[] = [{
    animation: { enable: false }, value: this.profileStats.weight, radius: '85%', color: '#F43F5E',
    pointerWidth: 12,
    cap: { radius: 12, color: '#F0D9BC' }
  }];
  public weightGaugeRanges: Object[] = [{
    start: 0, end: this.profileStats.weight, startWidth: 18, endWidth: 18, color: '#F43F5E',
    linearGradient: this.rangeLinearGradient,
    roundedCornerRadius: 10
  }];

  public weightGaugeAnnotaions: Object = [{
    content: '<div class="e-weight-gauge-annotation">' +
      this.profileStats.weight + this.profileStats.weightMes + '</div>',
    radius: '85%', angle: 180, zIndex: '1'
  }];
  public mintype = 'MinRange';

  @ViewChild('heightgauge')
  public heightGauge: LinearGaugeComponent;
  public orientation = 'Vertical';
  public heightGaugeContainer: Object = {
    width: 80,
    border: {
      width: 2,
      color: '#E1E9ED',
    },
  };

  public heightGaugePointerLinearGradient: object = {
    startValue: '0%',
    endValue: '100%',
    colorStop: [
      { color: '#B2CFE0', offset: '0%', opacity: 0.5 },
    ],
  };

  public heightGaugeAxes: Object = [
    {
      minimum: 0,
      maximum: 200,
      line: {
        offset: -80,
      },
      opposedPosition: true,
      majorTicks: {
        interval: 20,
      },
      minorTicks: {
        interval: 5,
      },
      labelStyle: {
        font: {
          color: '#000000',
        },
      },
      pointers: [
        {
          type: 'Bar',
          value: this.profileStats.height,
          width: 80,
          linearGradient: this.heightGaugePointerLinearGradient,
        },
      ],
    },
  ];

  public heightGaugeAnnotation: Object[] = [{
    content: '<div class="e-height-gauge-annotation">' + this.profileStats.height + this.profileStats.heightMes + '</div>',
    axisIndex: 0,
    axisValue: this.profileStats.height,
    x: -50,
    y: 0, zIndex: '1'
  }
  ];

  intervalFn() {
    let now: any = new Date();
    let isToday = this.countStartDate.toDateString() == now.toDateString();
    this.fastStartTime = (isToday ? 'Today ' : 'Yesterday ') + this.countStartDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    isToday = this.countDownDate.toDateString() == now.toDateString();
    this.fastEndTime = (isToday ? 'Today ' : 'Tomorrow ') + this.countDownDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
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
    if (distance > (this.countDownDate.getTime() - this.countStartDate.getTime()) || distance < 0) {
      clearInterval(this.x);
      this.endFasting();
    } else if (this.circulargauge) {
      this.circulargauge.axes[0].ranges[1].end = percent;
      this.circulargauge.axes[0].annotations[1].angle = Math.round((percent / 100) * 340) + 10;
      if (percent > 80) {
        this.circulargauge.axes[0].annotations[1].content = '<div class="e-gauge-percent-img icon-Calories"></div>';
      } else {
        this.circulargauge.axes[0].annotations[1].content = '';
      }
      this.circulargauge.axes[0].annotations[0].content = '<div class="e-fast-ellapsed">Ellapsed Time (' + percent + '%)</div><div class="e-fast-completed">' +
        this.sliderValue.toString() + '</div><div class="e-fast-left">Left ' + leftHours.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + 'h ' + leftMinutes.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + 'm</div>';
    }
  }

  endFasting() {
    clearInterval(this.x);
    this.sliderValue = "Completed";
    this.annotaions[0].content = '<div class="e-fast-ellapsed">Ellapsed Time (100%)</div><div class="e-fast-completed">' +
      this.sliderValue.toString() + '</div><div class="e-fast-left">Left 00h 00m</div>';
    if (this.circulargauge) {
      this.circulargauge.axes[0].ranges[1].end = 0;
      this.circulargauge.axes[0].annotations[1].angle = 0;
      this.circulargauge.axes[0].annotations[1].content = '';
      this.circulargauge.axes[0].annotations[0].content = this.annotaions[0].content;
    }
    this.changeTimeBtnText = "START FASTING";
    if (document.querySelector('.e-fast-time-btn') && !document.querySelector('.e-fast-time-btn').classList.contains('e-fast-reset')) {
      document.querySelector('.e-fast-time-btn').classList.add('e-fast-reset');
    }
    if (document.querySelector('.e-fast-end-btn') && !document.querySelector('.e-fast-end-btn').classList.contains('e-fast-reset')) {
      document.querySelector('.e-fast-end-btn').classList.add('e-fast-reset');
    }
  }

  modifyFasting() {
    this.fastingDialog.show();
  }

  fastingDlgBtnClick(args) {
    this.countStartDate = this.fastingStartDateInstance.value;
    this.countDownDate = this.fastingEndDateInstance.value;
    this.diff = Math.floor(((this.countDownDate - this.countStartDate) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.consumedWaterCount = 0;
    this.consumedWaterAmount = 0;
    clearInterval(this.x);
    this.x = setInterval(this.intervalFn.bind(this), 1000);
    this.fastingDialog.hide();
    this.changeTimeBtnText = "CHANGE TIME";
    if (document.querySelector('.e-fast-time-btn') && document.querySelector('.e-fast-time-btn').classList.contains('e-fast-reset')) {
      document.querySelector('.e-fast-time-btn').classList.remove('e-fast-reset');
    }
    if (document.querySelector('.e-fast-end-btn') && document.querySelector('.e-fast-end-btn').classList.contains('e-fast-reset')) {
      document.querySelector('.e-fast-end-btn').classList.remove('e-fast-reset');
    }
  }

  fastingCancelBtnClick() {
    this.fastingDialog.hide();
  }

  onFastDateChange() {
    this.diff = Math.floor((((this.fastingEndDateInstance.value as any) - (this.fastingStartDateInstance.value as any)) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  }

  sliderChange(args) {
    this.weightGauge.axes[0].annotations[0].content = '<div class="e-weight-gauge-annotation">' +
      args.value + this.currentWtUnit + '</div>';
    this.weightGauge.axes[0].ranges[0].end = args.value;
    this.weightGauge.axes[0].pointers[0].value = args.value;
  }

  sliderHeightChange(args) {
    this.heightGauge.annotations[0].axisValue = args.value;
    this.heightGauge.annotations[0].content = '<div class="e-height-gauge-annotation">' + args.value + this.currentHtUnit + '</div>';
    this.heightGauge.axes[0].pointers[0].value = args.value;
    (document.querySelectorAll('#height-svg')[0] as HTMLElement).style.height = (args.value * (this.currentHtUnit.toUpperCase() === 'CM' ? 1.5 : 40)) + 'px';
  }

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

  menuDlgBtnClick(args) {
    if (this.currentAddedMenu === 'Breakfast') {
      this.currentBreakFastMenu = [];
      this.currentBreakFastCalories = 0;
      this.currentBreakFastMenu = this.currentMenu.filter(function (item) {
        return item.isAdded;
      });
      this.currentBreakFastCalories = this.currentTotalCal;
      this.consumedCalories += this.currentBreakFastCalories;
      this.isBreakFastMenuAdded = true;
    } else if (this.currentAddedMenu === 'Snack 1') {
      this.currentSnack1Menu = [];
      this.currentSnack1Calories = 0;
      this.currentSnack1Menu = this.currentMenu.filter(function (item) {
        return item.isAdded;
      });
      this.currentSnack1Calories = this.currentTotalCal;
      this.consumedCalories += this.currentSnack1Calories;
      this.isSnack1MenuAdded = true;
    } else if (this.currentAddedMenu === 'Lunch') {
      this.currentLunchMenu = [];
      this.currentLunchCalories = 0;
      this.currentLunchMenu = this.currentMenu.filter(function (item) {
        return item.isAdded;
      });
      this.currentLunchCalories = this.currentTotalCal;
      this.consumedCalories += this.currentLunchCalories;
      this.isLunchMenuAdded = true;
    } else if (this.currentAddedMenu === 'Snack 2') {
      this.currentSnack2Menu = [];
      this.currentSnack2Calories = 0;
      this.currentSnack2Menu = this.currentMenu.filter(function (item) {
        return item.isAdded;
      });
      this.currentSnack2Calories = this.currentTotalCal;
      this.consumedCalories += this.currentSnack2Calories;
      this.isSnack2MenuAdded = true;
    } else if (this.currentAddedMenu === 'Dinner') {
      this.currentDinnerMenu = [];
      this.currentDinnerCalories = 0;
      this.currentDinnerMenu = this.currentMenu.filter(function (item) {
        return item.isAdded;
      });
      this.currentDinnerCalories = this.currentTotalCal;
      this.consumedCalories += this.currentDinnerCalories;
      this.isDinnerMenuAdded = true;
    }
    this.menuDialog.hide();
  }

  menuCancelBtnClick() {
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
    if (args.currentTarget.classList.contains('e-breakfast-add-btn')) {
      this.currentMenuHeader = " Add Breakfast Menu";
      this.currentMenu = this.breakfastMenu;
      this.currentRecom = this.breakFastRecom;
      this.currentAddedMenu = 'Breakfast';
    } else if (args.currentTarget.classList.contains('e-snack1-add-btn') || args.currentTarget.classList.contains('e-snack2-add-btn')) {
      this.currentMenuHeader = "Add Snack Menu";
      this.currentMenu = this.snackMenu;
      if (args.currentTarget.classList.contains('e-snack1-add-btn')) {
        this.currentRecom = this.snack1Recom;
        this.currentAddedMenu = 'Snack 1';
      } else {
        this.currentRecom = this.snack2Recom;
        this.currentAddedMenu = 'Snack 2';
      }
    } else if (args.currentTarget.classList.contains('e-lunch-add-btn')) {
      this.currentMenuHeader = "Add Lunch Menu";
      this.currentMenu = this.lunchMenu;
      this.currentRecom = this.lunchRecom;
      this.currentAddedMenu = 'Lunch';
    } else if (args.currentTarget.classList.contains('e-dinner-add-btn')) {
      this.currentMenuHeader = "Add Dinner Menu";
      this.currentMenu = this.lunchMenu;
      this.currentRecom = this.dinnerRecom;
      this.currentAddedMenu = 'Dinner';
    }
    this.menuDialog.show();
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

  quantityMinusClick() {
    this.currentQuantity = this.currentQuantity > 0 ? (this.currentQuantity - 1) : 0;
  }

  quantityPlusClick() {
    this.currentQuantity += 1;
  }

  ageMinusClick() {
    this.profileStats.age = this.profileStats.age > 0 ? (this.profileStats.age - 1) : 0;
  }

  agePlusClick() {
    this.profileStats.age += 1;
  }

  onMenuCardSelect(args) {
    args.currentTarget.classList.toggle('e-card-select');
    for (var i = 0; i < this.currentMenu.length; i++) {
      if (this.currentMenu[i].item === args.currentTarget.innerText) {
        if (args.currentTarget.classList.contains('e-card-select')) {
          this.currentTotalCal += (this.currentMenu[i].cal * this.currentQuantity);
          this.currentMenu[i].isAdded = true;
          this.currentMenu[i].quantity = this.currentQuantity;
        } else {
          this.currentTotalCal -= (this.currentMenu[i].cal * this.currentMenu[i].quantity);
          this.currentMenu[i].isAdded = false;
          this.currentMenu[i].quantity = 0;
        }
      }
    }
  }

  changeHeight() {
    this.currentHtUnit = this.profileStats.heightMes;
    this.modifyHeaderTitle = "Change Your Height";
    this.modifyBtnGroup = ['CM', 'FT'];
    if (this.editDialog.element.querySelector('.e-modify-container') && this.editDialog.element.querySelector('.e-modify-container').classList.contains('e-hidden')) {
      this.editDialog.element.querySelector('.e-modify-container').classList.remove('e-hidden');
    }
    if (this.editDialog.element.querySelector('.e-weight-gauge-container') && !this.editDialog.element.querySelector('.e-weight-gauge-container').classList.contains('e-hidden')) {
      this.editDialog.element.querySelector('.e-weight-gauge-container').classList.add('e-hidden');
    }
    if (this.editDialog.element.querySelector('.e-height-gauge-container') && this.editDialog.element.querySelector('.e-height-gauge-container').classList.contains('e-hidden')) {
      this.editDialog.element.querySelector('.e-height-gauge-container').classList.remove('e-hidden');
    }
  }

  changeWeight() {
    this.currentWtUnit = this.profileStats.weightMes;
    this.isGoalEdit = false;
    this.showWeight();
  }

  showWeight() {
    this.modifyHeaderTitle = "Change Your Weight";
    this.modifyBtnGroup = ['KG', 'LB'];
    if (this.editDialog.element.querySelector('.e-modify-container') && this.editDialog.element.querySelector('.e-modify-container').classList.contains('e-hidden')) {
      this.editDialog.element.querySelector('.e-modify-container').classList.remove('e-hidden');
    }
    if (this.editDialog.element.querySelector('.e-weight-gauge-container') && this.editDialog.element.querySelector('.e-weight-gauge-container').classList.contains('e-hidden')) {
      this.editDialog.element.querySelector('.e-weight-gauge-container').classList.remove('e-hidden');
    }
    if (this.editDialog.element.querySelector('.e-height-gauge-container') && !this.editDialog.element.querySelector('.e-height-gauge-container').classList.contains('e-hidden')) {
      this.editDialog.element.querySelector('.e-height-gauge-container').classList.add('e-hidden');
    }
  }

  changeGoal() {
    this.currentWtUnit = this.profileStats.goalMes;
    this.isGoalEdit = true;
    this.showWeight();
  }

  cancelWeight() {
    this.isGoalEdit = false;
    this.cancelHeight();
  }

  updateWeight() {
    if (this.isGoalEdit) {
      this.profileStats.goalMes = this.currentWtUnit;
      this.profileStats.goal = this.weightGauge.axes[0].pointers[0].value;
    } else {
      this.profileStats.weightMes = this.currentWtUnit;
      this.profileStats.weight = this.weightGauge.axes[0].pointers[0].value;
    }
    this.isGoalEdit = false;
    this.cancelHeight();
  }

  cancelHeight() {
    if (this.editDialog.element.querySelector('.e-modify-container') && !this.editDialog.element.querySelector('.e-modify-container').classList.contains('e-hidden')) {
      this.editDialog.element.querySelector('.e-modify-container').classList.add('e-hidden');
    }
  }

  updateHeight() {
    this.profileStats.heightMes = this.currentHtUnit;
    this.profileStats.height = this.heightGauge.axes[0].pointers[0].value;
    this.cancelHeight();
  }

  onNameChange(args) {
    this.profileStats.name = args.value;
  }

  onLocationChange(args) {
    this.profileStats.location = args.value;
  }

  onEmailChange(args) {
    this.profileStats.email = args.value;
  }

  tabSelecting(e) {
    if (e.isSwiped) {
      e.cancel = true;
    }
  }

  tabSelected(e) {
    if (this.chartInstance) {
      this.chartInstance.refresh();
    }
    if (this.weightChartInstance) {
      this.weightChartInstance.refresh();
    }
    if (this.nutritionChartInstance) {
      this.nutritionChartInstance.refresh();
    }
  }

  customiseCell(args) {
    if (args.column.field === 'Completion') {
      args.cell.classList.add('completion-color');
    }
  }

  onDropDownChange(args) {
    this.chartDietData = this.getChartData();
    this.chartData = this.getChartData();
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

  onProfileEdit() {
    this.editDialog.show();
  }

  closeEditDialog() {
    this.editDialog.hide();
  }

  changeHandler(args) {
    this.currrentTheme = args.value;
    let findlink = document.getElementById("appcssid");
    if (this.currrentTheme === 'Light') {
      (findlink as any).href = "./assets/styles.css";
      if (document.body.classList.contains('e-dark')) {
        document.body.classList.remove('e-dark');
      }
      this.theme = 'Tailwind';
      this.chartBackGround = '#FFFFFF';
      if (this.chartInstance) {
        this.chartInstance.theme = 'Tailwind';
        this.chartInstance.refresh();
      }
      if (this.weightChartInstance) {
        this.weightChartInstance.theme = 'Tailwind';
        this.weightChartInstance.refresh();
      }
      if (this.nutritionChartInstance) {
        this.nutritionChartInstance.theme = 'Tailwind';
        this.nutritionChartInstance.refresh();
      }
      this.weightGaugeBackground = '#FFF7EC';
      this.heightGauge.axes[0].labelStyle.font.color = '#000000';
    } else if (this.currrentTheme === 'Dark') {
      (findlink as any).href = "./assets/styles-dark.css";
      if (!document.body.classList.contains('e-dark')) {
        document.body.classList.add('e-dark');
      }
      this.theme = 'TailwindDark';
      this.chartBackGround = '#26273B';
      if (this.chartInstance) {
        this.chartInstance.theme = 'TailwindDark';
        this.chartInstance.refresh();
      }
      if (this.weightChartInstance) {
        this.weightChartInstance.theme = 'TailwindDark';
        this.weightChartInstance.refresh();
      }
      if (this.nutritionChartInstance) {
        this.nutritionChartInstance.theme = 'TailwindDark';
        this.nutritionChartInstance.refresh();
      }
      this.weightGaugeBackground = '#414255';
      this.heightGauge.axes[0].labelStyle.font.color = '#FFFFFF';
    }
  }

  handleChange(args) {
    let unit = args.currentTarget.value;
    if (['KG', 'LB'].includes(unit) && this.currentWtUnit !== unit) {
      this.currentWtUnit = unit;
      this.weightGauge.axes[0].maximum = unit === 'KG' ? 100 : 250;
      this.weightSlider.max = unit === 'KG' ? 100 : 250;
      let value = unit === 'KG' ? Math.round(this.weightSlider.value as number / 2.205) : Math.round(this.weightSlider.value as number * 2.205);
      this.weightGauge.axes[0].annotations[0].content = '<div class="e-weight-gauge-annotation">' +
        value + this.currentWtUnit + '</div>';
      this.weightGauge.axes[0].ranges[0].end = value;
      this.weightGauge.axes[0].pointers[0].value = value;
      this.weightSlider.value = value;
    } else if (['CM', 'FT'].includes(unit) && this.currentHtUnit !== unit) {
      this.currentHtUnit = unit;
      this.heightGauge.axes[0].maximum = unit === 'CM' ? 200 : 8;
      this.heightSlider.max = unit === 'CM' ? 200 : 8;
      let value = Number(Math.round(((unit === 'CM' ? (this.heightSlider.value as number * 30.48) : (this.heightSlider.value as number / 30.48) * 100) / 100)).toFixed(2));
      this.heightGauge.annotations[0].axisValue = value;
      this.heightGauge.annotations[0].content = '<div class="e-height-gauge-annotation">' + value + this.currentHtUnit + '</div>';
      this.heightGauge.axes[0].pointers[0].value = value;
      this.heightGauge.axes[0].majorTicks.interval = unit === 'CM' ? 20 : 1;
      this.heightGauge.axes[0].minorTicks.interval = unit === 'CM' ? 5 : 0.1;
      (document.querySelectorAll('#height-svg')[0] as HTMLElement).style.height = (value * (unit === 'CM' ? 1.5 : 25)) + 'px';
      this.heightSlider.value = value;
    }
  }

  dialogOpen(args) {
    args.preventFocus = true;
  }

  dialogBeforeOpen(args) {
    this.weightSlider.refresh();
    this.heightSlider.refresh();
  }

  legendClick(args) {
    if (args.legendText === 'Diet') {
      this.chartInstance.series[0].visible = !this.chartInstance.series[0].visible;
    } else if (args.legendText === 'Workout') {
      this.chartInstance.series[1].visible = !this.chartInstance.series[1].visible;
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
    this.chartDietData = this.getChartData();
    this.chartData = this.getChartData();
    if (this.chartInstance) {
      this.chartInstance.series[0].dataSource = this.chartInstance.series[2].dataSource = this.chartDietData;
      this.chartInstance.series[1].dataSource = this.chartInstance.series[3].dataSource = this.chartData;
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
