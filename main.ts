function determineButton () {
    line0 = pins.digitalReadPin(DigitalPin.P0)
    line1 = pins.digitalReadPin(DigitalPin.P1)
    line2 = pins.digitalReadPin(DigitalPin.P2)
    if (line0 || (line1 || line2)) {
        basic.pause(10)
        line0 = pins.digitalReadPin(DigitalPin.P0)
        line1 = pins.digitalReadPin(DigitalPin.P1)
        line2 = pins.digitalReadPin(DigitalPin.P2)
        if (!(line2) && (!(line1) && line0)) {
            return 0
        }
        if (!(line2) && (line1 && !(line0))) {
            return 1
        }
        if (!(line2) && (line1 && line0)) {
            return 2
        }
        if (line2 && (!(line1) && !(line0))) {
            return 3
        }
        if (line2 && (!(line1) && line0)) {
            return 4
        }
        if (line2 && (line1 && !(line0))) {
            return 5
        }
        if (line2 && (line1 && line0)) {
            return 6
        }
    }
    return -1
}
function displayNote (num: number) {
    if (num < 0) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    }
    if (num == 0) {
        basic.showLeds(`
            . . # # .
            . # . . .
            . # . . .
            . # . . .
            . . # # .
            `)
    }
    if (num == 1) {
        basic.showLeds(`
            . # # . .
            . # . # .
            . # . # .
            . # . # .
            . # # . .
            `)
    }
    if (num == 2) {
        basic.showLeds(`
            . # # # .
            . # . . .
            . # # . .
            . # . . .
            . # # # .
            `)
    }
    if (num == 3) {
        basic.showLeds(`
            . # # # .
            . # . . .
            . # # . .
            . # . . .
            . # . . .
            `)
    }
    if (num == 4) {
        basic.showLeds(`
            . # # # .
            # . . . .
            # . # # .
            # . . # .
            . # # # .
            `)
    }
    if (num == 5) {
        basic.showLeds(`
            . # # # .
            . # . # .
            . # # # .
            . # . # .
            . # . # .
            `)
    }
    if (num == 6) {
        basic.showLeds(`
            # # # . .
            # . . # .
            # # # . .
            # . . # .
            # # # . .
            `)
    }
}
let currentButton = 0
let line2 = 0
let line1 = 0
let line0 = 0
music.setBuiltInSpeakerEnabled(true)
music.setVolume(255)
let songIndex = 0
let notes = [
262,
294,
330,
349,
392,
440,
494
]
let song = [
0,
1,
2,
3,
4,
4,
5,
5,
5,
5,
4,
3,
3,
3,
3,
2,
2,
1,
1,
1,
1,
0
]
displayNote(song[songIndex])
basic.forever(function () {
    currentButton = determineButton()
    if (currentButton >= 0) {
        music.playTone(notes[currentButton], music.beat(BeatFraction.Half))
    }
    if (currentButton == song[songIndex]) {
        displayNote(-1)
        songIndex += 1
    }
    if (songIndex >= song.length) {
        songIndex = 0
    }
    displayNote(song[songIndex])
})
