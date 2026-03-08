const form = document.getElementById("hospitalForm");
const table = document.querySelector("#hospitalTable tbody");

let hospitals = JSON.parse(localStorage.getItem("hospitals")) || [];

function displayHospitals(){
table.innerHTML="";

hospitals.forEach((h,i)=>{

let row = `
<tr>
<td>${i+1}</td>
<td>${h.name}</td>
<td>${h.city}</td>
<td>${h.contact}</td>
</tr>
`;

table.innerHTML += row;

});

}

form.addEventListener("submit",function(e){

e.preventDefault();

let hospital = {
name:document.getElementById("name").value,
city:document.getElementById("city").value,
contact:document.getElementById("contact").value
};

hospitals.push(hospital);

localStorage.setItem("hospitals",JSON.stringify(hospitals));

displayHospitals();

form.reset();

});

displayHospitals();