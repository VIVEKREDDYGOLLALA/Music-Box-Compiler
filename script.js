var html_template = "<!doctype html>";
html_template += "<html><head><link rel='stylesheet' href='styles.css'/></head><body><div class='play-arrow' id='playArrow'></div><button onclick='play_notes()'>Play</button><script> @@@PLAY_CODE </script></body></html>";

var code_output = "";
var compiled_code = document.getElementById("compiledCode");

function play_notes() {
    var song = document.getElementById("textBox").value.trim();
    var bg = document.getElementById("textBg");
    var playArrow = document.getElementById("playArrow");
    
    // Clear previous output
    code_output = "function play(){document.getElementById('playArrow').classList.add('play');";
    
    playArrow.classList.add('play');
    bg.style.top = "4.5em";
    bg.style.display = "block";

    // Split input into lines and initialize sound delay
    var lines = song.split(/\r?\n/);
    var sound_delay = 0;

    // Sound map for notes
    var soundMap = {
        'E': 'sounds/E.wav',
        'A': 'sounds/A.wav',
        'D': 'sounds/D.wav',
        'G': 'sounds/G.wav',
        'F': 'sounds/F.wav',
        'C': 'sounds/C.wav'
    };

    for (var i = 0; i < lines.length; ++i) {
        var notes = lines[i].trim().split(' '); // Split line into individual notes

        for (var note of notes) {
            if (soundMap[note]) {
                console.log("Playing " + note);
                setTimeout(function(note) {
                    new Audio(soundMap[note]).play();
                }, sound_delay, note); // Pass note to the timeout function
                code_output += "setTimeout(function() { new Audio('" + soundMap[note] + "').play(); }, " + sound_delay + ");";
                sound_delay += 1000; // Increment delay for the next note
            } else {
                console.log("Unknown note: " + note);
            }
        }
    }

    bg.style.transition = i + "s linear";
    bg.style.top = 4.5 + (i * 1.4) + "em";

    setTimeout(function() {
        bg.style.top = "4.5em";
        bg.style.transition = "0.5s linear";
        bg.style.display = "none";
        playArrow.classList.remove('play');
    }, sound_delay);

    code_output += "setTimeout(function() { document.getElementById('playArrow').classList.remove('play'); }, " + sound_delay + ");";
    code_output += "}";
    compiled_code.value = html_template.replace("@@@PLAY_CODE", code_output);
}

function clear_music() {
    document.getElementById("textBox").value = "";
}

document.addEventListener('DOMContentLoaded', function() {
    // Preload sounds
    for (var note in soundMap) {
        new Audio(soundMap[note]);
    }
}, false);
