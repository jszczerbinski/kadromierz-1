import React from "react";
import "./App.css";
import HomePageContainer from "./containers/HomePage";
/*
Mam spory problem z oceną tego projektu.
1. Użyłaś materiala. Ogólnie jestem zwolennikiem Czystej Architektury, im mniej bilbiotek tym lepiej.
Czasem, w prototypowaniu używa się takich narzędzi, ale w jakości produkcyjnej niepowinno. 
Przesłane zostały makiety - a design jest materialowy - nie mam jak ocenić umiejętności odwzorowywania makiet :) 
2. Wynikające z pkt pierwszego - dość ubogie, pod kątem logiki, zadanie. Nie mam tu czego oceniać, doradzić. 
3. Brak testów. W naszej pracy - jeśli kodowanie to 100% czasu to 40% zajmuje pisanie testów. Ja sam - projektując mikroserwisy 
stosuję metodykę Test Driven Development. Nie dopuszczamy kodu na produkcję jeśli nie jest pokryty testami. 
*/
function App() {
  return (
    <div className="App">
      <HomePageContainer />
    </div>
  );
}

export default App;
