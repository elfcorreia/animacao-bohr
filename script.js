function Simulacao() {
	let self = this;
	let canvas = document.getElementById("canvas");
	const ctx = canvas.getContext('2d');
	
	const speed = Math.PI / 30;
	const proton_radius = 6;
	const eletron_radius = 3;			
	const nivel_nucleo_gap = 40;
	const nivel_gap = 25;
	const cor_proton = 'rgba(180, 82, 82, 0.9)';
	const cor_neutron = 'rgba(33, 33, 35, 0.9)';
	const cor_eletron = '#4b80ca';	
	const cor_fundo = 'white';
	const cor_nivel = '#ccc';

	this.step = function() {
		self.nbody.step();		
		for (let nivel in self.eletrons) {
			self.eletrons[nivel] = self.eletrons[nivel].map((e) => {					
				return { theta: e.theta + e.omega, omega: e.omega }; 
			});
		}
	}

	this.updateNucleoNBody = function() {
		let n = self.protons.length + self.neutrons.length;
		self.nbody = new NBodySimulation(n, proton_radius*2, 1, 5e-1, 0.5);
	}

	this.addProton = function () {
		self.protons.push({x: 0, y: 0});
		self.updateNucleoNBody();
	}
	this.removeProton = function () {		
		if (self.protons.length > 0) {
			self.protons = self.protons.slice(0, self.protons.length - 1);
			self.updateNucleoNBody();
		}
	}
	this.getTotalProtons = function () {
		return self.protons.length;
	}

	this.addNeutron = function () {
		self.neutrons.push({x: 0, y: 0});
		self.updateNucleoNBody();
	}
	this.removeNeutron = function () {
		if (self.neutrons.length > 0) {
			self.neutrons = self.neutrons.slice(0, self.neutrons.length - 1);
			self.updateNucleoNBody();
		}
	}
	this.getTotalNeutrons = function() {
		return self.neutrons.length;
	}

	this.addEletron = function (nivel) {
		self.eletrons[nivel].push({ theta: 0, omega: speed });
	}
	this.removeEletron = function (nivel) {
		if (self.eletrons[nivel].length > 0) {
			self.eletrons[nivel] = self.eletrons[nivel].slice(0, self.eletrons[nivel].length - 1);
		}		
	}
	this.getTotalEletrons = function (nivel) {
		if (nivel) {
			return self.eletrons[nivel].length;
		}
		let total = 0;
		for (let nivel in self.eletrons) {
			total += self.eletrons[nivel].length;
		}
		return total;		
	}	

	this.render = function () {	
		let cx = canvas.width/2;
		let cy = canvas.height/2;
	
		ctx.fillStyle = cor_fundo;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		
		let idxProton = 0;
		let idxNeutron = 0;		
		//let neutronsOffset = self.protons.length;
		let idxNBody = 0;
		let n = self.nbody.getN();
		while (idxNBody < n) {			
			if (idxProton < self.protons.length) {
				let aux =  self.nbody.getObject(idxNBody);
				ctx.beginPath();
				ctx.fillStyle = cor_proton;
				ctx.arc(cx + aux.x, cy + aux.y, proton_radius, 0, 2*Math.PI);
				ctx.fill();
				idxProton++;
				idxNBody++;
			}
			if (idxNeutron < self.neutrons.length) {
				let aux = self.nbody.getObject(idxNBody);
				ctx.beginPath();
				ctx.fillStyle = cor_neutron;
				ctx.arc(cx + aux.x, cy + aux.y, proton_radius, 0, 2*Math.PI);
				ctx.fill();
				idxNeutron++;
				idxNBody++;
			}			
		}
	
		ctx.strokeStyle = cor_nivel;
		//console.log(self.eletrons);
		for (let nivel in self.eletrons) {
			let nr = proton_radius + nivel_nucleo_gap + nivel_gap * (self.niveis.indexOf(nivel) + 1);
			ctx.beginPath();
			ctx.setLineDash([5, 5]);
			ctx.arc(cx, cy, nr, 0, 2*Math.PI);
			ctx.stroke();
			
	
			ctx.fillStyle = cor_eletron;
			for (let i = 0; i < self.eletrons[nivel].length; i++) {
				//console.log(self.eletrons[nivel][i]);
				ctx.beginPath();				
				ctx.arc(
					cx + nr*Math.cos(self.eletrons[nivel][i].theta), 
					cy + nr*Math.sin(self.eletrons[nivel][i].theta), 
					eletron_radius, 
					0, 
					2*Math.PI
				);
				ctx.fill();
			}	
		}			
	}

	this.animate = function animate() {
		self.render();
		requestAnimationFrame(self.animate);
	}
	this.start = function() {
		setInterval(self.step, 50);
		self.animate();
	}

	this.niveis = ["k", "l", "m", "n", "o", "p", "q"];
	this.eletrons = { k: [], l: [], m: [], n: [], o: [], p: [], q: [] };
	this.protons = [];
	this.neutrons = [];	
	this.updateNucleoNBody();
}