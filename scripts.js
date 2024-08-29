// Function to get the meeting number from the URL
function getMeetingNumberFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('meeting') || '51'; // Default to meeting 51 if not specified
}

const currentMeetingNumber = getMeetingNumberFromURL();

fetch('meetingData.json')
    .then(response => response.json())
    .then(data => {
        const meetingData = data.meetings[currentMeetingNumber];

        if (meetingData) {
            document.getElementById('theme-of-the-day').textContent = meetingData.themeOfTheDay;
            document.getElementById('word-of-the-day').textContent = meetingData.wordOfTheDay;
            document.getElementById('tmod').textContent = meetingData.tmod;
            document.getElementById('tt-master').textContent = meetingData.ttMaster;
            document.getElementById('ge').textContent = meetingData.ge;
            document.getElementById('ah-counter').textContent = meetingData.ahCounter;
            document.getElementById('timer').textContent = meetingData.timer;
            document.getElementById('grammarian').textContent = meetingData.grammarian;

            const speakersList = document.getElementById('speakers-list');
            speakersList.innerHTML = ''; // Clear any existing content
            meetingData.speakers.forEach(speaker => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>Speaker:</strong> ${speaker.name} (${speaker.level}) <br>
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