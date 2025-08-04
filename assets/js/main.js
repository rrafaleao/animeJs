// Banco de dados compacto de animações
const animations = {
    // Entradas
    'bounce-in-top': { anime: { translateY: [-500, 0], opacity: [0, 1], duration: 1100, easing: 'easeOutBounce' }, desc: 'Bounce entrada de cima' },
    'bounce-in-bottom': { anime: { translateY: [500, 0], opacity: [0, 1], duration: 1100, easing: 'easeOutBounce' }, desc: 'Bounce entrada de baixo' },
    'bounce-in-left': { anime: { translateX: [-500, 0], opacity: [0, 1], duration: 1100, easing: 'easeOutBounce' }, desc: 'Bounce entrada da esquerda' },
    'bounce-in-right': { anime: { translateX: [500, 0], opacity: [0, 1], duration: 1100, easing: 'easeOutBounce' }, desc: 'Bounce entrada da direita' },
    'slide-in-top': { anime: { translateY: [-100, 0], opacity: [0, 1], duration: 800, easing: 'easeOutCubic' }, desc: 'Desliza de cima' },
    'slide-in-bottom': { anime: { translateY: [100, 0], opacity: [0, 1], duration: 800, easing: 'easeOutCubic' }, desc: 'Desliza de baixo' },
    'slide-in-left': { anime: { translateX: [-100, 0], opacity: [0, 1], duration: 800, easing: 'easeOutCubic' }, desc: 'Desliza da esquerda' },
    'slide-in-right': { anime: { translateX: [100, 0], opacity: [0, 1], duration: 800, easing: 'easeOutCubic' }, desc: 'Desliza da direita' },
    'fade-in': { anime: { opacity: [0, 1], duration: 1000, easing: 'easeInOutQuad' }, desc: 'Fade in simples' },
    'fade-in-top': { anime: { translateY: [-30, 0], opacity: [0, 1], duration: 1000, easing: 'easeInOutQuad' }, desc: 'Fade in com movimento vertical' },
    'fade-in-bottom': { anime: { translateY: [30, 0], opacity: [0, 1], duration: 1000, easing: 'easeInOutQuad' }, desc: 'Fade in de baixo para cima' },
    'scale-in-center': { anime: { scale: [0, 1], opacity: [0, 1], duration: 900, easing: 'easeOutBack' }, desc: 'Crescimento do centro' },
    
    // Saídas
    'bounce-out-top': { anime: { translateY: [0, -500], opacity: [1, 0], duration: 1100, easing: 'easeInBack' }, desc: 'Bounce saída para cima' },
    'bounce-out-bottom': { anime: { translateY: [0, 500], opacity: [1, 0], duration: 1100, easing: 'easeInBack' }, desc: 'Bounce saída para baixo' },
    'slide-out-top': { anime: { translateY: [0, -100], opacity: [1, 0], duration: 800, easing: 'easeInCubic' }, desc: 'Desliza para cima e sai' },
    'slide-out-bottom': { anime: { translateY: [0, 100], opacity: [1, 0], duration: 800, easing: 'easeInCubic' }, desc: 'Desliza para baixo e sai' },
    'fade-out': { anime: { opacity: [1, 0], duration: 1000, easing: 'easeInOutQuad' }, desc: 'Fade out simples' },
    'scale-out-center': { anime: { scale: [1, 0], opacity: [1, 0], duration: 900, easing: 'easeInBack' }, desc: 'Diminui até desaparecer' },
    
    // Atenção
    'heartbeat': { anime: { scale: [1, 1.3, 1], duration: 1500, easing: 'easeInOutSine', loop: true }, desc: 'Pulsação rítmica' },
    'jello-horizontal': { anime: { skewX: [0, 40, -30, 15, -5, 0], duration: 900, easing: 'easeInOutQuart' }, desc: 'Efeito gelatinoso horizontal' },
    'wobble-hor-bottom': { anime: { skewX: [0, -25, 20, -15, 10, -5, 0], translateX: [0, -5, 4, -3, 2, -1, 0], duration: 1000, easing: 'easeInOutQuart' }, desc: 'Bamboleio horizontal na base' },
    'shake-horizontal': { anime: { translateX: [0, -10, 10, -10, 10, -5, 5, 0], duration: 600, easing: 'easeInOutQuad' }, desc: 'Tremulação horizontal' },
    'vibrate-1': { anime: { translateX: [0, -2, 2, -2, 2, 0], duration: 100, easing: 'linear', loop: 3 }, desc: 'Vibração rápida' },
    'bounce': { anime: { translateY: [0, -30, 0], duration: 1000, easing: 'easeOutBounce', loop: true }, desc: 'Bounce contínuo' },
    'pulse': { anime: { scale: [1, 1.1, 1], duration: 2000, easing: 'easeInOutQuad', loop: true }, desc: 'Pulsação suave' },
    
    // Texto
    'tracking-in-expand': { anime: { letterSpacing: ['0.5em', '0em'], opacity: [0, 1], duration: 1200, easing: 'easeOutCubic' }, desc: 'Expansão de letras' },
    'tracking-in-contract': { anime: { letterSpacing: ['-0.5em', '0em'], opacity: [0, 1], duration: 1200, easing: 'easeOutCubic' }, desc: 'Contração de letras' },
    'focus-in-expand': { anime: { letterSpacing: ['0.5em', '0em'], filter: ['blur(12px)', 'blur(0px)'], opacity: [0, 1], duration: 1200, easing: 'easeOutCubic' }, desc: 'Foco com expansão' },
    'focus-in-contract': { anime: { letterSpacing: ['-0.5em', '0em'], filter: ['blur(12px)', 'blur(0px)'], opacity: [0, 1], duration: 1200, easing: 'easeOutCubic' }, desc: 'Foco com contração' },
    'text-shadow-drop-center': { anime: { textShadow: ['0 0 0 transparent', '0 0 18px rgba(0,0,0,0.35)'], duration: 1200, easing: 'easeInOutQuart' }, desc: 'Sombra de texto' }
};

