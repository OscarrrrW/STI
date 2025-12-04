document.addEventListener('DOMContentLoaded', () => {
	const figure = document.getElementById('carFigure');
	if (!figure) return;

	const cars = [
		{ title: '1994 Impreza WRX STI', static: 'img/1994 STI.png', move: 'img/1994 STI Move.png', specs: ['EJ20 2.0T','GC8','143 MPH','256 HP','309 N.m','6.6 s'], desc: 'Released in 1994, the Subaru Impreza WRX STI Version I was the very first STI-branded performance model.' },
		{ title: '1995 Impreza WRX STI', static: 'img/1995 STI.png', move: 'img/1995 STI Move.png', specs: ['EJ20 2.0T','GC8','147 MPH','271 HP','319 N.m','4.8 s'], desc: 'The 1995 WRX STI Version II refined its chassis and rally bred suspension.' },
		{ title: '1996 Impreza WRX STI', static: 'img/1996 STI.png', move: 'img/1996 STI Move.png', specs: ['EJ20G 2.0T','GC8','143 MPH','256 HP','309 N.m','6.6 s'], desc: 'The 1996 WRX STI Version III brought lighter weight, sharper turbo response, and more rally focused suspension tuning, while mirroring Colin McRae’s iconic blue-and-gold WRC machine that continued Subaru’s dominance in the 1996 Rally Championship season.' },
		{ title: '1997 Impreza WRX STI', static: 'img/1997 STI.png', move: 'img/1997 STI Move.png', specs: ['EJ20K 2.0T','GC8','150 MPH','276 HP','330 N.m','5.3 s'], desc: 'The 1997 Subaru Impreza WRX STI Version IV delivered sharper handling, quicker turbo response, and a lighter GC8 body, while the iconic two-door Type R brought WRC inspired aerodynamics and character mirroring the era of Colin McRae and Richard Burns at the peak of Subaru’s rally dominance.' },
		{ title: '1998 Impreza WRX STI', static: 'img/1998 STI.png', move: 'img/1998 STI Move.png', specs: ['EJ20K 2.0T','GC8','150 MPH','276 HP','330 N.m','5.3 s'], desc: 'The 1998 Subaru Impreza WRX STI Version V sharpened the GC8 platform with tougher suspension, quicker turbo response, and WRC inspired aerodynamics, while the legendary 22B STI built to celebrate Subaru’s WRC triple crown stands as the ultimate GC8, hand built with a widebody and EJ22 powerhouse.' },
		{ title: '1999 Impreza WRX STI', static: 'img/1999 STI.png', move: 'img/1999 STI Move.png', specs: ['EJ20K 2.0T','GC8','150 MPH','276 HP','330 N.m','5.3 s'], desc: 'The 1999 Subaru Impreza WRX STI Version VI marked the final and most refined evolution of the GC8 platform, featuring improved rigidity, sharper turbo response.' },
		{ title: '2000 Impreza WRX STI', static: 'img/2000 STI.png', move: 'img/2000 STI Move.png', specs: ['EJ207 2.0T','GDB','155 MPH','276 HP','353 N.m','5.1 s'], desc: 'The 2000 Subaru Impreza WRX STI marked the beginning of the GDB era with the new “Bugeye” design, the debut of the DCCD system, a strengthened EJ207 engine, and a stiffer chassis setting the foundation for STI’s second golden age in both WRC and street performance.' },
		{ title: '2003 Impreza WRX STI', static: 'img/2003 STI.png', move: 'img/2003 STI Move.png', specs: ['EJ207 2.0T','GDB','156 MPH','276 HP','392 N.m','5.0 s'], desc: 'The 2003 Subaru Impreza WRX STI refined the GDB platform with upgraded DCCD, stronger chassis tuning, and the enhanced AVCS equipped EJ207, marking the crucial transition toward the “Blobeye” era and forming the foundation for the later flagship S203 and S204 models.' },
		{ title: '2005 Impreza WRX STI', static: 'img/2005 STI.png', move: 'img/2005 STI Move.png', specs: ['EJ207 2.0T','GDB','168 MPH','276 HP','392 N.m','4.9 s'], desc: 'The 2005 Subaru Impreza WRX STI represents the refined peak of the Blobeye era, featuring an improved EJ207, enhanced DCCD, strengthened chassis, and updated aerodynamics serving as the final stepping stone toward the celebrated Hawkeye generation and Subaru’s continued WRC success.' },
		{ title: '2008 Impreza WRX STI', static: 'img/2007 STI.png', move: 'img/2007 STI Move.png', specs: ['EJ257 2.5T','GRB','155 MPH','305 HP','393 N.m','4.9 s'], desc: 'The 2008 Subaru Impreza WRX STI (GRB) marked the first ever hatchback STI, introducing a wider track, stiffer chassis, advanced DCCD, and rally inspired aerodynamics ushering in a new era of handling precision and WRC bred dynamics for the STI lineage.' },
		{ title: '2019 Impreza WRX STI', static: 'img/2019 STI.png', move: 'img/2019 STI Move.png', specs: ['EJ257 2.5T','VA','159 MPH','310 HP','393 N.m','4.8 s'], desc: 'The 2019 Subaru WRX STI features a revised EJ257 with improved turbo and valvetrain, enhanced DCCD control, and stronger chassis tuning making it one of the most balanced and refined mass production STI models of the VA generation. ' }
	];

	const dotsContainer = document.querySelector('.dots');
	if (dotsContainer) {
		dotsContainer.innerHTML = '';
		cars.forEach((c, i) => {
			const d = document.createElement('div');
			d.className = 'dot' + (i === 0 ? ' active' : '');
			d.setAttribute('role', 'listitem');
			if (i === 0) d.setAttribute('aria-current', 'true');
			dotsContainer.appendChild(d);
		});
	}

	let current = 0;
	let isAnimating = false;

	const staticImg = figure.querySelector('.car-static');
	const raceImg = figure.querySelector('.car-race');

	const FIXED_DURATION_S = 3;

	function setRaceDimensions() {
		const h = figure.clientHeight;
		if (raceImg) {
			raceImg.style.height = h + 'px';
			raceImg.style.width = 'auto';
		}
	}

	function loadCar(index) {
		const car = cars[index];
		staticImg.src = car.static;
		staticImg.alt = car.title + ' static';
		raceImg.src = car.move;


		raceImg.alt = car.title + ' moving';

		const title = document.querySelector('.title-row h2');
		if (title) title.textContent = car.title;
		const desc = document.querySelector('.desc p');
		if (desc) desc.textContent = car.desc;
	

		const vals = Array.from(document.querySelectorAll('.specs .value'));
		car.specs.forEach((s, i) => { if (vals[i]) vals[i].textContent = s; });

		const dots = Array.from(document.querySelectorAll('.dots .dot'));
		dots.forEach((d, i) => {
			d.classList.toggle('active', i === index);
			d.setAttribute('aria-current', i === index ? 'true' : 'false');
		});
	}


	loadCar(current);

	function startRace() {
		if (!figure.classList.contains('racing')) {
			setRaceDimensions();
			figure.classList.add('racing');
			if (raceImg) raceImg.style.animationDuration = FIXED_DURATION_S + 's';
		}
	}

	function stopRace() {
		figure.classList.remove('racing');
		if (raceImg) raceImg.style.animationDuration = '';
	}


	figure.addEventListener('mouseenter', startRace);
	figure.addEventListener('mouseleave', stopRace);
	figure.addEventListener('touchstart', (e) => { startRace(); }, { passive: true });
	figure.addEventListener('touchend', stopRace);
	figure.addEventListener('touchcancel', stopRace);

	window.addEventListener('resize', () => { if (figure.classList.contains('racing')) setRaceDimensions(); });

	function transitionTo(newIndex, direction = 'next') {
		if (isAnimating || newIndex === current || newIndex < 0 || newIndex >= cars.length) return;
		isAnimating = true;

	    const outgoingStatic = staticImg.cloneNode(true);
	    outgoingStatic.className = 'car-temp outgoing';
	    outgoingStatic.style.position = 'absolute';
	    outgoingStatic.style.top = '50%';
	    outgoingStatic.style.left = '50%';
	    outgoingStatic.style.transform = 'translate(-50%, -50%)';
	    outgoingStatic.style.zIndex = 5;
	
		const fh = figure.clientHeight;
		if (fh) {
			outgoingStatic.style.height = fh + 'px';
			outgoingStatic.style.width = 'auto';
		}
		figure.appendChild(outgoingStatic);

		const incomingMove = document.createElement('img');
		incomingMove.className = 'car-temp incoming';
		incomingMove.src = cars[newIndex].move;
		incomingMove.alt = cars[newIndex].title + ' moving';
		incomingMove.style.position = 'absolute';
		incomingMove.style.top = '50%';

		incomingMove.style.left = '50%';
	
		incomingMove.style.transform = direction === 'next' ? 'translate(150%, -50%)' : 'translate(-150%, -50%)';
		incomingMove.style.zIndex = 6;
		if (fh) {
			incomingMove.style.height = fh + 'px';
			incomingMove.style.width = 'auto';
		}
		figure.appendChild(incomingMove);

		
		staticImg.style.visibility = 'hidden';

	
		const animateTemps = () => {
			const dur = 700; 
	
			outgoingStatic.style.transition = `transform ${dur}ms linear`;
			incomingMove.style.transition = `transform ${dur}ms linear`;
			outgoingStatic.style.transform = direction === 'next' ? 'translate(-150%, -50%)' : 'translate(150%, -50%)';

			incomingMove.style.transform = 'translate(-50%, -50%)';

			const onEnd = () => {

				current = newIndex;
				loadCar(current);

				staticImg.style.visibility = '';

				try { outgoingStatic.remove(); } catch (e) {}
				try { incomingMove.remove(); } catch (e) {}
				isAnimating = false;
			};

			incomingMove.addEventListener('transitionend', onEnd, { once: true });
	
			setTimeout(() => { if (isAnimating) onEnd(); }, dur + 120);
		};


		if (incomingMove.complete) {
			
			requestAnimationFrame(animateTemps);
		} else {
			incomingMove.onload = () => requestAnimationFrame(animateTemps);
			incomingMove.onerror = () => setTimeout(animateTemps, 50);
		}
	}

	const btnPrev = document.querySelector('.pager .prev');
	const btnNext = document.querySelector('.pager .next');
	if (btnNext) btnNext.addEventListener('click', () => transitionTo(Math.min(cars.length - 1, current + 1), 'next'));
	if (btnPrev) btnPrev.addEventListener('click', () => transitionTo(Math.max(0, current - 1), 'prev'));
});



document.addEventListener('DOMContentLoaded', () => {
	const btns = Array.from(document.querySelectorAll('.switch .btn, .paper .btn'));
	if (!btns.length) return;

	const setPressed = (b) => b.classList.add('pressed');
	const clearPressed = (b) => b.classList.remove('pressed');

	btns.forEach(btn => {
		btn.addEventListener('pointerdown', (e) => { if (e.isPrimary) setPressed(btn); });
		btn.addEventListener('pointerup', () => clearPressed(btn));
		btn.addEventListener('pointercancel', () => clearPressed(btn));


		btn.addEventListener('keydown', (e) => {
			if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter') { e.preventDefault(); setPressed(btn); }
		});
		btn.addEventListener('keyup', (e) => {
			if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter') {
				clearPressed(btn);
				try { btn.click(); } catch (err) { /* ignore */ }
			}
		});

		btn.addEventListener('click', () => setTimeout(() => clearPressed(btn), 0));
	});

	const clearAll = () => btns.forEach(clearPressed);
	window.addEventListener('pointerup', clearAll);
	window.addEventListener('pointercancel', clearAll);
	window.addEventListener('blur', clearAll);
	document.addEventListener('visibilitychange', () => { if (document.visibilityState !== 'visible') clearAll(); });
});

