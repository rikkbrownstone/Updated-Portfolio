var imgUrl = [];

    $("#SearchButton").on("click", function (event) {
        event.preventDefault();
        var imgSearch = $("#SearchImage").val().trim();
        console.log(imgSearch);

        var queryURL = `https://pixabay.com/api/?key=13047378-53a3deeca335efb67ec1a09e6&q="${imgSearch}"&image_type=photo`;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            imgUrl = []
            for (i = 0; i < 8; i++) {
                var res = response.hits[i].largeImageURL
                imgUrl.push(res)
                console.log(imgUrl)
            }

            $(".gifimages").html("")

            for (i = 0; i < 8; i++) {
                $(".gifimages").append(`<a href="editor.html"><img class="results" src="${imgUrl[i]}"/></a>`)
    
            }

        });
    });


$(document).on('click', "img", function (event) {
    var localLink = $(this).attr("src")

    localStorage.clear();
    localStorage.setItem("img", localLink);

    console.log(localStorage);

});