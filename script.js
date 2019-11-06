async function getCardsFromAddress(address) {
    const url = `https://api.godsunchained.com/v0/user/${address}/inventory?format=compressed`;
    const response = await fetch(url);
    return await response.json();
}

function getMarkup(cards) {
    return window.godsUnchainedCards.records.map((card) => {
        return `<tr>
            <td>${card.id}</td>
            <td>${card.name}</td>
            <td>${cards[card.id] ? cards[card.id].length : 0}</td>
        </tr>`;
    }).join('');
    // return Object.keys(cards).map((protoId) => {
    //     return cards[protoId].map((shine) => {
    //         return `<div class="card-wrapper"><composited-card class="card" protoId="${protoId}" quality="${getQuality(shine)}" responsiveSrcsetSizes="(min-width: 250px) 160px, 320px"></composited-card></div>`;
    //         // return '<div class="card-wrapper"><div style="width:200px;height:252px;"></div></div>';
    //     });
    // }).flat().slice(start, increment).join(' ');
}

function getQuality(shine) {
    if (shine < 1000) {
        return 4;
    }
    return (shine + '')[0];
}

async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const address = urlParams.get('player');

    if (!address) {
        return;
    }

    console.log('address:', address);

    const cards = await getCardsFromAddress(address);

    godsUnchainedCards.records.sort((a, b) => a.id < b.id ? -1 : 1);

    const markup = getMarkup(cards);
    document.getElementById('card_table').getElementsByTagName('tbody')[0].insertAdjacentHTML('beforeend', markup);
}

init();