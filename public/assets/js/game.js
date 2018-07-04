$.ajax({
    method: "GET",
    url: "/isntLoggedIn",
}).then(function (res) {
    console.log(res)
    if (res) {
        window.location.assign("/login")
    }
})


$(".choice").on("click", function () {
    event.preventDefault()
    $.ajax({
        method: "POST",
        url: "/choose?c=" + $(this).attr("data"),
    }).then(function (res) {
        window.location.assign("/chapter")
    })
})

$("#logout").on("click", function () {
    event.preventDefault()
    $.ajax({
        method: "GET",
        url:"/logout"
    }).then( function(res) {
        window.location.assign("/login")
    })
})