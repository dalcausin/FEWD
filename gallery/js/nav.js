Element.prototype.Nav = function(){

  var nav = this,
      navItems = nav.children[0].children,
      sections = document.getElementsByTagName('section')
      btn = document.createElement('div'),
      container = document.getElementById('container');

  this.toggleNav = function(){
    if(container.style.left === "0px"){
      container.style.left = "320px";
    }
    else{
      container.style.left = "0px";
    }
  };

  this.createButton = function(){

    btn.classList.add('hamburger');

    btn.addEventListener('mousedown',nav.toggleNav);

    container.appendChild(btn);

  };

// hide all the sections

  this.hideSections = function () {

    for (var i=0; i < sections.length; i++) {

      sections[i].style.display = 'none';
      sections[i].style.opacity = '0';
      sections[i].style.zIndex = '0';

    }

  };

// show a section

  this.showSection = function (id) {

    this.hideSections();
    document.getElementById(id).style.display = 'block';
    document.getElementById(id).style.opacity = '1.0';
    document.getElementById(id).style.zIndex = '50';

  };

  this.init = function(){

    nav.createButton();

    // loop through all li and add event listener
    for(var i=0; i<navItems.length; i++) {
      navItems[i].addEventListener('click',function(ev){

          var id = ev.target.dataset.section;
          console.log(id);
          nav.showSection(id);
          nav.toggleNav();

      });
    }

  };

  this.init();
};
