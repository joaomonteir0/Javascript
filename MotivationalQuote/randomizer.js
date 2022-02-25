
function generateQuote() {
	var allQuotes = JSON.parse(quotes);
    var quoteN = Math.floor(Math.random() * allQuotes.length);
    var textoQuote = document.getElementById("quoteP");
    var authorQuote = document.getElementById("authorP");

    textoQuote.innerHTML = allQuotes[quoteN].quote;
    authorQuote.innerHTML = allQuotes[quoteN].author;

    var image = Math.floor(Math.random() * 12);
    console.log(image)

    var urlimage = "img/" + image + ".jpg";
    document.getElementById("image").src = urlimage;
}