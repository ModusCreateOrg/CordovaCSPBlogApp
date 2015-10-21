var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.updateEuroValue, false);
    },

    updateEuroValue: function() {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            var euroPrice,
                displayText = '',
                resultsElement;

            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    euroPrice = JSON.parse(xhr.responseText);
                    displayText = 'US $1 = &euro;' + parseFloat(euroPrice.rates.EUR);
                } else {
                    displayText = 'Error Connecting to API.'
                }

                resultsElement = document.getElementById('results');
                resultsElement.innerHTML = displayText;
                document.getElementById('initializing').setAttribute('style', 'display:none;');
                resultsElement.setAttribute('style', 'display:block;');
            }
        };

        xhr.open('GET', 'http://api.fixer.io/latest?base=USD&symbols=EUR' , true);
        xhr.send();
    }
};

app.initialize();