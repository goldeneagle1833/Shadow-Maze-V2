class Player {
    constructor(){
        this.pos = createVector(0,250)
        this.rays = []
        for (let angle = 0; angle < 360; angle+=20) {
            this.rays.push(new Vision(this.position, radians(angle)))
            
        }
    }
    drawLines(){

    }
    move(){

    }
    
    show(x,y){
        fill(255)
        ellipse(/*this.position.x, this.position.y*/x,y, 10)
        // for(let ray of this.rays){
        //     ray.show()
        // }
    }
    playerPostion(x,y){
        this.pos.set(x,y)
    }
    

}

