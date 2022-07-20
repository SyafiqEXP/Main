let app = angular.module("myApp", []);
app.controller("myCtrl", function($scope,$interval,$timeout) {
 //-----------------------------------------------------------------------
 $scope.selectedCountry = "Malaysia";  // by default
 $scope.numberOfDays = "30"; // by default
 $scope.countryId = ["Afghanistan","Albania","Algeria","Andorra","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Cambodia","Cameroon","Cape Verde","Chad","Chile","China","Colombia","Congo","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guyana","Haiti","Honduras","Hungary","India","Indonesia","Iran","Iraq","Ireland","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kuwait","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Morocco","Mozambique","Namibia","Nepal","Netherlands","New Zealand","Nicaragua","Nigeria","Norway","Oman","Pakistan","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Samoa","San Marino","Saudi Arabia","Senegal","Serbia","Seychelles","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Thailand","Togo","Turkey","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"];
 $scope.Days = ["30","182","365","730"];
 //------------GLOBAL--------------

 
 //------------GLOBAL--------------
 let api_url = 'https://disease.sh/v3/covid-19/countries/'+$scope.selectedCountry+'?yesterday=true&strict&query%20'
 let api_url_history = 'https://disease.sh/v3/covid-19/historical/'+$scope.selectedCountry+'?lastdays='+$scope.numberOfDays
 //-----------------------------------------------------------------------
 $scope.updateCountry = function() {
	 api_url = 'https://disease.sh/v3/covid-19/countries/'+$scope.selectedCountry+'?yesterday=true&strict&query%20'
	 api_url_history = 'https://disease.sh/v3/covid-19/historical/'+$scope.selectedCountry+'?lastdays='+$scope.numberOfDays
	 $scope.stat = "Fetching data....";
	 $scope.statStyle = {color: "orange"};
	 $scope.myChart3.destroy();
	 $scope.createHistoricalChart();
	 $scope.getISS();
	 $scope.getHistory();
	 };
 
  $scope.resetZooms = function(){
	  $scope.myChart3.resetZoom();
  };
 //-----------------------------------------------------------------------
 Chart.register(ChartDataLabels); // Register the plugin to all charts:
 let ctx = document.getElementById('myChart1').getContext('2d');
  $scope.myChart1 = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Recovered/Million', 'Active/Million','Critical/Million'],
        datasets: [{
            label: 'Cases',
            data: [$scope.recoveredPerOneMillion,$scope.activePerOneMillion,$scope.criticalPerOneMillion],
            backgroundColor: [
                'rgba(0, 128, 0, 0.2)',
                'rgba(255, 165, 0, 0.2)',
				'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(0, 128, 0, 1)',
                'rgba(255, 162, 0, 1)',
				'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]}
		,options: {
			scales: {y: {beginAtZero: true},
					x: {grid: {tickColor: 'gray',borderColor:'gray'},ticks: {color: 'black',font:{family:'verdana'}}},
					y: {grid: {tickColor: 'gray',borderColor:'gray'},ticks: {color: 'black',font:{family:'verdana'}}}
			},
			responsive: true,  // to test zoom in/out issue
			maintainAspectRatio: true, // to test zoom in/out issue
			plugins:{
					legend: {display: false},
					title: {
						display: true,
						text: 'Case distribution (per million):',
						position:'top',
						color:'black',
						font:{family:'verdana'}
					},
					datalabels: {formatter: (value, ctx) => {
					let sum = 0;
					let dataArray = ctx.chart.data.datasets[0].data;
					dataArray.map(data => {sum += data});
					let percentage = ((value*100)/sum).toFixed(2) + "%";
					return percentage;
					   },
					    color:'darkblue',
					    font: {
							 weight: 'bold',
							 size: 12,
							 family: 'verdana'
							},
					    display: 'true',
						align:'end',
					   }
					}
			}});
 //-----------------------------------------------------------------------
  ctx = document.getElementById('myChart2').getContext('2d');
  $scope.myChart2 = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Total recovered','Total active cases','Total deaths'],
        datasets: [{
            label: 'Overall Cases',
            data: [$scope.recovered,$scope.active,$scope.deaths],
            backgroundColor: [
                'rgba(0, 128, 0, 0.2)',
                'rgba(255, 165, 0, 0.2)',
				'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(0, 128, 0, 1)',
                'rgba(255, 162, 0, 1)',
				'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]}
		,options: {
			tooltips: {enabled: false},
			scales: {
				x: {grid: {display: false},display:false},
				y: {beginAtZero: true,grid: {display: false},display:false},
			}, // don't forget ','
			aspectRatio: 2,
			responsive: true,  // to test zoom in/out issue
			maintainAspectRatio: true, // to test zoom in/out issue
			plugins:{
				 legend: {
						display: true,
						labels: {color: 'black'},
						position:'right',
						font: {family:'verdana'}
						},
				 title: {
						display: true,
						text: 'Overall case distribution:',
						position:'top',
						color:'black',
						font: {family:'verdana'},
						},
				datalabels: {formatter: (value, ctx) => {
					let sum = 0;
					let dataArray = ctx.chart.data.datasets[0].data;
					dataArray.map(data => {sum += data});
					let percentage = ((value*100)/sum).toFixed(2) + "%";
					return percentage;
					   },
					    color:'darkblue',
					    font: {
							 weight: 'bold',
							 size: 12,
							 family: 'verdana'
							},
					    display: 'auto',
						align:'end',
						offset:-15
					   }
					}
		}});
 //--------------------(CRITICAL SECTION)-------------------------------------
 $scope.createHistoricalChart = function(){
   ctx = document.getElementById('myChart3').getContext('2d');
   $scope.myChart3 = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['0'],
        datasets: [{
            label: 'Active cases / day',
            data: [$scope.test], // just once
            backgroundColor: [
                'rgba(0, 0, 255, 0.2)'
            ],
            borderColor: [
                'rgba(0, 0, 255, 1)'
            ],
            borderWidth: 1
        },//another dataset
			{
            label: 'Deaths / day',
            data: [$scope.test2],
            backgroundColor: [
                'rgba(255, 0, 0, 0.2)'
            ],
            borderColor: [
                'rgba(255, 0, 0, 1)'
            ],
            borderWidth: 1
			}
		]}
		,options: {
			scales: {y: {beginAtZero: true},
					x: {grid: {tickColor: 'gray',borderColor:'gray'},ticks: {color: 'black'}},
					y: {grid: {tickColor: 'gray',borderColor:'gray'},ticks: {color: 'black',font:{family:'verdana'}}}
			},
			aspectRatio: 2.9,
			responsive: true,  // to fix browser zoom in/out issue
			maintainAspectRatio: true, // to fix browser zoom in/out issue
			spanGaps: true, // to improve performance
			plugins: { // 28 ~ 27
					legend: {
						display: true,
						labels: {color: 'black'},
						font: {family:'verdana'}
					},
					datalabels: {formatter: (value, ctx) => {
					// ▲ ▼ 
					let max = 0;
					let temp = 0;
					for(let i = 0;i < ($scope.numberOfDays - 1);i++)
					{
						temp = ctx.dataset.data[i]; // take 1st value
						if(temp > max)
							max = temp;
					}
					
					//find highest value
					if(value == max && max != 0)  // check if there is continuous string of zeroes
						value = "▲" + value;
					else
						value = '';
					return value;
					   },
					    color: function(ctx) {
						let index = ctx.dataIndex;
						let value = ctx.dataset.data[index];
						return value < 0 ? 'blue' : value < 20000 ? 'black':'red';
						},
					    font: {
							 weight: 'bold',
							 size: 11,
							 family:'verdana',
							},
					    display: 'true',
						align:'start',
					   },
					    title: {
						display: false,
						text: 'Historical data',
						}, // start zoom in function:
						zoom: {
							pan: { 
								enabled: true,
								},
							zoom: {
								wheel: {
								enabled: true,
								speed: 0.1,
								},
								pinch: {
								enabled: true,
								},
								mode: 'xy',
								},
								limits:{
									y: {min: 'original', max: 'original'}
								},
							}
							// end zoom in function:							
					},//plugin
			}});
 };
 $scope.createHistoricalChart();
 //-----------------------------------------------------------------------
 ctx = document.getElementById('populationChart').getContext('2d');
  $scope.populationChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Unaffected','Affected'],
        datasets: [{
            label: 'Overall Cases',
            data: [$scope.popDifference,$scope.cases], 
            backgroundColor: [
                'rgba(0, 128, 0, 0.2)',
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(0, 128, 0, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]}
		,options: {
			tooltips: {enabled: false},
			scales: {
				x: {grid: {display: false},display:false},
				y: {beginAtZero: true,grid: {display: false},display:false},
			}, // don't forget ','
			aspectRatio: 2,
			responsive: true,  // to test zoom in/out issue
			maintainAspectRatio: true, // to test zoom in/out issue
			plugins:{
				 legend: {
						display: true,
						labels: {color: 'black'},
						position:'right',
						font: {family:'verdana'}
						},
				 title: {
						display: true,
						text: 'Population distribution:',
						position:'top',
						color:'black',
						font: {family:'verdana'},
						},
				datalabels: {formatter: (value, ctx) => {
					let sum = 0;
					let dataArray = ctx.chart.data.datasets[0].data;
					dataArray.map(data => {sum += data});
					let percentage = ((value*100)/sum).toFixed(2) + "%";
					return percentage;
					   },
					    color:'darkblue',
					    font: {
							 weight: 'bold',
							 size: 12,
							 family: 'verdana'
							},
					    display: 'auto',
						align:'end',
						offset:-15
					   }
					}	
		}});
 
 //-----------------------------------------------------------------------
  $scope.getISS = async function() {
  const response =  await fetch(api_url);
  const data = await response.json();
  
  
  $timeout(function(){
	  //-----------Start Init-------------
	  $scope.myChart1.clear();
	  $scope.myChart2.clear();
	  $scope.cases = 0;
	  $scope.deaths = 0; 
	  $scope.active = 0; 
	  $scope.recovered = 0; 
	  
	  $scope.todayCases = 0;  
	  $scope.todayDeaths = 0; 
	  $scope.critical = 0; 
	  $scope.todayRecovered = 0; 
	  
	  //Start of other dataset
	  $scope.population = 0;
	  $scope.continent = 0;
	  $scope.affected = 0;
	  $scope.oneCasePerPeople = 0;
	  $scope.popDifference = 0;
	  
	  $scope.recoveredPerOneMillion = 0;
	  $scope.activePerOneMillion = 0;
	  $scope.criticalPerOneMillion = 0;
	  //End of other dataset
	  
	  $scope.myChart1.data.datasets[0].data[0] = 0;
	  $scope.myChart1.data.datasets[0].data[1] = 0;
	  $scope.myChart1.data.datasets[0].data[2] = 0;
	  
	  $scope.myChart2.data.datasets[0].data[0] = 0;
	  $scope.myChart2.data.datasets[0].data[1] = 0;
	  $scope.myChart2.data.datasets[0].data[2] = 0;
	  $scope.myChart1.update('active');
	  $scope.myChart2.update('active');
	  //-----------End Init-------------
    if (data.cases != null) {
	  $scope.flag = data.countryInfo.flag;
	  $scope.country = data.country;
	  $scope.cases = data.cases; // total cases
	  $scope.deaths = data.deaths; // total death
	  $scope.active = data.active; // total active cases
	  $scope.recovered = data.recovered; // total recovered
	  
	  $scope.todayCases = data.todayCases;  // current case (yesterday)
	  $scope.todayDeaths = data.todayDeaths; //  current deaths
	  $scope.critical = data.critical; //  current critical
	  $scope.todayRecovered = data.todayRecovered; // current recovered
	  
	  //Start of other dataset
	  $scope.population = data.population; // additional info
	  $scope.continent = data.continent; // additional info
	  $scope.affected = (data.cases/data.population)*100; // additional info
	  $scope.oneCasePerPeople = "1 in "  + data.oneCasePerPeople + " people was affected."; // additional info
	  $scope.popDifference = data.population - data.cases;  // to be use on populationChart
	  
	  $scope.recoveredPerOneMillion = data.recoveredPerOneMillion;
	  $scope.activePerOneMillion = data.activePerOneMillion;
	  $scope.criticalPerOneMillion = data.criticalPerOneMillion;
	  //End of other dataset
	  
	  $scope.stat = "Data available";
	  $scope.statStyle = {color: "green"};
	  $scope.myChart1.data.datasets[0].data[0] = $scope.recoveredPerOneMillion;
	  $scope.myChart1.data.datasets[0].data[1] = $scope.activePerOneMillion;
	  $scope.myChart1.data.datasets[0].data[2] = $scope.criticalPerOneMillion;
	  
	  $scope.myChart2.data.datasets[0].data[0] = data.recovered;
	  $scope.myChart2.data.datasets[0].data[1] = data.active;
	  $scope.myChart2.data.datasets[0].data[2] = data.deaths;
	  
	  $scope.populationChart.data.datasets[0].data[0] = $scope.popDifference;
	  $scope.populationChart.data.datasets[0].data[1] = $scope.cases;
	  
	  $scope.myChart1.update('active');
	  $scope.myChart2.update('active');
	  $scope.populationChart.update('active'); // population data
	  
	  if((data.todayRecovered == 0 && data.critical == 0) && (data.todayDeaths == 0 && data.todayCases == 0))
	  {
		  $scope.stat = "Current data is not available";
		  $scope.statStyle = {color: "orange"};
	  }
	  
    } else {
	  $scope.stat = "Data unavailable";
	  $scope.statStyle = {color: "red"};
    }}, 3000);
  }
  $scope.stat = "Fetching data...."; //by default
  $scope.statStyle = {color: "orange"};
  $scope.getISS();
  //$interval($scope.getISS,1100);
  //-----------------------------------------------------------------------
  $scope.getHistory = async function() {
  const response2 =  await fetch(api_url_history);
  const data2 = await response2.json();
  $scope.message = "";
  
  $timeout(function(){
	$scope.message = data2.message;
    if (data2 != null && $scope.message != "Country not found or doesn't have any historical data") {
		//-------get timeline
		$historicalStartDateObject = new Date(Object.keys(data2.timeline.cases)[1]).toDateString().substring(3);
		$historicalEndDateObject = new Date(Object.keys(data2.timeline.cases)[$scope.numberOfDays - 1]).toDateString().substring(3);
		$scope.historyTimeLine = "Data from:" + $historicalStartDateObject + " " + "to" + " " +$historicalEndDateObject;
		
	  for(let i = 0;i <= ($scope.numberOfDays - 1);i++)   // test
	  {
		$scope.historical = "Available";
		$scope.historicalStyle = {color: "green"};
		$scope.test = Object.values(data2.timeline.cases)[i + 1] - Object.values(data2.timeline.cases)[i]; //  great
		$scope.test2 = Object.values(data2.timeline.deaths)[i + 1] - Object.values(data2.timeline.deaths)[i];
		//Start defensive code in case value is less than 0
		if($scope.test < 0)
			$scope.test =  0;
		if($scope.test2 < 0)
			$scope.test2 =  0;
		//End defensive code in case value is less than 0
		$scope.myChart3.data.datasets[0].data[i] = $scope.test;
		$scope.myChart3.data.datasets[1].data[i] = $scope.test2;
		if(i < ($scope.numberOfDays - 1)){$scope.myChart3.data.labels[i] = Object.keys(data2.timeline.cases)[i + 1];}
	  }
	  $scope.myChart3.update('active');
    } else {
		  $scope.stat = "Data partially available";
		  $scope.statStyle = {color: "orange"};
		  $scope.historical = "Not available";
		  $scope.historicalStyle = {color: "red"};
		  $scope.myChart3.clear();
		  $scope.myChart3.data.datasets[0].data = 0; // reset new case data
		  $scope.myChart3.data.datasets[1].data = 0; // reset deaths data
		  $scope.historyTimeLine = "";
		  $scope.country = ""; // reset name
		  $scope.myChart3.update('active');
    }}, 3000);
  }
  $scope.getHistory();
  
});