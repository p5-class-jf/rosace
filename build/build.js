var myShader;
var gui = new dat.GUI();
var params = {
    Base_Size: 0.8,
    Size_Ratio: 1,
    N: 6,
    Stroke_Weight: 3,
    Show_Base_Circle: true,
    Download_Image: function () { return save(); }
};
gui.add(params, 'Base_Size', 0, 2, 0.1);
gui.add(params, 'Size_Ratio', 0, 3, 0.01);
gui.add(params, 'N', 2, 20, 1);
gui.add(params, 'Stroke_Weight', 0, 20, 1);
gui.add(params, 'Show_Base_Circle');
gui.add(params, "Download_Image");
function draw() {
    blendMode(BLEND);
    background(0);
    blendMode(ADD);
    var diameter = height * params.Base_Size;
    translate(width / 2, height / 2);
    rotate(TAU / 4);
    stroke(255);
    strokeWeight(params.Stroke_Weight * params.Base_Size);
    fill(30, 21, 17);
    if (params.Show_Base_Circle)
        ellipse(0, 0, diameter);
    for (var k = 0; k < params.N; ++k) {
        var p = p5.Vector.fromAngle(k * TAU / params.N).mult(diameter / 2);
        ellipse(p.x, p.y, diameter * params.Size_Ratio);
    }
}
function setup() {
    p6_CreateCanvas();
}
function windowResized() {
    p6_ResizeCanvas();
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map