// Step 1.    Assign Elements
// Step 2.1   renderThing(thing)
// Step 3.1   Listen for Form Submission
// Step 3.2   submitThingForm()
  // incl. Step 9.1
    // incl. Step 6.2 [storeThing(thing)]
    // incl. Step 2.2 [renderThing(thing)]
// Step 4.    Add state = {}
// Step 5.1   Clear & Render
  // incl. Step 2.2 [renderThing(thing)]
// Step 6.1   storeThing(thing) [local]
// Step 7     Create api.js
// Step 8.1   Fetch & Store Monsters
  // Step 8.2 [/api.js] fetchThings()
  // Step 8.3 [/index.js] storeThings(things) [local]
  // incl. Step 5.2
// Step 9.1   Create, Store & Render Thing
  // Step 9.2 [/api.js] createThing(thing)
    // incl. Step 6.2 [storeThing(thing)]
    // incl. Step 2.2 [renderThing(thing)]
// Step 10 [/api.js] updateThing(thingToUpdate)

// ***FORM***
const createQuoteForm = document.querySelector('#new-quote-form')
const newQuoteInput = createQuoteForm.querySelector('#new-quote')
const quoteAuthorInput = createQuoteForm.querySelector('#author')
// ***RENDER***
const quoteList = document.querySelector('#quote-list')
// ***SORT BY AUTHOR***
const sortByBtn = document.querySelector('#sort-by')

const state = {
  "quotes": []
}

const updateList = () => {
  quoteList.innerHTML = ''
  state.quotes.forEach(renderQuote)
}

const sortList = () => {
  state.quotes.sort(function(a,b) {
    var nameA = a.author.toUpperCase()
      var nameB = b.author.toUpperCase()
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    return 0;
  })
  quoteList.innerHTML = ''
  state.quotes.forEach(renderQuote)
}

sortByBtn.addEventListener('click', sortList)

const storeQuote = quote => {
  state.quotes.push(quote)
}

const storeQuotes = quotes => {
  quotes.forEach(storeQuote)
}

const renderQuote = quote => {
  const quoteEl = document.createElement('li')
  quoteEl.id = `quote-${quote.id}`
  quoteEl.classList = 'quote-card'
  quoteEl.innerHTML = `
    <blockquote class="blockquote">
      <p class="mb-0">${quote.quote}</p>
      <footer class="blockquote-footer">${quote.author}</footer>
      <br>
      <button id='like-btn' class='btn-success'>Likes: <span>${quote.likes}</span></button>
      <button id='edit-btn' class='btn-success'>Edit</button>
      <button class='btn-danger'>Delete</button>
    </blockquote>
    <form id="edit-quote-form" style="display: none">
      <div class="form-group">
        <label for="edit-quote">Edit Quote</label>
        <input type="text" class="form-control" id="edit-quote" placeholder="Edit me...">
        <br />
        <button type="submit" class="btn btn-primary">Edit</button>
      </div>
    </form>
  `
  quoteList.appendChild(quoteEl)
  
  clickLikeAndUpdateQuote(quoteEl, quote)
  clickEditAndUpdateQuote(quoteEl, quote)
  clickAndDeleteQuote(quoteEl, quote)
}

const clickLikeAndUpdateQuote = (el, quote) => {
  const likeBtn = el.querySelector('#like-btn')
  likeBtn.addEventListener('click', () => {
    const quoteToUpdate = {
      "id": quote.id,
      "likes": ++quote.likes
    }
    updateQuote(quoteToUpdate)
      .then(quote => {
        likeBtn.innerHTML = `
          Likes: <span>${quote.likes}</span>
        `
      })
  })
}

const clickEditAndUpdateQuote = (el, quote) => {
  const editBtn = el.querySelector('#edit-btn')  
  editBtn.addEventListener('click', () => {    
    const editForm = el.querySelector('#edit-quote-form')
    if(editForm.style.display === "none") {
      editForm.style.display = "block"
    } else if(editForm.style.display === "block") {
      editForm.style.display = "none"
    }
    editForm.addEventListener('submit', event => submitEditQuoteForm(el, quote, event))
  })
}

const submitEditQuoteForm = (el, quote, event) => {
  event.preventDefault()
  const editForm = el.querySelector('#edit-quote-form')
  const editQuoteInput = el.querySelector('#edit-quote')

  const quoteToUpdate = {
    "id": quote.id,
    "quote": editQuoteInput.value
  }

  editForm.reset()

  updateQuote(quoteToUpdate)
    .then(quote => {
      const quotePEl = el.querySelector('p')
      quotePEl.innerText = quote.quote
    })

}

const clickAndDeleteQuote = (el, quote) => {
  const deleteBtn = el.querySelector('.btn-danger')
  deleteBtn.addEventListener('click', () => {
    deleteQuote(quote)
    el.parentNode.removeChild(el)
  })
}

const submitQuoteForm = event => {
  event.preventDefault()

  const quote = {
    "quote": newQuoteInput.value,
    "author": quoteAuthorInput.value,
    "likes": 0
  }

  createQuoteForm.reset()

  createQuote(quote)
    .then(newQuote => {
      storeQuote(newQuote)
      renderQuote(newQuote)
    })
}

createQuoteForm.addEventListener('submit', submitQuoteForm)

fetchQuotes()
  .then(quotes => {
    storeQuotes(quotes)
    updateList()
  })
  