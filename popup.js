const btn = document.querySelector('.changeColorBtn')
const colorGrid = document.querySelector('.colorGrid')
const colorValue = document.querySelector('.colorValue')
let color


btn.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true})
    chrome.storage.sync.get('color', ({ c }) => {
        color = c
    });
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: pickColor
    }, async (injectionResults) => {
        const [data] = injectionResults
        if(data.result) {
            color = data.result.sRGBHex
            colorGrid.style.backgroundColor = color
            colorValue.innerText = color
            try {
                await navigator.clipboard.writeText(color)
            } catch (e) {
                console.error(e)
            }
        } 
    })
})

async function pickColor() {
    try {
        const eyeDropper = new EyeDropper()
        return selectedColor = await eyeDropper.open()
    } catch(e) {
        console.error(e)
    }
}