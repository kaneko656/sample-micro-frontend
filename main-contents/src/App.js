import "footer_app/TheFooter";
import Header from "header_app/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <h1>Main contents</h1>
      </main>
      <the-footer title="micro-frontend app" />
    </div>
  );
}

export default App;