// Elementos e estado
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);
let current = 'bounce-in-top', instance = null, favorites = JSON.parse(localStorage.getItem('animista-favorites') || '[]');

// Inicialização
function init() {
    updateRanges();
    updateDisplay();
    setupEvents();
    loadFavorites();
}

// Event listeners
function setupEvents() {
    $$('.range-input').forEach(s => s.addEventListener('input', () => { updateRanges(); updateCode(); }));
    $$('select').forEach(s => s.addEventListener('change', updateCode));
    $('play-btn').addEventListener('click', play);
    $('reset-btn').addEventListener('click', reset);
    $('copy-btn').addEventListener('click', copy);
    $$('.animation-list li').forEach(li => li.addEventListener('click', e => select(e.target.textContent.trim())));
    document.addEventListener('keydown', e => e.code === 'Space' ? (e.preventDefault(), play()) : e.code === 'Escape' && reset());
}

// Atualizar ranges
function updateRanges() {
    $$('.range-input').forEach(s => {
        const unit = s.id.includes('duration') || s.id.includes('delay') ? 's' : '';
        s.parentElement.querySelector('.range-value').textContent = s.value + unit;
    });
}

// Selecionar animação
function select(name) {
    if (!animations[name]) return;
    current = name;
    $$('.animation-list li').forEach(li => li.classList.toggle('active', li.textContent.trim() === name));
    updateDisplay();
    reset();
}

// Atualizar display
function updateDisplay() {
    $('animation-title').textContent = current;
    $('animation-description').textContent = animations[current].desc;
    updateCode();
}

// Reproduzir animação
function play() {
    reset();
    const anim = { ...animations[current].anime };
    anim.targets = $('demo-element');
    anim.duration = parseFloat($('duration').value) * 1000;
    anim.delay = parseFloat($('delay').value) * 1000;
    
    const iter = $('iterations').value;
    if (iter !== '1') anim.loop = iter === 'infinite' ? true : parseInt(iter);
    anim.direction = $('direction').value;
    
    instance = anime(anim);
    $('play-btn').textContent = 'Reproduzindo...';
    $('play-btn').disabled = true;
    
    setTimeout(() => {
        if (iter === '1') {
            $('play-btn').textContent = 'Reproduzir';
            $('play-btn').disabled = false;
        }
    }, anim.duration + anim.delay);
}

// Reset
function reset() {
    if (instance) {
        instance.pause();
        instance.seek(0);
        instance = null;
    }
    const el = $('demo-element');
    el.style.cssText = '';
    $('play-btn').textContent = 'Reproduzir';
    $('play-btn').disabled = false;
}

// Gerar código
function updateCode() {
    const anim = animations[current].anime;
    const dur = $('duration').value;
    const del = $('delay').value;
    const iter = $('iterations').value;
    const dir = $('direction').value;
    
    let code = 'anime({\n  targets: \'.element\',';
    
    Object.entries(anim).forEach(([k, v]) => {
        if (!['duration', 'delay', 'loop', 'direction'].includes(k)) {
            code += `\n  ${k}: ${Array.isArray(v) ? `[${v.join(', ')}]` : typeof v === 'string' ? `'${v}'` : v},`;
        }
    });
    
    code += `\n  duration: ${parseFloat(dur) * 1000},`;
    code += `\n  delay: ${parseFloat(del) * 1000},`;
    code += `\n  easing: '${anim.easing || 'easeInOutQuad'}',`;
    
    if (iter !== '1') code += `\n  loop: ${iter === 'infinite' ? 'true' : iter},`;
    if (dir !== 'normal') code += `\n  direction: '${dir}',`;
    
    code += '\n});';
    $('code-block').textContent = code;
}

// Copiar código
function copy() {
    navigator.clipboard.writeText($('code-block').textContent).then(() => {
        $('copy-btn').textContent = 'Copiado!';
        setTimeout(() => $('copy-btn').textContent = 'Copiar', 2000);
    }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = $('code-block').textContent;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        $('copy-btn').textContent = 'Copiado!';
        setTimeout(() => $('copy-btn').textContent = 'Copiar', 2000);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    init();
    createFavoriteButton();
    console.log('Dashboard compacto carregado com todas as animações funcionando!');
});