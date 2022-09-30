
// date and current time
const currentDay = moment().format("dddd MMM Do YYYY");
const displayTime = moment().format('h:mm a');

// timeblock time format
let currentHour = moment().format("k");

// displays current date and time at top of page
function displayCurrent() {
  $("#currentDay").append("<div class=>" + currentDay + "</div>");
  $("#displayTime").append("<div class=>" + displayTime + "</div>")
}



// save input to local storage

function saveTask(event) {
  var parentRowEl = $(event.target).parents(".row");
  var kTime = parentRowEl.attr("data-kHour");
  var taskText = parentRowEl.find("textarea").val();
  localStorage.setItem(kTime + "-task", JSON.stringify(taskText));
}

// retrieve task from local storage

function showTask(kTime) {
  var storedTask = JSON.parse(localStorage.getItem(kTime + "-task"));
    var taskText = "";
    if (storedTask !== null) {
        taskText = storedTask;
    }
    return taskText;
}

// timeblocks

function createTimeBlocks() {
  for (i = 9; i < 18; i++) {
    createTimeBlockRow(i);
  }
}

// creating html elements
function createTimeBlockRow(kTime) {
// issues getting timeblocks to line up properly
  var containerEl = $(".container");
  containerEl.append("<div class='row'></div>");
  var rowEl = $(".row").last();
  rowEl.append("<div class='hour'></div>");
  var hourEl = rowEl.children(".hour");
  rowEl.append("<div class='time-block'></div>");
  var timeBlockEl = rowEl.children(".time-block");
  timeBlockEl.append("<textarea></textarea>");
  var textAreaEl = timeBlockEl.children("textarea");
  // had issues with font awesome, creating an account and using personal link seemed to fix
  rowEl.append("<button class='saveBtn'><i class='fa-solid fa-floppy-disk'></i></button>")
  var saveBtnEl = rowEl.children(".saveBtn");

  hourEl.text(moment(kTime, "k").format("hA"));
  rowEl.attr("data-kHour", kTime);

  if (currentHour == kTime) {
    timeBlockEl.addClass("present");
  } else if (currentHour > kTime) {
    timeBlockEl.addClass("past");
  } else {
    timeBlockEl.addClass("future");
  }

  textAreaEl.text(showTask(kTime));
  saveBtnEl.on("click", saveTask);
}

displayCurrent();
createTimeBlocks();
