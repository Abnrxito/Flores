/* ================================================================
   💛 CONFIGURACIÓN PERSONAL DEL REGALO — edita solo esta sección
   ================================================================ */
const recipientName = 'Para Mi Amada Alexa';
const mainMessage = 'Para la persona que hace mis días un poquito más bonitos. 💛';
const flowerMessages = ['Te quiero 💛', 'Siempre pienso en ti 🌻', 'Gracias por existir ✨', 'Me haces muy feliz 💛'];
const loveLetter = `Hoy quise hacerte este pequeño detalle, porque aunque quizá no sea la persona más expresiva del mundo y muchas veces me cueste encontrar las palabras correctas para decir todo lo que siento, quería hacer algo que pudiera demostrarte aunque sea un poquito de todo el cariño y amor que tengo por ti.

Quise dedicarte esta página porque no quería que simplemente fueras una espectadora de este pequeño detalle, sino que sintieras que está hecho especialmente para ti. Puede que no sea algo enorme ni perfecto, pero está hecho con muchísimo cariño, pensando en ti y en lo especial que eres para mí.

A veces me cuesta expresar lo que siento. Hay cosas que pienso y quiero decirte, pero cuando llega el momento simplemente no sé cómo explicarlas. Supongo que también es porque con el tiempo he aprendido a guardarme muchas cosas y a no demostrar tanto lo que llevo dentro. Pero eso no significa que sienta menos, al contrario.

Aunque no siempre lo diga, te quiero muchísimo. Me importas más de lo que probablemente alcanzas a imaginar y me hace feliz poder compartir contigo momentos, conversaciones, risas y hasta esas pequeñas cosas que quizá parecen insignificantes, pero que terminan siendo las que más recuerdo.

Y si algo quiero que sepas es que no tienes que esperar a que yo sea extremadamente expresivo para saber lo que significas para mí. A veces mi manera de demostrar cariño está en preocuparme por ti, en querer saber cómo estás, en escuchar lo que tienes que decirme, en intentar sacarte una sonrisa o simplemente en querer estar presente cuando me necesites.

Por eso quise hacerte esto. Porque quizá no siempre puedo decirte todo lo que siento directamente, pero sí puedo intentar dejar un pedacito de ese cariño en algo que puedas guardar y recordar.

Espero que cuando veas esta página recuerdes que detrás de ella hay alguien que te quiere muchísimo, que te admira, que valora tenerte en su vida y que, aunque a veces sea medio menso para expresar sus sentimientos jsjs, siempre va a guardar un cariño muy especial por ti.

Gracias por ser tú, por tu forma de ser, por cada momento que hemos compartido y por todas esas pequeñas cosas que hacen que seas tan especial para mí.

Y bueno, mi niña, este pequeño detalle es para ti mi amor 

Quizá no sea la mejor forma de decir todo lo que siento, pero es mi manera de intentar demostrarte que eres alguien muy importante para mí.

Te quiero muchísimo, mi niña hermosa.
Y espero que cuando leas esto puedas sentir, aunque sea un poquito, todo el cariño con el que hice este detalle especialmente para ti.

Gracias por hacer especial cada momento. Ojalá que estas flores amarillas te recuerden lo mucho que te quiero.`;
const letterSignature = 'Con todo mi amor,\nTu Esposo <3';

// Deben ser exactamente cinco canciones. Reemplaza únicamente title y url.
const songs = [
  { title: 'Cien Años', url: 'music/Cienyears.mp3' },
  { title: 'Contigo', url: 'music/Contigo.mp3' },
  { title: 'Mi Buen Amor', url: 'music/Mi%20Buen%20Amor.mp3' },
  { title: 'My Kind of Woman', url: 'music/My%20Kind%20of%20Woman.mp3' },
  { title: 'Sabor a Mi', url: 'music/Sabor a Mí.mp3' }
];

/* 1. REFERENCIAS DOM Y PERSONALIZACIÓN */
const $ = selector => document.querySelector(selector);
const recipientLabel = $('#recipientLabel');
recipientLabel.textContent = recipientName.toUpperCase();
$('#mainMessage').textContent = mainMessage;
$('#letterTitle').textContent = `${recipientName},`;
$('#letterBody').textContent = loveLetter;
$('#letterSignature').textContent = letterSignature;

/* 2. INTRO CINEMÁTICA */
const intro = $('#intro');
intro.style.pointerEvents = 'none';
$('#skipIntro').style.pointerEvents = 'auto';
function finishIntro() { intro.classList.add('done'); $('#experience').classList.remove('is-hidden'); }
$('#skipIntro').addEventListener('click', finishIntro);
window.setTimeout(finishIntro, 5900);

/* 3. JARDÍN: ilustración, brisa ambiental y reacción cercana */
const flowersRoot = $('#flowers'), backFlowers = $('#backFlowers'), garden = $('#garden');
const petals = Array.from({ length: 12 }, () => '<i class="petal"></i>').join('');
const layout = [
  ['sunflower', '2%', '120px', .78], ['tulip', '13%', '112px', .68], ['sunflower', '25%', '164px', 1],
  ['tulip', '43%', '145px', .87], ['sunflower', '59%', '156px', .93], ['tulip', '77%', '114px', .72]
];
layout.forEach(([type, x, size, depth], index) => {
  const head = type === 'sunflower' ? `<div class="flower-head" style="--head:${size}">${petals}<i class="center"></i></div>` : '<div class="tulip-head"></div>';
  flowersRoot.insertAdjacentHTML('beforeend', `<div class="flower ${type}" data-index="${index}" style="--x:${x};--size:${size};opacity:${.8 + depth * .2}"><i class="stem"></i><i class="leaf leaf-a"></i><i class="leaf leaf-b"></i>${head}<span class="flower-message"></span></div>`);
});
for (let i = 0; i < 28; i++) backFlowers.insertAdjacentHTML('beforeend', `<span class="tiny" style="left:${Math.random()*100}%;bottom:${Math.random()*90}%;--speed:${3+Math.random()*4}s;--delay:-${Math.random()*5}s">✿</span>`);
const flowerNodes = [...document.querySelectorAll('.flower')];
let pointer = { x: -9999, y: -9999, speed: 0, active: false, lastX: 0, lastY: 0 };
function readPointer(event) { const rect = garden.getBoundingClientRect(); const dx = event.clientX - pointer.lastX, dy = event.clientY - pointer.lastY; pointer.x = event.clientX - rect.left; pointer.y = event.clientY - rect.top; pointer.speed = Math.min(1, Math.hypot(dx, dy) / 36); pointer.lastX = event.clientX; pointer.lastY = event.clientY; pointer.active = true; }
garden.addEventListener('pointermove', readPointer, { passive: true });
garden.addEventListener('pointerdown', event => { readPointer(event); garden.setPointerCapture?.(event.pointerId); }, { passive: true });
garden.addEventListener('pointerleave', () => pointer.active = false, { passive: true });
garden.addEventListener('pointerup', () => pointer.active = false, { passive: true });

// Viento de transición lenta: calma → brisa → ráfaga → calma.
let wind = .32, targetWind = .32, nextWindChange = 0;
const windWords = ['calma dorada', 'una brisa suave', 'el jardín suspira', 'una pequeña ráfaga'];
function updateWind(now) { if (now > nextWindChange) { targetWind = [.16, .32, .52, .78][Math.floor(Math.random() * 4)]; nextWindChange = now + 5200 + Math.random() * 7000; } wind += (targetWind - wind) * .006; $('#windLabel').textContent = windWords[wind < .24 ? 0 : wind < .43 ? 1 : wind < .64 ? 2 : 3]; }
let lastMessage = 0;
function animateGarden(now) { updateWind(now); const box = garden.getBoundingClientRect(); flowerNodes.forEach((flower, index) => { const x = parseFloat(flower.style.getPropertyValue('--x')) / 100 * box.width; const y = box.height * .54; const distance = Math.hypot(pointer.x - x, pointer.y - y); const close = pointer.active ? Math.max(0, 1 - distance / 175) : 0; const phase = now / (1550 + index * 183) + index * 1.7; const ambient = Math.sin(phase) * (1.5 + wind * 4.7) + Math.sin(phase * .43) * wind * 2; const interact = close * ((pointer.x - x) / 55 + pointer.speed * 4); const tilt = ambient + interact; flower.style.transform = `rotate(${tilt.toFixed(2)}deg)`; const head = flower.querySelector('.flower-head,.tulip-head'); if (head) head.style.transform = `translateX(calc(-50% + ${(tilt * .55).toFixed(2)}px)) rotate(${(tilt*.22).toFixed(2)}deg)`; flower.style.filter = close > .55 ? 'drop-shadow(0 0 10px #fff2a8)' : 'drop-shadow(0 8px 5px #32452222)'; if (close > .87 && now - lastMessage > 3800) { const bubble = flower.querySelector('.flower-message'); bubble.textContent = flowerMessages[Math.floor(Math.random() * flowerMessages.length)]; bubble.classList.add('show'); setTimeout(() => bubble.classList.remove('show'), 2100); lastMessage = now; } }); requestAnimationFrame(animateGarden); }
requestAnimationFrame(animateGarden);

