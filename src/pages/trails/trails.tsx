import { PureComponent } from 'react';
import { Grade, TrailResume, TrailGrade } from '../../model/trails';
import {DynamicObject} from '../../model/general';
import TrailsList from '../../components/TrailsList';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import GradeCard from '../../components/GradeCard';
import trailsImage from '../../assets/trails-image.png';
import userIcon from '../../assets/user.svg';
import axios from 'axios';
import './styles.scss';

interface TrailsState {
  apiEndpoint: string,
  trails: TrailResume[] | [];
  modalOpened: boolean;
  subscriptionsCount: number;
  trailsGrade: DynamicObject<TrailGrade[]> | {};
  selectedTrail: TrailResume;
  selectedGrade: Grade[] | [];
  userSubscriptions: number[] | [];
  disableSubscribe: boolean;
}

class TrailsPage extends PureComponent<TrailsState> {
  state: TrailsState = {
    apiEndpoint: 'https://60e2ee6f9103bd0017b47673.mockapi.io/api/v1/trails/',
    trails: [],
    modalOpened: false,
    subscriptionsCount: 0,
    trailsGrade: {},
    selectedTrail: {
      description: '',
      id: '',
      image: '',
      name: ''
    },
    selectedGrade: [],
    userSubscriptions: [],
    disableSubscribe: false
  };

  componentDidMount() {
    this.loadTrails();
    window.addEventListener('request-trail', (e) => {
      e.stopPropagation();
      const id = (e as CustomEvent).detail;
      this.requestTrail(id);
    });
    window.addEventListener('close-dialog', (e) => {
      e.stopPropagation();
      this.closeDialog();
    });
  };

  componentWillUnmount() {
    window.removeEventListener('request-trail', (e) => {
      e.stopPropagation();
      const id = (e as CustomEvent).detail;
      this.requestTrail(id);
    });
    window.removeEventListener('close-dialog', (e) => {
      e.stopPropagation();
      this.closeDialog();
    });
  };

  closeDialog() {
    this.setState({modalOpened: false});
  };

  loadTrails() {
    axios.get(this.state.apiEndpoint)
    .then((response) => {
      if (response.status === 200) {
        this.setState({trails: response.data});
      }
    })
    .catch((error) => {
     console.log('error');
    })
  };

  requestTrail(id:string) {
    let grades = this.state.trailsGrade as DynamicObject<TrailGrade>;
    if (!grades[id]) {
      axios.get(`${this.state.apiEndpoint}${id}/trails-grade/${id}/courses`)
      .then((response) => {
        if (response.status === 200) {
          grades[id] = response.data;
          this.setState({trailsGrade: grades}, () => this.setState({selectedGrade: grades[id]}));
        }
      })
      .catch((error) => {
        console.log('error');
      });
    } else {
      this.setState({selectedGrade: grades[id]});
    }
    this.setTrailDetails(grades, id);
  };
  
  setTrailDetails(grades: DynamicObject<TrailGrade>, id: string) {
    const userSubscriptions = this.state.userSubscriptions as number[];
    let selectedTrail = this.state.trails.find((trail) => trail.id === id);
    const disableSubscribe = userSubscriptions.includes(parseInt(selectedTrail!.id)) ?? false;
    this.setState({selectedTrail, selectedGrade: grades[id],modalOpened: true, disableSubscribe});
    document.getElementById('subscribeButton')?.focus();
  };

  handleSubscribeClick() {
    this.setState({disableSubscribe: true});
    const subscriptions = this.state.userSubscriptions as number[];
    const {selectedTrail} = this.state;
    subscriptions.push(parseInt(selectedTrail.id));
    this.closeDialog();
  }
  render() {
    const {trails, modalOpened, selectedTrail, selectedGrade, userSubscriptions, disableSubscribe} = this.state;
    const {description, name} = selectedTrail;

    return (
      <>
        <div className="trails">
          <header className="trails__header">
            Inscrições: {userSubscriptions.length}
            <img className="trails__user-icon" src={userIcon} alt="Ícone de usuário" />  
          </header>
          <section className="trails__section">
            <div className="trails__banner">
              <div className="trails__logo">
                <div className="trails__company-name"> ZUP </div>
                <div className="trails__page-title"> trails </div>
              </div>
              <figure>
                <img className="trails__banner-image" src={trailsImage} alt="imagem de pessoas trabalhando com um notebook" />
              </figure>
            </div>
            <nav className="trails__nav">
              {trails.length ? <TrailsList trails={trails}/> : null}
            </nav>
          </section>
        </div>
        {modalOpened ? <Modal opened={modalOpened}>
          <h1 id="dialogTitle" className="modal__title">{name}</h1>
          <p  className="modal__description">{description}</p>
          <div className="modal__button-container">
            <Button id="subscribeButton" className="modal__button" label="inscrever-se" disabled={disableSubscribe} onClick={() => this.handleSubscribeClick()}/>
          </div>
          <div className="modal__grade-container">
            {selectedGrade?.map((course, key) => {
              return (
                <GradeCard key={key} name={course.name} duration={course.hours}/>
              )
            })}
          </div>
        </Modal> : null}
      </>
    )
  }
}

export default TrailsPage;