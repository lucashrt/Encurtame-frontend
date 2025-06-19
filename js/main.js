const urlPost = 'http://localhost:3000/shorten';

async function shorten() {
    const input = document.querySelector('input#inputUrl');
    const output = document.querySelector('div#result');
    const shortUrl = document.querySelector('div#shortUrl');
    const label = document.getElementsByClassName('label')[0];
    const msgerror = document.getElementsByClassName('error')[0];
    const loader = document.getElementsByClassName('loader')[0];

    const originalUrl = input.value;

    try {
        const response = await axios.post(`${urlPost}`, {
            originalUrl: originalUrl
        });

        msgerror.style.display = 'none';
        loader.style.display = 'none';
        shortUrl.innerHTML = `<input type="text" class="text" value="${response.data.shortUrl}" readonly><button id="copyButton"><i class="fa fa-clone"></i></button>`;
        label.style.display = 'block';
        shortUrl.style.display = 'block';
        copyText();
    } catch (error) {
        const statusCode = error.response?.status;
        console.error('Erro ao encurtar a URL:', error);
        loader.style.display = 'none';
        shortUrl.style.display = 'none';
        label.style.display = 'none';
        output.style.display = 'block';
        msgerror.style.display = 'block';
        if (statusCode == 403) {
            msgerror.innerHTML = '<p>A URL fornecida é potencialmente maliciosa.</p>';
            msgerror.innerHTML += '<p>Por favor, tente novamente com uma URL diferente.</p>';
        } else if (statusCode == 400) {
            msgerror.innerHTML = '<p>URL inválida!</p>';
            msgerror.innerHTML += '<p>Tente novamente</p>';
        } else if (statusCode == 500) {
            msgerror.innerHTML = '<p>Erro interno do servidor. Tente novamente mais tarde.</p>';
        } else if (statusCode == 503) {
            msgerror.innerHTML = '<p>Erro ao verificar a URL. Tente novamente mais tarde.</p>';
        } else if (statusCode == 429) {
            msgerror.innerHTML = '<p>Limite de solicitações excedido. Tente novamente mais tarde.</p>';
        } else {
            msgerror.innerHTML = '<p>Ocorreu um erro desconhecido. Tente novamente.</p>';
        }
    }
}

function copyText() {
    const copyText = document.querySelector(".copy-text");
    const button = copyText.querySelector("button");
    const input = copyText.querySelector("input.text");

    button.addEventListener("click", () => {
        navigator.clipboard.writeText(input.value)
            .then(() => {
                copyText.classList.add("active");

                setTimeout(() => {
                    copyText.classList.remove("active");
                }, 1500);
            })
            .catch(err => {
                console.error("Erro ao copiar o texto: ", err);
            });
    });
}

function startBtn() {
    const input = document.querySelector('input#inputUrl').value;
    const output = document.querySelector('div#result');
    const shortUrl = document.querySelector('div#shortUrl');
    const label = document.getElementsByClassName('label')[0];
    const error = document.getElementsByClassName('error')[0];
    const loader = document.getElementsByClassName('loader')[0];


    const regex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\S*)?$/;

    if (regex.test(input)) {
        error.style.display = 'none';
        shortUrl.style.display = 'none';
        label.style.display = 'none';
        loader.style.display = 'block';
        output.style.display = 'block';
        shorten();
    } else {
        loader.style.display = 'none';
        shortUrl.style.display = 'none';
        label.style.display = 'none';
        output.style.display = 'block';
        error.style.display = 'block';
        error.innerHTML = '<p>URL inválida!</p>';
        error.innerHTML += '<p>Tente novamente</p>';
    }
}