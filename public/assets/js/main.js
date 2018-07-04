$("#logIn").on("click", function () {
    event.preventDefault()
    var logInData = {
        email: $("#logInEmail").val().trim(),
        password: $("#logInPassword").val().trim()
    }
    $.ajax({
        method: "POST",
        url: "/login",
        data: logInData,
        error: function() {
            $("#logInPassword").val("")
            alert("Invalid username or password!")
        }
    }).then(function (res) {
        console.log(res)
        window.location.assign("/chapter")
    })
})

$("#register").on("click", function () {
    event.preventDefault()
    if ($("#registerPassword").val().trim() == $("#confirmPassword").val().trim()) {
        var registerData = {
            email: $("#registerEmail").val().trim(),
            password: $("#registerPassword").val().trim()
        }
        $.ajax({
            method: "GET",
            url: "/checkAvailability?email=" + $("#registerEmail").val().trim()
        }).then(function (res) {
            if (res == 0) {
                console.log(res)
                $.ajax({
                    method: "POST",
                    url: "/register",
                    data: registerData
                }).then(function (res) {
                    window.location.assign("/chapter")
                })
            } else {
                $("#registerEmail").val("")
                alert("This e-mail address is already in use!")
            }
        })
    } else {
        $("#registerPassword").val("")
        $("#confirmPassword").val("")
        alert("Your passwords do not match!")
    }
})

$.ajax({
    method: "GET",
    url: "/isLoggedIn",
}).then(function (res) {
    console.log(res)
    if (res) {
        window.location.assign("/chapter")
    }
})

