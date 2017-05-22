var bookSearch = new BookSearch();

function BookSearch() {
    var searchInput = document.getElementsByClassName('search-google-books-api__input')[0];
    var searchBtn = document.getElementsByClassName('search-google-books-api__btn')[0];
    var resultsContainer = document.getElementsByClassName('search-results__container')[0];

    searchInput.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            googleBooksAjaxReq(searchInput.value);
            searchInput.value = "";
        }
    });

    searchBtn.addEventListener("click", function() {
        googleBooksAjaxReq(searchInput.value);
        searchInput.value = "";
    });

    searchInput.focus();

    function googleBooksAjaxReq(search_term) {
        $.ajax({
            url: "https://www.googleapis.com/books/v1/volumes",
            method: "GET",
            dataType: "json",
            data: {
                q: search_term
            },
            success: function(response) {
                console.log(response);
                listTitles(response.items);
            }
        });
    }

    function listTitles(items) {
        for (let k = 0; k < items.length; k++) {
            var item = items[k];
            // var newDiv = document.createElement("div");
            // newDiv.classList.add("result__container");

            var titleDiv = document.createElement("div");
            titleDiv.classList.add("result__title")
            titleDiv.innerHTML = item.volumeInfo.title;
            //
            // var authorsDiv = document.createElement("div");
            // authorsDiv.classList.add("result__authors");
            // var authorsArray = item.
            // for (var j = 0; j < )
            // authorsDiv.innerHTML = item.volumeInfo.;

            resultsContainer.append(titleDiv);

        }


    }


}
