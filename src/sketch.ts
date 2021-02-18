let myShader: p5.Shader

// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    Base_Size: 0.8,
    Size_Ratio: 1,
    N: 6,
    Stroke_Weight: 3,
    Show_Base_Circle: true,
    Download_Image: () => save()
}
gui.add(params, 'Base_Size', 0, 2, 0.1)
gui.add(params, 'Size_Ratio', 0, 3, 0.01)
gui.add(params, 'N', 2, 20, 1)
gui.add(params, 'Stroke_Weight', 0, 20, 1)
gui.add(params, 'Show_Base_Circle')
gui.add(params, "Download_Image")

// -------------------
//       Drawing
// -------------------

function draw() {
    blendMode(BLEND)
    background(0)
    blendMode(ADD)
    const diameter = height * params.Base_Size
    // Set (0, 0) as the center
    translate(width/2, height/2)
    // Set angle 0 to point vertically
    rotate(TAU/4)
    //
    stroke(255)
    strokeWeight(params.Stroke_Weight * params.Base_Size)
    fill(30, 21, 17)
    // Base circle
    if (params.Show_Base_Circle)
        ellipse(0, 0, diameter)
    // All the circles on the base one
    for (let k = 0; k < params.N; ++k) {
        const p = p5.Vector.fromAngle(k * TAU / params.N).mult(diameter / 2)
        ellipse(p.x, p.y, diameter * params.Size_Ratio)
    }
}

// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()
}

function windowResized() {
    p6_ResizeCanvas()
}