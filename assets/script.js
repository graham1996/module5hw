
// date and current time
const currentDay = moment().format("dddd MMM Do YYYY");
const displayTime = moment().format('h:mm a');

// timeblock time format
let currentHour = moment().format("H");

// displays current date and time at top of page
function displayCurrent() {
  $("#currentDay").append("<div class=>" + currentDay + "</div>");
  $("#displayTime").append("<div class=>" + displayTime + "</div>")
}



// save input to local storage

function saveTask(event) {
  var mainRow = $(event.target).parents(".row");
  var showHour = mainRow.attr("data-hour");
  var textAr = mainRow.find("textarea").val();
  localStorage.setItem(showHour + "-task", JSON.stringify(textAr));
}

// retrieve task from local storage

function displayTask(showHour) {
  var storedTask = JSON.parse(localStorage.getItem(showHour + "-task"));
    var textAr = "";
    if (storedTask !== null) {
        textAr = storedTask;
    }
    return textAr;
}

// timeblocks
function createElement() {
  for (i = 9; i < 18; i++) {
    createRow(i);
  }
}

// creating html elements
function createRow(showHour) {
// issues getting timeblocks to line up properly
  var containers = $(".container");
  containers.append("<div class='row'></div>");
  var rows = $(".row").last();
  rows.append("<div class='hour'></div>");
  var hourEl = rows.children(".hour");
  rows.append("<div class='time-block'></div>");
  var timeblocks = rows.children(".time-block");
  timeblocks.append("<textarea></textarea>");
  var textInput = timeblocks.children("textarea");
  // had issues with font awesome, creating an account and using personal link seemed to fix
  rows.append("<button class='saveBtn'><i class='fa-solid fa-floppy-disk'></i></button>")
  var saveBtnEl = rows.children(".saveBtn");

  hourEl.text(moment(showHour, "H").format("hA"));
  rows.attr("data-hour", showHour);

  if (currentHour == showHour) {
    timeblocks.addClass("present");
  } else if (currentHour > showHour) {
    timeblocks.addClass("past");
  } else {
    timeblocks.addClass("future");
  }

  textInput.text(displayTask(showHour));
  saveBtnEl.on("click", saveTask);
}

displayCurrent();
createElement();
