import { Container, Grid } from "@material-ui/core";
import "./App.css";
import Header from "./components/Header";
import CountryList from "./features/CountryList";
import SummaryList from "./features/SummaryList";

function App() {
  return (
    <div className="App">
      <Container maxWidth="lg" className="container">
        <Grid item lg={12}>
          <Header />
        </Grid>
        <div className="mainContent">
          <Grid container spacing={3}>
            <Grid item lg={9} md={9} xs={12}>
              <CountryList />
            </Grid>
            <Grid item lg={3} md={3} xs={12}>
              <SummaryList />
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}

export default App;
