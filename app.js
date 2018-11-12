let selectedRow = null;

function showForm() {
  let element = document.getElementById('hideform');
  element.classList.toggle('d-block');
}

function showCancelBtn() {
  let element = document.getElementById('cancel');
  element.classList.toggle('d-inline-block');
}

$.getJSON(
  'https://api.myjson.com/bins/9q64m',

  function(data) {
    const output = `<td>${data.company}</td>
              <td>${data.firstName} ${data.lastName}</td>
              <td>${data.address.streetAddress} ${data.address.city} ${
      data.address.state
    }</td>
              <td>${data.phoneNumber[0].number}</td>
              <td>${data.Comments[0].Comment}</td>
              <td>
                <button
                  onClick="onEdit(this)"
                  type="button"
                  class="btn btn-outline-primary mr-2"
                >
                  Edit
                </button>
                <button
                  onClick="onDelete(this)" showCancelBtn(this);
                  type="button"
                  class="btn btn-outline-danger"
                >
                  Delete
                </button>
              </td>`;
    document.getElementById('firstCustomer').innerHTML = output;
  }
);

// Submitting the form
function onFormSubmit() {
  const custData = getFormData();
  if (selectedRow == null) insertNewCust(custData);
  else updateCust(custData);
  resetForm();
  showCancelBtn();
  showForm();
}

// Getting form data
function getFormData() {
  const custData = {};
  custData['company'] = document.getElementById('company').value;
  custData['name'] = document.getElementById('name').value;
  custData['address'] = document.getElementById('address').value;
  custData['phone'] = document.getElementById('phone').value;
  custData['comments'] = document.getElementById('comments').value;
  return custData;
}

// Adding a new customer
function insertNewCust(data) {
  const table = document
    .getElementById('customerList')
    .getElementsByTagName('tbody')[0];
  const newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.company;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.name;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.address;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.phone;
  cell5 = newRow.insertCell(4);
  cell5.innerHTML = data.comments;
  cell6 = newRow.insertCell(5);
  cell6.innerHTML = `<button onClick="onEdit(this)" showCancelBtn(this); "type="button" class="btn btn-outline-primary mr-2">
                  Edit
                </button>
                <button onClick="onDelete(this)" type="button" class="btn btn-outline-danger">
                  Delete
                </button>`;
}

// Reseting the form
function resetForm() {
  document.getElementById('company').value = '';
  document.getElementById('name').value = '';
  document.getElementById('address').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('comments').value = '';
  selectedRow = null;
}

// Editing the customer
function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById('company').value = selectedRow.cells[0].innerHTML;
  document.getElementById('name').value = selectedRow.cells[1].innerHTML;
  document.getElementById('address').value = selectedRow.cells[2].innerHTML;
  document.getElementById('phone').value = selectedRow.cells[3].innerHTML;
  document.getElementById('comments').value = selectedRow.cells[4].innerHTML;
  showCancelBtn();
  showForm();
}

// Updating the customer
function updateCust(custData) {
  selectedRow.cells[0].innerHTML = custData.company;
  selectedRow.cells[1].innerHTML = custData.name;
  selectedRow.cells[2].innerHTML = custData.address;
  selectedRow.cells[3].innerHTML = custData.phone;
  selectedRow.cells[4].innerHTML = custData.comments;
  showCancelBtn();
}

// Deleting the customer
function onDelete(td) {
  if (confirm('Are you sure you want to delete this customer?')) {
    row = td.parentElement.parentElement;
    document.getElementById('customerList').deleteRow(row.rowIndex);
    resetForm();
  }
}
