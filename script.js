const url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropdowns = document.querySelectorAll(".ft select");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg h3");
let btn = document.querySelector("form button");

for(let sel of dropdowns)
{
    for(curr in CL)
    {
        let newoption = document.createElement("option");
        newoption.innerText = curr;
        newoption.value = curr;

        if(sel.name === "from" && curr === "USD")
        {
            newoption.selected="selected";
        }
        if(sel.name === "to" && curr === "INR")
        {
            newoption.selected = "selected";
        }

        sel.append(newoption);
    }
    sel.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

let exchangeVal = async()=>{
    let amt = document.querySelector(".amount input");
    let amtval = amt.value;
    if(amtval == "" || amtval < 1)
    {
        amtval = 1;
        amt.value = "1";
    }
    let baseUrl = `${url}/${fromCurr.value.toLowerCase()}.json`;
    let a = await fetch(baseUrl);
    let b = await a.json();
    let cost = b[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalamount  = cost*amtval;

    msg.innerText = `${amtval} ${fromCurr.value} = ${finalamount} ${toCurr.value}`;
};

const updateFlag = (element) => {
        let currCode = element.value;
        let countryCode = CL[currCode];
        let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
        let img = element.parentElement.querySelector("img");
        img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    exchangeVal();
  });

  window.addEventListener("load", () => {
    exchangeVal();
  });
  


