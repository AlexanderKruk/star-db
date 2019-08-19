export default class SwapiService {

  _apiBase = 'https://swapi.co/api';
  _imageBase = 'https://starwars-visualguide.com/assets/img';

  async getResource(url) {
    const res = await fetch(url);

    if(!res.ok) {
      throw new Error(`Server not have this source in ${url}` +
                      ` status ${res.status}`);
    }
    
    const body = await res.json();
    return body;  
  }
  
  getAllPeople = async () => {
    const res = await this.getResource(`${this._apiBase}/people`);
    return res.results.map(this._trasformPerson).slice(0, 8);
  }

  getPerson = async (id) => {
    const person = await this.getResource(`${this._apiBase}/people/${id}`);
    return this._trasformPerson(person);
  }

  getAllStarships = async () => {
    const res = await this.getResource(`${this._apiBase}/starships`);
    return res.results.map(this._tranformStarship).slice(0, 8);
  }

  getImagePerson = (id) => {
    return `${this._imageBase}/characters/${id}.jpg`;
  }

  getImageStarship = (id) => {
    return `${this._imageBase}/starships/${id}.jpg`;
  }

  getImagePlanet = (id) => {
    return `${this._imageBase}/planets/${id}.jpg`;
  }

  getAllStarships = async () => {
    const res = await this.getResource(`${this._apiBase}/starships`);
    return res.results.map(this._trasformPerson).slice(0, 8);
  }

  getAllPlanets = async () => {
    const res = await this.getResource(`${this._apiBase}/planets`);
    return res.results.map(this._transformPlanet).slice(0, 8);
  }

  getPlanet = async (id) => {
    const planet = await this.getResource(`${this._apiBase}/planets/${id}`);
    return this._transformPlanet(planet);
  }

  getStarship = async (id) => {
    const starship = await this.getResource(`${this._apiBase}/starships/${id}`);
    return this._tranformStarship(starship);
  }

  _extractId(item) {
    const regExp = /\/(\d*)\/$/;
    return item.url.match(regExp)[1];
  }

  _transformPlanet = (planet) => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
      }
  }

  _tranformStarship = (starship) => {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.cost_in_credits,
      length: starship.length,
      crew: starship.crew,
      passangers: starship.passengers,
      cargoCapacity: starship.cargo_capacity
    }
  }

  _trasformPerson = (person) => {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color
    }
  }
}
