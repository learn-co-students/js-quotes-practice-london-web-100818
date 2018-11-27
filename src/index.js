// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading.
const quoteForm = document.querySelector("#new-quote-form");
const baseUrl = 'http://localhost:3000/quotes';
const sortBy = document.querySelector("#sortBy");

const fetchQuotes = () => {
    return fetch(baseUrl)
        .then(resp => resp.json());
}

const refreshList = () => {
    document.querySelector("#quote-list").innerHTML = "";
    showQuotes();
}

const addQuote = (quote) => {
    fetch(baseUrl, {
        method: "POST",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify(quote)
    }).then(refreshList);
}

const deleteQuote = (id) => {
    fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
        headers: {"Content-type" : "application/json"}
    }).then(refreshList);
}

const updateQuote = (quote) => {
    fetch(`${baseUrl}/${quote.id}`,{
        method: "PUT",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify(quote)
    }).then(refreshList);
}

const getUpdatedQuoteObj = (liEl) => {
    return {
        id: liEl.classList[1],
        quote: liEl.querySelector("p").innerText,
        author: liEl.querySelector("footer").innerText,
        likes: liEl.querySelector("span").innerText
    }
} 

const makeLikeBtn = (likes) => {
    const btn = document.createElement("button");
    const span = document.createElement("span");
    span.innerText = likes;
    btn.className = "btn-success";
    btn.innerText = "Likes: ";
    btn.appendChild(span);
    btn.addEventListener("click", () => {
        const span = btn.parentElement.querySelector("span");
        span.innerText = parseInt(span.innerText) + 1;
        updateQuote(getUpdatedQuoteObj(btn.parentElement.parentElement));
    })
    return btn;
}

const makeDeleteBtn = () => {
    const btn = document.createElement("button");
    btn.className = "btn-danger";
    btn.innerText = "Delete";
    btn.addEventListener("click", () =>{
        const liEl = btn.parentElement.parentElement;
        deleteQuote(liEl.classList[1]);
    })
    return btn;
}

const makeBlock = (quote) => {
    const block = document.createElement("blockquote"); 
    block.innerHTML = `<p class="mb-0">${quote.quote}</p>
                        <footer class="blockquote-footer">${quote.author}</footer>
                        <br>`;
    block.appendChild(makeLikeBtn(quote.likes));
    block.appendChild(makeDeleteBtn());
    return block;
}

const sortAlphabetically = (a,b) =>{
    if(a.author.toUpperCase() > b.author.toUpperCase()){
        return 1;
    } else if(a.author.toUpperCase() < b.author.toUpperCase()){
        return -1;
    }
    return 0;
}

const showQuotes = () => {
    fetchQuotes().then(quotes => {
        if(sortBy.value === "sort"){
            quotes = quotes.sort(sortAlphabetically)
        }
        const quoteList = document.querySelector("#quote-list");
        quoteList.innerHTML = "";
        for(const quote of quotes){
            const liEl = document.createElement("li");
            liEl.className = `quote-card ${quote.id}`;
            liEl.appendChild(makeBlock(quote));
            quoteList.appendChild(liEl);
        }
    })
}

const getNewQuote = () => {
    const newQuote = document.querySelector("#new-quote").value;
    const newAuthor = document.querySelector("#author").value;
    return {
        quote: newQuote,
        author: newAuthor,
        likes: 0
    };
}

quoteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addQuote(getNewQuote());
    quoteForm.reset();
})

showQuotes();


sortBy.addEventListener("change", () =>{
    showQuotes();
})