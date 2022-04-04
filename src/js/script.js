const btnEstiloGeral = 'estiloGeralBotoes';

const headerContent = () => {
    const divHeader = document.createElement("div");
    const btnMostrarTodos = document.createElement("button");
    const btnHortifruti = document.createElement("button");

    const divContainer = document.createElement('div');
    const iptProduto = document.createElement('input');
    const btnBuscar = document.createElement('button');


    divHeader.setAttribute('id', 'filters');
    divHeader.classList.add('filtersContainer');

    btnMostrarTodos.classList.add(btnEstiloGeral, `${btnEstiloGeral}--mostrarTodos`);
    btnMostrarTodos.innerText = 'Mostrar Todos';

    btnHortifruti.classList.add(btnEstiloGeral, `${btnEstiloGeral}--filtrarHortifruti`);
    btnHortifruti.innerText = "Hortifruti"

    divContainer.classList.add('containerBuscaPorNome')

    iptProduto.setAttribute('type', 'text');
    iptProduto.setAttribute('placeholder', 'Nome do produto');
    iptProduto.classList.add('campoBuscaPorNome');

    btnBuscar.classList.add(btnEstiloGeral, `${btnEstiloGeral}--botaoBuscaPorNome`)
    btnBuscar.innerText = 'Buscar';

    document.querySelector('header').appendChild(divHeader);
    divHeader.append(btnMostrarTodos, btnHortifruti, divContainer);
    divContainer.append(iptProduto, btnBuscar);
}
headerContent();

const listaContent = (imagem, nome, valor, secao) => {
    const liProduto = document.createElement('li');
    const imgProduto = document.createElement('img');
    const nomeProduto = document.createElement('h3');
    const valorProduto = document.createElement('p')
    const secaoProduto = document.createElement('span');

    imgProduto.setAttribute('src', imagem);
    nomeProduto.innerText = nome;
    valorProduto.innerText = `R$ ${valor.toFixed(2)}`
    secaoProduto.innerText = secao

    document.querySelector('ul').appendChild(liProduto);
    liProduto.append(imgProduto, nomeProduto, valorProduto, secaoProduto);
}

const calc = () => {
    const innerText = [];
    const total = document.querySelectorAll('ul li p').forEach((element) => {
        innerText.push(element.innerText);
    });
    const removeLetras = innerText.join('').replaceAll('R$', '');
    const result = removeLetras.split(' ').reduce((accumulator, current) => Number(accumulator) + Number(current));

    return document.getElementById('precoTotal').innerText = `${result.toFixed(2)}`
}

const filtrarPorNome = (event) => {
    const procurar = document.querySelector('input').value;

    if (procurar !== '') {
        filtrarProdutos(produtos, procurar)

        return procurar
    } else {
        tela();
    }
}
document.querySelector('.estiloGeralBotoes--botaoBuscaPorNome').addEventListener('click', filtrarPorNome);

const filtrarTodos = (data) => {
    data.forEach(({
        nome,
        preco,
        secao,
        categoria,
        img
    }) => {
        listaContent(img, nome, preco, secao);
    })

    calc();
}

const filtrarProdutos = (data, filter) => {
    data.filter(({
        nome,
        preco,
        secao,
        categoria,
        img
    }) => {
        document.querySelector('input').value = ''

        if (filter.toLowerCase() === nome.toLowerCase()) {
            document.querySelector('ul').innerText = '';

            listaContent(img, nome, preco, secao);
        } else if (filter.toLowerCase() === secao.toLowerCase()) {
            listaContent(img, nome, preco, secao);
        }
    });

    calc();
}

const filtraPorSecao = () => {
    document.querySelector('ul').innerText = ''
    filtrarProdutos(produtos, 'hortifruti');
}
document.querySelector('.estiloGeralBotoes--filtrarHortifruti').addEventListener('click', filtraPorSecao);

const tela = () => {
    document.querySelector('ul').innerText = ''
    filtrarTodos(produtos);
}
tela();
document.querySelector('.estiloGeralBotoes--mostrarTodos').addEventListener('click', tela);