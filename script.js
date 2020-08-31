let canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

function Simulacao() {
	let self = this;

	const speed = Math.PI / 72;

	this.niveis = ["k", "l", "m", "n", "o", "p", "q"];
	this.eletrons = { k: [], l: [], m: [], n: [], o: [], p: [], q: [] };
	this.protons = [];
	this.neutrons = [];

	this.passo = function() {
		//console.log(self.eletrons);
		for (let nivel in self.eletrons) {
			self.eletrons[nivel] = self.eletrons[nivel].map((e) => {					
				return { theta: e.theta + e.omega, omega: e.omega }; 
			});
		}
	}

	this.addProton = function () {
		console.log("addProton");
		this.protons.push({});
	}
	this.removeProton = function () {
		console.log("removeProton");
	}
	this.getTotalProtons = function () {
		return this.protons.length;
	}

	this.addNeutron = function () {
		console.log("addNeutron");
		this.neutrons.push({});
	}
	this.removeNeutron = function () {
		console.log("removeNeutron");
	}
	this.getTotalNeutrons = function() {
		return this.neutrons.length;
	}

	this.addEletron = function (nivel) {
		console.log("addEletron", nivel);
		self.eletrons[nivel].push({ theta: 0, omega: speed });
	}
	this.removeEletron = function (nivel) {
		//console.log("removeEletron", nivel);
		self.eletrons[nivel] = self.eletrons[nivel].slice(0, self.eletrons[nivel].length - 1);
	}
	this.getTotalEletrons = function (nivel) {
		if (nivel) {
			return this.eletrons[nivel].length;
		}
		let total = 0;
		for (let nivel in this.eletrons) {
			total += this.eletrons[nivel].length;
		}
		return total;		
	} 

	this.render = function () {
		const proton_radius = 16;
		const eletron_radius = 4;			
		const nivel_gap = 30;
	
		let cx = canvas.width/2;
		let cy = canvas.height/2;
	
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	
		ctx.fillStyle = 'red';
		ctx.beginPath();
		ctx.arc(cx, cy, proton_radius, 0, 2*Math.PI);
		ctx.fill();			
	
		ctx.strokeStyle = "gray";
		//console.log(self.eletrons);
		for (let nivel in self.eletrons) {
			let nr = proton_radius + nivel_gap * (self.niveis.indexOf(nivel) + 1);
			ctx.beginPath();
			ctx.arc(cx, cy, nr, 0, 2*Math.PI);
			ctx.stroke();
	
			ctx.fillStyle = "blue";
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
		setInterval(this.passo, 50);
		this.animate();
	}
}

// document.addEventListener("DOMContentLoaded", function() {
// [	"eletrons_K", "eletrons_L", "eletrons_M", 
// 	"eletrons_N", "eletrons_O", "eletrons_P", 
// 	"eletrons_Q"	].forEach(id => {
	
// 	let edit = document.getElementById(id);
// 	let menos = edit.previousSibling;
// 	let mais = edit.nextSibling;
// 	let nivel = edit.id.split("_")[1];

// 	edit.value = 0;
// 	mais.addEventListener("click", (e) => {
// 		let v = parseInt(edit.value);
// 		if (v < 32) {
// 			edit.value = v + 1;
// 			eletrons[nivel].push({
// 				r: 30 + 20, 
// 				theta: Math.PI / 18,
// 				omega: Math.PI / 72,
// 			});
// 		}
// 	});
// 	menos.addEventListener("click", (e) => {
// 		let v = parseInt(edit.value);
// 		if (v > 0) {
// 			edit.value = v - 1;
// 			eletrons[nivel] = eletrons[nivel].slice(0, eletrons[nivel].length - 1);
// 		}
// 	});
// });
// });