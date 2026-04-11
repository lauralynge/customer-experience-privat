// 404-side – vises automatisk, når brugeren besøger en URL der ikke matcher nogen rute.
// Giver brugeren mulighed for at navigere tilbage til forsiden.
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    // Wrapper for hele 404-siden
    <>
      <header>
        {/* Stor 404-overskrift */}
        <h1 className="not-found-title">404</h1>
      </header>
      <main className="not-found">
        {/* Besked til brugeren om at siden ikke findes */}
        <p>Siden du leder efter findes ikke.</p>
        {/* Link tilbage til forsiden */}
        <Link to="/" className="not-found-link">
          Gå tilbage til forsiden
        </Link>
      </main>
    </>
  );
}
