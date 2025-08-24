// contact-form.js - Nur Titel änderbar, alles andere statisch wie in paco-chat.html
function initContactForm(config) {
  const {
    containerId,
    title = "Jetzt Demo buchen"
  } = config;

  // KRITISCHE ÄNDERUNG: Section bekommt dieselbe ID wie Container!
  const formHTML = `
    <section id="${containerId}" class="bg-[#7C3AED] py-16 px-6 md:px-20 text-white scroll-mt-24">
      <h2 class="text-3xl md:text-5xl font-bold text-white text-center mb-8">
        ${title}
      </h2>

      <form id="demoFormChat" class="max-w-xl mx-auto grid gap-6">
        <input type="text" id="nameChat" name="name" placeholder="Name"
               class="w-full bg-white border border-white rounded-lg p-3 focus:ring-2 focus:ring-white focus:border-white text-[#1F2937]" required>
        <input type="email" id="emailChat" name="email" placeholder="Hochschul-E-Mail"
               class="w-full bg-white border border-white rounded-lg p-3 focus:ring-2 focus:ring-white focus:border-white text-[#1F2937]" required>
        <input type="text" id="institutionChat" name="institution" placeholder="Hochschule / Einrichtung"
               class="w-full bg-white border border-white rounded-lg p-3 focus:ring-2 focus:ring-white focus:border-white text-[#1F2937]" required>
        <textarea id="messageChat" name="message" rows="4" placeholder="Nachricht (optional)"
                  class="w-full bg-white border border-white rounded-lg p-3 focus:ring-2 focus:ring-white focus:border-white text-[#1F2937]"></textarea>

        <!-- Custom Checkbox -->
        <label class="flex items-center text-sm text-white cursor-pointer">
          <div class="relative flex-shrink-0 mr-3">
            <input type="checkbox" id="consentChat" required class="sr-only">
            <div class="checkbox-custom w-5 h-5 bg-white border-2 border-white rounded flex items-center justify-center">
              <svg class="checkmark w-3 h-3 text-[#7C3AED] opacity-0 transition-opacity duration-200" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
          <span>
            Ich habe die <a href="datenschutz.html" class="text-white underline hover:text-gray-200" target="_blank">Datenschutzerklärung</a> gelesen.
          </span>
        </label>

        <button id="submitBtnChat" type="button"
                class="bg-white text-[#7C3AED] disabled:cursor-not-allowed hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition"
                disabled>
          Bitte füllen Sie das Formular aus
        </button>
      </form>
    </section>
  `;
  
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = formHTML;
    // WICHTIG: ID vom Container entfernen, um Duplikat-IDs zu vermeiden
    container.removeAttribute('id');
  }

  // Form-Handler initialisieren (EXAKT wie in paco-chat.html)
  setTimeout(() => {
    const form = document.getElementById('demoFormChat');
    if (!form) return;

    const submit = document.getElementById('submitBtnChat');
    const fields = ['nameChat','emailChat','institutionChat'];
    const consent = document.getElementById('consentChat');
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Verbesserte Checkbox-Funktion
    const checkboxCustom = document.querySelector('#demoFormChat .checkbox-custom');
    const checkmark = document.querySelector('#demoFormChat .checkmark');
    const checkboxLabel = document.querySelector('#demoFormChat label');
    
    if (checkboxCustom && checkmark) {
      // Auf das gesamte Label hören (besser für Benutzerfreundlichkeit)
      checkboxLabel.addEventListener('click', function(e) {
        // Nur preventDefault wenn NICHT auf den Link geklickt wurde
        if (e.target.tagName !== 'A') {
          e.preventDefault();
          
          // Toggle der Checkbox
          consent.checked = !consent.checked;
          
          // Visuelles Update
          if (consent.checked) {
            checkmark.classList.remove('opacity-0');
            checkmark.classList.add('opacity-100');
          } else {
            checkmark.classList.remove('opacity-100');
            checkmark.classList.add('opacity-0');
          }
          
          validate();
        }
        // Wenn auf Link geklickt wurde, passiert nichts - normales Link-Verhalten
      });
    }

    function allFilled() {
      return fields.every(id => {
        const el = document.getElementById(id);
        return el && el.value.trim().length > 0;
      });
    }

    function emailValid() {
      const em = document.getElementById('emailChat');
      return em && emailRe.test(em.value.trim());
    }

    function validate() {
      if (allFilled() && emailValid() && consent.checked) {
        submit.disabled = false;
        submit.textContent = 'Demo-Anfrage senden';
        submit.className = 'bg-white text-[#7C3AED] hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition';
      } else {
        submit.disabled = true;
        submit.textContent = 'Bitte füllen Sie das Formular aus';
        submit.className = 'bg-white text-[#7C3AED] disabled:cursor-not-allowed hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition';
      }
    }

    fields.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', validate);
    });

    submit.addEventListener('click', function() {
      const nameVal = document.getElementById('nameChat').value.trim();
      const emailVal = document.getElementById('emailChat').value.trim();
      const instVal = document.getElementById('institutionChat').value.trim();
      const msgVal = document.getElementById('messageChat').value.trim();

      const to = 'info@ai-paco.de';
      const cc = emailVal;
      const subject = `${title} - Anfrage von ${nameVal}`;
      const body = `Name: ${nameVal}\nHochschule: ${instVal}\nE-Mail: ${emailVal}\n\nNachricht:\n${msgVal}\n\n--- Anfrage über PACO Webseite ---`;

      window.location.href = `mailto:${encodeURIComponent(to)}?cc=${encodeURIComponent(cc)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });

    validate();
  }, 100);
}