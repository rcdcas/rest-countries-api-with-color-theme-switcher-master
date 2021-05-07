'use strict';
const Module = (function () {
  const main = document.querySelector('.main__section');
  const template = document.querySelector('.card__template');
  const search = document.querySelector('.search__input');
  const searchForm = document.querySelector('.search__form');
  const searchSelection = document.querySelector('.search__options');

  function cloneTemplate() {
    // const templateNode = document.importNode(template.content, true);
    const templateNode = template.content.cloneNode(true);
    const nodeCard = templateNode.querySelector('.country__card');
    return nodeCard;
  }

  function parseTemplate({ flag, demonym, population, region, capital }) {
    const nodeCard = cloneTemplate();
    const cardSvg = nodeCard.querySelector('.card__svg > img');
    const cardDescription = nodeCard.querySelector('.card__description');
    const countryDescription = cardDescription.querySelector('.dst__country');
    const populationDescription = cardDescription.querySelector(
      '.dst__population > span'
    );
    const regionDescription = cardDescription.querySelector(
      '.dst__region > span'
    );
    const capitalDescription = cardDescription.querySelector(
      '.dst__capital > span'
    );

    cardSvg.src = flag;
    countryDescription.textContent = demonym;
    populationDescription.textContent = population.toLocaleString();
    regionDescription.textContent = region;
    capitalDescription.textContent = capital;
    main.append(nodeCard);
  }

  function init() {
    const startCountrys = doFetch('region/africa');
    console.log(startCountrys);
    startCountrys.then((response) =>
      response.forEach((startElement) => parseTemplate(startElement))
    );
  }

  function searchRegion(event) {
    event.preventDefault();
    const regionResult = doFetch(`region/${event.target.value}`);
    console.log(regionResult);
    main.innerHTML = '';

    regionResult.then((result) =>
      result.forEach((regionResultIndividual) =>
        parseTemplate(regionResultIndividual)
      )
    );
  }

  function searchCountry(event) {
    event.preventDefault();
    const countryResult = doFetch(`name/${search.value}`);
    main.innerHTML = '';
    countryResult.then((result) =>
      result.forEach((countryResultIndividual) =>
        parseTemplate(countryResultIndividual)
      )
    );
  }

  async function doFetch(url = 'all') {
    try {
      const response = await fetch(`https://restcountries.eu/rest/v2/${url}`);
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  return {
    searchForm,
    searchSelection,
    init,
    searchRegion,
    searchCountry,
  };
})();

Module.init();
Module.searchSelection.addEventListener('change', Module.searchRegion);
Module.searchForm.addEventListener('submit', Module.searchCountry);
