var workDay = {
  "8 AM": "",
  "9 AM": "",
  "10 AM": "",
  "11 AM": "",
  "12 PM": "",
  "1 PM": "",
  "2 PM": "",
  "3 PM": "",
  "4 PM": "",
  "5 PM": "",
};

  // Use jQuery ready function after loding the page
  // Use localStorage to save the content
  // Dispaly the text in the page
$(document).ready(function(){
  if(!localStorage.getItem('workDay')) {
    updateCalendarTasks(workDay);
  } else {
    updateCalendarTasks(JSON.parse(localStorage.getItem('workDay')));
  }

  // Set the Timer for updating current time
  UpdateNowTime();
  setInterval("UpdateNowTime()",1000);
})

function UpdateNowTime()
{
    $('#date-today h6').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));
}

  // update css style during different time according to current time
var counter = 1;
for(const property in workDay) {
  var textEntry = "#text-entry" + counter;
  $(textEntry).text(workDay[property]);
  var timeId = "#time" + counter;
  var presentHour = moment().hour();
  
  var timeString = $(timeId).text();
  var timeNumber = hourNumberFromHourString(timeString);  
  if(timeNumber < presentHour) {
    $(textEntry).addClass("past-hour");
  } else if (timeNumber > presentHour) {
    $(textEntry).addClass("future-hour");
  } else {
    $(textEntry).addClass("present-hour");
  }
  counter ++;
}

  // Use saveCal function to save text to local storage.
function saveCal(nid)
{
  value = $("#text-entry"+nid).val();
  hourString = $("#time"+nid).text().trim();
  saveSchedule(hourString, value);
}

  // switch hournumber from hourstring
function hourNumberFromHourString(hourString) {
  switch(hourString.trim()) {
    case "8 AM": return 8;
    case "9 AM": return 9;
    case "10 AM": return 10;
    case "11 AM": return 11;
    case "12 PM": return 12;
    case "1 PM": return 13;
    case "2 PM": return 14;
    case "3 PM": return 15;
    case "4 PM": return 16;
    case "5 PM": return 17;
  }
}

  // Return saved text from localstorage
function loadCorrectDataset() {
  result = localStorage.getItem('workDay')
  return (result ? result : workDay);
}

  // Initialize local storage
function initializeLocalStorage() {
  localStorage.setItem('workDay', JSON.stringify(workDay));
};

  // save to local storage
function saveToLocalStorage(dayObj) {
  localStorage.setItem('workDay', JSON.stringify(dayObj));
}

function saveSchedule(hourString, val) {

  if(!localStorage.getItem('workDay')) {
    initializeLocalStorage();
  }
  var workHours = JSON.parse(localStorage.getItem('workDay'));
  workHours[hourString] = val;
  saveToLocalStorage(workHours);
}

  
  // Update calendar tasks
function updateCalendarTasks(dayObject) {
  $(".calendar-row").each(function(index) {
    var res = $(this).children("div");
    $(this).children("textarea").text(dayObject[res.text()]);
  })
}
