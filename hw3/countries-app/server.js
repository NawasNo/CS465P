require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

let savedCountries = null;

// Retrieve and cache countries from the API.
const getCountries = async () => {
  if (savedCountries) return savedCountries;

  const apiKey = process.env.REST_COUNTRIES_API_KEY;

  if (!apiKey) {
    throw new Error('Missing REST_COUNTRIES_API_KEY in .env');
  }

  const countries = [];
  const limit = 50;
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const fields = 'names.common,capitals,population,region,codes.alpha_2';
    const url = `https://api.restcountries.com/countries/v5?limit=${limit}&offset=${offset}&response_fields=${fields}`;

    let response;

    // Retry temporary API errors up to three times.
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: 'application/json',
        },
      });

      if (response.ok || ![429, 500, 502, 503, 504].includes(response.status)) {
        break;
      }

      console.log(`API error ${response.status}. Retry ${attempt}/3`);

      if (attempt < 3) {
        await new Promise((resolve) => {
          setTimeout(resolve, attempt * 1000);
        });
      }
    }

    if (!response.ok) {
      throw new Error(`API returned HTTP ${response.status} at offset ${offset}`);
    }

    const result = await response.json();
    const page = result.data?.objects;

    if (!Array.isArray(page)) {
      throw new Error('Invalid API response');
    }

    countries.push(...page);
    hasMore = result.data.meta?.more === true;
    offset += page.length;

    if (hasMore && page.length === 0) {
      throw new Error('API returned an empty page');
    }
  }

  savedCountries = countries;
  return countries;
};

// Home page.
app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/home', (req, res) => {
  res.render('home', { title: 'Home' });
});

// Countries and capitals in alphabetical order.
app.get('/countries', async (req, res, next) => {
  try {
    const countries = await getCountries();

    const result = countries
      .map((country) => ({
        name: country.names?.common || 'Unknown',
        capital: country.capitals?.map((capital) => (
          typeof capital === 'string' ? capital : capital.name
        )).join(', ') || 'N/A',
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    res.render('countries', {
      title: 'Countries',
      countries: result,
    });
  } catch (error) {
    next(error);
  }
});

// Countries with populations of at least 50 million.
app.get('/populous', async (req, res, next) => {
  try {
    const countries = await getCountries();

    const result = countries
      .filter((country) => country.population >= 50000000)
      .sort((a, b) => b.population - a.population)
      .map((country) => ({
        name: country.names?.common || 'Unknown',
        population: country.population,
        flag: country.codes?.alpha_2
          ? `https://flagcdn.com/w80/${country.codes.alpha_2.toLowerCase()}.png`
          : null,
      }));

    res.render('populous', {
      title: 'Populous Countries',
      countries: result,
    });
  } catch (error) {
    next(error);
  }
});

// Group countries by region.
app.get('/regions', async (req, res, next) => {
  try {
    const countries = await getCountries();
    const groups = {};

    countries.forEach((country) => {
      const region = country.region || 'Unknown';

      if (!groups[region]) {
        groups[region] = [];
      }

      groups[region].push(country.names?.common || 'Unknown');
    });

    const regions = Object.keys(groups)
      .map((name) => ({
        name,
        count: groups[name].length,
        countries: groups[name].sort((a, b) => a.localeCompare(b)),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    res.render('regions', {
      title: 'Regions',
      regions,
    });
  } catch (error) {
    next(error);
  }
});

// Display errors.
app.use((error, req, res, next) => {
  console.error(error.message);

  res.status(500).render('error', {
    title: 'Error',
    message: error.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
