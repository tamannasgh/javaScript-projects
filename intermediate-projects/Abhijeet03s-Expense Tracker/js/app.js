let form = document.getElementById("form")
let addBtn = document.getElementById("add")
let expenseList = document.getElementById("details")
let totalExpense = document.getElementById("span")
let expenseArray = JSON.parse(localStorage.getItem('expenseArray')) || [];

addBtn.addEventListener("click", addExpense)


// add expenses
function addExpense(e) {
    e.preventDefault();
    let amount = document.getElementById("amount").value
    let date = document.getElementById("date").value
    let description = document.getElementById("description").value
    let paymentMode = document.getElementById("pay-mode").value

    if (amount > 0 && date != "" && description.length > 0 && paymentMode != 'Choose one') {
        let expense = {
            amount,
            date,
            description,
            paymentMode,
            id: expenseArray.length > 0 ? expenseArray[expenseArray.length - 1].id + 1 : 1,
        }

        expenseArray.push(expense);
        localStorage.setItem("expenseArray", JSON.stringify(expenseArray));
    }

    form.reset();
    showExpenses();
}

// show expenses
let showExpenses = () => {
    expenseList.innerHTML = '';
    for (let i = 0; i < expenseArray.length; i++) {
        // console.log("My exp = ", expenseArray[i]);
        expenseList.innerHTML += `
        <li class="list-group-item d-flex justify-content-between">
        <div class="d-flex flex-column">
            ${expenseArray[i].description}
        </div>      
        <div>
            <span class="px-2">
                ${expenseArray[i].amount}               
            </span>
            <button type="button" onclick="deleteExpense(${expenseArray[i].id})" class="btn btn-outline-danger btn-sm">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    </li>`;
    }
}

// delete expenses
let deleteExpense = (id) => {
    for (let i = 0; i < expenseArray.length; i++) {
        if (id == expenseArray[i].id) {
            expenseArray.splice(i, 1);
        }
    }
    showExpenses();
}
