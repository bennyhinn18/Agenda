// Function to get the meeting number from the URL
function getMeetingNumberFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('meeting') || '56'; // Default to meeting 51 if not specified
}

let currentMeetingNumber;

fetch('meetingData.json')
    .then(response => response.json())
    .then(data => {
        const meetings = data.meetings;
        currentMeetingNumber = Math.max(...Object.keys(meetings).map(Number));
        const meetingData = data.meetings[currentMeetingNumber];

        if (meetingData) {
            document.getElementById('theme-of-the-day').textContent = meetingData.themeOfTheDay;
            document.getElementById('word-of-the-day').textContent = meetingData.wordOfTheDay;
            document.getElementById('tmod').textContent = meetingData.tmod;
            document.getElementById('tt-master').textContent = meetingData.ttMaster;
            document.getElementById('ge').textContent = meetingData.ge;
            document.getElementById('dm').textContent = meetingData.debatemaster;
            document.getElementById('ah-counter').textContent = meetingData.ahCounter;
            document.getElementById('timer').textContent = meetingData.timer;
            document.getElementById('grammarian').textContent = meetingData.grammarian;
            document.getElementById('meeting-no').textContent="#"+currentMeetingNumber;
            document.getElementById('meeting-date').textContent=meetingData.date
            const speakersList = document.getElementById('speakers-list');
            speakersList.innerHTML = ''; // Clear any existing content
            meetingData.speakers.forEach((speaker,index) => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>Speaker ${index + 1}:</strong> ${speaker.name} (${speaker.level}) <br>
                                <strong>Evaluator:</strong> ${speaker.evaluator}`;
                speakersList.appendChild(li);
            });

            const ttSpeakersList = document.getElementById('tt-speakers-list');
            ttSpeakersList.innerHTML = ''; // Clear any existing content
            meetingData['tt-speakers'].forEach(speaker => {
                const li = document.createElement('li');
                li.textContent = speaker.name;
                ttSpeakersList.appendChild(li);
            });

            const rrSpeakersList = document.getElementById('rr-speakers-list');
            rrSpeakersList.innerHTML = ''; // Clear any existing content
            meetingData['rr-speakers'].forEach(speaker => {
                const li = document.createElement('li');
                li.textContent = speaker.name;
                rrSpeakersList.appendChild(li);
            });
        } else {
            console.error('Meeting data not found for meeting number:', currentMeetingNumber);
        }
    })
    .catch(error => console.error('Error fetching data:', error));


/*
    function printAgenda() {
        const meetingNo = document.getElementById('meeting-no').innerText;
        const meetingDate = document.getElementById('meeting-date').innerText;
        const agendaContent = document.querySelector('.agenda').innerHTML;
        
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Print Agenda</title>');
        printWindow.document.write('</head><body >');
        printWindow.document.write('<h3>Agenda</h3>');
        printWindow.document.write('<p>Meeting No: ' + meetingNo + '</p>');
        printWindow.document.write('<p>Date: ' + meetingDate + '</p>');
        printWindow.document.write(agendaContent);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }
*/

    function updateLink() {
        const themeOfTheDay = document.getElementById('word-of-the-day').innerText;
        const searchUrl = 'https://www.google.com/search?pglt=675&q=' + encodeURIComponent(themeOfTheDay);
        window.open(searchUrl, '_blank');
    }
     // Function to get the meeting number from the URL
     

    const meeting = getMeetingNumberFromURL();
    document.addEventListener('DOMContentLoaded', () => {
        const otherSpeakersLink = document.querySelector('.footer .a');
        otherSpeakersLink.href = `other-speakers.html?meeting=${meeting}`;
    });