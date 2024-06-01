let input = document.querySelector('.entered-list');
let addbut = document.querySelector('.add-list');
let tasks = document.querySelector('.tasks');
let item = document.querySelector('.item');
let btnDelete = document.querySelector('.remove');
const par = document.getElementById("to-do");
let arr = [];
mood="Add";

input.addEventListener('keyup', () => {
   if (input.value != '') {
      addbut.classList.add('active')
   } else {
      addbut.classList.remove('active')
   }
})
show();

function show() {    
    tasks.innerHTML = '';
   let getlocalStorage = localStorage.getItem("neww");
   if (getlocalStorage == null) {
      arr = [];
   }
   else {
      arr = JSON.parse(getlocalStorage);
      for (i = 0; i < arr.length; i++) {
         console.log(arr[i].task)

         let newItem = document.createElement('div');
         newItem.classList.add('item');
         newItem.innerHTML = `
      <p>${arr[i].task}</p>
      
        <div class="item-btn">
            <i class="fa-solid fa-xmark" onclick="deleteTask(${i})"></i>
             <i class="fa-sharp fa-solid fa-check" style="color: #000000;"></i>
             <i class="fa-solid fa-pen-to-square" onclick="update(${i})"></i>
            
        </div>
      
      
      `;
         tasks.appendChild(newItem);
      }
   }




}

addbut.addEventListener('click', () => {

   if(mood=='Add'){
       let userdata = {
      task: input.value,
      completed: 0
   }


   arr.push(userdata);

   }
   else if(mood=='Edit'){
      arr[tmp].task=input.value;
      addbut.innerHTML = 'Add';
      mood=='Add'

   }

   localStorage.setItem("neww", JSON.stringify(arr));
   input.value = '';
   show();
  
})


btnDelete.addEventListener('click', (e) => {
      localStorage.clear()
      show();
      
});

function deleteTask(i){
   arr.splice(i, 1);
   localStorage.setItem("neww", JSON.stringify(arr));
   show();
}

tasks.addEventListener('click', (e) => {
   if (e.target.classList.contains('fa-check')) {
      e.target.parentElement.parentElement.classList.toggle('completed');
      //arr[i]=1;
      //arr.push(localStorage);

   }

});

function update(i) {

   input.value = arr[i].task;
   addbut.innerHTML = 'Edit';
   mood = 'Edit';
   tmp = i;
   scroll({
      top: 0,
      behavior: 'smooth'
   })
}
