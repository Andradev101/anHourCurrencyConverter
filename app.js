const fromSelect = document.getElementsByClassName("from")[0]
const toSelect = document.getElementsByClassName("to")[0]
const btn = document.getElementsByClassName("btn")[0]
const result = document.querySelector("body > div > h2");
console.log(result.textContent);

btn.addEventListener("click", getValues)

fetch("https://free.currconv.com/api/v7/currencies?apiKey=bac9e1b7a17b80af8364")
    .then(res => res.json())
    .then(data => {

        for (const key in data.results) {
            if (Object.hasOwnProperty.call(data.results, key)) {
                const element = data.results[key];
                fromSelect.insertAdjacentHTML("afterbegin", `<option value="currencyValue">${element.id}</option>`)
                toSelect.insertAdjacentHTML("afterbegin", `<option value="currencyValue">${element.id}</option>`)
            }
        }

    });

function getValues(){
    let inValue = fromSelect.options[fromSelect.selectedIndex].text;
    let outValue = toSelect.options[toSelect.selectedIndex].text;
    let valueInput = parseFloat(document.querySelector("#currencyInput").value);
    console.log(valueInput);
    
    let APICall = `https://free.currconv.com/api/v7/convert?q=${inValue}_${outValue}&apiKey=bac9e1b7a17b80af8364`

    console.log(APICall);
    fetch(APICall)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        console.log(data.results[`${inValue}_${outValue}`].val);
        
        let baseValue = data.results[`${inValue}_${outValue}`].val;

        let finalValue = valueInput * baseValue;
        result.textContent = `${valueInput.toFixed(2)} ${inValue} IS ${finalValue.toFixed(2)} ${outValue}`
    })
}