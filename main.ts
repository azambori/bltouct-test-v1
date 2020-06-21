input.onButtonPressed(Button.A, function () {
    StatusRUNSTOP = 0
    if (StatusSWMODEONOFF == 0) {
        StatusSWMODEONOFF = 1
        basic.showString("SW mode")
    } else {
        StatusSWMODEONOFF = 0
        basic.showString("HW mode")
    }
    basic.pause(5000)
})
input.onButtonPressed(Button.AB, function () {
    StatusRUNSTOP = 0
    pins.servoWritePin(AnalogPin.P0, BlTouchReset)
    basic.showIcon(IconNames.SmallHeart)
    basic.showIcon(IconNames.Heart)
    basic.pause(2000)
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function () {
    if (StatusRUNSTOP == 1) {
        StatusRUNSTOP = 0
    } else {
        StatusRUNSTOP = 1
    }
})
let OUTPUT = 0
let ServoAngle = 0
let ERROR = 0
let Count = 0
let BlTouchReset = 0
let StatusRUNSTOP = 0
let StatusSWMODEONOFF = 0
let StatusDEPLOYSTOW = 0
StatusSWMODEONOFF = 1
let BlTouchDELAY = 350
StatusRUNSTOP = 0
BlTouchReset = 160
let BlTouchDeploy = 10
let BlTouchStow = 90
let BltouchSWMODE = 60
let MaxAnlge = 300
let servocenterposition = 1450
let ServoDELAY = 500
pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
pins.servoSetPulse(AnalogPin.P2, servocenterposition)
basic.pause(ServoDELAY)
pins.servoWritePin(AnalogPin.P0, BlTouchReset)
basic.pause(BlTouchDELAY)
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    # # . # #
    `)
let Count_Error = 0
basic.forever(function () {
    if (StatusRUNSTOP == 1) {
        Count += 1
        pins.servoWritePin(AnalogPin.P0, BlTouchDeploy)
        basic.pause(BlTouchDELAY)
        if (StatusSWMODEONOFF == 1) {
            pins.servoWritePin(AnalogPin.P0, BltouchSWMODE)
        }
        ERROR = 1
        ServoAngle = 0
        while (ServoAngle <= MaxAnlge) {
            pins.servoSetPulse(AnalogPin.P2, servocenterposition - ServoAngle)
            basic.pause(1)
            OUTPUT = ServoAngle
            if (pins.digitalReadPin(DigitalPin.P1) == 1) {
                ERROR = 0
                break;
            }
            ServoAngle += 1
        }
        pins.servoSetPulse(AnalogPin.P2, servocenterposition)
        basic.pause(ServoDELAY)
        pins.servoWritePin(AnalogPin.P0, BlTouchStow)
        basic.pause(1000)
    }
})