/* 4. PARTÍCULAS: pétalos, luces y luciérnagas con límite de rendimiento */
const canvas = $('#particles'), ctx = canvas.getContext('2d');
let particles = [], pixelRatio = 1;
function resizeCanvas() { pixelRatio = Math.min(devicePixelRatio || 1, 2); canvas.width = innerWidth * pixelRatio; canvas.height = innerHeight * pixelRatio; canvas.style.width = `${innerWidth}px`; canvas.style.height = `${innerHeight}px`; ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0); }
function particle(initial = false) { return { x: Math.random() * innerWidth, y: initial ? Math.random() * innerHeight : -20, r: 1 + Math.random() * 3, speed: .18 + Math.random() * .55, drift: (Math.random() - .5) * .5, spin: Math.random() * 6, kind: Math.random() > .52 ? 'petal' : 'light', alpha: .22 + Math.random() * .45 }; }
function particleLoop() { ctx.clearRect(0, 0, innerWidth, innerHeight); particles.forEach(p => { p.y += p.speed * (1 + wind); p.x += p.drift + Math.sin(p.spin += .018) * .18; if (p.y > innerHeight + 25 || p.x < -30 || p.x > innerWidth + 30) Object.assign(p, particle()); ctx.save(); ctx.translate(p.x, p.y); ctx.globalAlpha = p.alpha; if (p.kind === 'petal') { ctx.rotate(p.spin); ctx.fillStyle = '#edbd31'; ctx.beginPath(); ctx.ellipse(0, 0, p.r *.65, p.r * 1.25, 0, 0, Math.PI * 2); ctx.fill(); } else { ctx.fillStyle = '#fff6ad'; ctx.shadowColor = '#ffe97d'; ctx.shadowBlur = 8; ctx.beginPath(); ctx.arc(0, 0, p.r *.5, 0, Math.PI * 2); ctx.fill(); } ctx.restore(); }); requestAnimationFrame(particleLoop); }
resizeCanvas(); particles = Array.from({ length: innerWidth < 600 ? 22 : 38 }, () => particle(true)); particleLoop(); window.addEventListener('resize', resizeCanvas, { passive: true });

/* 5. REPRODUCTOR — lista circular de exactamente cinco canciones */
const audio = $('#audio'), trackName = $('#trackName'), audioStatus = $('#audioStatus'), progress = $('#progress');
let songIndex = 0;
const timeText = seconds => Number.isFinite(seconds) ? `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}` : '0:00';
function loadSong(index, autoplay = false) { songIndex = (index + songs.length) % songs.length; audio.src = songs[songIndex].url; trackName.textContent = songs[songIndex].title; audioStatus.textContent = 'Lista para sonar'; progress.value = 0; $('#currentTime').textContent = '0:00'; $('#duration').textContent = '0:00'; if (autoplay) audio.play().catch(() => { audioStatus.textContent = 'Toca play para escuchar'; }); }
function syncAudio() { const playing = !audio.paused; $('#play').textContent = playing ? 'Ⅱ' : '▶'; $('#play').setAttribute('aria-label', playing ? 'Pausar' : 'Reproducir'); audioStatus.textContent = playing ? 'Reproduciendo ahora' : 'En pausa'; }
$('#play').addEventListener('click', () => { if (audio.paused) audio.play().catch(() => showToast('Esta canción no pudo cargarse todavía.')); else audio.pause(); });
$('#previous').addEventListener('click', () => loadSong(songIndex - 1, true)); $('#next').addEventListener('click', () => loadSong(songIndex + 1, true));
$('#volume').addEventListener('input', event => { audio.volume = event.target.value; audio.muted = false; $('#mute').textContent = '♬'; });
$('#mute').addEventListener('click', () => { audio.muted = !audio.muted; $('#mute').textContent = audio.muted ? '♩' : '♬'; });
audio.addEventListener('play', syncAudio); audio.addEventListener('pause', syncAudio); audio.addEventListener('loadedmetadata', () => $('#duration').textContent = timeText(audio.duration));
audio.addEventListener('timeupdate', () => { progress.value = audio.duration ? audio.currentTime / audio.duration * 100 : 0; $('#currentTime').textContent = timeText(audio.currentTime); });
progress.addEventListener('input', () => { if (Number.isFinite(audio.duration)) audio.currentTime = audio.duration * progress.value / 100; });
audio.addEventListener('ended', () => loadSong(songIndex + 1, true)); audio.addEventListener('error', () => { $('#play').textContent = '▶'; audioStatus.textContent = 'No se pudo cargar esta URL'; }); loadSong(0);

