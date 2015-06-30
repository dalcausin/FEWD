Element.prototype.Contact = function() {

  var contact = this,
      form = document.getElementById('c_form'),
      submit = document.getElementById('contact-submit'),
      wrapper = document.getElementById('form-wrapper');


  this.send = function() {
    // collect all the forms info
    // send the content via email
    var link ='mailto:hi@dalcausin.com?subject=Message from '+
              form.children[0].value+
              '&body='+
              form.children[3].value;
    console.log(link);
    window.location.href=link;

    // leave some feedback that the form has been submitted
    wrapper.innerHTML = '<div class="center"><h1>Thanks!</h1></div>';

  };

  this.init = function() {
    // add an eventListener on the button which sends the form
    submit.addEventListener('click',function(ev){
      ev.preventDefault();
      contact.send();
    });

  };

  this.init();

};
