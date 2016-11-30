var store = {
    items: []
};


function addItem(store, item){
    store.items.push({
    name: item,
    isDone: false
  });
}

function getItem(store, itemIndex) {
  return store.items[itemIndex];
}

function deleteItem(store, itemIndex) {
  store.items.splice(itemIndex, 1);
}


function updateItem(store, itemIndex, newItemState) {
  store.items[itemIndex] = newItemState;
}


function renderList(store, listElement, itemDataAttr){
    var itemsId = store.items.map(
        function (item, index){
            return renderItem(item, index, listElement, itemDataAttr);
        }
    );
}

function renderItem(item, itemId, listElement, itemDataAttr) {
  listElement.find('.shopping-item').text(item.name);
  if (item.isDone) {
    listElement.find('.shopping-item').addClass('shopping-item__checked');
  }
  listElement.find('.shopping-item-toggle')
  listElement.attr(itemDataAttr, itemId);
  return listElement;
}


function handleAddItems(
  formElement, listElement, newItemIdentifier, itemDataAttr, store) {

  formElement.submit(function(event) {
    event.preventDefault();
    var newItem = formElement.find(newItemIdentifier).val();
    addItem(store, newItem);
    renderList(store, listElement, itemDataAttr);
    // reset form
    this.reset();
  });
}

function handleDeleteItems(
  formElement, removeIdentifier, itemDataAttr, listElement, store) {

  listElement.on('click', removeIdentifier, function(event) {
    var itemIndex = parseInt($(this).closest('li').attr(itemDataAttr));
    deleteItem(store, itemIndex);
    renderList(store, listElement, itemDataAttr);
  })
}

function handleToggleItem(
  listElement, toggleIdentifier, itemDataAttr, store) {

  listElement.on('click', toggleIdentifier, function(event) {
    var itemId = $(event.currentTarget.closest('li')).attr(itemDataAttr);
    var oldItem = getItem(store, itemId);

    updateItem(store, itemId, {
      name: oldItem.displayName,
      isDone: !oldItem.isDone
    });
    renderList(store, listElement, itemDataAttr);
  });
}

$(function(){
    var formElement = $('#js-shopping-list-form');
    var listElement = $('.shopping-list');


    var newItemIdentifier = '#shopping-list-entry';


    var removeIdentifier = '.shopping-item-delete';  

    var itemDataAttr = 'data-list-item-id';

    var toggleIdentifier = '.shopping-item-toggle';


    handleAddItems(formElement, listElement, newItemIdentifier, itemDataAttr, store);
    handleDeleteItems(
    formElement, removeIdentifier, itemDataAttr, listElement, store);
    handleToggleItem(listElement, toggleIdentifier, itemDataAttr, store);

});