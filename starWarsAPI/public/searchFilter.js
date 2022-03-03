// https://www.w3schools.com/howto/howto_js_filter_lists.asp
function myFunction() {
    // Declare variables
    console.log("Hello There");
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('searchFilter');
    filter = input.value.toUpperCase();
    ul = document.getElementById('order-list-container');
    li = ul.getElementsByTagName('li');


    a = li[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0];
    console.log(a.innerText);
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      //a = li[i].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("p")[0];
      a = li[i].getElementsByTagName("div")[0].getElementsByTagName("div")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }