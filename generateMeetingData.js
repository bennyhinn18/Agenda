document.getElementById('meetingDataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const themeOfTheDay = document.getElementById('themeOfTheDay').value;
    const wordOfTheDay = document.getElementById('wordOfTheDay').value;
    const tmod = document.getElementById('tmod').value;
    const ttMaster = document.getElementById('ttMaster').value;
    const ge = document.getElementById('ge').value;
    const ahCounter = document.getElementById('ahCounter').value;
    const timer = document.getElementById('timer').value;
    const grammarian = document.getElementById('grammarian').value;
    const ttSpeakers = document.getElementById('ttSpeakers').value.split(',').map(name => name.trim());
    const rrSpeakers = document.getElementById('rrSpeakers').value.split(',').map(name => name.trim());

    const meetingData = {
        themeOfTheDay,
        wordOfTheDay,
        tmod,
        ttMaster,
        ge,
        ahCounter,
        timer,
        grammarian,
        'tt-speakers': ttSpeakers.map(name => ({ name })),
        'rr-speakers': rrSpeakers.map(name => ({ name }))
    };

    document.getElementById('output').textContent = JSON.stringify(meetingData, null, 2);
});