// https://www.w3schools.com/howto/howto_js_filter_lists.asp
function searchBar() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('searchFilter');
    filter = input.value.toUpperCase();
    ul = document.getElementById('order-list-container');
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("p")[0];
      txtValue = a.textContent || a.innerText;
      // Checks if the subset character (filter) is within txtValue. If not then set display to none
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }