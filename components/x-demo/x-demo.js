var XDemo = undefined;
(function() {

  var updatePreview = function(preview, source) {
    preview.document.open();
    preview.document.write(source);
    preview.document.close();
  };

  var localDoc = document.currentScript.ownerDocument;
  var proto = Object.create(HTMLElement.prototype);

  Object.defineProperty(proto, "src", { get: function() { return src; }, set: function(newSrc) { src = newSrc; this.load(); } });

  proto.createdCallback = function() {
    this._root = this.createShadowRoot();
    var tplContent = localDoc.querySelector("template").content;
    this._root.appendChild(tplContent.cloneNode(true));

    var self    = this,
    previewElem = self._root.getElementById("preview");

    self.source = self._root.getElementById("source");
    self.preview = (previewElem.contentWindow) ? previewElem.contentWindow :
                     (previewElem.contentDocument.document) ? previewElem.contentDocument.document : previewElem.contentDocument;

    self.source.addEventListener("keyup", function(e) { e.stopPropagation(); return false });

    this.load = function() {
      if(!self.src) throw new Error("Can't load without a source");

      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        self.source.value = this.responseText;
        updatePreview(self.preview, self.source.value);
      }
      xhr.open("get", self.src);
      xhr.send();
    }
  };

  proto.attachedCallback = function() {
    var self = this;

    self.source.addEventListener("blur", function() {
      updatePreview(self.preview, this.value);
    });

    this.src = this.attributes.getNamedItem("src").value;
  };

  XDemo = document.registerElement("x-demo", { prototype: proto });
}());
