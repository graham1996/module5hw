// date and current time
const currentDay = moment().format("dddd MMM Do YYYY");
const displayTime = moment().format('h:mm a');

// timeblock time format
let currentHour = moment().format("k");

// display current date and time
function displayCurrent() {
  $("#currentDay").append("<div class=>" + currentDay + "</div>");
  $("#displayTime").append("<div class=>" + displayTime + "</div>")
}



// timeblocks

function createTimeBlocks() {
  for (i = 9; i < 18; i++) {
    createTimeBlockRow(i);
  }
}


function createTimeBlockRow(kTime) {

  var containerEl = $(".container");
  containerEl.append("<div class='row'></div>");
  var rowEl = $(".row").last();
  rowEl.append("<div class='hour'></div>");
  var hourEl = rowEl.children(".hour");
  rowEl.append("<div class='time-block'></div>");
  var timeBlockEl = rowEl.children(".time-block");
  timeBlockEl.append("<textarea></textarea>");
  var textAreaEl = timeBlockEl.children("textarea");
  rowEl.append("<button class='saveBtn'><i class='bi bi-save img'></i></button>")
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
  saveBtnEl.on("click", saveEvent);
}


// save event to local storage

function saveEvent(event) {
  var parentRowEl = $(event.target).parents(".row");
  var kTime = parentRowEl.attr("data-kHour");
  var taskText = parentRowEl.find("textarea").val();
  localStorage.setItem(kTime + "-task", JSON.stringify(taskText));
}

// retrieve event from local storage

function showEvent(kTime) {
  var storedTask = JSON.parse(localStorage.getItem(kTime + "-task"));
    var taskText = "";
    if (storedTask !== null) {
        taskText = storedTask;
    }
    return taskText;
}



displayCurrent();
createTimeBlocks();
