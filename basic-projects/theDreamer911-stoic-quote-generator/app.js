const quoteEl = document.querySelector(".quote")
const figureEl = document.querySelector(".figure")
const nextEl = document.querySelector(".next")

const quotes = [{
    quote: `“If it is not right do not do it; if it is not true do not say it.”`, 
    figure: ` Marcus Aurelius`
}, {
    quote: `“The happiness of your life depends upon the quality of your thoughts.”`, 
    figure: ` Marcus Aurelius`
},{
    quote: `“People are not disturbed by things, but by the views they take of them.”`, 
    figure: ` Marcus Aurelius`
},{
    quote: `“The soul becomes dyed with the color of its thoughts.”`, 
    figure: ` Marcus Aurelius`
},{
    quote: `“Remember that very little is needed to make a happy life.”`, 
    figure: ` Marcus Aurelius`
},{
    quote: `“Don’t go on discussing what a good person should be. Just be one.”`, 
    figure: ` Marcus Aurelius`
},{
    quote: `“Wealth consists not in having great possessions, but in having few wants.”`, 
    figure: ` Epictetus`
},{
    quote: `“First say to yourself what you would be; and then do what you have to do.”`, 
    figure: ` Epictetus`
},{
    quote: `“He who laughs at himself never runs out of things to laugh at.”`, 
    figure: ` Epictetus`
},{
    quote: `“A ship should not ride on a single anchor, nor life on a single hope.”`, 
    figure: ` Epictetus`
},{
    quote: `“It’s not what happens to you, but how you react to it that matters.” `, 
    figure: ` Epictetus`
},{
    quote: `“No person is free who is not master of himself.”`, 
    figure: ` Epictetus`
},{
    quote: `“You become what you give your attention to.” `, 
    figure: ` Epictetus`
},{
    quote: `“Luck is what happens when preparation meets opportunity.”`, 
    figure: ` Seneca`
},{
    quote: `“We suffer more often in imagination than in reality.”`, 
    figure: ` Seneca`
},{
    quote: `“Associate with people who are likely to improve you.”`, 
    figure: ` Seneca`
},{
    quote: `“If a man knows not to which port he sails, no wind is favorable.”`, 
    figure: ` Seneca`
},{
    quote: `“The whole future lies in uncertainty: live immediately.”`, 
    figure: ` Seneca`
},{
    quote: `“He who is brave is free.”`, 
    figure: ` Seneca`
},{
    quote: `“To wish to be well is a part of becoming well.”`, 
    figure: ` Seneca`
}]

nextEl.addEventListener("click", function(){
    let random = Math.floor(Math.random() * quotes.length)

    quoteEl.textContent = quotes[random].quote
    figureEl.textContent = ` ~ ${quotes[random].figure}`
})