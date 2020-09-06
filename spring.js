function NBodySimulation(n, ideal_length, k, g, decay) {

    this.getObject = function (index) {
        return self.objects[index];
    }    
    
    this.getN = function () {
        return self.n;
    }

    this.step = function() {
        self.calculateSpringForces();                
        self.clipForces();
        self.calculateCenterForces();
        self.updatePositions();        
    }

    this.calculateSpringForces = function() {
        for (let i = 0; i < self.objects.length - 1; i++) {            
            for (let j = i + 1; j < self.objects.length; j++) {
                let dx = self.objects[j].x - self.objects[i].x;
                let dy = self.objects[j].y - self.objects[i].y;                
                let norma = dx*dx + dy*dy;                
                let distancia = Math.sqrt(norma);
                if (Math.abs(distancia) < 1e-5) {
                    continue;
                }

                dx /= distancia;
                dy /= distancia;                
                if (isNaN(dx) || isNaN(dy)) {
                    console.error("dx", dx, "dy", dy);
                }
                let d = self.ideal_length - distancia;
                if (Math.abs(d) < 1e-5) {
                    continue;
                }
                if (isNaN(d)) {
                    console.log("d", d);
                }
                if (Math.random() < 0.5) {
                    self.applyForce(i, -0.5*self.k*d*dx, -0.5*self.k*d*dy);
                    self.applyForce(j,  0.5*self.k*d*dx,  0.5*self.k*d*dy);           
                }
            }
        }
    }

    this.calculateCenterForces = function() {
        for (let i = 0; i < self.objects.length; i++) {
            let dx = self.objects[i].x;
            let dy = self.objects[i].y;
            let norma = dx*dx + dy*dy;
            let distancia = Math.sqrt(norma);
            if (Math.abs(distancia) < 1e-5) {
                continue;
            }
            dx /= distancia;
            dy /= distancia;                
            if (isNaN(dx) || isNaN(dy)) {
                console.log("dx", dx, "dy", dy);
            }
            let f = self.g / self.objects.length*distancia;
            if (Math.abs(f) < 1e-5) {
                continue;
            }
            if (isNaN(f)) {
                console.log("f", f);
            }            
            self.applyForce(i, -f*dx, -f*dy);
        }
    }

    this.applyForce = function(index, fx, fy) {
        self.objects[index].fx += fx;
        self.objects[index].fy += fy;
    }

    this.clipForces = function() {
        for(let i = 0; i < self.objects.length; i++) {
            let o = self.objects[i];            
            let normaSquare = o.fx * o.fx + o.fy * o.fy;
            if (normaSquare < 2) { continue; }
            let norma = Math.sqrt(normaSquare);
            o.x = o.x;
            o.y = o.y;
            o.fx = o.fx / norma;
            o.fy = o.fy / norma;           
        }
    }

    this.updatePositions = function() {        
        for (let i = 0; i < self.objects.length; i++) {
            let o = self.objects[i];            
            o.x = o.x + o.fx;
            o.y = o.y + o.fy;
            o.fx = (1 - self.decay)*o.fx;
            o.fy = (1 - self.decay)*o.fy;                        
        }
    }    

    this.getWork = function () {
        return self.work;
    }    

    let self = this;
    this.ideal_length = ideal_length || 1;
    this.k = k || 1;
    this.g = g || 1;
    this.decay = decay || 1;
    this.objects = [];
    this.n = n;
    this.work = parseFloat('Infinity');    
    
    for (let i = 0; i < n; i++) {
        let rx = this.ideal_length*2*Math.random() - this.ideal_length;
        let ry = this.ideal_length*2*Math.random() - this.ideal_length;
        this.objects.push({x: rx, y: ry, fx: 0, fy: 0});
    }
}