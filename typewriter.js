// Simple typewriter effect — types out, pauses, deletes, repeats.
function startTypewriter(elementId, words, opts = {}) {
  const el = document.getElementById(elementId);
  if (!el) return;

  const typeSpeed   = opts.typeSpeed   || 110;
  const deleteSpeed = opts.deleteSpeed || 60;
  const holdTime    = opts.holdTime    || 1800;
  const gapTime     = opts.gapTime     || 400;

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const currentWord = words[wordIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = currentWord.slice(0, charIndex);
      if (charIndex === currentWord.length) {
        deleting = true;
        return setTimeout(tick, holdTime);
      }
      return setTimeout(tick, typeSpeed);
    } else {
      charIndex--;
      el.textContent = currentWord.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        return setTimeout(tick, gapTime);
      }
      return setTimeout(tick, deleteSpeed);
    }
  }

  tick();
}
