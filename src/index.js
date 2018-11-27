// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading.
const quoteContainer = document.querySelector('#quote-list')
const contentInput = document.querySelector('#new-quote')
const authorInput = document.querySelector('#author')
const quoteForm = document.querySelector('#new-quote-form')

const addQuote = quote => {
    const quoteCard = document.createElement('li')
    quoteCard.class = 'quote-card'

    const successBtn = document.createElement('button')
    successBtn.class = 'btn-success'
    successBtn.id = `quote-likes-${quote.id}`
    successBtn.innerHTML = `Likes: <span>${quote.likes}</span>`

    const dangerBtn = document.createElement('button')
    dangerBtn.class = 'btn-danger'
    dangerBtn.id = `quote-delete-${quote.id}`
    dangerBtn.innerHTML = 'Delete'

    quoteCard.innerHTML = `
    <blockquote class="blockquote">
    <p class="mb-${quote.id}">${quote.quote}</p>
    <footer class="blockquote-footer">${quote.author}</footer>
    <br>
    </blockquote>
    `

    successBtn.addEventListener('click', () => {
        ++quote.likes;
        updateLikes(`${quote.id}`, `${quote.likes}`)
          .then(q => updateQuote(q))
      });

    dangerBtn.addEventListener('click', () => {
        quoteCard.remove()
        deleteQuote(quote.id)
    })

    quoteCard.appendChild(successBtn)
    quoteCard.appendChild(dangerBtn)
    quoteContainer.appendChild(quoteCard)
}

const updateQuote = quote => {
    const quotePEl = document.querySelector(`#quote-likes-${quote.id}`)
    quotePEl.innerHTML = `Likes: ${quote.likes}`
}

const addQuotes = quotes => {
    quotes.forEach(quote => addQuote(quote))
}

quoteForm.addEventListener('submit', (event) => {
    event.preventDefault()
      quote = {
        quote: contentInput.value,
        author: authorInput.value,
        likes: 0
      }
    createQuote(quote)
        .then(serverQuote => addQuote(serverQuote))
  })

const getQuotes = () => {
    fetch('http://localhost:3000/quotes/')
    .then(resp => resp.json())
    // .then(resp => console.log(resp))
    .then(quotes => addQuotes(quotes))
}

const createQuote = quote => 
    fetch('http://localhost:3000/quotes', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quote)
        })
    .then(resp => resp.json())


const updateLikes = (id, likes) =>
    fetch(`http://localhost:3000/quotes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json',
        Accept: "application/json" },
        body: JSON.stringify({"likes": likes})
  })
  .then(resp => resp.json())

const deleteQuote = id => {
    fetch(`http://localhost:3000/quotes/${id}`, {
        method: 'DELETE'
      }).then(resp => console.log(resp))
}

getQuotes()