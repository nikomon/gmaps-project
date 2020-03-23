import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Input } from './Input';
import { firestore } from 'firebase';
import { render } from '@testing-library/react';

export const VerticalLinearStepper: React.FC = () => {
  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
  }),
  );
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ['Oirearvio', 'Anna sijainti', 'Lähetä'];
  const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [postalCode, setPostalCode] = useState("");
  const [age, SetAge] = useState(18);
  const [symptomps, setSymptoms] = useState<boolean|undefined>();


  useEffect(() => {
    if(location && !postalCode) {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAK_klzIah3ua0DLlOx9MKpYwXSzP__d_w&latlng=${location?.lat},${location?.lng}&sensor=true`)
      .then(response => response.json())
      .then(({ results }) => results.map((result: any) => console.log(result)))
    }
  }, [location])

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
          <p>
            <input id="false" type="radio" onChange={() => setSymptoms(false)} name="respiratory" value="false"/>
            <label htmlFor="false">Minulla ei ole hengitystieoireita</label>
          </p>
          <p>
            <input id="true" type="radio" onChange={() => setSymptoms(true)} name="respiratory" value="true"/>
            <label htmlFor="true">Minulla on hengitystieoireita</label>
          </p>
          </>
        );
      case 1:
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude }}) => setLocation({ lat: latitude, lng: longitude}), () => {}, { enableHighAccuracy: false });
        } else {
          alert("Geolocation is not supported by this browser.");
        }
        return location?.lat ? 
          `Annan hyväksynnän sijaintini käyttämiseen` :
          <>
          { 'Ilmeni virhe sijannin haussa. Anna postinumero manuaalisesti' }
          <br/>
          <Input type="number" name="postal_code"/> 
          </>;
      case 2:
        return `Painamalla lähetä nappia hyväksyt sijainnin ja oirearviosi julkaisun anonyymisti.`;
      default:
        return 'Unknown step';
    }
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    if(activeStep === steps.length - 1 && location) {
      firestore().collection("users").doc().set({
        age: age,
        symptomps,
        lng: location.lng,
        lat: location.lat
      })
      .then(function() {
          console.log("Document successfully written!");
      })
      .catch(function(error: string) {
          console.error("Error writing document: ", error);
      });
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  {
                    activeStep === 0 
                    ?
                    null :
                  <Button
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Takaisin
                  </Button>
                  }
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={symptomps === undefined}
                    onClick={handleNext}
                    className={classes.button}
                  >
                    { 
                      activeStep === steps.length - 1 ? 'Lähetä' : 'Seuraava'
                    }
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>Kiitos vastauksesta!</Typography>
        </Paper>
      )}
    </div>
  );
}