// Class
class UI {
    // Insert Input to filed list-hazineha
    insertBudget(amount) {
        budgetWeek.innerHTML = amount;
        leftOver.innerHTML = amount;
    }

    // **** Insert Tasks to UI
    insertList(name, price) {
        const li = document.createElement('li');
        li.classList = 'alert-primary alert d-flex justify-content-between align-items-center';
        li.innerHTML = `${name}: <span class="badge badge-primary badge-pill">${price}</span>`;
        const ul = document.querySelector('.list-group');
        ul.appendChild(li);
    }

    // **** Show Message 
    printMessage(message, className) {
        const div = document.createElement('div');
        div.classList.add('alert', 'alert-center', className);
        div.appendChild(document.createTextNode(message));
        // get parent element
        const parent = document.querySelector('.content');
        parent.insertBefore(div, addExpenseForm);

        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
        addExpenseForm.reset();
    }

    // **** track Budget
    trackBudget(price) {
        const budegetLeftTomans = budget.subtrackFromBudget(price);
        leftOver.innerHTML = `${budegetLeftTomans}`;

        if ((budget.budget) / 4 > budegetLeftTomans) {
            leftOver.parentElement.parentElement.classList.remove(('alert-success'));
            leftOver.parentElement.parentElement.classList.add('alert-danger');

        } else if((budget.budget)/2 > budegetLeftTomans){
            leftOver.parentElement.parentElement.classList.remove(('alert-success'));
            leftOver.parentElement.parentElement.classList.add('alert-warning');
        }
    }

}

class Budget {
    constructor(budget) {
        this.budget = budget;
        this.budgetLeft = this.budget;
    }

    subtrackFromBudget(price) {
        return this.budgetLeft -= price;
    }


}



// Variables
let budgetInput;
let budget;
const budgetWeek = document.querySelector('span#total');
const leftOver = document.querySelector('span#left');
const ui = new UI();

// Add Tasks and Expense
const addExpenseForm = document.getElementById('add-expense');







// Event Listeners
eventListeners()
function eventListeners() {
    document.addEventListener('DOMContentLoaded', function () {
        budgetInput = prompt(" لطفا بودجه هفتگی را وارد کنید ");

        if (budgetInput === null || budgetInput === '' || budgetInput === '0') {    /**recheck */
            // refresh page when input is invalid
            location.reload();
        } else {
            budget = new Budget(budgetInput);
            ui.insertBudget(budgetInput);

        }

    })

    // Event Submit for Add
    addExpenseForm.addEventListener('submit', function (e) {
        const name = document.getElementById('expense').value;
        const price = document.getElementById('amount').value;
        if (name === '' || price === '') {
            ui.printMessage('لطفا همه موارد را پر کنید !!!', 'alert-danger');
        } else {
            ui.insertList(name, price);
            ui.printMessage('با موفقیت ثبت شد ', 'alert-success');
            ui.trackBudget(price);
        }

        e.preventDefault();
    })

}

