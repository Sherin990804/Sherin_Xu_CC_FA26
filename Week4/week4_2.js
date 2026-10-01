// let wavesPerCanvas = 2
// let amplitude = 100
// let offset = 0
// let yLoc
// let speed = 0.01

let numWaves = 10

function setup(){
    createCanvas(windowWidth,windowHeight)
    // yLoc = height/2
    noFill()
}

function draw(){

    background(230)

    // sinWave(4,150,height/2,0.05)
    // sinWave(0,80,height*0.8,0.2)
    // sinWave(100,2,height*0.2,0.01)
    // 三条不同的sin曲线

    // print(wavesPerFunction)
    // 这一句啥意思

    for(let i = 0; i<numWaves; i++){
        sinWave(i,80, height/i, i*0.05 )
        let yLoc = map(i,0,numWaves,0.1)*height
        let speed
        if(i%2 ==0){
            speed = 0.1
        }

        sinwave(i,20,yLoc,i * 0.01)

    }

}

function sinwave(wavesPerCanvas,amplitude,yLoc,speed){

    push()
    translate(0,yLoc)

    beginShape()
    for(let i=0; i<width;i++){

        let mappedI = map(i,0,width,0,WavesPerCanvas_P1)
        let y = sin(mappedI-offset)*amplitude
        let x = i
        vertex(x,y)

    }
    endShape()   
    
    pop()
    
    offset = frameCount*speed
}