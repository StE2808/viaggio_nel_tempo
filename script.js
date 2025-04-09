// File: Viaggiatore nel temp claude/script.js
document.addEventListener('DOMContentLoaded', function() {
console.log('DOM completamente caricato');

// CORREZIONE: Verifica se il bottone di spiegazione esiste
const explanationBtnExists = document.getElementById('explanation-btn') !== null;
console.log('Bottone di spiegazione esiste:', explanationBtnExists);

// Se non esiste, crea un elemento di fallback invisibile per evitare errori
if (!explanationBtnExists) {
  console.log('Creazione fallback per il bottone di spiegazione mancante');
  const fallbackBtn = document.createElement('button');
  fallbackBtn.id = 'explanation-btn';
  fallbackBtn.className = 'explanation-btn';
  fallbackBtn.style.display = 'none';
  document.body.appendChild(fallbackBtn);
}

// CORREZIONE: Assicurati che la modale di spiegazione esista
if (!document.getElementById('explanation-modal')) {
  console.log('Creazione fallback per la modale di spiegazione mancante');
  const fallbackModal = document.createElement('div');
  fallbackModal.id = 'explanation-modal';
  fallbackModal.className = 'modal';
  fallbackModal.style.display = 'none';
  document.body.appendChild(fallbackModal);
}

// CORREZIONE: Assicurati che il pulsante close-modal-btn esista
if (!document.getElementById('close-modal-btn')) {
  console.log('Creazione fallback per il bottone di chiusura modale mancante');
  const fallbackCloseBtn = document.createElement('span');
  fallbackCloseBtn.id = 'close-modal-btn';
  fallbackCloseBtn.style.display = 'none';
  document.body.appendChild(fallbackCloseBtn);
}

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

// Log di debug per verificare che tutti gli elementi siano trovati
console.log('Apply Advice Button:', applyAdviceBtn);
console.log('Current Log:', currentLog);
console.log('Current Advice:', currentAdvice);

// DATI DEI CONSIGLI
const adviceData = [
{
number: 1,
adviceIt: "Ciao viaggiatore! Sono Claude, un'intelligenza artificiale. Non preoccuparti, sono qui per aiutarti. Il tuo titolo \"Ciao Mondo\" è troppo generico e non attira l'attenzione. Cambialo con qualcosa di più specifico e intrigante che menzioni il viaggio nel tempo, ad esempio: \"Confessioni di un Viaggiatore Temporale: Dagli Anni '60 al 2025\".",
adviceEn: "Hello traveler! I'm Claude, an artificial intelligence. Don't worry, I'm here to help. Your title \"Hello World\" is too generic and doesn't grab attention. Change it to something more specific and intriguing that mentions time travel, for example: \"Confessions of a Time Traveler: From the 1960s to 2025\".",
explanationIt: "Il titolo è l'elemento più importante per attirare l'attenzione e per il posizionamento nei motori di ricerca. Un titolo generico come \"Ciao Mondo\" non contiene parole chiave rilevanti e non comunica il valore o il contenuto dell'articolo. I titoli efficaci sono specifici, contengono keywords rilevanti (come \"viaggio nel tempo\"), creano curiosità e promettono un valore al lettore. Statisticamente, i titoli con 6-13 parole tendono a ottenere più click e condivisioni.",
explanationEn: "The title is the most important element for grabbing attention and for search engine positioning. A generic title like \"Hello World\" contains no relevant keywords and doesn't communicate the value or content of the article. Effective titles are specific, contain relevant keywords (like \"time travel\"), create curiosity, and promise value to the reader. Statistically, titles with 6-13 words tend to get more clicks and shares.",

logIt: "10 Aprile 2025 - Ho seguito il consiglio di Claude e ho cambiato il titolo del mio articolo in \"Confessioni di un Viaggiatore Temporale: Dagli Anni '60 al 2025\". Non ero sicuro di cosa aspettarmi, ma ho notato che alcune persone hanno iniziato a trovare il mio blog! Sembra che questo titolo più descrittivo stia facendo una differenza. È strano pensare che le persone siano effettivamente interessate alla mia storia. Mi chiedo cosa succederà se continuo a seguire i consigli di questa 'intelligenza artificiale'.",
logEn: "April 10th, 2025 - I followed Claude's advice and changed the title of my article to \"Confessions of a Time Traveler: From the 1960s to 2025\". I wasn't sure what to expect, but I've noticed that some people have started finding my blog! It seems this more descriptive title is making a difference. It's strange to think that people are actually interested in my story. I wonder what will happen if I continue to follow this 'artificial intelligence's' advice.",
impact: {
readersToday: 3,
comments: 0,
subscribers: 0
}
},
{
number: 2,
adviceIt: "Ottimo inizio! Ora dobbiamo aiutare più persone a trovare il tuo blog. Aggiungi dei tag al tuo articolo che descrivano gli argomenti principali. I tag sono come etichette che aiutano a categorizzare il tuo contenuto. Prova con: \"viaggio nel tempo\", \"anni '60\", \"cultura\", \"tecnologia\", \"futuro\".",
adviceEn: "Great start! Now we need to help more people find your blog. Add tags to your article that describe the main topics. Tags are like labels that help categorize your content. Try: \"time travel\", \"1960s\", \"culture\", \"technology\", \"future\".",
explanationIt: "I tag sono metadati che aiutano i motori di ricerca e i lettori a capire di cosa tratta il tuo contenuto. Su WordPress.com, i tag sono particolarmente importanti perché permettono al tuo post di apparire nel WordPress Reader, una fonte di traffico interna alla piattaforma. Gli utenti possono seguire tag specifici, quindi utilizzare tag pertinenti aumenta la visibilità. Inoltre, i tag ben scelti migliorano la SEO (Search Engine Optimization) aiutando i motori di ricerca a indicizzare correttamente il tuo contenuto. È importante non esagerare (5-7 tag è l'ideale) e scegliere tag rilevanti per il contenuto.",
explanationEn: "Tags are metadata that help search engines and readers understand what your content is about. On WordPress.com, tags are particularly important because they allow your post to appear in the WordPress Reader, an internal traffic source for the platform. Users can follow specific tags, so using relevant tags increases visibility. Additionally, well-chosen tags improve SEO (Search Engine Optimization) by helping search engines properly index your content. It's important not to overdo it (5-7 tags is ideal) and choose tags that are relevant to the content.",
logIt: "11 Aprile 2025 - Ho aggiunto i tag come suggerito da Claude: \"viaggio nel tempo\", \"anni '60\", \"cultura\", \"tecnologia\" e \"futuro\". Non avevo idea di cosa fossero, ma ho notato un interessante cambiamento: alcune persone hanno trovato il mio blog attraverso qualcosa chiamato \"WordPress Reader\". A quanto pare, ci sono persone che seguono questi argomenti specifici. Il numero di lettori è aumentato e ho persino ricevuto il mio primo commento! Qualcuno mi ha chiesto com'era la vita negli anni '60. Mi sento meno solo in questo strano futuro.",
logEn: "April 11th, 2025 - I added the tags as suggested by Claude: \"time travel\", \"1960s\", \"culture\", \"technology\", and \"future\". I had no idea what they were, but I noticed an interesting change: some people found my blog through something called \"WordPress Reader\". Apparently, there are people who follow these specific topics. The number of readers has increased, and I even received my first comment! Someone asked me what life was like in the 1960s. I feel less alone in this strange future.",
impact: {
readersToday: 5,
comments: 1,
subscribers: 0
}
},
{
number: 3,
adviceIt: "Fantastico progresso! Ora che hai ricevuto un commento, è importante rispondere. L'interazione con i lettori crea un senso di comunità e li invoglia a tornare. Rispondi al commento in modo dettagliato e personale, condividendo qualche aneddoto specifico sulla vita negli anni '60 che potrebbe sorprendere le persone di oggi.",
adviceEn: "Fantastic progress! Now that you've received a comment, it's important to respond. Interaction with readers creates a sense of community and encourages them to return. Respond to the comment in a detailed and personal way, sharing some specific anecdotes about life in the 1960s that might surprise people today.",
explanationIt: "Rispondere ai commenti è una strategia fondamentale di engagement. Gli studi mostrano che i blog con interazioni attive tra autore e lettori hanno tassi di ritorno fino al 70% più alti. I commenti sono anche importanti fattori di ranking per i motori di ricerca perché indicano contenuto di valore e aggiungono testo fresco alla pagina. Psicologicamente, quando un lettore riceve una risposta personalizzata, si crea un legame emotivo che lo trasforma da visitatore casuale a lettore fedele. Inoltre, le conversazioni nei commenti possono generare contenuti aggiuntivi che attirano altri lettori interessati allo stesso argomento.",
explanationEn: "Responding to comments is a fundamental engagement strategy. Studies show that blogs with active interactions between author and readers have return rates up to 70% higher. Comments are also important ranking factors for search engines because they indicate valuable content and add fresh text to the page. Psychologically, when a reader receives a personalized response, an emotional bond is created that transforms them from a casual visitor to a loyal reader. In addition, conversations in the comments can generate additional content that attracts other readers interested in the same topic.",
logIt: "12 Aprile 2025 - Ho risposto al commento, condividendo dettagli sulla musica, la moda e la vita quotidiana degli anni '60. È stato strano pensare a cose che per me erano normali ma che ora sembrano 'vintage' e affascinanti. La persona ha risposto entusiasta con altre domande e ha detto che tornerà a leggere i miei prossimi post. Altri lettori si sono uniti alla conversazione, condividendo confronti tra oggi e allora. Questo scambio mi ha fatto sentire meno come un pesce fuor d'acqua e più come un... ambasciatore culturale? È bizzarro, ma piacevole.",
logEn: "April 12th, 2025 - I responded to the comment, sharing details about music, fashion, and daily life in the 1960s. It was strange to think about things that were normal for me but now seem 'vintage' and fascinating. The person responded enthusiastically with more questions and said they would return to read my next posts. Other readers joined the conversation, sharing comparisons between today and then. This exchange made me feel less like a fish out of water and more like a... cultural ambassador? It's bizarre, but pleasant.",
impact: {
readersToday: 7,
comments: 3,
subscribers: 0
}

},
{
number: 4,
adviceIt: "La tua storia sta prendendo piede! Ora è il momento di espandere il tuo contenuto. Scrivi un nuovo articolo dettagliato che confronti specificamente la tecnologia degli anni '60 con quella di oggi. Spiega cosa ti ha sorpreso di più, come gli smartphone, internet o i veicoli elettrici. Il confronto da una prospettiva autentica degli anni '60 sarà affascinante per i lettori moderni.",
adviceEn: "Your story is gaining traction! Now it's time to expand your content. Write a new detailed article specifically comparing 1960s technology with today's technology. Explain what surprised you the most, like smartphones, internet, or electric vehicles. The comparison from an authentic 1960s perspective will be fascinating for modern readers.",
explanationIt: "Pubblicare regolarmente è fondamentale per la crescita di un blog. Gli algoritmi dei motori di ricerca favoriscono i siti che aggiungono contenuti freschi regolarmente. Un calendario editoriale coerente crea aspettativa nei lettori e aumenta le probabilità che tornino. Inoltre, ogni nuovo articolo è un'opportunità per posizionarsi su nuove parole chiave e attrarre diversi segmenti di pubblico. Il confronto tecnologico è particolarmente efficace perché sfrutta il 'gap contestuale' tra gli anni '60 e oggi, creando contenuti dal punto di vista unico che solo il protagonista può offrire. Questo tipo di contenuto esclusivo è altamente condivisibile sui social media.",
explanationEn: "Publishing regularly is crucial for a blog's growth. Search engine algorithms favor sites that add fresh content regularly. A consistent editorial calendar creates expectation in readers and increases the likelihood they'll return. Additionally, each new article is an opportunity to rank for new keywords and attract different audience segments. The technological comparison is particularly effective because it leverages the 'contextual gap' between the 1960s and today, creating content from the unique perspective that only the protagonist can offer. This type of exclusive content is highly shareable on social media.",
logIt: "15 Aprile 2025 - Ho pubblicato un nuovo articolo intitolato 'Dal Telefono a Disco al Touchscreen: Lo Shock Tecnologico di un Viaggiatore Temporale'. Ho descritto la mia reazione al vedere gli smartphone, i computer miniaturizzati, le auto elettriche e le case 'intelligenti'. Ho confrontato la tecnologia di oggi con quella che consideravo all'avanguardia negli anni '60. La risposta è stata sorprendente! Molti più lettori hanno trovato il mio blog, e alcuni hanno persino condiviso l'articolo su piattaforme chiamate 'social media'. K. mi ha spiegato che questo significa che altre persone stanno diffondendo il mio contenuto ai loro amici. È incredibile come le informazioni si diffondano velocemente in questa epoca.",
logEn: "April 15th, 2025 - I published a new article titled 'From Rotary Phones to Touchscreens: The Technology Shock of a Time Traveler'. I described my reaction to seeing smartphones, miniaturized computers, electric cars, and 'smart' homes. I compared today's technology with what I considered cutting-edge in the 1960s. The response was surprising! Many more readers found my blog, and some even shared the article on platforms called 'social media'. K. explained to me that this means other people are spreading my content to their friends. It's incredible how information spreads quickly in this era.",
impact: {
readersToday: 15,
comments: 5,
subscribers: 2
}
},
{
number: 5,
adviceIt: "Il tuo blog sta crescendo! Ora che hai più contenuti, aggiungi un widget 'Articoli correlati' alla fine dei tuoi post. Questo mostrerà ai lettori gli altri tuoi articoli, aumentando le probabilità che continuino a esplorare il tuo blog invece di andarsene dopo aver letto un solo post.",
adviceEn: "Your blog is growing! Now that you have more content, add a 'Related Posts' widget at the end of your posts. This will show readers your other articles, increasing the likelihood that they'll continue to explore your blog instead of leaving after reading just one post.",
explanationIt: "Il widget 'Articoli correlati' è uno strumento potente per ridurre la frequenza di rimbalzo (la percentuale di visitatori che lasciano il sito dopo aver visto una sola pagina) e aumentare il coinvolgimento. In media, questo widget può incrementare le pagine viste per sessione del 8-15%. La navigazione interna è un fattore di ranking importante per i motori di ricerca perché aumenta il tempo di permanenza sul sito. Dal punto di vista UX (User Experience), offrire contenuti correlati dopo che un lettore ha finito di leggere un articolo rappresenta il momento psicologicamente ideale per suggerire altre letture, poiché l'utente è già coinvolto e soddisfatto dal contenuto appena fruito.",
explanationEn: "The 'Related Posts' widget is a powerful tool for reducing bounce rate (the percentage of visitors who leave the site after viewing just one page) and increasing engagement. On average, this widget can increase page views per session by 8-15%. Internal navigation is an important ranking factor for search engines because it increases time spent on the site. From a UX (User Experience) perspective, offering related content after a reader has finished reading an article represents the psychologically ideal moment to suggest other readings, as the user is already engaged and satisfied with the content just consumed.",
logIt: "17 Aprile 2025 - Ho aggiunto il widget 'Articoli correlati' come suggerito da Claude. È sorprendente quante funzionalità offra WordPress! Ho notato un cambiamento immediato nel comportamento dei lettori. Molti ora leggono più di un articolo durante una visita, e il tempo medio che trascorrono sul mio blog è aumentato significativamente. È divertente vedere dalle statistiche come le persone saltano da un articolo all'altro, seguendo un percorso di curiosità attraverso le mie esperienze. Forse questa è la differenza più grande rispetto ai giornali dei miei tempi: l'interattività e la possibilità di seguire i propri interessi in modo non lineare.",
logEn: "April 17th, 2025 - I added the 'Related Posts' widget as suggested by Claude. It's amazing how many features WordPress offers! I noticed an immediate change in reader behavior. Many now read more than one article during a visit, and the average time they spend on my blog has increased significantly. It's fun to see from the statistics how people jump from one article to another, following a path of curiosity through my experiences. Perhaps this is the biggest difference from the newspapers of my time: interactivity and the ability to follow one's interests in a non-linear way.",
impact: {
readersToday: 12,
comments: 2,
subscribers: 3
}
}
];

// STATO DEL LOG INIZIALE
const initialLog = {
it: "09 Aprile 2025 - Sono arrivato qui, nel vostro tempo, tre giorni fa. Tutto è così strano e meraviglioso. K. è gentile, mi ha prestato questo \"MacBook\" e mi sta insegnando a usarlo. Ho deciso di raccontare la mia storia tramite qualcosa chiamato \"blog\", ma nessuno sembra leggerlo. Ho pubblicato il mio primo articolo dal titolo \"Ciao Mondo\", ma non ci sono visite. K. suggerisce che dovrei chiedere aiuto a un'intelligenza artificiale chiamata Claude. Non so cosa sia un'intelligenza artificiale, ma a questo punto sono disposto a provare qualsiasi cosa.",
en: "April 9th, 2025 - I arrived here, in your time, three days ago. Everything is so strange and wonderful. K. is kind, she lent me this \"MacBook\" and is teaching me how to use it. I decided to tell my story through something called a \"blog\", but nobody seems to be reading it. I published my first article titled \"Hello World\", but there are no visits. K. suggests I should ask for help from an artificial intelligence called Claude. I don't know what an artificial intelligence is, but at this point I'm willing to try anything."
};

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
// Popola il menu a tendina
populateAdviceDropdown();
// Imposta i contenuti iniziali
if (simulationState.currentAdviceIndex === 0) {
// Se siamo all'inizio, mostra il log iniziale
currentLog.innerHTML = `
<p class="lang-it">${initialLog.it}</p>
<p class="lang-en">${initialLog.en}</p>
`;
// Mostra il primo consiglio
if (adviceData.length > 0) {
currentAdvice.innerHTML = `
<p class="lang-it">${adviceData[0].adviceIt}</p>
<p class="lang-en">${adviceData[0].adviceEn}</p>

`;
// Aggiorna la spiegazione
const explanationContent =
document.querySelector('.explanation-content');
if (explanationContent) {
explanationContent.innerHTML = `
<p class="lang-it">${adviceData[0].explanationIt}</p>
<p class="lang-en">${adviceData[0].explanationEn}</p>
`;
}
}
} else {
// Se abbiamo già applicato alcuni consigli, ripristina lo stato
const previousAdviceIndex = Math.max(0, simulationState.currentAdviceIndex -
1);
// Mostra il log dell'ultimo consiglio applicato
if (previousAdviceIndex < adviceData.length) {
currentLog.innerHTML = `
<p class="lang-it">${adviceData[previousAdviceIndex].logIt}</p>
<p class="lang-en">${adviceData[previousAdviceIndex].logEn}</p>
`;
}
// Mostra il consiglio corrente
if (simulationState.currentAdviceIndex < adviceData.length) {
currentAdvice.innerHTML = `
<p
class="lang-it">${adviceData[simulationState.currentAdviceIndex].adviceIt}</p>
<p
class="lang-en">${adviceData[simulationState.currentAdviceIndex].adviceEn}</p>
`;
// Aggiorna la spiegazione
const explanationContent =
document.querySelector('.explanation-content');
if (explanationContent) {
explanationContent.innerHTML = `
<p
class="lang-it">${adviceData[simulationState.currentAdviceIndex].explanationIt}</p>
<p
class="lang-en">${adviceData[simulationState.currentAdviceIndex].explanationEn}</p>
`;
}
} else {
// Tutti i consigli sono stati applicati
currentAdvice.innerHTML = `
<p class="lang-it">Congratulazioni! Hai completato tutti i consigli.
Il tuo blog è ora ben avviato.</p>
<p class="lang-en">Congratulations! You have completed all the
advice. Your blog is now well established.</p>
`;
applyAdviceBtn.disabled = true;

}
}
// Aggiorna il display delle metriche
updateMetricsDisplay();
}

// Popola il menu a tendina
function populateAdviceDropdown() {
if (!adviceSelector) return;
adviceSelector.innerHTML = '';
adviceData.forEach(advice => {
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

// CORREZIONE: Assicurati che il pulsante "applica consiglio" funzioni indipendentemente
const applyAdviceBtnFixed = document.getElementById('apply-advice-btn');
if (applyAdviceBtnFixed) {
console.log('Configurazione corretta del bottone "applica consiglio"');
// Aggiungi event listener diretto
applyAdviceBtnFixed.onclick = function() {
console.log('Pulsante applica consiglio cliccato via onclick!');
applyAdvice();
};
} else {
console.error('ERRORE CRITICO: Il bottone "apply-advice-btn" non è stato trovato nel DOM!');
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
try {
initializePage();
console.log('Inizializzazione completata con successo!');
} catch (error) {
console.error('Errore durante l\'inizializzazione:', error);
}
// Seleziona il consiglio corrente
adviceSelector.value = simulationState.currentAdviceIndex + 1;
}

// FUNZIONE PER APPLICARE IL CONSIGLIO
function applyAdvice() {
console.log('Funzione applyAdvice chiamata!');
// Verifica se ci sono ancora consigli da applicare
if (simulationState.currentAdviceIndex >= adviceData.length) {
console.log('Tutti i consigli sono stati applicati!');
return;
}
// Ottieni il consiglio corrente
const currentAdviceData = adviceData[simulationState.currentAdviceIndex];
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
simulationState.metrics.readersToday = currentAdviceData.impact.readersToday
|| 0;
simulationState.metrics.readersTotal += simulationState.metrics.readersToday;
simulationState.metrics.comments = currentAdviceData.impact.comments || 0;
simulationState.metrics.subscribers = currentAdviceData.impact.subscribers ||
0;
}
// Aggiorna il display delle metriche
updateMetricsDisplay();
// Passa al prossimo consiglio
simulationState.currentAdviceIndex++;
// Aggiorna il dropdown
if (adviceSelector) {
adviceSelector.value = simulationState.currentAdviceIndex + 1;
}
// Mostra il prossimo consiglio o un messaggio di completamento
if (simulationState.currentAdviceIndex < adviceData.length) {
const nextAdvice = adviceData[simulationState.currentAdviceIndex];
// Aggiorna il contenuto del consiglio
if (currentAdvice && nextAdvice) {
console.log('Passaggio al prossimo consiglio...');
currentAdvice.innerHTML = `
<p class="lang-it">${nextAdvice.adviceIt}</p>
<p class="lang-en">${nextAdvice.adviceEn}</p>
`;
// Aggiorna il contenuto della spiegazione
const explanationContent =
document.querySelector('.explanation-content');
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
<p class="lang-it">Congratulazioni! Hai completato tutti i consigli.
Il tuo blog è ora ben avviato.</p>
<p class="lang-en">Congratulations! You have completed all the
advice. Your blog is now well established.</p>
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
if (readersToday) readersToday.textContent =
simulationState.metrics.readersToday;
if (readersTotal) readersTotal.textContent =
simulationState.metrics.readersTotal;
if (subscribers) subscribers.textContent = simulationState.metrics.subscribers;
if (comments) comments.textContent = simulationState.metrics.comments;
// Aggiorna le fonti di traffico
updateTrafficSources();
}

// Aggiorna la visualizzazione delle fonti di traffico
function updateTrafficSources() {
if (!trafficSourcesContainer) return;
trafficSourcesContainer.innerHTML = '';
for (const [source, value] of
Object.entries(simulationState.metrics.trafficSources)) {
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
const advice = adviceData[adviceIndex];
// Aggiorna il contenuto del consiglio
if (currentAdvice && advice) {
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
}
});