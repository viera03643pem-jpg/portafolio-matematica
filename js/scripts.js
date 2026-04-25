// =============================================
//   MIS PRIMEROS PASOS EN MATEMÁTICA
//   scripts.js
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ─── 1. ANIMACIÓN DE ENTRADA CON IntersectionObserver ───
  const tarjetas = document.querySelectorAll('.tarjeta');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  tarjetas.forEach(t => observer.observe(t));

  // ─── 2. NAVEGACIÓN ACTIVA AL HACER SCROLL ───
  const secciones = document.querySelectorAll('main section[id]');
  const navLinks  = document.querySelectorAll('nav a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const link = document.querySelector(`nav a[href="#${entry.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { threshold: 0.45 });

  secciones.forEach(s => navObserver.observe(s));

  // ─── 3. CONTADOR DE ESTRELLAS ───
  let contadorActivo = 0;
  const labelContador = document.getElementById('label-contador');

  document.querySelectorAll('.estrella').forEach(estrella => {
    estrella.addEventListener('click', () => {
      const num = parseInt(estrella.dataset.num);
      contadorActivo = num;
      actualizarEstrellas(num);
    });
  });

  function actualizarEstrellas(seleccionado) {
    document.querySelectorAll('.estrella').forEach(e => {
      const n = parseInt(e.dataset.num);
      if (n <= seleccionado) {
        e.style.filter = 'brightness(1)';
        e.style.opacity = '1';
      } else {
        e.style.filter = 'grayscale(0.6)';
        e.style.opacity = '0.45';
      }
    });
    if (labelContador) {
      labelContador.textContent = seleccionado > 0
        ? `¡Contaste ${seleccionado} estrella${seleccionado > 1 ? 's' : ''}! 🎉`
        : 'Toca una estrella para contar';
    }
  }

  // ─── 4. SUMA INTERACTIVA ───
  const inputSumaA = document.getElementById('suma-a');
  const inputSumaB = document.getElementById('suma-b');
  const btnSumar   = document.getElementById('btn-sumar');
  const resSuma    = document.getElementById('res-suma');

  if (btnSumar) {
    btnSumar.addEventListener('click', () => {
      const a = parseInt(inputSumaA.value) || 0;
      const b = parseInt(inputSumaB.value) || 0;
      const r = a + b;
      resSuma.textContent = r;
      resSuma.style.animation = 'none';
      requestAnimationFrame(() => {
        resSuma.style.animation = 'popIn 0.35s ease both';
      });
      mostrarEmoji(resSuma, '✅');
    });
  }

  // ─── 5. RESTA INTERACTIVA ───
  const inputRestaA = document.getElementById('resta-a');
  const inputRestaB = document.getElementById('resta-b');
  const btnRestar   = document.getElementById('btn-restar');
  const resResta    = document.getElementById('res-resta');
  const avisoResta  = document.getElementById('aviso-resta');

  if (btnRestar) {
    btnRestar.addEventListener('click', () => {
      const a = parseInt(inputRestaA.value) || 0;
      const b = parseInt(inputRestaB.value) || 0;
      if (b > a) {
        resResta.textContent = '?';
        if (avisoResta) {
          avisoResta.textContent = '¡Ese número es muy grande para restar! 😅';
          setTimeout(() => { avisoResta.textContent = ''; }, 2500);
        }
        return;
      }
      const r = a - b;
      resResta.textContent = r;
      resResta.style.animation = 'none';
      requestAnimationFrame(() => {
        resResta.style.animation = 'popIn 0.35s ease both';
      });
      if (avisoResta) avisoResta.textContent = '';
    });
  }

  // ─── 6. FIGURAS GEOMÉTRICAS ───
  document.querySelectorAll('.figura-card').forEach(card => {
    card.addEventListener('click', () => {
      const nombre = card.dataset.nombre;
      card.style.transform = 'scale(1.1)';
      card.style.borderColor = card.dataset.color;
      card.style.boxShadow = `0 6px 20px ${card.dataset.color}55`;
      setTimeout(() => {
        card.style.transform = '';
        card.style.borderColor = '';
        card.style.boxShadow = '';
      }, 500);

      const msg = document.getElementById('figura-msg');
      if (msg) {
        msg.textContent = `¡Eso es un ${nombre}! 🎉`;
        clearTimeout(msg._timer);
        msg._timer = setTimeout(() => { msg.textContent = ''; }, 2500);
      }
    });
  });

  // ─── 7. SECCIÓN ÁNIMO ───
  const mensajes = {
    '😊': '¡Muy bien! Hoy aprendiste mucho. 🌟',
    '😐': 'Está bien, ¡mañana será mejor! 💪',
    '😢': '¡Ánimo! Puedes intentarlo otra vez. ❤️'
  };

  document.querySelectorAll('.carita').forEach(carita => {
    carita.addEventListener('click', () => {
      document.querySelectorAll('.carita').forEach(c => c.classList.remove('seleccionada'));
      carita.classList.add('seleccionada');
      const msg = document.getElementById('animo-msg');
      if (msg) {
        msg.style.opacity = '0';
        setTimeout(() => {
          msg.textContent = mensajes[carita.dataset.emoji] || '';
          msg.style.opacity = '1';
        }, 180);
      }
    });
  });

  // ─── HELPER: pequeño emoji que aparece y desaparece ───
  function mostrarEmoji(el, emoji) {
    const span = document.createElement('span');
    span.textContent = ' ' + emoji;
    span.style.fontSize = '1.2rem';
    span.style.animation = 'popIn 0.3s ease both';
    el.parentNode.appendChild(span);
    setTimeout(() => span.remove(), 1500);
  }

});
