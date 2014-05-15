  var XDeck = undefined;

  (function() {
    if(document.currentScript) {
      var localDoc = document.currentScript.ownerDocument;
    } else {
      var localDoc = document._currentScript.ownerDocument;
    }
    var proto = Object.create(HTMLElement.prototype);

    proto.createdCallback = function() {
      if(this.createShadowRoot) {
        this._root = this.createShadowRoot();
      } else {
        this._root = this.webkitCreateShadowRoot();
      }

      var tplContent = localDoc.querySelector("template#deck").content;
      this._root.appendChild(tplContent.cloneNode(true));
    };

    var changeSlide = function(direction) {
        var currentSlideIndex = parseInt(document.location.hash.slice(1), 10) || 1;
        var slideShown     = document.querySelector("x-slide.active"),
            slideToBeShown = slideShown;
            
        var transitFunc = (direction == "next" ? function(node) { return node.nextSibling;     } 
                                               : function(node) { return node.previousSibling; });
        
        while((slideToBeShown = transitFunc(slideToBeShown)) && slideToBeShown.tagName !== "X-SLIDE");

        if(!slideToBeShown) return;

        slideToBeShown.classList.add("active");
        slideShown.classList.remove("active");
        
    }

    var addKeyboardListener = function() {
      document.addEventListener("keyup", function(event) {
        var currentSlideIndex = parseInt(document.location.hash.slice(1), 10) || 1;

        if(event.keyCode == 37) {         // left
          document.location.hash = --currentSlideIndex;
          changeSlide("previous");
        } else if(event.keyCode == 39 ) { // right
          document.location.hash = ++currentSlideIndex;
          changeSlide("next");
        } else { return; }
      });
    }
    
    var addTouchListener = function() {
      var slides = document.querySelectorAll("x-slide");

      for(var i=0;i<slides.length;i++) {
        Hammer(slides[i]).on("swipeleft", function(event) {
          console.log("Touchy");
          var currentSlideIndex = parseInt(document.location.hash.slice(1), 10) || 1;
          document.location.hash = ++currentSlideIndex;
          changeSlide("next");
          e.stopPropagation();
        });

        Hammer(slides[i]).on("swiperight", function(event) {
          console.log("Touchy");
          var currentSlideIndex = parseInt(document.location.hash.slice(1), 10) || 1;
          document.location.hash = --currentSlideIndex;
          changeSlide("prev");
          e.stopPropagation();
        });
        
      }
    }

    proto.attachedCallback = function() {
      var self = this;
      var currentSlideIndex = parseInt(document.location.hash.slice(1), 10) || 1;
      document.location.hash = "#" + currentSlideIndex;

      self.querySelector("x-slide:nth-child(" + currentSlideIndex + ")").classList.add("active");

      addKeyboardListener();
      addTouchListener();
    };

    XDeck = document.registerElement("x-deck", { prototype: proto });
  })();
