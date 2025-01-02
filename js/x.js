(function(){ "use strict";

  this.x = selector => {
  
  let el = document.querySelector( selector );
  let obj = { el };
  
  // CSS Variable
  obj.cssvar = function( property, value ){
    this.el.style.setProperty( '--' + property, value );
    return this;
  }

  // Class
  obj.addClass    = function(name) { this.el.classList.add(name);    return this; };
  obj.removeClass = function(name) { this.el.classList.remove(name); return this; };
  obj.toggleClass = function(name) { this.el.classList.toggle(name); return this; };

  // Data
  obj.data = function( property, value ) { 
    if( typeof value !== 'undefined' ){
      this.el.dataset[property] = value;
      return this;
    } else {
      return this.el.dataset[property];
    }
  };
  
    // Value
  obj.value = function( value ) { 
    if( typeof value !== 'undefined' ){
      this.el.value = value;
      return this;
    } else {
      return this.el.value;
    }
  };

  // Log
  obj.log = function() { console.log(this.el); return this; };

  return obj;
  
  }

}).call(this);