/* 6. MINIJUEGO robusto: Web Animations API, mouse y touch */
const gameField = $('#gameField'), scoreEl = $('#score'), notice = $('#gameNotice'), restart = $('#restartGame');
let score = 0, gameRunning = false, spawnInterval = null, activeItems = new Set();
function removeGameItem(item) { activeItems.delete(item); item.remove(); }
function catchItem(item) { if (!activeItems.has(item)) return; item.getAnimations().forEach(animation => animation.cancel()); item.animate([{ transform: 'scale(1)', opacity: 1 }, { transform: 'translateY(-45px) scale(1.65)', opacity: 0 }], { duration: 330, fill: 'forwards' }); score++; scoreEl.textContent = score; setTimeout(() => removeGameItem(item), 330); if (score >= 10) completeGame(); }
function spawnItem(startVisible = false) { if (!gameRunning || activeItems.size > 7) return; const item = document.createElement('button'); item.type = 'button'; item.className = 'catchable'; item.textContent = Math.random() > .32 ? '🌼' : '💛'; item.style.left = `${7 + Math.random() * 82}%`; item.style.top = startVisible ? '7px' : '-48px'; gameField.appendChild(item); activeItems.add(item); item.addEventListener('pointerdown', event => { event.preventDefault(); catchItem(item); }); const animation = item.animate([{ top: item.style.top, transform: 'rotate(0deg)' }, { top: '101%', transform: `rotate(${Math.random() * 120 - 60}deg)` }], { duration: 2400 + Math.random() * 1300, easing: 'linear', fill: 'forwards' }); animation.onfinish = () => removeGameItem(item); }
function clearGame() { clearInterval(spawnInterval); activeItems.forEach(item => item.remove()); activeItems.clear(); }
function completeGame() { gameRunning = false; clearInterval(spawnInterval); notice.textContent = '✨ Lo lograste ✨ Ahora la carta es tuya.'; notice.style.opacity = 1; restart.textContent = 'Jugar otra vez'; const envelope = $('#envelope'); envelope.disabled = false; envelope.classList.remove('locked'); envelope.setAttribute('aria-label', 'Abrir carta de amor'); $('#letterHint').textContent = 'La carta está lista — toca el sobre para abrirla'; showToast('Desbloqueaste una carta para ti 💛'); }
function startGame() { clearGame(); score = 0; scoreEl.textContent = score; gameRunning = true; notice.style.opacity = 0; restart.textContent = 'Atrapa las flores'; spawnItem(true); setTimeout(() => spawnItem(true), 220); setTimeout(() => spawnItem(true), 440); spawnInterval = setInterval(() => spawnItem(), 680); }
restart.addEventListener('click', startGame);

/* 7. SOBRE, CARTA Y MICROINTERACCIONES */
const envelope = $('#envelope'), letter = $('#letter');
envelope.addEventListener('click', () => { if (envelope.disabled) return; envelope.classList.add('open'); setTimeout(() => letter.classList.add('show'), 400); });
$('#closeLetter').addEventListener('click', () => { letter.classList.remove('show'); envelope.classList.remove('open'); });
let toastTimer;
function showToast(message) { const toast = $('#toast'); toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2600); }

/* 8. ACCESIBILIDAD Y MODO DE MOVIMIENTO REDUCIDO */
if (matchMedia('(prefers-reduced-motion: reduce)').matches) { particles.length = 10; targetWind = .18; }
