var bookSearch = new BookSearch();

function BookSearch() {
    var searchInput = document.getElementsByClassName('search-google-books-api__input')[0];
    var searchBtn = document.getElementsByClassName('search-google-books-api__btn')[0];
    var resultsContainer = document.getElementsByClassName('search-results__container')[0];
    var savedBooksContainer = document.getElementsByClassName('saved-books__container')[0];

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
    retrieveUserBooks();

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
            let item = items[k];
            // var newDiv = document.createElement("div");
            // newDiv.classList.add("result__container");

            let titleDiv = document.createElement("div");
            titleDiv.classList.add("result__title")
            titleDiv.innerHTML = item.volumeInfo.title;

            resultsContainer.append(titleDiv);

            titleDiv.addEventListener("click", function(event) {
                saveBookToDb(item, titleDiv);
            });
            //
            // var authorsDiv = document.createElement("div");
            // authorsDiv.classList.add("result__authors");
            // var authorsArray = item.
            // for (var j = 0; j < )
            // authorsDiv.innerHTML = item.volumeInfo.;


        }
    }

    function showSavedResult(element) {
        element.classList.remove("result__title");
        element.classList.add("result__title--saved");
        retrieveUserBooks();
    }

    function saveBookToDb(item, element) {
        $.ajax({
            url: "http://localhost:9292/create_book",
            method: "POST",
            data: {
                title: item.volumeInfo.title
            },
            success: function() {
                console.log("Book " + item.volumeInfo.title + " added to database.");
                showSavedResult(element);
            }
        });
    }

    function retrieveUserBooks() {
        $.ajax({
            url: "http://localhost:9292/books",
            method: "GET",
            dataType: "json",
            success: function(response) {
                displayBooks(response);
            }
        });
    }

    function displayBooks(json) {
        savedBooksContainer.innerHTML = "";
        for (var k = 0; k < json.length; k++) {
            var bookDiv = document.createElement("div");
            bookDiv.innerHTML = json[k].title;

            savedBooksContainer.append(bookDiv);
        }
    }

}
