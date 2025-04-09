// File: Viaggiatore nel temp claude/script.js
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM completamente caricato');

  // Importa i testi da texts.js
  // I testi saranno disponibili nella variabile globale 'appTexts'

  // ELEMENTI UI ESSENZIALI
  const langItBtn = document.getElementById('lang-it-btn');
  const langEnBtn = document.getElementById('lang-en-btn');
  const explanationBtn = document.getElementById('explanation-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const explanationModal = document.getElementById('explanation-modal');
  const applyAdviceBtn = document.getElementById('apply-advice-btn');
  const adviceSelector = document.getElementById('advice-selector');

  // ELEMENTI METRICHE
  const readersToday = document.getElementById('readers-today');
  const readersTotal = document.getElementById('readers-total');
  const subscribers = document.getElementById('subscribers');
  const comments = document.getElementById('comments');
  const trafficSourcesContainer = document.getElementById('traffic-sources-container');

  // ELEMENTI NARRATIVI
  const currentLog = document.getElementById('current-log');
  const currentAdvice = document.getElementById('current-advice');
  const adviceNumber = document.getElementById('advice-number');
  const adviceNumberEn = document.getElementById('advice-number-en');

  // Log di debug per verificare che tutti gli elementi siano trovati
  console.log('Apply Advice Button:', applyAdviceBtn);
  console.log('Current Log:', currentLog);
  console.log('Current Advice:', currentAdvice);

  // STATO DELLA SIMULAZIONE
  let simulationState = {
    currentAdviceIndex: 0,
    metrics: {
      readersToday: 0,
      readersTotal: 0,
      subscribers: 0,
      comments: 0,
      trafficSources: {
        direct: 1
      }
    }
  };

  // Carica lo stato salvato se disponibile
  const savedState = localStorage.getItem('simulationState');
  if (savedState) {
    try {
      simulationState = JSON.parse(savedState);
      console.log('Stato caricato da localStorage:', simulationState);
    } catch (e) {
      console.error('Errore nel caricamento dello stato:', e);
    }
  }

  // INIZIALIZZA LA PAGINA
  function initializePage() {
    console.log('Inizializzazione pagina...');
    
    // Imposta i contenuti iniziali
    if (simulationState.currentAdviceIndex === 0) {
      // Se siamo all'inizio, mostra il log iniziale
      if (currentLog) {
        currentLog.innerHTML = `
          <p class="lang-it">${appTexts.initialLog.it}</p>
          <p class="lang-en">${appTexts.initialLog.en}</p>
        `;
      }
      
      // Mostra il primo consiglio
      if (currentAdvice && appTexts.adviceData.length > 0) {
        currentAdvice.innerHTML = `
          <p class="lang-it">${appTexts.adviceData[0].adviceIt}</p>
          <p class="lang-en">${appTexts.adviceData[0].adviceEn}</p>
        `;
        
        // Aggiorna il numero del consiglio
        if (adviceNumber) adviceNumber.textContent = "1";
        if (adviceNumberEn) adviceNumberEn.textContent = "1";
        
        // Aggiorna la spiegazione
        const explanationContent = document.querySelector('.explanation-content');
        if (explanationContent) {
          explanationContent.innerHTML = `
            <p class="lang-it">${appTexts.adviceData[0].explanationIt}</p>
            <p class="lang-en">${appTexts.adviceData[0].explanationEn}</p>
          `;
        }
      }
    } else {
      // Se abbiamo già applicato alcuni consigli, ripristina lo stato
      const previousAdviceIndex = Math.max(0, simulationState.currentAdviceIndex - 1);
      
      // Mostra il log dell'ultimo consiglio applicato
      if (currentLog && previousAdviceIndex < appTexts.adviceData.length) {
        currentLog.innerHTML = `
          <p class="lang-it">${appTexts.adviceData[previousAdviceIndex].logIt}</p>
          <p class="lang-en">${appTexts.adviceData[previousAdviceIndex].logEn}</p>
        `;
      }
      
      // Mostra il consiglio corrente
      if (currentAdvice) {
        if (simulationState.currentAdviceIndex < appTexts.adviceData.length) {
          currentAdvice.innerHTML = `
            <p class="lang-it">${appTexts.adviceData[simulationState.currentAdviceIndex].adviceIt}</p>
            <p class="lang-en">${appTexts.adviceData[simulationState.currentAdviceIndex].adviceEn}</p>
          `;
          
          // Aggiorna il numero del consiglio
          if (adviceNumber) adviceNumber.textContent = (simulationState.currentAdviceIndex + 1).toString();
          if (adviceNumberEn) adviceNumberEn.textContent = (simulationState.currentAdviceIndex + 1).toString();
          
          // Aggiorna la spiegazione
          const explanationContent = document.querySelector('.explanation-content');
          if (explanationContent) {
            explanationContent.innerHTML = `
              <p class="lang-it">${appTexts.adviceData[simulationState.currentAdviceIndex].explanationIt}</p>
              <p class="lang-en">${appTexts.adviceData[simulationState.currentAdviceIndex].explanationEn}</p>
            `;
          }
        } else {
          // Tutti i consigli sono stati applicati
          currentAdvice.innerHTML = `
            <p class="lang-it">Congratulazioni! Hai completato tutti i consigli. Il tuo blog è ora ben avviato.</p>
            <p class="lang-en">Congratulations! You have completed all the advice. Your blog is now well established.</p>
          `;
          
          if (applyAdviceBtn) {
            applyAdviceBtn.disabled = true;
          }
        }
      }
    }
    
    // Aggiorna il display delle metriche
    updateMetricsDisplay();
    
    // Seleziona il consiglio corrente nel dropdown
    if (adviceSelector) {
      adviceSelector.value = simulationState.currentAdviceIndex + 1;
    }
  }

  // Popola il menu a tendina
  function populateAdviceDropdown() {
    if (!adviceSelector) return;
    
    adviceSelector.innerHTML = '';
    appTexts.adviceData.forEach(advice => {
      const optionIt = document.createElement('option');
      optionIt.value = advice.number;
      optionIt.textContent = `Consiglio #${advice.number}`;
      optionIt.className = 'lang-it';
      
      const optionEn = document.createElement('option');
      optionEn.value = advice.number;
      optionEn.textContent = `Advice #${advice.number}`;
      optionEn.className = 'lang-en';
      
      adviceSelector.appendChild(optionIt);
      adviceSelector.appendChild(optionEn);
    });
  }

  // Language Switcher
  if (langItBtn) {
    langItBtn.addEventListener('click', function() {
      document.body.className = 'lang-mode-it';
      langItBtn.classList.add('active');
      if (langEnBtn) langEnBtn.classList.remove('active');
    });
  }

  if (langEnBtn) {
    langEnBtn.addEventListener('click', function() {
      document.body.className = 'lang-mode-en';
      langEnBtn.classList.add('active');
      if (langItBtn) langItBtn.classList.remove('active');
    });
  }

  // Modal Functionality
  if (explanationBtn && explanationModal && closeModalBtn) {
    explanationBtn.addEventListener('click', function() {
      explanationModal.style.display = 'flex';
    });
    
    closeModalBtn.addEventListener('click', function() {
      explanationModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
      if (event.target === explanationModal) {
        explanationModal.style.display = 'none';
      }
    });
  }

  // FUNZIONE PER APPLICARE IL CONSIGLIO
  function applyAdvice() {
    console.log('Funzione applyAdvice chiamata!');
    
    // Verifica se ci sono ancora consigli da applicare
    if (simulationState.currentAdviceIndex >= appTexts.adviceData.length) {
      console.log('Tutti i consigli sono stati applicati!');
      return;
    }
    
    // Ottieni il consiglio corrente
    const currentAdviceData = appTexts.adviceData[simulationState.currentAdviceIndex];
    
    // Aggiorna il log narrativo
    if (currentLog && currentAdviceData) {
      console.log('Aggiornamento log narrativo...');
      currentLog.innerHTML = `
        <p class="lang-it">${currentAdviceData.logIt}</p>
        <p class="lang-en">${currentAdviceData.logEn}</p>
      `;
    }
    
    // Aggiorna le metriche in base all'impatto del consiglio
    if (currentAdviceData.impact) {
      simulationState.metrics.readersToday = currentAdviceData.impact.readersToday || 0;
      simulationState.metrics.readersTotal += simulationState.metrics.readersToday;
      simulationState.metrics.comments = currentAdviceData.impact.comments || 0;
      simulationState.metrics.subscribers = currentAdviceData.impact.subscribers || 0;
    }
    
    // Aggiorna il display delle metriche
    updateMetricsDisplay();
    
    // Passa al prossimo consiglio
    simulationState.currentAdviceIndex++;
    
    // Aggiorna il numero del consiglio
    if (adviceNumber) adviceNumber.textContent = (simulationState.currentAdviceIndex + 1).toString();
    if (adviceNumberEn) adviceNumberEn.textContent = (simulationState.currentAdviceIndex + 1).toString();
    
    // Aggiorna il dropdown
    if (adviceSelector) {
      adviceSelector.value = simulationState.currentAdviceIndex + 1;
    }
    
    // Mostra il prossimo consiglio o un messaggio di completamento
    if (simulationState.currentAdviceIndex < appTexts.adviceData.length) {
      const nextAdvice = appTexts.adviceData[simulationState.currentAdviceIndex];
      
      // Aggiorna il contenuto del consiglio
      if (currentAdvice && nextAdvice) {
        console.log('Passaggio al prossimo consiglio...');
        currentAdvice.innerHTML = `
          <p class="lang-it">${nextAdvice.adviceIt}</p>
          <p class="lang-en">${nextAdvice.adviceEn}</p>
        `;
        
        // Aggiorna il contenuto della spiegazione
        const explanationContent = document.querySelector('.explanation-content');
        if (explanationContent) {
          explanationContent.innerHTML = `
            <p class="lang-it">${nextAdvice.explanationIt}</p>
            <p class="lang-en">${nextAdvice.explanationEn}</p>
          `;
        }
      }
    } else {
      // Tutti i consigli sono stati applicati
      if (currentAdvice) {
        console.log('Tutti i consigli completati!');
        currentAdvice.innerHTML = `
          <p class="lang-it">Congratulazioni! Hai completato tutti i consigli. Il tuo blog è ora ben avviato.</p>
          <p class="lang-en">Congratulations! You have completed all the advice. Your blog is now well established.</p>
        `;
        
        // Disabilita il pulsante
        if (applyAdviceBtn) {
          applyAdviceBtn.disabled = true;
        }
      }
    }
    
    // Salva lo stato
    localStorage.setItem('simulationState', JSON.stringify(simulationState));
  }

  // Aggiorna il display delle metriche
  function updateMetricsDisplay() {
    if (readersToday) readersToday.textContent = simulationState.metrics.readersToday;
    if (readersTotal) readersTotal.textContent = simulationState.metrics.readersTotal;
    if (subscribers) subscribers.textContent = simulationState.metrics.subscribers;
    if (comments) comments.textContent = simulationState.metrics.comments;
    
    // Aggiorna le fonti di traffico
    updateTrafficSources();
  }

  // Aggiorna la visualizzazione delle fonti di traffico
  function updateTrafficSources() {
    if (!trafficSourcesContainer) return;
    
    trafficSourcesContainer.innerHTML = '';
    for (const [source, value] of Object.entries(simulationState.metrics.trafficSources)) {
      if (value > 0) {
        const sourceElement = document.createElement('div');
        sourceElement.className = 'traffic-source';
        
        const sourceLabelIt = document.createElement('span');
        sourceLabelIt.className = 'source-label lang-it';
        sourceLabelIt.textContent = getSourceLabelIt(source);
        
        const sourceLabelEn = document.createElement('span');
        sourceLabelEn.className = 'source-label lang-en';
        sourceLabelEn.textContent = getSourceLabelEn(source);
        
        const sourceBar = document.createElement('div');
        sourceBar.className = 'source-bar';
        sourceBar.style.width = `${value * 100}%`;
        
        const sourceValue = document.createElement('span');
        sourceValue.className = 'source-value';
        sourceValue.textContent = `${Math.round(value * 100)}%`;
        
        sourceElement.appendChild(sourceLabelIt);
        sourceElement.appendChild(sourceLabelEn);
        sourceElement.appendChild(sourceBar);
        sourceElement.appendChild(sourceValue);
        
        trafficSourcesContainer.appendChild(sourceElement);
      }
    }
  }

  // Etichette per le fonti di traffico in italiano
  function getSourceLabelIt(source) {
    switch (source) {
      case 'organic': return 'Ricerca Organica';
      case 'wpReader': return 'WordPress Reader';
      case 'direct': return 'Traffico Diretto';
      case 'facebook': return 'Social: Facebook';
      case 'twitter': return 'Social: Twitter';
      case 'instagram': return 'Social: Instagram';
      case 'referral': return 'Siti Referral';
      case 'email': return 'Email/Iscritti';
      default: return source;
    }
  }

  // Etichette per le fonti di traffico in inglese
  function getSourceLabelEn(source) {
    switch (source) {
      case 'organic': return 'Organic Search';
      case 'wpReader': return 'WordPress Reader';
      case 'direct': return 'Direct Traffic';
      case 'facebook': return 'Social: Facebook';
      case 'twitter': return 'Social: Twitter';
      case 'instagram': return 'Social: Instagram';
      case 'referral': return 'Referral Sites';
      case 'email': return 'Email/Subscribers';
      default: return source;
    }
  }

  // Gestisce il cambio di consiglio dal dropdown
  if (adviceSelector) {
    adviceSelector.addEventListener('change', function() {
      const selectedAdviceNumber = parseInt(adviceSelector.value);
      
      // Impedisce di saltare a consigli futuri
      if (selectedAdviceNumber - 1 > simulationState.currentAdviceIndex) {
        adviceSelector.value = simulationState.currentAdviceIndex + 1;
        alert('Non puoi saltare a consigli futuri che non sono ancora stati applicati.');
        return;
      }
      
      // Seleziona il consiglio
      const adviceIndex = selectedAdviceNumber - 1;
      const advice = appTexts.adviceData[adviceIndex];
      
      // Aggiorna il contenuto del consiglio
      if (currentAdvice && advice) {
        currentAdvice.innerHTML = `
          <p class="lang-it">${advice.adviceIt}</p>
          <p class="lang-en">${advice.adviceEn}</p>
        `;
        
        // Aggiorna il numero del consiglio
        if (adviceNumber) adviceNumber.textContent = selectedAdviceNumber.toString();
        if (adviceNumberEn) adviceNumberEn.textContent = selectedAdviceNumber.toString();
        
        // Aggiorna il contenuto della spiegazione
        const explanationContent = document.querySelector('.explanation-content');
        if (explanationContent) {
          explanationContent.innerHTML = `
            <p class="lang-it">${advice.explanationIt}</p>
            <p class="lang-en">${advice.explanationEn}</p>
          `;
        }
      }
    });
  }

  // **** CORREZIONE: Aggiungi l'event listener al pulsante "applica consiglio" ****
  if (applyAdviceBtn) {
    console.log('Aggiungo event listener al pulsante "applica consiglio"');
    applyAdviceBtn.addEventListener('click', applyAdvice);
  } else {
    console.error('ERRORE: Il pulsante "apply-advice-btn" non è stato trovato!');
  }

  // Inizializza l'applicazione
  initializePage();
  populateAdviceDropdown();

  // Pulsante per resettare tutto lo stato (per debug)
  const resetButton = document.createElement('button');
  resetButton.textContent = 'Reset Simulation';
  resetButton.style.position = 'fixed';
  resetButton.style.bottom = '10px';
  resetButton.style.right = '10px';
  resetButton.style.padding = '5px 10px';
  resetButton.style.background = '#f44336';
  resetButton.style.color = 'white';
  resetButton.style.border = 'none';
  resetButton.style.borderRadius = '4px';
  resetButton.style.cursor = 'pointer';
  resetButton.style.display = 'none'; // Nascosto di default

  // Mostra il pulsante di reset tenendo premuto Alt+Shift+R per 3 secondi
  let altShiftRTimer = null;
  window.addEventListener('keydown', function(e) {
    if (e.altKey && e.shiftKey && e.key === 'R') {
      if (!altShiftRTimer) {
        altShiftRTimer = setTimeout(function() {
          resetButton.style.display = 'block';
          document.body.appendChild(resetButton);
        }, 3000);
      }
    }
  });

  window.addEventListener('keyup', function(e) {
    if (e.key === 'Alt' || e.key === 'Shift' || e.key === 'R') {
      clearTimeout(altShiftRTimer);
      altShiftRTimer = null;
    }
  });

  resetButton.addEventListener('click', function() {
    localStorage.removeItem('simulationState');
    location.reload();
  });

  console.log('Inizializzazione completata con successo!');
});