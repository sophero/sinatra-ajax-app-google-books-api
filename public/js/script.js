var searchGoogleBooks = new SearchGoogleBooksApi();

function SearchGoogleBooksApi() {
    var searchInput = document.getElementsByClassName('search-google-books-api__input')[0];
    var searchBtn = document.getElementsByClassName('search-google-books-api__btn')[0];

    searchInput.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            ajaxRequest(searchInput.value);
            searchInput.value = "";
        }
    });

    searchBtn.addEventListener("click", function() {
        ajaxRequest(searchInput.value);
        searchInput.value = "";
    });

    searchInput.focus();

    function ajaxRequest(search_term) {
        $.ajax({
            url: "https://www.googleapis.com/books/v1/volumes",
            method: "GET",
            data: {
                q: search_term
            },
            success: function(response) {
                console.log(response);
            }
        });
    }
}
