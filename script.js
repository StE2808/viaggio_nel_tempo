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
  const seoExplanationBtn = document.getElementById('seo-explanation-btn');
  const closeSeoModalBtn = document.getElementById('close-seo-modal-btn');
  const seoExplanationModal = document.getElementById('seo-explanation-modal');
  const showChartsBtn = document.getElementById('show-charts-btn');
  const closeChartsBtn = document.getElementById('close-charts-btn');
  const chartsModal = document.getElementById('charts-modal');

  // ELEMENTI METRICHE
  const readersToday = document.getElementById('readers-today');
  const readersTotal = document.getElementById('readers-total');
  const subscribers = document.getElementById('subscribers');
  const comments = document.getElementById('comments');
  const trafficSourcesContainer = document.getElementById('traffic-sources-container');

  // ELEMENTI NARRATIVI
  const currentLog = document.getElementById('current-log');
  const currentAdvice = document.getElementById('current-advice');

  // Log di debug per verificare che tutti gli elementi siano trovati
  console.log('Apply Advice Button:', applyAdviceBtn);
  console.log('Current Log:', currentLog);
  console.log('Current Advice:', currentAdvice);
  console.log('Advice Selector:', adviceSelector);

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
    
    // Mostra il consiglio corrente
    showAdvice(simulationState.currentAdviceIndex);
    
    // Aggiorna il log per il consiglio corrente
    updateLogForAdvice(simulationState.currentAdviceIndex);
    
    // Aggiorna le metriche visualizzate
    updateMetricsForAdvice(simulationState.currentAdviceIndex);
    
    // Popola il menu a tendina
    populateAdviceDropdown();
  }

  // Funzione per mostrare un consiglio specifico
  function showAdvice(adviceIndex) {
    if (!currentAdvice) return;
    
    if (adviceIndex < appTexts.adviceData.length) {
      const advice = appTexts.adviceData[adviceIndex];
      currentAdvice.innerHTML = `
        <p class="lang-it">${advice.adviceIt}</p>
        <p class="lang-en">${advice.adviceEn}</p>
      `;
      
      // Aggiorna il contenuto della spiegazione
      const explanationContent = document.querySelector('.explanation-content');
      if (explanationContent) {
        explanationContent.innerHTML = `
          <p class="lang-it">${advice.explanationIt}</p>
          <p class="lang-en">${advice.explanationEn}</p>
        `;
      }
    } else {
      // Tutti i consigli sono stati applicati
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
  
  // Funzione per aggiornare il log in base al consiglio selezionato
  function updateLogForAdvice(adviceIndex) {
    if (!currentLog) return;
    
    if (adviceIndex === 0) {
      // Se è il primo consiglio, mostra il log iniziale
      currentLog.innerHTML = `
        <p class="lang-it">${appTexts.initialLog.it}</p>
        <p class="lang-en">${appTexts.initialLog.en}</p>
      `;
    } else {
      // Altrimenti mostra il log del consiglio precedente
      const previousAdvice = appTexts.adviceData[adviceIndex - 1];
      currentLog.innerHTML = `
        <p class="lang-it">${previousAdvice.logIt}</p>
        <p class="lang-en">${previousAdvice.logEn}</p>
      `;
    }
  }
  
  // Funzione per aggiornare le metriche in base al consiglio selezionato
  function updateMetricsForAdvice(adviceIndex) {
    // Ripristina le metriche ai valori iniziali
    let tempMetrics = {
      readersToday: 0,
      readersTotal: 0,
      subscribers: 0,
      comments: 0,
      trafficSources: {
        direct: 1
      }
    };
    
    // Applica l'impatto di ogni consiglio fino a quello selezionato
    for (let i = 0; i <= adviceIndex; i++) {
      if (i < appTexts.adviceData.length && appTexts.adviceData[i].impact) {
        const impact = appTexts.adviceData[i].impact;
        tempMetrics.readersToday = impact.readersToday || 0;
        tempMetrics.readersTotal += tempMetrics.readersToday;
        tempMetrics.comments = impact.comments || 0;
        tempMetrics.subscribers = impact.subscribers || 0;
      }
    }
    
    // Aggiorna i display delle metriche con i valori calcolati
    if (readersToday) readersToday.textContent = tempMetrics.readersToday;
    if (readersTotal) readersTotal.textContent = tempMetrics.readersTotal;
    if (subscribers) subscribers.textContent = tempMetrics.subscribers;
    if (comments) comments.textContent = tempMetrics.comments;
    
    // Aggiorna le fonti di traffico (semplificato per questa demo)
    updateTrafficSourcesDisplay(tempMetrics.trafficSources);
  }
  
  // Funzione per aggiornare il display delle fonti di traffico
  function updateTrafficSourcesDisplay(trafficSources) {
    if (!trafficSourcesContainer) return;
    
    trafficSourcesContainer.innerHTML = '';
    for (const [source, value] of Object.entries(trafficSources)) {
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
  
  // Popola il menu a tendina dei consigli
  function populateAdviceDropdown() {
    if (!adviceSelector) return;
    
    adviceSelector.innerHTML = '';
    appTexts.adviceData.forEach((advice, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = (index + 1).toString();
      
      // Disabilita le opzioni future che non sono ancora state sbloccate
      if (index > simulationState.currentAdviceIndex) {
        option.disabled = true;
      }
      
      adviceSelector.appendChild(option);
    });
    
    // Seleziona il consiglio corrente
    adviceSelector.value = simulationState.currentAdviceIndex;
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
  
  // FUNZIONE PER APPLICARE IL CONSIGLIO
  function applyAdvice() {
    console.log('Funzione applyAdvice chiamata!');
    
    // Verifica se ci sono ancora consigli da applicare
    if (simulationState.currentAdviceIndex >= appTexts.adviceData.length) {
      console.log('Tutti i consigli sono stati applicati!');
      return;
    }
    
    // Incrementa l'indice del consiglio corrente
    simulationState.currentAdviceIndex++;
    
    // Mostra il consiglio corrente
    if (simulationState.currentAdviceIndex < appTexts.adviceData.length) {
      showAdvice(simulationState.currentAdviceIndex);
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
    
    // Aggiorna il log per il nuovo stato
    updateLogForAdvice(simulationState.currentAdviceIndex);
    
    // Aggiorna le metriche
    updateMetricsForAdvice(simulationState.currentAdviceIndex);
    
    // Aggiorna il dropdown
    populateAdviceDropdown();
    
    // Salva lo stato
    localStorage.setItem('simulationState', JSON.stringify(simulationState));
  }
  
  // EVENT LISTENERS
  
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

  // Technical Explanation Modal
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
  
  // SEO Explanation Modal
  if (seoExplanationBtn && seoExplanationModal && closeSeoModalBtn) {
    seoExplanationBtn.addEventListener('click', function() {
      seoExplanationModal.style.display = 'flex';
    });
    
    closeSeoModalBtn.addEventListener('click', function() {
      seoExplanationModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
      if (event.target === seoExplanationModal) {
        seoExplanationModal.style.display = 'none';
      }
    });
  }
  
  // Charts Modal
  if (showChartsBtn && chartsModal && closeChartsBtn) {
    showChartsBtn.addEventListener('click', function() {
      chartsModal.style.display = 'flex';
    });
    
    closeChartsBtn.addEventListener('click', function() {
      chartsModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
      if (event.target === chartsModal) {
        chartsModal.style.display = 'none';
      }
    });
  }
  
  // Gestione del menu a tendina per i consigli
  if (adviceSelector) {
    adviceSelector.addEventListener('change', function() {
      const selectedAdviceIndex = parseInt(adviceSelector.value);
      
      // Aggiorna il consiglio corrente in base alla selezione
      showAdvice(selectedAdviceIndex);
      
      // Aggiorna il log corrispondente
      updateLogForAdvice(selectedAdviceIndex);
      
      // Aggiorna le metriche visualizzate
      updateMetricsForAdvice(selectedAdviceIndex);
    });
  }
  
  // Apply Advice Button
  if (applyAdviceBtn) {
    console.log('Aggiungo event listener al pulsante "applica consiglio"');
    applyAdviceBtn.addEventListener('click', applyAdvice);
  } else {
    console.error('ERRORE: Il pulsante "apply-advice-btn" non è stato trovato!');
  }
  
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
  
  // Inizializza l'applicazione
  initializePage();
  
  console.log('Inizializzazione completata con successo!');
});