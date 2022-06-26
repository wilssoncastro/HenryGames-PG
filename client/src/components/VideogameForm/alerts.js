
import swal from 'sweetalert'


function validateAlertName() {
    swal({
        title: "Error",
        text: "Enter a name for your game",
        icon: "error",
        button: "OK"
    })
}

function validateAlertDescription() {
    swal({
        title: "Error",
        text: "Enter a description for your game",
        icon: "error",
        button: "OK"
    })
}
function validateAlertdRelease() {
    swal({
        title: "Error",
        text: "Enter a date of Release of your game",
        icon: "error",
        button: "OK"
    })
}
function validateAlertMainImage() {
    swal({
        title: "Error",
        text: "Enter a main image of your game",
        icon: "error",
        button: "OK"
    })
}
function validateAlertShortScreeen() {
    swal({
        title: "Error",
        text: "Enter 4 shorts screenshoots",
        icon: "error",
        button: "OK"
    })
}
function validateAlertFreeToPlay() {
    swal({
        title: "Error",
        text: "Is your game free? Select an option",
        icon: "error",
        button: "OK"
    })
}
function validateAlertGenres() {
    swal({
        title: "Error",
        text: "You must add at least one genre' ",
        icon: "error",
        button: "OK"
    })
}
function validateAlertEsrb() {
    swal({
        title: "Error",
        text: "You must add one ESRB rating",
        icon: "error",
        button: "OK"
    })
}
function validateAlertRequeriments() {
    swal({
        title: "Error",
        text: "you must add the minimum requirements of your game",
        icon: "error",
        button: "OK"
    })
}
function validateAlertErrors() {
    swal({
        title: "Error",
        text: "Missing data to enter",
        icon: "error",
        button: "OK"
    })
}

export {
    validateAlertName, validateAlertDescription, validateAlertdRelease, validateAlertMainImage,
    validateAlertShortScreeen, validateAlertFreeToPlay, validateAlertGenres, validateAlertEsrb,validateAlertRequeriments,
    validateAlertErrors
    
}