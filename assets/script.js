
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

// timeblock color classes
// for loop for hours
function createElement() {
  for (i = 9; i < 18; i++) {
    createRow(i);
  }

}

// creating html elements
function createRow(showHour) {
  var containerDiv = $(".container");
  containerDiv.append("<div class='row'></div>");

  var rows = $(".row").last();
  rows.addClass('row time-block');
  rows.append("<div class='hour'></div>");

  var hourEl = rows.children(".hour");
  hourEl.addClass('col-1 hour');
  hourEl.text(moment(showHour, "H").format("hA"));

  rows.append("<div class='time-block'></div>");
  rows.attr("data-hour", showHour);

  // had issues with font awesome, creating an account and using personal link key seemed to fix
  rows.append("<button class='col-1 saveBtn'><i class='fa-solid fa-floppy-disk'></i></button>")

  var timeblocks = rows.children(".time-block");
  timeblocks.addClass('col-10');
  timeblocks.append("<textarea></textarea>");

  var textInput = timeblocks.children("textarea");
  textInput.addClass('col-10')
  textInput.text(displayTask(showHour));

  var saveBtnEl = rows.children(".saveBtn");
  saveBtnEl.on("click", saveTask);

  if (currentHour == showHour) {
    timeblocks.addClass("present");
  } else if (currentHour > showHour) {
    timeblocks.addClass("past");
  } else {
    timeblocks.addClass("future");
  }
}


displayCurrent();
createElement();
