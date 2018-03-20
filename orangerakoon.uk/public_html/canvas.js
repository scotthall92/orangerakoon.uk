var Canvas = function (
    palette, currentColour, grid, colourIdBase, paletteIdBase,
    imageStringId, tableId, canvasClass, pixelClass,
    paletteClass, selectedPaletteClass
) {
    this.palette = palette;
    this.currentColour = currentColour;
    this.grid = grid;
    this.colourIdBase = colourIdBase;
    this.paletteIdBase = paletteIdBase;
    this.imageStringId = imageStringId;
    this.tableId = tableId;
    this.canvasClass = canvasClass;
    this.pixelClass = pixelClass;
    this.paletteClass = paletteClass;
    this.selectedPaletteClass = selectedPaletteClass;
}

Canvas.prototype.initialisePaletteFormValues = function() {
    this.refreshPaletteTable();
    for (var i = 0; i < this.palette.length; i++) {
        var colourId = this.colourIdBase.replace('x', i);
        document.getElementById(colourId).value = this.palette[i];
    }
}

Canvas.prototype.createTable = function() {
    var self = this;
    var table = document.createElement('table');
    table.setAttribute('class', this.canvasClass);

    for (var i = 0; i < 16; i++) {
        var tr = table.insertRow();
        for (var j = 0; j < 16; j++) {
            var td = tr.insertCell();
            td.setAttribute('class', this.pixelClass);
            td.onclick = function() {self.changeCellColour(this)};
            td.style.border = '1px solid lightgrey';
            this.changeCellColour(td);
        }
    }

    document.getElementById(this.tableId).appendChild(table);
}

Canvas.prototype.changeCellColour = function(cell) {
    cell.setAttribute('name', this.currentColour);
    cell.style.backgroundColor = this.palette[this.currentColour];
}

Canvas.prototype.setCurrentColour = function(colour) {
    document.getElementsByClassName(this.selectedPaletteClass)[0].setAttribute('class', this.paletteClass);
    this.currentColour = colour;
    var paletteId = this.paletteIdBase.replace('x', colour);
    document.getElementById(paletteId).setAttribute('class', this.selectedPaletteClass);
}

Canvas.prototype.refreshPaletteTable = function() {
    for (var i = 0; i < this.palette.length; i++) {
        var paletteId = this.paletteIdBase.replace('x', i);
        document.getElementById(paletteId).style.backgroundColor = this.palette[i];
    }
}

Canvas.prototype.updatePalette = function() {
    for (var i = 0; i < this.palette.length; i++) {
        var colourId = this.colourIdBase.replace('x', i);
        this.palette[i] = document.getElementById(colourId).value;

        var elements = document.getElementsByName(i);
        for (var j = 0; j < elements.length; j++) {
            elements[j].style.backgroundColor = this.palette[i];
        }
    this.refreshPaletteTable();
    }

    return false
}

Canvas.prototype.toggleGrid = function() {
    var pixels = document.getElementsByClassName(this.pixelClass);
    if (this.grid) {
        for (var i = 0; i < pixels.length; i++) {
            pixels[i].style.border = '0px';
        }
        this.grid = false;
    } else {
        for (var i = 0; i < pixels.length; i++) {
            pixels[i].style.border = '1px solid lightgrey';
        }
        this.grid = true;
    }
}

Canvas.prototype.fillCanvas = function() {
    var pixels = document.getElementsByClassName(this.pixelClass);
    for (var i = 0; i < pixels.length; i++) {
        this.changeCellColour(pixels[i]);
    }
}

Canvas.prototype.buildImageString = function() {
    var imageArray = [];
    var pixels = document.getElementsByClassName(this.pixelClass);
    for (var i = 0; i < pixels.length; i++) {
        imageArray.push(pixels[i].getAttribute('name'));
    }
    return imageArray.toString()
}

Canvas.prototype.exportImage = function() {
    var exportString = this.palette.toString() + ',' + this.buildImageString();
    document.getElementById(this.imageStringId).value = exportString;
}

Canvas.prototype.importImage = function() {
    var imageImport = document.getElementById(this.imageStringId).value.split(',');
    if (imageImport.length != 260) {
        alert('ERROR: Cannot import image, incorrect data length.');
        return false
    }
    var paletteImport = imageImport.splice(0, 4);
    for (var i = 0; i < this.palette.length; i++) {
        var colourId = this.colourIdBase.replace('x', i);
        document.getElementById(colourId).value = paletteImport[i];
    }
    this.updatePalette();

    var pixels = document.getElementsByClassName(this.pixelClass);
    for (var i = 0; i < pixels.length; i++) {
        pixels[i].setAttribute('name', imageImport[i]);
        pixels[i].style.backgroundColor = palette[imageImport[i]];
    }

    return false
}

