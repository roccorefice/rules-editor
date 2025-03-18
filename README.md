# 📌 Rules Editor


🚨🚩**Credenziali per login: admin / Password01**
 

## 📜 Descrizione
Questa applicazione permette di gestire gruppi di regole attraverso un'interfaccia intuitiva basata su React. Gli utenti possono caricare un file JSON contenente gruppi di regole, modificarli, eliminarli o aggiungere nuove regole. Inoltre, è possibile scaricare il file JSON aggiornato dopo le modifiche.

## 🚀 Tecnologie Utilizzate
- **React + Vite + Ts** per la gestione dell'applicativo
- **Formik + Yup** per la gestione dei form e la validazione
- **AG Grid** per la visualizzazione e gestione delle tabelle
- **Framer Motion** per animazioni fluide
- **React-Toastify** per notifiche utente
- **React-State** per la gestione dello stato locale
- **Context-API** per la gestione di informazioni globali

## 📌 Funzionalità
Di seguito una panoramica delle funzionalità supportate dall’app:

| **Feature**                    | **Given (Stato Iniziale)** | **When (Azione)** | **Then (Risultato Atteso)** |
|---------------------------------|---------------------------|-------------------|----------------------------|
| **Login Admin**                 | L’utente non è autenticato | Inserisce "admin" e "password" | Viene autenticato e accede alla piattaforma |
| **Caricamento JSON + Validazione** | L'utente ha un file JSON valido | Seleziona e carica il file | Il file viene validato e caricato correttamente |
| **Reset del JSON**               | Un file JSON è stato caricato | L'utente clicca su "Reset JSON" | Il file JSON viene cancellato e i dati vengono svuotati |
| **Visualizzazione Gruppi di Regole** | Un JSON valido è stato caricato | L'utente accede alla Home (/home) | Una tabella mostra i gruppi di regole caricati |
| **Navigazione ai Dettagli di un Gruppo** | L’utente è sulla Home | Clicca su una riga della tabella | Viene reindirizzato alla pagina di dettaglio delle regole (/edit) |
| **Eliminazione di una Regola** | L’utente è nella pagina di dettaglio (/edit) | Clicca su "Elimina" su una regola | La regola viene rimossa dal gruppo |
| **Modifica di una Regola** | L’utente è nella pagina di dettaglio (/edit) | Clicca su "Modifica" su una regola, aggiorna i dati e salva | La regola viene aggiornata e riflessa nella tabella |
| **Aggiunta di una Regola** | L’utente è nella pagina di dettaglio (/edit) | Clicca su "Aggiungi Regola", compila i campi e salva | La nuova regola viene aggiunta al gruppo |
| **Download JSON aggiornato** | L’utente è sulla Home (/home) e ha modificato le regole | Clicca su "Scarica JSON" | Il file JSON aggiornato viene generato e scaricato |


## 🛠 Installazione e Avvio

1. **Clonare il repository**
   ```sh
   git clone https://github.com/roccorefice/rules-editor.git
   cd rules-editor

2. **Installare le dipendenze**
   ```sh
   npm install

3. **Avviare il progetto**
   ```sh
   npm run dev
