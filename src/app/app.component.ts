import { Component, ViewChild, HostListener } from '@angular/core';
import { Browser } from '@syncfusion/ej2-base';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import { AnimationModel } from '@syncfusion/ej2-progressbar';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { AccumulationChartComponent, ChartComponent } from '@syncfusion/ej2-angular-charts';
import { DatePickerComponent, DateTimePickerComponent, TimePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { AnimationSettingsModel, ButtonPropsModel, DialogComponent } from '@syncfusion/ej2-angular-popups';
import { CircularGaugeComponent } from '@syncfusion/ej2-angular-circulargauge';
import { LinearGaugeComponent, PointerModel } from '@syncfusion/ej2-angular-lineargauge';
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
  public currentDate: Date = this.today;
  public maxDate: Date = new Date();
  public cellSpacing: number[] = [10, 20];
  public steps: number = 1240;
  public heartRate: number = 80;
  public calories: number = 1205;
  public expectedCalories = 3000;
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
  public currentBreakFastMenuText;
  public currentLunchMenuText;
  public currentSnack1MenuText;
  public currentSnack2MenuText;
  public currentDinnerMenuText;
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
  public currentTotalProteins = 0;
  public currentTotalFat = 0;
  public currentTotalCarbs = 0;
  public currentTotalCalcium = 0;
  public currentTotalIron = 0;
  public currentTotalSodium = 0;
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
  public lastSelectItem = '';
  public dateEnable = false;
  public weightSliderLimit = { enabled: true, minStart: this.currentWtUnit === 'KG' ? 10 : 20 };
  public heightSliderLimit = { enabled: true, minStart: this.currentHtUnit === 'CM' ? 30 : 1 };
  public humanImg = 'LightHuman';
  public masterData = [];

  public breakfastMenu = [
    { item: 'Banana', cal: 105, fat: 0.4, carbs: 27, proteins: 1.3, sodium: 0.0012, iron: 0.00031, calcium: 0.005 },
    { item: 'Bread', cal: 77, fat: 1, carbs: 14, proteins: 2.6, sodium: 0.142, iron: 0.0036, calcium: 0.260 },
    { item: 'Boiled Egg', cal: 78, fat: 5.3, carbs: 0.6, proteins: 6.3, sodium: 0.062, iron: 0.001, calcium: 0.05 },
    { item: 'Wheat Chapathi', cal: 120, fat: 3.7, carbs: 18, proteins: 3.1, sodium: 0.119, iron: 0.001, calcium: 0.01 },
    { item: 'Dosa', cal: 168, fat: 3.7, carbs: 29, proteins: 3.9, sodium: 0.094, iron: 0.0005, calcium: 0.01 },
    { item: 'Tea', cal: 5, fat: 0.1, carbs: 1.4, proteins: 0.1, sodium: 0.0008, iron: 0, calcium: 0.02 },
    { item: 'Coffee', cal: 2, fat: 0.1, carbs: 0, proteins: 0.3, sodium: 0.047, iron: 0, calcium: 0.039 },
    { item: 'Milk', cal: 122, fat: 4.8, carbs: 12, proteins: 8.1, sodium: 0.115, iron: 0, calcium: 0.125 }
  ];
  public snackMenu = [
    { item: 'Banana', cal: 105, fat: 0.4, carbs: 27, proteins: 1.3, sodium: 0.0012, iron: 0.00031, calcium: 0.006 },
    { item: 'Apple', cal: 95, fat: 0.3, carbs: 25, proteins: 0.5, sodium: 0.018, iron: 0.0001, calcium: 0.0085 },
    { item: 'Orange', cal: 69, fat: 0.2, carbs: 18, proteins: 1.3, sodium: 0.0014, iron: 0.0001, calcium: 0.04 },
    { item: 'Samosa', cal: 262, fat: 17, carbs: 24, proteins: 3.5, sodium: 0.423, iron: 0.0005, calcium: 0.013 },
    { item: 'Peas', cal: 134, fat: 0.3, carbs: 25, proteins: 8.6, sodium: 0.048, iron: 0.00015, calcium: 0.036 },
    { item: 'Tea', cal: 5, fat: 0.1, carbs: 1.4, proteins: 0.1, sodium: 0.0008, iron: 0, calcium: 0.02 },
    { item: 'Coffee', cal: 2, fat: 0.1, carbs: 0, proteins: 0.3, sodium: 0.047, iron: 0, calcium: 0.039 },
    { item: 'Biscuits', cal: 37, fat: 1.2, carbs: 6.2, proteins: 0.5, sodium: 0.002, iron: 0.00031, calcium: 0.03 }
  ];

  public lunchMenu = [
    { item: 'Plain Rice', cal: 205, fat: 0.4, carbs: 45, proteins: 4.3, sodium: 0.0016, iron: 0.0002, calcium: 0.011 },
    { item: 'Roti', cal: 120, fat: 3.7, carbs: 18, proteins: 3.1, sodium: 0.119, iron: 0.003, calcium: 0.01 },
    { item: 'Moong Dal', cal: 236, fat: 2, carbs: 41, proteins: 16, sodium: 0.465, iron: 0.0032, calcium: 0.06 },
    { item: 'Mixed Vegetables', cal: 45, fat: 0.5, carbs: 9.7, proteins: 2.4, sodium: 0.043, iron: 0.0021, calcium: 0.022 },
    { item: 'Curd Rice', cal: 207, fat: 3.2, carbs: 38, proteins: 6.1, sodium: 0.167, iron: 0.0006, calcium: 0.272 },
    { item: 'Chicken Curry', cal: 243, fat: 11, carbs: 7.5, proteins: 28, sodium: 0.073, iron: 0.0008, calcium: 0.023 }
  ];

  public todayActivities = [];

  public profileStats = { name: 'John Watson', age: 24, location: 'Australia', weight: 65, height: 165, goal: 60, email: 'john.watson@gmail.com', weightMes: 'kg', goalMes: 'kg', heightMes: 'cm' };

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

  @ViewChild('menutimepicker')
  public menuTimePicker: TimePickerComponent;

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
    this.consumedCalories = 0;
    this.currentBreakFastMenu = [];
    this.currentBreakFastCalories = 0;
    this.currentBreakFastMenu = this.breakfastMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
    this.currentBreakFastMenuText = this.currentBreakFastMenu.map(function (elem) {
      return elem.item;
    }).join(", ");
    this.currentBreakFastCalories = this.currentBreakFastMenu.reduce((a, b) => +a + +b.cal, 0);
    this.currentTotalProteins = Number((this.currentTotalProteins + this.currentBreakFastMenu.reduce((a, b) => +a + +b.proteins, 0)).toFixed(2));
    this.currentTotalFat = Number((this.currentTotalFat + this.currentBreakFastMenu.reduce((a, b) => +a + +b.fat, 0)).toFixed(2));
    this.currentTotalCarbs = Number((this.currentTotalCarbs + this.currentBreakFastMenu.reduce((a, b) => +a + +b.carbs, 0)).toFixed(2));
    this.currentTotalCalcium = Number((this.currentTotalCalcium + this.currentBreakFastMenu.reduce((a, b) => +a + +b.calcium, 0)).toFixed(2));
    this.currentTotalIron = Number((this.currentTotalIron + this.currentBreakFastMenu.reduce((a, b) => +a + +b.iron, 0)).toFixed(2));
    this.currentTotalSodium = Number((this.currentTotalSodium + this.currentBreakFastMenu.reduce((a, b) => +a + +b.sodium, 0)).toFixed(2));
    this.consumedCalories += this.currentBreakFastCalories;
    this.isBreakFastMenuAdded = true;
    this.currentSnack1Menu = [];
    this.currentSnack1Calories = 0;
    this.currentSnack1Menu = this.snackMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
    this.currentSnack1MenuText = this.currentSnack1Menu.map(function (elem) {
      return elem.item;
    }).join(", ");
    this.currentSnack1Calories = this.currentSnack1Menu.reduce((a, b) => +a + +b.cal, 0);
    this.currentTotalProteins = Number((this.currentTotalProteins + this.currentSnack1Menu.reduce((a, b) => +a + +b.proteins, 0)).toFixed(2));
    this.currentTotalFat = Number((this.currentTotalFat + this.currentSnack1Menu.reduce((a, b) => +a + +b.fat, 0)).toFixed(2));
    this.currentTotalCarbs = Number((this.currentTotalCarbs + this.currentSnack1Menu.reduce((a, b) => +a + +b.carbs, 0)).toFixed(2));
    this.currentTotalCalcium = Number((this.currentTotalCalcium + this.currentSnack1Menu.reduce((a, b) => +a + +b.calcium, 0)).toFixed(2));
    this.currentTotalIron = Number((this.currentTotalIron + this.currentSnack1Menu.reduce((a, b) => +a + +b.iron, 0)).toFixed(2));
    this.currentTotalSodium = Number((this.currentTotalSodium + this.currentSnack1Menu.reduce((a, b) => +a + +b.sodium, 0)).toFixed(2));
    this.consumedCalories += this.currentSnack1Calories;
    this.isSnack1MenuAdded = true;
    this.currentLunchMenu = [];
    this.currentLunchCalories = 0;
    this.currentLunchMenu = this.lunchMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
    this.currentLunchMenuText = this.currentLunchMenu.map(function (elem) {
      return elem.item;
    }).join(", ");
    this.currentTotalProteins = Number((this.currentTotalProteins + this.currentLunchMenu.reduce((a, b) => +a + +b.proteins, 0)).toFixed(2));
    this.currentTotalFat = Number((this.currentTotalFat + this.currentLunchMenu.reduce((a, b) => +a + +b.fat, 0)).toFixed(2));
    this.currentTotalCarbs = Number((this.currentTotalCarbs + this.currentLunchMenu.reduce((a, b) => +a + +b.carbs, 0)).toFixed(2));
    this.currentTotalCalcium = Number((this.currentTotalCalcium + this.currentLunchMenu.reduce((a, b) => +a + +b.calcium, 0)).toFixed(2));
    this.currentTotalIron = Number((this.currentTotalIron + this.currentLunchMenu.reduce((a, b) => +a + +b.iron, 0)).toFixed(2));
    this.currentTotalSodium = Number((this.currentTotalSodium + this.currentLunchMenu.reduce((a, b) => +a + +b.sodium, 0)).toFixed(2));
    this.currentLunchCalories = this.currentLunchMenu.reduce((a, b) => +a + +b.cal, 0);
    this.consumedCalories += this.currentLunchCalories;
    this.isLunchMenuAdded = true;
    this.pieData = this.getPieChartData();
    this.todayActivities = this.getInitialData();
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

  getInitialData() {
    let data;
    if (this.masterData.length === 0) {
      let morningWalk = Math.round(Math.random() * (3000 - 1000) + 1000);
      let breakfastWaterTaken = Math.round(Math.random() * (5 - 2) + 2);
      let lunchWaterTaken = Math.round(Math.random() * (5 - 2) + 2);
      this.steps = morningWalk;
      this.consumedWaterCount = breakfastWaterTaken + lunchWaterTaken;
      this.consumedWaterAmount = this.consumedWaterCount * 150;
      this.heartRate = Math.round(Math.random() * (100 - 70) + 70);
      this.sleepInMinutes = Math.round(Math.random() * (480 - 300) + 300);
      data = {
        date: this.currentDate.toLocaleDateString(),
        activity: {
          steps: this.steps,
          heartRate: this.heartRate,
          calories: this.consumedCalories,
          sleep: this.sleepInMinutes,
          gridData: JSON.parse(JSON.stringify(this.gridData)),
          charDietData: JSON.parse(JSON.stringify(this.chartDietData)),
          chartWorkoutData: JSON.parse(JSON.stringify(this.chartData)),
          morningWalk: morningWalk
        },
        diet: {
          breakFastMenu: JSON.parse(JSON.stringify(this.currentBreakFastMenu)),
          breakFastCalories: this.currentBreakFastCalories,
          breakFastText: this.currentBreakFastMenuText,
          isBreakFastMenuAdded: this.isBreakFastMenuAdded,
          snack1Menu: JSON.parse(JSON.stringify(this.currentSnack1Menu)),
          snack1Calories: this.currentSnack1Calories,
          snack1Text: this.currentSnack1MenuText,
          isSnack1Added: this.isSnack1MenuAdded,
          lunchMenu: JSON.parse(JSON.stringify(this.currentLunchMenu)),
          lunchCalories: this.currentLunchCalories,
          lunchText: this.currentLunchMenuText,
          isLunchAdded: this.isLunchMenuAdded,
          consumedCalories: this.consumedCalories,
          burnedCalories: this.burnedCalories,
          breakfastWaterTaken: breakfastWaterTaken,
          lunchWaterTaken: lunchWaterTaken
        },
        fasting: {
          chartWeightData: this.weightChartData,
          consumedWaterCount: this.consumedWaterCount
        }
      };
      this.masterData.push(data);
    } else {
      data = this.masterData[0];
      this.steps = data.activity.steps;
      this.consumedWaterCount = data.fasting.consumedWaterCount;
      this.consumedWaterAmount = this.consumedWaterCount * 150;
      this.heartRate = data.activity.heartRate;
      this.sleepInMinutes = data.activity.sleep;
      this.sleepInHours = this.getSleepInHours(this.sleepInMinutes);
      this.consumedCalories = data.diet.consumedCalories;
      this.burnedCalories = data.diet.burnedCalories;
      this.gridData = data.activity.gridData;
      this.chartDietData = data.activity.charDietData;
      this.chartData = data.activity.chartWorkoutData;
      this.currentBreakFastMenu = data.diet.breakFastMenu;
      this.currentBreakFastCalories = data.diet.breakFastCalories;
      this.currentBreakFastMenuText = data.diet.breakFastText;
      this.isBreakFastMenuAdded = data.diet.isBreakFastMenuAdded;
      this.currentSnack1Menu = data.diet.snack1Menu;
      this.currentSnack1Calories = data.diet.snack1Calories;
      this.currentSnack1MenuText = data.diet.snack1Text;
      this.isSnack1MenuAdded = data.diet.isSnack1Added;
      this.currentLunchMenu = data.diet.lunchMenu;
      this.currentLunchCalories = data.diet.lunchCalories;
      this.currentLunchMenuText = data.diet.lunchText;
      this.isLunchMenuAdded = data.diet.isLunchAdded;
      this.weightChartData = data.fasting.chartWeightData;
    }
    let activities = [
      { activity: 'Morning Walk', duration: '30m', distance: (data.activity.morningWalk / 1312).toFixed(2) + 'km', percentage: ((data.activity.morningWalk / 6000) * 100).toFixed(2) + '%', time: '7:00 AM' },
      { activity: 'Water Taken', amount: data.diet.breakfastWaterTaken + ' Glasses', percentage: (((data.diet.breakfastWaterTaken * 150) / this.expectedWaterAmount) * 100).toFixed(2) + '%', time: '7:40 AM' },
      { activity: 'Breakfast', amount: data.diet.breakFastText, percentage: ((data.diet.breakFastCalories / this.expectedCalories) * 100).toFixed(2) + '%', time: '9:00 AM' },
      { activity: 'Snack', amount: data.diet.snack1Text, percentage: ((data.diet.snack1Calories / this.expectedCalories) * 100).toFixed(2) + '%', time: '11:00 AM' },
      { activity: 'Water Taken', amount: data.diet.lunchWaterTaken + ' Glasses', percentage: (((data.diet.lunchWaterTaken * 150) / this.expectedWaterAmount) * 100).toFixed(2) + '%', time: '12:00 PM' },
      { activity: 'Lunch', amount: data.diet.lunchText, percentage: ((data.diet.lunchCalories / this.expectedCalories) * 100).toFixed(2) + '%', time: '1:00 PM' },
    ];
    return activities;
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
  public trackThickness: number = 10;
  public progressThickness: number = 5;
  public progressHeight = this.isDevice ? '100px' : '120px';
  public progressColor = '#90EE90';
  public progressStartAngle = 240;
  public progressEndAngle = 120;
  public segmentCount: number = this.isDevice ? 30 : 50;
  public trackColor = '#FFFFFF';
  public activityChartHeight = '70%';
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

  public pieData: Object[] = this.getPieChartData();
  public pieLegendSettings: Object = {
    visible: false,
    position: 'Right',
    width: '60%', height: '20%',
    shapeHeight: 20, shapeWidth: 20
  };
  public pieChartWidth = '100%';
  public pieChartHeight = this.isDevice ? '80%' : '80%';
  public pieChartRadius = this.isDevice ? '90%' : '80%';
  public pieExplode = true;
  public center = this.isDevice ? { x: '50%', y: '50%' } : { x: '50%', y: '50%' };
  public dataLabel: Object = {
    visible: true,
    name: 'text',
    font: {
      fontWeight: '600',
      color: '#d4e1e9'
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
  public chartWidth: string = '100%';
  public gridWidth: string = '100%';
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
  public tooltip = { enable: true, shared: true, format: '${series.name} : ${point.x} : ${point.y}', textStyle: { fontFamily: 'Inter' }};
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
      color: '#E1E9ED',
      roundedCornerRadius: 15,
    },
    {
      start: 0,
      end: 100,
      radius: '100%',
      startWidth: 30,
      endWidth: 30,
      color: '#CDD9E0',
      roundedCornerRadius: 15,
      linearGradient: this.pointerRadialGradient,
    },
    {
      start: 2,
      end: 98,
      radius: '91%',
      startWidth: 5,
      endWidth: 5,
      roundedCornerRadius: 2,
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
    radius: '89%',
    angle: 60,
    content: '<div class="e-gauge-status-img icon-Diet"></div>'
  },
  {
    zIndex: '1',
    radius: '89%',
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
          height: 50,
          width: 50,
          roundedCornerRadius: 35,
          type: 'Bar',
          color: '#61a9f7',
        },
        {
          value: 8,
          width: 5,
          height: 5,
          offset: -60,
          markerType: 'Circle',
          color: '#87CEFA',
          opacity: Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100) > 8 ? 1 : 0
        },
        {
          value: 15,
          width: 4,
          height: 4,
          offset: -80,
          markerType: 'Circle',
          color: '#87CEFA',
          opacity: Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100) > 15 ? 1 : 0
        },
        {
          value: 21,
          width: 7,
          height: 7,
          offset: -75,
          markerType: 'Circle',
          color: '#87CEFA',
          opacity: Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100) > 21 ? 1 : 0
        },
        {
          value: 27,
          width: 8,
          height: 8,
          offset: -65,
          markerType: 'Circle',
          color: '#87CEFA',
          opacity: Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100) > 27 ? 1 : 0
        },
        {
          value: 37,
          width: 4,
          height: 4,
          offset: this.isDevice ? -85 : -55,
          markerType: 'Circle',
          color: '#87CEFA',
          opacity: Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100) > 37 ? 1 : 0
        },
        {
          value: 42,
          width: 6,
          height: 6,
          offset: -75,
          markerType: 'Circle',
          color: '#87CEFA',
          opacity: Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100) > 42 ? 1 : 0
        },
        {
          value: 48,
          width: 8,
          height: 8,
          offset: this.isDevice ? -80 : -58,
          markerType: 'Circle',
          color: '#87CEFA',
          opacity: Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100) > 48 ? 1 : 0
        },
        {
          value: 56,
          width: 5,
          height: 5,
          offset: -72,
          markerType: 'Circle',
          color: '#87CEFA',
          opacity: Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100) > 56 ? 1 : 0
        },
        {
          value: 64,
          width: 6,
          height: 6,
          offset: -79,
          markerType: 'Circle',
          color: '#87CEFA',
          opacity: Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100) > 64 ? 1 : 0
        },
        {
          value: 72,
          width: 8,
          height: 8,
          offset: this.isDevice ? -85 : -55,
          markerType: 'Circle',
          color: '#87CEFA',
          opacity: Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100) > 72 ? 1 : 0
        },
        {
          value: 80,
          width: 5,
          height: 5,
          offset: -70,
          markerType: 'Circle',
          color: '#87CEFA',
          opacity: Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100) > 80 ? 1 : 0
        },
        {
          value: 86,
          width: 6,
          height: 6,
          offset: -77,
          markerType: 'Circle',
          color: '#87CEFA',
          opacity: Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100) > 86 ? 1 : 0
        },
        {
          value: 94,
          width: 8,
          height: 8,
          offset: this.isDevice ? -80 : -54,
          markerType: 'Circle',
          color: '#87CEFA',
          opacity: Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100) > 94 ? 1 : 0
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
    roundedCornerRadius: 35,
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
  public weightGaugeCenterX = this.isDevice ? '50%' : '50%';
  public dateWidth: string = this.isDevice && this.innerWidth < 450 ? '100%' : '80%';
  public timeWidth: string = this.isDevice && this.innerWidth < 450 ? '100%' : '160px';
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
    height: 390,
    type: 'RoundedRectangle',
    backgroundColor: '#E1E9ED',
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
      maximum: 230,
      line: {
        offset: -60,
        color: '#7D96A6'
      },
      opposedPosition: true,
      majorTicks: {
        interval: 20,
        color: '#7D96A6'
      },
      minorTicks: {
        interval: 5,
        color: '#7D96A6'
      },
      pointers: [
        {
          type: 'Bar',
          value: this.profileStats.height,
          width: 80,
          linearGradient: this.heightGaugePointerLinearGradient,
        },
        {
          type: 'Bar',
          height: 390,
          width: 5,
          value: 230,
          color: '#7D96A6',
          offset: -25,
          roundedCornerRadius: 0
        }
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
      this.endFasting();
    } else if (this.circulargauge) {
      this.circulargauge.axes[0].ranges[1].end = percent;
      this.circulargauge.axes[0].annotations[1].angle = Math.round((percent / 100) * 340) + 10;
      if (percent > 80) {
        this.circulargauge.axes[0].annotations[1].content = '<div class="e-gauge-percent-img icon-Calories"></div>';
      } else {
        this.circulargauge.axes[0].annotations[1].content = '';
      }
      this.circulargauge.axes[0].annotations[0].content = '<div class="e-fast-ellapsed">Elapsed Time (' + percent + '%)</div><div class="e-fast-completed">' +
        this.sliderValue.toString() + '</div><div class="e-fast-left">Left ' + leftHours.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + 'h ' + leftMinutes.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + 'm</div>';
    }
  }

  endFasting() {
    clearInterval(this.x);
    this.sliderValue = "Completed";
    this.annotaions[0].content = '<div class="e-fast-ellapsed">Elapsed Time (100%)</div><div class="e-fast-completed">' +
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

  sliderChange() {
    this.weightGauge.axes[0].annotations[0].content = '<div class="e-weight-gauge-annotation">' +
      (this.weightSlider.value as number) + this.currentWtUnit + '</div>';
    this.weightGauge.axes[0].ranges[0].end = this.weightSlider.value as number;
    this.weightGauge.axes[0].pointers[0].value = this.weightSlider.value as number;
  }

  sliderHeightChange() {
    this.heightGauge.axes[0].pointers[0].value = this.heightSlider.value as number;
    (document.querySelectorAll('#height-svg')[0] as HTMLElement).style.height = ((this.heightSlider.value as number) * (this.currentHtUnit.toUpperCase() === 'CM' ? 1.7 : 52)) + 'px';
    (document.querySelector('.e-profile-height-label') as HTMLElement).innerHTML = (this.heightSlider.value as number) + '<span>' + ' ' + this.currentHtUnit + '</span>';
    (document.querySelector('.e-profile-height-label') as HTMLElement).style.bottom = (document.querySelectorAll('#height-svg')[0] as HTMLElement).style.height;
    (document.querySelector('.e-profile-height-label') as HTMLElement).style.left = ((this.heightSlider.value as number) * (this.currentHtUnit.toUpperCase() === 'CM' ? 0.1 : 3.5)) + 'px';
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
    this.updateWaterGaugePointer(percent);
  }

  plusClick() {
    if (this.consumedWaterCount < 20) {
      this.consumedWaterCount += 1;
      this.consumedWaterAmount = this.consumedWaterCount * 150;
      this.updateWaterGauge();
    }
  }

  updateWaterGauge() {
    let percent = Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100);
    let index = this.closestIndex(percent);
    let content = ['Poor', 'Good', 'Almost', 'Perfect!'];
    this.gauge.annotations[index].content = '<div class="e-water-annotation-text e-highlight-text">' + content[index] + '</div>';
    for (let i = 0; i < content.length; i++) {
      if (i !== index) {
        this.gauge.annotations[i].content = '<div class="e-water-annotation-text">' + content[i] + '</div>';
      }
    }
    this.updateWaterGaugePointer(percent);
  }

  updateWaterGaugePointer(percent) {
    let pointers: PointerModel[] = [
      {
        value: Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100),
        height: 50,
        width: 50,
        roundedCornerRadius: 35,
        type: 'Bar',
        color: '#61a9f7',
      },
      {
        value: 8,
        width: 5,
        height: 5,
        offset: -60,
        markerType: 'Circle',
        color: '#87CEFA',
        opacity: Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100) > 8 ? 1 : 0
      },
      {
        value: 15,
        width: 4,
        height: 4,
        offset: -80,
        markerType: 'Circle',
        color: '#87CEFA',
        opacity: Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100) > 15 ? 1 : 0
      },
      {
        value: 21,
        width: 7,
        height: 7,
        offset: -75,
        markerType: 'Circle',
        color: '#87CEFA',
        opacity: Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100) > 21 ? 1 : 0
      },
      {
        value: 27,
        width: 8,
        height: 8,
        offset: -65,
        markerType: 'Circle',
        color: '#87CEFA',
        opacity: Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100) > 27 ? 1 : 0
      },
      {
        value: 37,
        width: 4,
        height: 4,
        offset: this.isDevice ? -85 : -55,
        markerType: 'Circle',
        color: '#87CEFA',
        opacity: Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100) > 37 ? 1 : 0
      },
      {
        value: 42,
        width: 6,
        height: 6,
        offset: -75,
        markerType: 'Circle',
        color: '#87CEFA',
        opacity: Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100) > 42 ? 1 : 0
      },
      {
        value: 48,
        width: 8,
        height: 8,
        offset: this.isDevice ? -80 : -58,
        markerType: 'Circle',
        color: '#87CEFA',
        opacity: Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100) > 48 ? 1 : 0
      },
      {
        value: 56,
        width: 5,
        height: 5,
        offset: -72,
        markerType: 'Circle',
        color: '#87CEFA',
        opacity: Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100) > 56 ? 1 : 0
      },
      {
        value: 64,
        width: 6,
        height: 6,
        offset: -79,
        markerType: 'Circle',
        color: '#87CEFA',
        opacity: Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100) > 64 ? 1 : 0
      },
      {
        value: 72,
        width: 8,
        height: 8,
        offset: this.isDevice ? -85 : -55,
        markerType: 'Circle',
        color: '#87CEFA',
        opacity: Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100) > 72 ? 1 : 0
      },
      {
        value: 80,
        width: 5,
        height: 5,
        offset: -70,
        markerType: 'Circle',
        color: '#87CEFA',
        opacity: Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100) > 80 ? 1 : 0
      },
      {
        value: 86,
        width: 6,
        height: 6,
        offset: -77,
        markerType: 'Circle',
        color: '#87CEFA',
        opacity: Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100) > 86 ? 1 : 0
      },
      {
        value: 94,
        width: 8,
        height: 8,
        offset: this.isDevice ? -80 : -54,
        markerType: 'Circle',
        color: '#87CEFA',
        opacity: Math.round((this.consumedWaterAmount / this.expectedWaterAmount) * 100) > 94 ? 1 : 0
      },
    ];
    this.gauge.axes[0].pointers = pointers;
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
      this.currentBreakFastMenuText = this.currentBreakFastMenu.map(function (elem) {
        return elem.item;
      }).join(", ");
      this.currentBreakFastCalories = this.currentTotalCal;
      this.consumedCalories += this.currentBreakFastCalories;
      this.isBreakFastMenuAdded = true;
      let activity = { activity: 'Breakfast', amount: this.currentBreakFastMenuText, percentage: ((this.currentBreakFastCalories / this.expectedCalories) * 100).toFixed(2) + '%', time: this.menuTimePicker.value.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) };
      this.todayActivities.push(activity);
    } else if (this.currentAddedMenu === 'Snack 1') {
      this.currentSnack1Menu = [];
      this.currentSnack1Calories = 0;
      this.currentSnack1Menu = this.currentMenu.filter(function (item) {
        return item.isAdded;
      });
      this.currentSnack1MenuText = this.currentSnack1Menu.map(function (elem) {
        return elem.item;
      }).join(", ");
      this.currentSnack1Calories = this.currentTotalCal;
      this.consumedCalories += this.currentSnack1Calories;
      this.isSnack1MenuAdded = true;
      let activity = { activity: 'Snack', amount: this.currentSnack1MenuText, percentage: ((this.currentSnack1Calories / this.expectedCalories) * 100).toFixed(2) + '%', time: this.menuTimePicker.value.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) };
      this.todayActivities.push(activity);
    } else if (this.currentAddedMenu === 'Lunch') {
      this.currentLunchMenu = [];
      this.currentLunchCalories = 0;
      this.currentLunchMenu = this.currentMenu.filter(function (item) {
        return item.isAdded;
      });
      this.currentLunchMenuText = this.currentLunchMenu.map(function (elem) {
        return elem.item;
      }).join(", ");
      this.currentLunchCalories = this.currentTotalCal;
      this.consumedCalories += this.currentLunchCalories;
      this.isLunchMenuAdded = true;
      let activity = { activity: 'Lunch', amount: this.currentLunchMenuText, percentage: ((this.currentLunchCalories / this.expectedCalories) * 100).toFixed(2) + '%', time: this.menuTimePicker.value.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) };
      this.todayActivities.push(activity);
    } else if (this.currentAddedMenu === 'Snack 2') {
      this.currentSnack2Menu = [];
      this.currentSnack2Calories = 0;
      this.currentSnack2Menu = this.currentMenu.filter(function (item) {
        return item.isAdded;
      });
      this.currentSnack2MenuText = this.currentSnack2Menu.map(function (elem) {
        return elem.item;
      }).join(", ");
      this.currentSnack2Calories = this.currentTotalCal;
      this.consumedCalories += this.currentSnack2Calories;
      this.isSnack2MenuAdded = true;
      let activity = { activity: 'Snack', amount: this.currentSnack2MenuText, percentage: ((this.currentSnack2Calories / this.expectedCalories) * 100).toFixed(2) + '%', time: this.menuTimePicker.value.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) };
      this.todayActivities.push(activity);
    } else if (this.currentAddedMenu === 'Dinner') {
      this.currentDinnerMenu = [];
      this.currentDinnerCalories = 0;
      this.currentDinnerMenu = this.currentMenu.filter(function (item) {
        return item.isAdded;
      });
      this.currentDinnerMenuText = this.currentDinnerMenu.map(function (elem) {
        return elem.item;
      }).join(", ");
      this.currentDinnerCalories = this.currentTotalCal;
      this.consumedCalories += this.currentDinnerCalories;
      this.isDinnerMenuAdded = true;
      let activity = { activity: 'Dinner', amount: this.currentDinnerMenuText, percentage: ((this.currentDinnerCalories / this.expectedCalories) * 100).toFixed(2) + '%', time: this.menuTimePicker.value.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) };
      this.todayActivities.push(activity);
    }
    for (var i = 0; i < this.currentMenu.length; i++) {
      if (this.currentMenu[i].isAdded) {
        this.currentTotalProteins = Number((this.currentTotalProteins + (this.currentMenu[i].proteins * this.currentMenu[i].quantity)).toFixed(2));
        this.currentTotalFat = Number((this.currentTotalFat + (this.currentMenu[i].fat * this.currentMenu[i].quantity)).toFixed(2));
        this.currentTotalCarbs = Number((this.currentTotalCarbs + (this.currentMenu[i].carbs * this.currentMenu[i].quantity)).toFixed(2));
        this.currentTotalCalcium = Number((this.currentTotalCalcium + (this.currentMenu[i].calcium * this.currentMenu[i].quantity)).toFixed(2));
        this.currentTotalIron = Number((this.currentTotalIron + (this.currentMenu[i].iron * this.currentMenu[i].quantity)).toFixed(2));
        this.currentTotalSodium = Number((this.currentTotalSodium + (this.currentMenu[i].sodium * this.currentMenu[i].quantity)).toFixed(2));
      }
    }
    this.pieData = this.getPieChartData();
    this.menuCancelBtnClick();
  }

  menuCancelBtnClick() {
    this.menuDialog.hide();
    this.currentTotalCal = 0;
    this.lastSelectItem = '';
    this.currentQuantity = 1;
  }

  created() {
    let iconDiv = document.createElement('div');
    iconDiv.className = 'e-tab-header-icon-div';
    let iconSpan = document.createElement('span');
    iconSpan.className = 'e-tab-header-icon icon-Logo';
    iconDiv.appendChild(iconSpan);
    let titleDiv = document.createElement('div');
    titleDiv.className = 'e-tab-title';
    titleDiv.innerHTML = 'GO<span>FIT</span>';
    let containerDiv = document.createElement('div');
    containerDiv.className = 'e-tab-header-icon-container';
    containerDiv.appendChild(iconDiv);
    containerDiv.appendChild(titleDiv);
    this.tabInstance.element.querySelector('.e-tab-header').prepend(containerDiv);
    setTimeout(() => {
      this.tabInstance.refreshActiveTabBorder();
    }, 50);
  }

  addBtnClick(args) {
    if (args.currentTarget.classList.contains('e-breakfast-add-btn')) {
      this.currentMenuHeader = " Add Breakfast Menu";
      this.currentMenu = JSON.parse(JSON.stringify(this.breakfastMenu));
      this.currentRecom = this.breakFastRecom;
      this.currentAddedMenu = 'Breakfast';
    } else if (args.currentTarget.classList.contains('e-snack1-add-btn') || args.currentTarget.classList.contains('e-snack2-add-btn')) {
      this.currentMenuHeader = "Add Snack Menu";
      this.currentMenu = JSON.parse(JSON.stringify(this.snackMenu));
      if (args.currentTarget.classList.contains('e-snack1-add-btn')) {
        this.currentRecom = this.snack1Recom;
        this.currentAddedMenu = 'Snack 1';
      } else {
        this.currentRecom = this.snack2Recom;
        this.currentAddedMenu = 'Snack 2';
      }
    } else if (args.currentTarget.classList.contains('e-lunch-add-btn')) {
      this.currentMenuHeader = "Add Lunch Menu";
      this.currentMenu = JSON.parse(JSON.stringify(this.lunchMenu));
      this.currentRecom = this.lunchRecom;
      this.currentAddedMenu = 'Lunch';
    } else if (args.currentTarget.classList.contains('e-dinner-add-btn')) {
      this.currentMenuHeader = "Add Dinner Menu";
      this.currentMenu = JSON.parse(JSON.stringify(this.lunchMenu));
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
    this.currentBreakFastMenuText = this.currentBreakFastMenu.map(function (elem) {
      return elem.item;
    }).join(", ");
    this.currentTotalProteins = Number((this.currentTotalProteins + this.currentBreakFastMenu.reduce((a, b) => +a + +b.proteins, 0)).toFixed(2));
    this.currentTotalFat = Number((this.currentTotalFat + this.currentBreakFastMenu.reduce((a, b) => +a + +b.fat, 0)).toFixed(2));
    this.currentTotalCarbs = Number((this.currentTotalCarbs + this.currentBreakFastMenu.reduce((a, b) => +a + +b.carbs, 0)).toFixed(2));
    this.currentTotalCalcium = Number((this.currentTotalCalcium + this.currentBreakFastMenu.reduce((a, b) => +a + +b.calcium, 0)).toFixed(2));
    this.currentTotalIron = Number((this.currentTotalIron + this.currentBreakFastMenu.reduce((a, b) => +a + +b.iron, 0)).toFixed(2));
    this.currentTotalSodium = Number((this.currentTotalSodium + this.currentBreakFastMenu.reduce((a, b) => +a + +b.sodium, 0)).toFixed(2));
    this.currentBreakFastCalories = this.currentBreakFastMenu.reduce((a, b) => +a + +b.cal, 0);
    this.consumedCalories += this.currentBreakFastCalories;
    this.isBreakFastMenuAdded = true;
    this.currentSnack1Menu = [];
    this.currentSnack1Calories = 0;
    this.currentSnack1Menu = this.snackMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
    this.currentSnack1MenuText = this.currentSnack1Menu.map(function (elem) {
      return elem.item;
    }).join(", ");
    this.currentTotalProteins = Number((this.currentTotalProteins + this.currentSnack1Menu.reduce((a, b) => +a + +b.proteins, 0)).toFixed(2));
    this.currentTotalFat = Number((this.currentTotalFat + this.currentSnack1Menu.reduce((a, b) => +a + +b.fat, 0)).toFixed(2));
    this.currentTotalCarbs = Number((this.currentTotalCarbs + this.currentSnack1Menu.reduce((a, b) => +a + +b.carbs, 0)).toFixed(2));
    this.currentTotalCalcium = Number((this.currentTotalCalcium + this.currentSnack1Menu.reduce((a, b) => +a + +b.calcium, 0)).toFixed(2));
    this.currentTotalIron = Number((this.currentTotalIron + this.currentSnack1Menu.reduce((a, b) => +a + +b.iron, 0)).toFixed(2));
    this.currentTotalSodium = Number((this.currentTotalSodium + this.currentSnack1Menu.reduce((a, b) => +a + +b.sodium, 0)).toFixed(2));
    this.currentSnack1Calories = this.currentSnack1Menu.reduce((a, b) => +a + +b.cal, 0);
    this.consumedCalories += this.currentSnack1Calories;
    this.isSnack1MenuAdded = true;
    this.currentLunchMenu = [];
    this.currentLunchCalories = 0;
    this.currentLunchMenu = this.lunchMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
    this.currentLunchMenuText = this.currentLunchMenu.map(function (elem) {
      return elem.item;
    }).join(", ");
    this.currentTotalProteins = Number((this.currentTotalProteins + this.currentLunchMenu.reduce((a, b) => +a + +b.proteins, 0)).toFixed(2));
    this.currentTotalFat = Number((this.currentTotalFat + this.currentLunchMenu.reduce((a, b) => +a + +b.fat, 0)).toFixed(2));
    this.currentTotalCarbs = Number((this.currentTotalCarbs + this.currentLunchMenu.reduce((a, b) => +a + +b.carbs, 0)).toFixed(2));
    this.currentTotalCalcium = Number((this.currentTotalCalcium + this.currentLunchMenu.reduce((a, b) => +a + +b.calcium, 0)).toFixed(2));
    this.currentTotalIron = Number((this.currentTotalIron + this.currentLunchMenu.reduce((a, b) => +a + +b.iron, 0)).toFixed(2));
    this.currentTotalSodium = Number((this.currentTotalSodium + this.currentLunchMenu.reduce((a, b) => +a + +b.sodium, 0)).toFixed(2));
    this.currentLunchCalories = this.currentLunchMenu.reduce((a, b) => +a + +b.cal, 0);
    this.consumedCalories += this.currentLunchCalories;
    this.isLunchMenuAdded = true;
    this.currentSnack2Menu = [];
    this.currentSnack2Calories = 0;
    this.currentSnack2Menu = this.snackMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
    this.currentSnack2MenuText = this.currentSnack2Menu.map(function (elem) {
      return elem.item;
    }).join(", ");
    this.currentTotalProteins = Number((this.currentTotalProteins + this.currentSnack2Menu.reduce((a, b) => +a + +b.proteins, 0)).toFixed(2));
    this.currentTotalFat = Number((this.currentTotalFat + this.currentSnack2Menu.reduce((a, b) => +a + +b.fat, 0)).toFixed(2));
    this.currentTotalCarbs = Number((this.currentTotalCarbs + this.currentSnack2Menu.reduce((a, b) => +a + +b.carbs, 0)).toFixed(2));
    this.currentTotalCalcium = Number((this.currentTotalCalcium + this.currentSnack2Menu.reduce((a, b) => +a + +b.calcium, 0)).toFixed(2));
    this.currentTotalIron = Number((this.currentTotalIron + this.currentSnack2Menu.reduce((a, b) => +a + +b.iron, 0)).toFixed(2));
    this.currentTotalSodium = Number((this.currentTotalSodium + this.currentSnack2Menu.reduce((a, b) => +a + +b.sodium, 0)).toFixed(2));
    this.currentSnack2Calories = this.currentSnack2Menu.reduce((a, b) => +a + +b.cal, 0);
    this.consumedCalories += this.currentSnack2Calories;
    this.isSnack2MenuAdded = true;
    this.currentDinnerMenu = [];
    this.currentDinnerCalories = 0;
    this.currentDinnerMenu = this.lunchMenu.sort(() => Math.random() - Math.random()).slice(0, 3);
    this.currentDinnerMenuText = this.currentDinnerMenu.map(function (elem) {
      return elem.item;
    }).join(", ");
    this.currentTotalProteins = Number((this.currentTotalProteins + this.currentDinnerMenu.reduce((a, b) => +a + +b.proteins, 0)).toFixed(2));
    this.currentTotalFat = Number((this.currentTotalFat + this.currentDinnerMenu.reduce((a, b) => +a + +b.fat, 0)).toFixed(2));
    this.currentTotalCarbs = Number((this.currentTotalCarbs + this.currentDinnerMenu.reduce((a, b) => +a + +b.carbs, 0)).toFixed(2));
    this.currentTotalCalcium = Number((this.currentTotalCalcium + this.currentDinnerMenu.reduce((a, b) => +a + +b.calcium, 0)).toFixed(2));
    this.currentTotalIron = Number((this.currentTotalIron + this.currentDinnerMenu.reduce((a, b) => +a + +b.iron, 0)).toFixed(2));
    this.currentTotalSodium = Number((this.currentTotalSodium + this.currentDinnerMenu.reduce((a, b) => +a + +b.sodium, 0)).toFixed(2));
    this.currentDinnerCalories = this.currentDinnerMenu.reduce((a, b) => +a + +b.cal, 0);
    this.consumedCalories += this.currentDinnerCalories;
    this.isDinnerMenuAdded = true;
    this.pieData = this.getPieChartData();
  }



  updateComponents() {
    let isToday = this.currentDate.getDate() === new Date().getDate() && this.currentDate.getMonth() === new Date().getMonth() && this.currentDate.getFullYear() === new Date().getFullYear();
    if (!isToday) {
      this.updateMenu();
      let morningWalk = Math.round(Math.random() * (3000 - 1000) + 1000);
      let eveningWalk = Math.round(Math.random() * (3000 - 1000) + 1000);
      let breakfastWaterTaken = Math.round(Math.random() * (5 - 2) + 2);
      let brunchWaterTaken = Math.round(Math.random() * (5 - 2) + 2);
      let lunchWaterTaken = Math.round(Math.random() * (5 - 2) + 2);
      let eveningWaterTaken = Math.round(Math.random() * (5 - 2) + 2);
      this.steps = morningWalk + eveningWalk;
      this.heartRate = Math.round(Math.random() * (100 - 70) + 70);
      this.sleepInMinutes = Math.round(Math.random() * (480 - 300) + 300);
      this.sleepInHours = this.getSleepInHours(this.sleepInMinutes);
      this.consumedWaterCount = breakfastWaterTaken + brunchWaterTaken + lunchWaterTaken + eveningWaterTaken;
      this.consumedWaterAmount = this.consumedWaterCount * 150;
      if (this.gauge) {
        this.updateWaterGauge();
      }
      if (this.circulargauge) {
        this.endFasting();
      }
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
      this.weightChartData = this.getWeightChartData();
      if (this.weightChartInstance) {
        this.weightChartInstance.series[0].dataSource = this.weightChartData;
      }
      this.todayActivities = [
        { activity: 'Morning Walk', duration: '30m', distance: (morningWalk / 1312).toFixed(2) + 'km', percentage: ((morningWalk / 6000) * 100).toFixed(2) + '%', time: '7:00 AM' },
        { activity: 'Water Taken', amount: breakfastWaterTaken + ' Glasses', percentage: (((breakfastWaterTaken * 150) / this.expectedWaterAmount) * 100).toFixed(2) + '%', time: '7:40 AM' },
        { activity: 'Breakfast', amount: this.currentBreakFastMenuText, percentage: ((this.currentBreakFastCalories / this.expectedCalories) * 100).toFixed(2) + '%', time: '9:00 AM' },
        { activity: 'Snack', amount: this.currentSnack1MenuText, percentage: ((this.currentSnack1Calories / this.expectedCalories) * 100).toFixed(2) + '%', time: '11:00 AM' },
        { activity: 'Water Taken', amount: lunchWaterTaken + ' Glasses', percentage: (((lunchWaterTaken * 150) / this.expectedWaterAmount) * 100).toFixed(2) + '%', time: '12:00 PM' },
        { activity: 'Lunch', amount: this.currentLunchMenuText, percentage: ((this.currentLunchCalories / this.expectedCalories) * 100).toFixed(2) + '%', time: '1:00 PM' },
        { activity: 'Snack', amount: this.currentSnack2MenuText, percentage: ((this.currentSnack2Calories / this.expectedCalories) * 100).toFixed(2) + '%', time: '3:00 PM' },
        { activity: 'Water Taken', amount: eveningWaterTaken + ' Glasses', percentage: (((eveningWaterTaken * 150) / this.expectedWaterAmount) * 100).toFixed(2) + '%', time: '4:00 PM' },
        { activity: 'Evening Walk', duration: '30m', distance: (eveningWalk / 1312).toFixed(2) + 'km', percentage: ((eveningWalk / 6000) * 100).toFixed(2) + '%', time: '5:30 PM' },
        { activity: 'Dinner', amount: this.currentDinnerMenuText, percentage: ((this.currentDinnerCalories / this.expectedCalories) * 100).toFixed(2) + '%', time: '8:00 PM' }
      ];
    } else {
      this.consumedCalories = 0;
      this.isBreakFastMenuAdded = false;
      this.isSnack1MenuAdded = false;
      this.isLunchMenuAdded = false;
      this.isSnack2MenuAdded = false;
      this.isDinnerMenuAdded = false;
      this.todayActivities = this.getInitialData();
      this.countStartDate = new Date().getHours() >= 17 ? new Date(new Date().setHours(18, 0, 0, 0)) : new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(18, 0, 0, 0));
      this.countDownDate = new Date().getHours() >= 17 ? new Date(new Date().setHours(this.countStartDate.getHours() + 16, 0, 0, 0)) : new Date(new Date(new Date().setDate(this.countStartDate.getDate())).setHours(this.countStartDate.getHours() + 16, 0, 0, 0));
      this.diff = 16;
      this.minimumDate = new Date(new Date().setHours(0, 0, 0));
      this.maximumDate = new Date(new Date().setHours(this.minimumDate.getHours() + 24, 0, 0));
      clearInterval(this.x);
      this.x = setInterval(this.intervalFn.bind(this), 1000);
      if (this.gauge) {
        this.updateWaterGauge();
      }
    }
    this.disableElements();
  }

  disableElements() {
    let isToday = this.currentDate.getDate() === new Date().getDate() && this.currentDate.getMonth() === new Date().getMonth() && this.currentDate.getFullYear() === new Date().getFullYear();
    if (!isToday) {
      if (document.querySelector('.e-fast-time-btn')) {
        (document.querySelector('.e-fast-time-btn') as HTMLElement).style.pointerEvents = 'none';
      }
      if (document.querySelector('.e-fast-end-btn')) {
        (document.querySelector('.e-fast-end-btn') as HTMLElement).style.pointerEvents = 'none';
      }
      if (document.querySelector('.e-water-minus')) {
        (document.querySelector('.e-water-minus') as HTMLElement).style.pointerEvents = 'none';
      }
      if (document.querySelector('.e-water-plus')) {
        (document.querySelector('.e-water-plus') as HTMLElement).style.pointerEvents = 'none';
      }
      if (this.circulargauge) {
        this.endFasting();
      }
    } else {
      if (document.querySelector('.e-fast-time-btn')) {
        (document.querySelector('.e-fast-time-btn') as HTMLElement).style.pointerEvents = '';
      }
      if (document.querySelector('.e-fast-end-btn')) {
        (document.querySelector('.e-fast-end-btn') as HTMLElement).style.pointerEvents = 'auto';
      }
      if (document.querySelector('.e-water-minus')) {
        (document.querySelector('.e-water-minus') as HTMLElement).style.pointerEvents = 'auto';
      }
      if (document.querySelector('.e-water-plus')) {
        (document.querySelector('.e-water-plus') as HTMLElement).style.pointerEvents = 'auto';
      }
    }
  }

  quantityMinusClick() {
    this.currentQuantity = this.currentQuantity > 1 ? (this.currentQuantity - 1) : 1;
    for (var i = 0; i < this.currentMenu.length; i++) {
      if (this.currentMenu[i].item === this.lastSelectItem) {
        this.currentMenu[i].quantity = this.currentQuantity;
      }
    }
    this.updateTotalCal();
  }

  quantityPlusClick() {
    this.currentQuantity += 1;
    for (var i = 0; i < this.currentMenu.length; i++) {
      if (this.currentMenu[i].item === this.lastSelectItem) {
        this.currentMenu[i].quantity = this.currentQuantity;
      }
    }
    this.updateTotalCal();
  }

  updateTotalCal() {
    this.currentTotalCal = 0;
    for (var i = 0; i < this.currentMenu.length; i++) {
      if (this.currentMenu[i].isAdded) {
        this.currentTotalCal += (this.currentMenu[i].cal * this.currentMenu[i].quantity);
      }
    }
  }

  ageMinusClick() {
    this.profileStats.age = this.profileStats.age > 0 ? (this.profileStats.age - 1) : 0;
  }

  agePlusClick() {
    if (this.profileStats.age < 100) {
      this.profileStats.age += 1;
    }
  }

  onMenuCardSelect(args) {
    this.currentQuantity = 1;
    args.currentTarget.classList.toggle('e-card-select');
    if (args.currentTarget.classList.contains('e-card-select')) {
      this.lastSelectItem = args.currentTarget.innerText;
    } else {
      this.lastSelectItem = '';
    }
    for (var i = 0; i < this.currentMenu.length; i++) {
      if (this.currentMenu[i].item === args.currentTarget.innerText) {
        if (args.currentTarget.classList.contains('e-card-select')) {
          this.currentMenu[i].isAdded = true;
          this.currentMenu[i].quantity = this.currentQuantity;
        } else {
          this.currentMenu[i].isAdded = false;
          this.currentMenu[i].quantity = 0;
        }
      }
    }
    this.updateTotalCal();
  }

  changeHeight() {
    if (document.querySelector('.e-weight-text') && document.querySelector('.e-weight-text').classList.contains('e-edit-color')) {
      document.querySelector('.e-weight-text').classList.remove('e-edit-color');
    }
    if (document.querySelector('.e-goal-text') && document.querySelector('.e-goal-text').classList.contains('e-edit-color')) {
      document.querySelector('.e-goal-text').classList.remove('e-edit-color');
    }
    if (document.querySelector('.e-height-text') && !document.querySelector('.e-height-text').classList.contains('e-edit-color')) {
      document.querySelector('.e-height-text').classList.add('e-edit-color');
    }
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
    if (this.editDialog.element.querySelector('.e-weight-modify-btn-group') && !this.editDialog.element.querySelector('.e-weight-modify-btn-group').classList.contains('e-hidden')) {
      this.editDialog.element.querySelector('.e-weight-modify-btn-group').classList.add('e-hidden');
    }
    if (this.editDialog.element.querySelector('.e-height-modify-btn-group') && this.editDialog.element.querySelector('.e-height-modify-btn-group').classList.contains('e-hidden')) {
      this.editDialog.element.querySelector('.e-height-modify-btn-group').classList.remove('e-hidden');
    }
    this.updateHeightGauge();
    this.sliderHeightChange();
    this.heightSlider.refresh();
    if (this.profileStats.heightMes.toUpperCase() === 'CM' && document.querySelector('.e-height-modify-btn-group #CM')) {
      (document.querySelector('.e-height-modify-btn-group #CM') as HTMLInputElement).checked = true;
    } else if (document.querySelector('.e-height-modify-btn-group #CM')) {
      (document.querySelector('.e-height-modify-btn-group #FT') as HTMLInputElement).checked = true;
    }
  }

  changeWeight() {
    if (document.querySelector('.e-weight-text') && !document.querySelector('.e-weight-text').classList.contains('e-edit-color')) {
      document.querySelector('.e-weight-text').classList.add('e-edit-color');
    }
    if (document.querySelector('.e-goal-text') && document.querySelector('.e-goal-text').classList.contains('e-edit-color')) {
      document.querySelector('.e-goal-text').classList.remove('e-edit-color');
    }
    if (document.querySelector('.e-height-text') && document.querySelector('.e-height-text').classList.contains('e-edit-color')) {
      document.querySelector('.e-height-text').classList.remove('e-edit-color');
    }
    this.currentWtUnit = this.profileStats.weightMes.toUpperCase();
    this.isGoalEdit = false;
    this.showWeight();
    this.updateWeightGauge(false);
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
    if (this.editDialog.element.querySelector('.e-height-modify-btn-group') && !this.editDialog.element.querySelector('.e-height-modify-btn-group').classList.contains('e-hidden')) {
      this.editDialog.element.querySelector('.e-height-modify-btn-group').classList.add('e-hidden');
    }
    if (this.editDialog.element.querySelector('.e-weight-modify-btn-group') && this.editDialog.element.querySelector('.e-weight-modify-btn-group').classList.contains('e-hidden')) {
      this.editDialog.element.querySelector('.e-weight-modify-btn-group').classList.remove('e-hidden');
    }
    this.weightSlider.refresh();
    if (!this.isGoalEdit) {
      if (this.profileStats.weightMes.toUpperCase() === 'KG' && document.querySelector('.e-weight-modify-btn-group #KG')) {
        (document.querySelector('.e-weight-modify-btn-group #KG') as HTMLInputElement).checked = true;
      } else if (document.querySelector('.e-weight-modify-btn-group #LB')) {
        (document.querySelector('.e-weight-modify-btn-group #LB') as HTMLInputElement).checked = true;
      }
    } else {
      if (this.profileStats.goalMes.toUpperCase() === 'KG' && document.querySelector('.e-weight-modify-btn-group #KG')) {
        (document.querySelector('.e-weight-modify-btn-group #KG') as HTMLInputElement).checked = true;
      } else if (document.querySelector('.e-weight-modify-btn-group #LB')) {
        (document.querySelector('.e-weight-modify-btn-group #LB') as HTMLInputElement).checked = true;
      }
    }
  }

  changeGoal() {
    if (document.querySelector('.e-weight-text') && document.querySelector('.e-weight-text').classList.contains('e-edit-color')) {
      document.querySelector('.e-weight-text').classList.remove('e-edit-color');
    }
    if (document.querySelector('.e-goal-text') && !document.querySelector('.e-goal-text').classList.contains('e-edit-color')) {
      document.querySelector('.e-goal-text').classList.add('e-edit-color');
    }
    if (document.querySelector('.e-height-text') && document.querySelector('.e-height-text').classList.contains('e-edit-color')) {
      document.querySelector('.e-height-text').classList.remove('e-edit-color');
    }
    this.currentWtUnit = this.profileStats.goalMes.toUpperCase();
    this.isGoalEdit = true;
    this.showWeight();
    this.updateWeightGauge(true);
  }

  cancelWeight() {
    this.isGoalEdit = false;
    this.cancelHeight();
  }

  updateWeight() {
    if (this.isGoalEdit) {
      this.profileStats.goalMes = this.currentWtUnit.toLowerCase();
      this.profileStats.goal = this.weightGauge.axes[0].pointers[0].value;
    } else {
      this.profileStats.weightMes = this.currentWtUnit.toLowerCase();
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
    this.profileStats.heightMes = this.currentHtUnit.toLowerCase();
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
    if (this.gauge) {
      this.updateWaterGauge();
    }
    this.disableElements();
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
    this.currentDate = args.value;
    this.updateComponents();
  }

  onProfileDateChange(args) {
    this.currentDate = args.value;
    this.updateComponents();
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
      this.humanImg = 'LightHuman';
      this.chartBackGround = '#FFFFFF';
      this.weightGaugeBackground = '#FFF7EC';
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
      if (this.circulargauge) {
        this.circulargauge.axes[0].ranges[0].color = '#E1E9ED';
        this.circulargauge.axes[0].ranges[1].color = '#CDD9E0';
        this.circulargauge.refresh();
      }
      if (this.weightGauge) {
        this.weightGauge.refresh();
      }
      if (this.heightGauge) {
        this.heightGauge.refresh();
      }
    } else if (this.currrentTheme === 'Dark') {
      (findlink as any).href = "./assets/styles-dark.css";
      if (!document.body.classList.contains('e-dark')) {
        document.body.classList.add('e-dark');
      }
      this.theme = 'TailwindDark';
      this.humanImg = 'DarkHuman';
      this.chartBackGround = '#26273B';
      this.weightGaugeBackground = '#414255';
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
      if (this.circulargauge) {
        this.circulargauge.axes[0].ranges[0].color = '#444660';
        this.circulargauge.axes[0].ranges[1].color = '#7C7E96';
        this.circulargauge.refresh();
      }
      if (this.weightGauge) {
        this.weightGauge.refresh();
      }
      if (this.heightGauge) {
        this.heightGauge.refresh();
      }
    }
  }

  handleChange(args) {
    let unit = args.currentTarget.value;
    if (['KG', 'LB'].includes(unit) && this.currentWtUnit !== unit) {
      this.currentWtUnit = unit;
      this.weightGauge.axes[0].maximum = unit === 'KG' ? 150 : 330;
      this.weightSlider.max = unit === 'KG' ? 150 : 330;
      this.weightSlider.limits.minStart = unit === 'KG' ? 10 : 20;
      let value = unit === 'KG' ? Math.round(this.weightSlider.value as number / 2.205) : Math.round(this.weightSlider.value as number * 2.205);
      this.weightGauge.axes[0].annotations[0].content = '<div class="e-weight-gauge-annotation">' +
        value + this.currentWtUnit + '</div>';
      this.weightGauge.axes[0].ranges[0].end = value;
      this.weightGauge.axes[0].pointers[0].value = value;
      this.weightSlider.value = value;
    } else if (['CM', 'FT'].includes(unit) && this.currentHtUnit !== unit) {
      this.currentHtUnit = unit;
      this.heightGauge.axes[0].maximum = unit === 'CM' ? 230 : 7.5;
      this.heightSlider.max = unit === 'CM' ? 230 : 7.5;
      this.heightSlider.limits.minStart = unit === 'CM' ? 30 : 1;
      this.heightSlider.step = unit === 'CM' ? 1 : 0.1;
      this.heightSlider.ticks.format = unit === 'CM' ? 'N0' : '#.00';
      let value = unit === 'CM' ? Math.round(this.heightSlider.value as number * 30.48) : Number((this.heightSlider.value as number / 30.48).toFixed(2));
      this.heightGauge.annotations[0].axisValue = value;
      this.heightGauge.annotations[0].content = '<div class="e-height-gauge-annotation">' + value + this.currentHtUnit + '</div>';
      this.heightGauge.axes[0].pointers[0].value = value;
      this.heightGauge.axes[0].majorTicks.interval = unit === 'CM' ? 20 : 1;
      this.heightGauge.axes[0].minorTicks.interval = unit === 'CM' ? 5 : 0.1;
      (document.querySelectorAll('#height-svg')[0] as HTMLElement).style.height = (value * (unit === 'CM' ? 1.7 : 52)) + 'px';
      this.heightSlider.value = value;
    }
  }

  updateWeightGauge(isGoal) {
    this.currentWtUnit = isGoal ? this.profileStats.goalMes.toUpperCase() : this.profileStats.weightMes.toUpperCase();
    let value = isGoal ? this.profileStats.goal as number : this.profileStats.weight as number;
    this.weightGauge.axes[0].maximum = this.currentWtUnit === 'KG' ? 150 : 330;
    this.weightSlider.max = this.currentWtUnit === 'KG' ? 150 : 330;
    this.weightGauge.axes[0].annotations[0].content = '<div class="e-weight-gauge-annotation">' + value
      + this.currentWtUnit + '</div>';
    this.weightGauge.axes[0].ranges[0].end = value;
    this.weightGauge.axes[0].pointers[0].value = value;
    this.weightSlider.value = value;
  }

  updateHeightGauge() {
    this.currentHtUnit = this.profileStats.heightMes.toUpperCase();
    this.heightGauge.axes[0].maximum = this.currentHtUnit === 'CM' ? 230 : 7.5;
    this.heightSlider.max = this.currentHtUnit === 'CM' ? 230 : 7.5;
    this.heightSlider.limits.minStart = this.currentHtUnit === 'CM' ? 30 : 1;
    this.heightSlider.step = this.currentHtUnit === 'CM' ? 1 : 0.1;
    this.heightSlider.ticks.format = this.currentHtUnit === 'CM' ? 'N0' : '#.00';
    this.heightSlider.value = this.profileStats.height;
    this.heightGauge.annotations[0].axisValue = this.profileStats.height;
    this.heightGauge.annotations[0].content = '<div class="e-height-gauge-annotation">' + this.profileStats.height + this.currentHtUnit + '</div>';
    this.heightGauge.axes[0].pointers[0].value = this.profileStats.height;
    this.heightGauge.axes[0].majorTicks.interval = this.currentHtUnit === 'CM' ? 20 : 1;
    this.heightGauge.axes[0].minorTicks.interval = this.currentHtUnit === 'CM' ? 5 : 0.1;
    (document.querySelectorAll('#height-svg')[0] as HTMLElement).style.height = (this.profileStats.height * (this.currentHtUnit === 'CM' ? 1.7 : 52)) + 'px';
  }

  dialogOpen(args) {
    args.preventFocus = true;
    this.currentWtUnit = '';
    this.weightSlider.value = this.profileStats.weight;
    this.heightSlider.value = this.profileStats.height;
    this.updateWeightGauge(false);
    this.sliderChange();
    this.weightGauge.refresh();
    this.weightSlider.refresh();
    if (document.querySelector('.e-weight-text') && !document.querySelector('.e-weight-text').classList.contains('e-edit-color')) {
      document.querySelector('.e-weight-text').classList.add('e-edit-color');
    }
    if (document.querySelector('.e-goal-text') && document.querySelector('.e-goal-text').classList.contains('e-edit-color')) {
      document.querySelector('.e-goal-text').classList.remove('e-edit-color');
    }
    if (document.querySelector('.e-height-text') && document.querySelector('.e-height-text').classList.contains('e-edit-color')) {
      document.querySelector('.e-height-text').classList.remove('e-edit-color');
    }
  }

  dialogBeforeOpen() {
    this.changeWeight();
    if (this.profileStats.weightMes.toUpperCase() === 'KG' && document.querySelector('.e-weight-modify-btn-group #KG')) {
      (document.querySelector('.e-weight-modify-btn-group #KG') as HTMLInputElement).checked = true;
    } else if (document.querySelector('.e-weight-modify-btn-group #LB')) {
      (document.querySelector('.e-weight-modify-btn-group #LB') as HTMLInputElement).checked = true;
    }
  }

  overlayClick() {
    this.editDialog.hide();
  }

  menuOverlayClick() {
    this.menuDialog.hide();
  }

  fastingOverlayClick() {
    this.fastingDialog.hide();
  }

  legendClick(args) {
    if (args.legendText === 'Diet') {
      this.chartInstance.series[0].visible = !this.chartInstance.series[0].visible;
    } else if (args.legendText === 'Workout') {
      this.chartInstance.series[1].visible = !this.chartInstance.series[1].visible;
    }
  }

  getSleepInHours(minutes: number) {
    return Math.floor(minutes / 60) + 'h' + ' ' + (minutes % 60) + 'm';
  }

  getPieChartData() {
    return [{ x: 'PROTEINS', y: this.currentTotalProteins, fill: '#4DD291' }, { x: 'FAT', y: this.currentTotalFat, fill: '#FC892C' },
    { x: 'CARBOHYDRATES', y: this.currentTotalCarbs, fill: '#FFC147' }, { x: 'CALCIUM', y: this.currentTotalCalcium, fill: '#E25641' },
    { x: 'SODIUM', y: this.currentTotalSodium, fill: '#901C53' }, { x: 'IRON', y: this.currentTotalIron, fill: '#CB4967' }];
  }

  onTextRender(args) {
    if (args.point.y > 0) {
      let value = args.point.y / args.series.sumOfPoints * 100;
      args.text = Math.ceil(value) + '%';
    }
  }

  onTooltipRender(args) {
    args.text = args.data.pointX + ': ' + (args.data.pointY < 1 ? ((args.data.pointY * 1000) + ' mg') : (args.data.pointY + ' gm'));
  }

  getChartData() {
    let count: number = (this.dropDownInstance && this.dropDownInstance.value === 'Monthly') ? 30 : 7;
    let sampleData: Object[] = [];
    for (let i = count - 1; i >= 0; i--) {
      let date = (this.currentDate) ? new Date(this.currentDate) : new Date();
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
      let date = (this.currentDate) ? new Date(this.currentDate) : new Date();
      let data: Object = {
        x: new Date(date.setMonth(date.getMonth() - i)),
        y: Math.round(80 + (i * (Math.random() * (4 - 2) + 2)))
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
    let date = (this.currentDate) ? new Date(this.currentDate) : new Date();
    let sampleData: Object[] = [];
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < workout.length; j++) {
        let time = new Date(new Date(date.setHours(hours[j])).setMinutes(minutes[j]));
        let distance = workout[j] === 'Yoga' ? '' : workout[j] === 'Running' ? Math.random() * (5 - 1) + 1 : Math.random() * (2 - 1) + 1;
        let data: Object = {
          Workout: workout[j],
          Distance: distance,
          Duration: workout[j] === 'Yoga' ? Math.random() * (30 - 10) + 10 : ((distance as number) * average[j]),
          Date: time,
          Completion: Math.random() * (30 - 10) + 10
        };
        sampleData.push(data);
        this.burnedCalories += workout[j] === 'Yoga' ? 0 : Math.round((data['Duration'] / caloriesBurned[j]) * 100);
      }
    }
    return sampleData;
  }
}
