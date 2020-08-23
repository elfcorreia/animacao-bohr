let canvas = document.getElementById("canvas");
		const ctx = canvas.getContext('2d');
		
		let niveis = ["K", "L", "M", "N", "O", "P", "Q"];
		let eletrons = { K: [], L: [], M: [], N: [], O: [], P: [], Q: [] };
		let protons = [];
		let neutrons = [];		

		function simulacao() {
			for (let nivel in eletrons) {
				eletrons[nivel] = eletrons[nivel].map((e) => {					
					return { theta: e.theta + e.omega, omega: e.omega }; 
				});				
			}
			organizar();
		}

		function organizar() {
//			let velocidade_ideal = 2*Math.PI / 72;
//			for (let nivel in eletrons) {
//				let d_ideal = 2*Math.PI / eletrons[nivel].length;
//				for (let i = 1; i < eletrons[nivel].length; i++) {
//					let d = eletrons[nivel][i - 1].theta - eletrons[nivel][i].theta;
//					eletrons[nivel][i].omega = velocidade_ideal;
//					console.log(d);
//					if (d > 0) {
//						eletrons[nivel][i].omega -= Math.abs(d/d_ideal) * 0.5*velocidade_ideal;
//					} else if (d < 0) {
//						eletrons[nivel][i].omega += Math.abs(d/d_ideal) * 0.5*velocidade_ideal;
//					}
//				}
//			}
		}

		function render() {
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
			for (let nivel in eletrons) {
				let nr = proton_radius + nivel_gap * (niveis.indexOf(nivel) + 1);
				ctx.beginPath();
				ctx.arc(cx, cy, nr, 0, 2*Math.PI);
				ctx.stroke();

				ctx.fillStyle = "blue";
				for (let i = 0; i < eletrons[nivel].length; i++) {
					ctx.beginPath();
					ctx.arc(
						cx + nr*Math.cos(eletrons[nivel][i].theta), 
						cy + nr*Math.sin(eletrons[nivel][i].theta), 
						eletron_radius, 
						0, 
						2*Math.PI
					);
					ctx.fill();
				}	
			}			
		}
		
		function animate() {
			render();
			requestAnimationFrame(animate);
		}

		setInterval(simulacao, 50);
		animate();

		document.addEventListener("DOMContentLoaded", function() {
			[	"eletrons_K", "eletrons_L", "eletrons_M", 
				"eletrons_N", "eletrons_O", "eletrons_P", 
				"eletrons_Q"	].forEach(id => {
				
				let edit = document.getElementById(id);
				let menos = edit.previousSibling;
				let mais = edit.nextSibling;
				let nivel = edit.id.split("_")[1];

				edit.value = 0;
				mais.addEventListener("click", (e) => {
					let v = parseInt(edit.value);
					if (v < 32) {
						edit.value = v + 1;
						eletrons[nivel].push({
							r: 30 + 20, 
							theta: Math.PI / 18,
							omega: Math.PI / 72,
						});
					}
				});
				menos.addEventListener("click", (e) => {
					let v = parseInt(edit.value);
					if (v > 0) {
						edit.value = v - 1;
						eletrons[nivel] = eletrons[nivel].slice(0, eletrons[nivel].length - 1);
					}
				});
			});
		});