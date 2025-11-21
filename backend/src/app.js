import express from "express";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Quote categories
let categories = ['successQuotes', 'perseveranceQuotes', 'happinessQuotes'];

let successQuotes = [
  {
    'quote': 'Success is not final, failure is not fatal: It is the courage to continue that counts.',
    'author': 'Winston S. Churchill'
  },
  {
    'quote': 'The way to get started is to quit talking and begin doing.',
    'author': 'Walt Disney'
  }
];

let perseveranceQuotes = [
  {
    'quote': 'It\'s not that I\'m so smart, it\'s just that I stay with problems longer.',
    'author': 'Albert Einstein'
  },
  {
    'quote': 'Perseverance is failing 19 times and succeeding the 20th.',
    'author': 'Julie Andrews'
  }
];

let happinessQuotes = [
  {
    'quote': 'Happiness is not something ready made. It comes from your own actions.',
    'author': 'Dalai Lama'
  },
  {
    'quote': 'For every minute you are angry you lose sixty seconds of happiness.',
    'author': 'Ralph Waldo Emerson'
  }
];

app.get("/", (_, res) => {
  res.json({ ok: true, msg: "Hello from Express inside a Dev Container!" });
});

app.get("/health", (_, res) => {
  res.status(200).send("healthy");
});

// Quotebook - Fetch all categories
app.get("/quotebook/categories", (req, res) => {
  let response = categories.map(category => `A possible category is ${category}`).join('\n');
  res.type('text/plain').send(response);
});

// Quotebook - Get random quote from category
app.get("/quotebook/quote/:category", (req, res) => {
  const category = req.params.category;
  
  // Check if category is valid
  if (!categories.includes(category)) {
    return res.status(400).json({ 'error': `no category listed for ${category}` });
  }
  
  // Get the quotes array for the specified category
  let quotesArray;
  if (category === 'successQuotes') {
    quotesArray = successQuotes;
  } else if (category === 'perseveranceQuotes') {
    quotesArray = perseveranceQuotes;
  } else if (category === 'happinessQuotes') {
    quotesArray = happinessQuotes;
  }
  
  // Get a random quote from the array
  const randomIndex = Math.floor(Math.random() * quotesArray.length);
  const randomQuote = quotesArray[randomIndex];
  
  res.json(randomQuote);
});

// Quotebook - Add a new quote
app.post("/quotebook/quote/new", (req, res) => {
  const { category, quote, author } = req.body;
  
  // Check if all required parameters are provided
  if (!category || !quote || !author) {
    return res.status(400).json({ 'error': 'invalid or insufficient user input' });
  }
  
  // Check if category is valid
  if (!categories.includes(category)) {
    return res.status(400).json({ 'error': 'invalid or insufficient user input' });
  }
  
  // Create the new quote object
  const newQuote = {
    quote: quote,
    author: author
  };
  
  // Add the quote to the appropriate category array
  if (category === 'successQuotes') {
    successQuotes.push(newQuote);
  } else if (category === 'perseveranceQuotes') {
    perseveranceQuotes.push(newQuote);
  } else if (category === 'happinessQuotes') {
    happinessQuotes.push(newQuote);
  }
  
  res.type('text/plain').send('Success!');
});

// Circle endpoint - calculates area and circumference
app.get("/math/circle/:radius", (req, res) => {
  const radius = parseFloat(req.params.radius);
  
  // console.log("radius:", radius);
  
  if (isNaN(radius) || radius <= 0) {
    return res.status(400).json({ error: "Invalid radius. Please provide a positive number." });
  }
  
  const area = Math.PI * radius * radius;
  const circumference = 2 * Math.PI * radius;

  console.log("area :", area);
  console.log("circumference:", circumference);
  
  res.json({
    radius: radius,
    area: area,
    circumference: circumference
  });
});

// Rectangle endpoint - calculates area and perimeter
app.get("/math/rectangle/:width/:height", (req, res) => {
  const width = parseFloat(req.params.width);
  const height = parseFloat(req.params.height);
  
  if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    return res.status(400).json({ error: "Invalid dimensions. Please provide positive numbers." });
  }
  
  const area = width * height;
  const perimeter = 2 * (width + height);
  
  console.log("area :", area);
  console.log("perimeter:", perimeter);

  res.json({
    width: width,
    height: height,
    area: area,
    perimeter: perimeter
  });
});

// Power endpoint - calculates base^exponent with optional root
app.get("/math/power/:base/:exponent", (req, res) => {
  const base = parseFloat(req.params.base);
  const exponent = parseFloat(req.params.exponent);
  const root = req.query.root ? parseFloat(req.query.root) : null;
  
  if (isNaN(base) || isNaN(exponent)) {
    return res.status(400).json({ error: "Invalid base or exponent. Please provide valid numbers." });
  }
  
  let result = Math.pow(base, exponent);
  
  if (root) {
    if (isNaN(root) || root === 0) {
      return res.status(400).json({ error: "Invalid root. Please provide a non-zero number." });
    }
    result = Math.pow(result, 1 / root);
  }
  
  const response = {
    base: base,
    exponent: exponent,
    result: result
  };
  
  if (root) {
    response.root = root;
  }
  
  res.json(response);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});