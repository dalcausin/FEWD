// Element.innerHTML

// sets or returns HTML content of an element
// you want to dynamically manipulate the inner html of an element


var container = document.getElementById('container')
var div = document.createElement('div')

div.innerHTML = "<h2>Like this...</h2>";

container.appendChild(div);
