var tableId = document.getElementById('filterTable');
var userId = document.getElementById('user_id__filter');
var jobTitleName = document.getElementById('job_title__filter');
var firstName = document.getElementById('first_name__filter');
var userIdArray = [];
var jobTitleArray = [];
var firstNameArray = [];
var data = [];
var selectTag =  document.getElementsByClassName('filter-select');

var filterFunctions ={

  init: function (){
      this.fetchData();
      this.handleFilter();
  },

  fetchData : function (){
       fetch("data.json")
    .then(response => {
      return response.json();
    })
    .then(jsondata =>  {data = jsondata.Employees; this.popuplateTable(data), this.popuplateSelect(data)});
  },
  
popuplateTable : function(data) {
  tableId.innerHTML = null;
  var n = data.length;
    for(var i = 0; i< n; i++){

        // console.log(jsondata.Employees[i]);
        var row = `<tr>
        <td>${data[i].userId}</td>
        <td>${data[i].jobTitleName}</td>
        <td>${data[i].firstName}</td>
        <td>${data[i].lastName}</td>
        <td>${data[i].employeeCode}</td>
        <td>${data[i].region}</td>
        <td>${data[i].phoneNumber}</td>
        <td>${data[i].emailAddress}</td>
        </tr>`
        tableId.innerHTML += row;
       
}
},


popuplateSelect : function(data) {
  var n = data.length;
    for(var i = 0; i< n; i++){

        userIdArray.push(data[i].userId);
        jobTitleArray.push(data[i].jobTitleName);
        firstNameArray.push(data[i].firstName);
}

this.createOption(userIdArray,userId);
this.createOption(jobTitleArray,jobTitleName );
this.createOption(firstNameArray,firstName);
},
onlyUnique:function(value, index, self) {
  // debugger;  
  return self.indexOf(value) === index;
},

createOption :  function (selectArray, selectId){
  
  var optn = document.createElement("option");
  optn.text = 'all';
  optn.value = '';
  selectArray = selectArray.filter(this.onlyUnique);  
  selectId.appendChild(optn);
  for(var i=0; i< selectArray.length; i++){
    var optn = document.createElement("option");
    optn.text = selectArray[i];
    optn.value = selectArray[i];    
    selectId.appendChild(optn);
  }
},

handleFilter : function (){
 
 
  for(let i = 0; i < selectTag.length; i++) {
     selectTag[i].addEventListener('change',()=> filterFunctions.filterData());
  } 
},


filterData : function() {
  // debugger;
  var filters = {};
  for(let i = 0; i < selectTag.length; i++) {
   var value = selectTag[i].options[ selectTag[i].selectedIndex].value;
   if(value != ""){
      var selectAttribute = selectTag[i].getAttribute('data-key');
      filters[selectAttribute] = value;
      
   }
 } 
 console.log(filters);
  const result = data.filter((o) =>
  Object.keys(filters).every((k) => filters[k] === o[k])
);
  filterFunctions.popuplateTable(result);
},

};

filterFunctions.init();
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}