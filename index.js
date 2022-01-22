'use strict'

class Store{
    constructor(id, name){
        this.name = name;
        this.id = id;
        this.items = [];
    }
}

class Item{
    constructor(name,quantity){
        this.name = name;
        this.quantity = quantity;
        this.clicked = false;
    }
}

//Main body of program
let stores = [];
let storeNumber = 0;

onClick('add-store',() =>{
    stores.push(new Store(storeNumber++,getValue('new-store')));
    drawDOM();
    document.getElementById('new-store').value = '';
})

//This function is used when the new store button is clicked to create a new store
function onClick(id,action){
    let element = document.getElementById(id);
    element.addEventListener('click',action);
    return element;
}

//This function returns the value of an element with the id that is passed in
function getValue(id){
    return document.getElementById(id).value;
}

//This function displays all of the information onto the page with the most updated items 
function drawDOM(){
    let storeDiv = document.getElementById('stores');
    clearElement(storeDiv);
    for(const store of stores){
        let table = createStoreTable(store);
        let title = document.createElement('h2');
        title.innerHTML = store.name;
        title.appendChild(createStoreDeleteButton(store));
        storeDiv.appendChild(title);
        storeDiv.appendChild(table);
        for(const item of store.items){
            createItemRow(store,table,item);
        }
    }
}

//This function clears out all the elements from a parent node so that everything can be redone with the correct information
function clearElement(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

//This function creates the table for one store to be displayed on the page
function createStoreTable(store){
    let table = document.createElement('table');
    table.setAttribute('class','table table-striped');
    let row = table.insertRow(0);
    let checkboxColumn = document.createElement('th');
    let itemNameColumn = document.createElement('th');
    let quantityColumn = document.createElement('th');
    checkboxColumn.innerHTML = 'Bought';
    itemNameColumn.innerHTML = 'Item';
    quantityColumn.innerHTML = 'Quantity Needed';
    row.appendChild(checkboxColumn);
    row.appendChild(itemNameColumn);
    row.appendChild(quantityColumn);

    let formRow = table.insertRow(1);
    let checkboxTh = document.createElement('th');
    let itemTh = document.createElement('th');
    let quantityTh = document.createElement('th');
    let createTh = document.createElement('th');

    let checkBox = document.createElement('th');
    checkBox.innerHTML = '';
    
    let itemNameInput = document.createElement('input');
    itemNameInput.setAttribute('id',`item-number-${store.id}`);
    itemNameInput.setAttribute('type','text');
    itemNameInput.setAttribute('class','form-control');

    let quantityInput = document.createElement('input');
    quantityInput.setAttribute('id',`quantity-input-${store.id}`);
    quantityInput.setAttribute('type','quantity');
    quantityInput.setAttribute('class','form-control');

    let newItemButton = createNewItemButton(store);
    checkboxTh.appendChild(checkBox);
    itemTh.appendChild(itemNameInput);
    quantityTh.appendChild(quantityInput);
    createTh.appendChild(newItemButton);
    

    formRow.appendChild(checkboxTh);
    formRow.appendChild(itemTh);
    formRow.appendChild(quantityTh);
    formRow.appendChild(createTh);

    return table;
}

//This function creates a button to create the option to delete any one of the stores that are displayed
function createStoreDeleteButton(store){
    let button = document.createElement('button');
    button.className = 'btn btn-primary';
    button.innerHTML = 'Delete Store';
    button.onclick = () => {
        let index = stores.indexOf(store);
        stores.splice(index,1);
        drawDOM();
    };
    return button;
}

//This function creates a delete button to remove a specific item from the list
function createDeleteRowButton(store,item){
    let button = document.createElement('button');
    button.className = 'btn btn-primary';
    button.innerHTML = 'Delete';
    button.onclick = () => {
        let index = store.items.indexOf(item);
        store.items.splice(index,1);
        drawDOM();
    }
    return button;
}

//This item creates a row in the table for the item that is being added
function createItemRow(store,table,item){
    let row = table.insertRow(2);
    let checkBox = row.insertCell(0);
    checkBox.appendChild(createCheckBox(store,item));
    //row.insertCell(0).innerHTML = checkBox ;
    row.insertCell(1).innerHTML = item.name;
    row.insertCell(2).innerHTML = item.quantity;
    let actions = row.insertCell(3);
    actions.appendChild(createDeleteRowButton(store,item));
}

//This function creates a button to add items to each individual store
function createNewItemButton(store){
    let button = document.createElement('button');
    button.className = 'btn btn-primary';
    button.innerHTML = 'Create';
    button.onclick = () => {
        store.items.push(new Item(getValue(`item-number-${store.id}`),getValue(`quantity-input-${store.id}`)))

        drawDOM();
    }
    return button;
}

//This funtion creates a checkbox to put in the first cell of the row
function createCheckBox(store,item){
    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.setAttribute('id',`checkBox-${store.id}`);
    return checkBox;
}