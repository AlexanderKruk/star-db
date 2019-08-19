import React from 'react';
import ItemDetails, { Record } from '../item-details';

import { withSwapiService } from '../hoc-helpers';

const StarshipDetails = (props) => {
        return (
          <ItemDetails {...props}>
            <Record field="length" label="Length"/>
            <Record field="model" label="Model"/>
            <Record field="manufacturer" label="Made"/>
            <Record field="crew" label="Crew"/>
            <Record field="passangers" label="Passengers"/>
            <Record field="cargoCapacity" label="Cargo" />
            <Record field="costInCredits" label="Cost"/>
          </ItemDetails>
        );
      }

const mapMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getStarship,
    getImageUrl: swapiService.getImageStarship
  }
}

export default withSwapiService(mapMethodsToProps)(StarshipDetails);