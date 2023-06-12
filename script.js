var calculatedDateTime;

function calculate() {
  var inputDateTime = document.getElementById("datetime").value;
  
  if (inputDateTime) {
    var datetime = new Date(inputDateTime);
    datetime.setHours(datetime.getHours() - 80);
    calculatedDateTime = datetime;

    var resultElement = document.getElementById("result");
    resultElement.innerText = "Your T-80 period opens " + datetime.toLocaleString();

    var downloadButton = document.getElementById("downloadButton");
    downloadButton.style.display = "inline-block";
  }
}

function downloadICS() {
  var startDateTime = calculatedDateTime.toISOString();
  var endDateTime = new Date(calculatedDateTime.getTime() + (80 * 60 * 60 * 1000)).toISOString();

  var icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${startDateTime}
DTEND:${endDateTime}
SUMMARY:Calculated Event
END:VEVENT
END:VCALENDAR`;

  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/calendar;charset=utf-8,' + encodeURIComponent(icsContent));
  element.setAttribute('download', 'calculated_event.ics');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
