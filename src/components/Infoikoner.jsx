// Informationsikoner-sektion til forsiden – viser fire ikoner for levering, fri fragt, retur og anmeldelser.
import leveringikon from "../image/leveringikon.svg";
import fragtikon from "../image/frifragtikon.svg";
import returikon from "../image/returikon.svg";
import anmeldelserikon from "../image/anmeldelserikon.svg";

export default function Infoikoner() {
  return (
    // Wrapper for hele infoikon-sektionen
    <div className="infoikoner">
      {/* Grid med fire info-kort */}
      <div className="info-grid">
        {/* Kort: Levering */}
        <div className="info-card">
          <img src={leveringikon} alt="Levering" />
          <h4>Levering</h4>
          <p>Kun 1-2 hverdage</p>
        </div>
        {/* Kort: Fri fragt */}
        <div className="info-card">
          <img src={fragtikon} alt="Frifragt" />
          <h4>Fri fragt</h4>
          <p>Gratis levering</p>
        </div>
        {/* Kort: Retur */}
        <div className="info-card">
          <img src={returikon} alt="Retur" />
          <h4>Retur</h4>
          <p>30 dages returret</p>
        </div>
        {/* Kort: Anmeldelser */}
        <div className="info-card">
          <img src={anmeldelserikon} alt="Anmeldelser" />
          <h4>Anmeldelser</h4>
          <p>Over 15.000 tilfredse kunder</p>
        </div>
      </div>
    </div>
  );
}
