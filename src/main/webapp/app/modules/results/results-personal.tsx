import './results.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Container, Grid, Image } from 'semantic-ui-react';
import ResultsButtonColumn from 'app/modules/results/results-button-column';

export interface IResultsPersonalProps extends StateProps, DispatchProps {}

export class ResultsPersonal extends React.Component<IResultsPersonalProps> {
  render() {
    return (
      <Grid className="results" stackable>
        <Grid.Row>
          <Image src="content/images/granny.jpg" circular size="tiny" inline />
          <span className="results-granny-bubble">Ποιος είσαι τελικά;</span>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={10} mobile={14}>
            <div style={{ display: 'inline-block', padding: '5vh 0 5vh 6vw' }}>
              <div className="results-labels">προοδευτικός</div>
              <Image src="content/images/pill.png" centered />
              <div className="results-labels">συντηρητικός</div>
            </div>
            <div style={{ display: 'inline-block', padding: '5vh 3vw' }}>
              <div className="results-labels">εθνοκεντρικός</div>
              <Image src="content/images/pill.png" centered />
              <div className="results-labels">κοσμοπολίτης</div>
            </div>
            <div style={{ display: 'inline-block', padding: '5vh 4vw 5vh 0' }}>
              <div className="results-labels">παθητικός</div>
              <Image src="content/images/pill.png" centered />
              <div className="results-labels">συμμετοχικός</div>
            </div>
          </Grid.Column>
          <ResultsButtonColumn personal />
        </Grid.Row>
        <div className="content-divider results" />
        <Grid.Row>
          <Grid.Column computer={3} mobile={14}>
            <Container>
              <h3 className="results-description-title">80% Προοδευτικός:</h3>
              <p className="results-description-content">
                Αντισυμβατικός, αντικομφορμιστική και επαναστατική προσωπικότητα. Είσαι ένας απρόβλεπτος άνθρωπος, ο οποίος μπορεί πανεύκολα
                να κάνει μεγάλες ανατροπές στη ζωή του όπου και θα σοκάρει!
              </p>
            </Container>
          </Grid.Column>
          <Grid.Column computer={3} mobile={14}>
            <Container>
              <h3 className="results-description-title">60% Κοσμοπολίτης :</h3>
              <p className="results-description-content">
                Είσαι ένας άνθρωπος πολυταξιδεμένος, που έζησε σε διάφορες χώρες, προσαρμόστηκε και αφομοίωσε ποικίλους τρόπους ζωής και που
                χαρακτηρίζεται από την άνεση με την οποία μπορεί να κινηθεί στους χώρους της ανώτερης συνήθ. κοινωνίας
              </p>
            </Container>
          </Grid.Column>
          <Grid.Column computer={3} mobile={14}>
            <Container>
              <h3 className="results-description-title">60% Παθητικός :</h3>
              <p className="results-description-content">
                Η παθητικότητα μπορεί να αποτελέσει μια χρήσιμη στρατηγική και έναν υγιή μηχανισμό αντιμετώπισης σε κάποιες περιπτώσεις. Από
                την άλλη μπορεί να γίνει συνήθεια. Όταν παθητικότητα αρχίζει να κυριαρχεί στις απαντήσεις και τις αλληλεπιδράσεις μας και να
                καθορίσει τη γενική προσέγγιση μας για τη ζωή, μπορεί να καταλήξει να κάνει περισσότερο κακό παρά καλό.
              </p>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsPersonal);