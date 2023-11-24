// var courseAPI = 'http://localhost:3000/courses';

// function start() {
//     getCourse(renderCode);
//     handleCreateForm();
// }

// start();


// function getCourse(callback) {
//     fetch(courseAPI)
//         .then(function(response) {
//             return response.json();
//         })
//         .then(callback);
// }

// function createCourse(data, callback) {
//     var options = {
//         method : "POST",
//         headers: {
//             "Content-Type":"application/json"
//         },
//         body: JSON.stringify(data)
//     };
//     fetch(courseAPI, options)
//         .then(function(response) {
//             return response.json()
//         })
//         .then(callback);
// }

// function handleDeleteCourse(id) {
//     var options = {
//         method: "DELETE",
//         headers: {
//             "Content-Type":"application/json"
//         }
//     }
//     fetch(courseAPI + '/' + id, options)
//         .then(function(response) {
//             return response.json()
//         })
//         .then(function() {
//             var courseItem = document.querySelector(`.course-item-${id}`);
//             if(courseItem) {
//                 courseItem.remove();
//             }
//         })
// }


// function renderCode(courses) {
//     var listCourseBlock = document.getElementById('list-course');
//     var htmls  = courses.map(function(course) {
//          return `
//          <li class="course-item-${course.id}">
//             <h4>${course.name}</h4>
//             <p>${course.description}</p>
//             <button onclick="handleDeleteCourse(${course.id})">Delete</button>
//          </li>`;

//         })
//         listCourseBlock.innerHTML = htmls.join('')
// }


// function handleCreateForm() {
//     var createBtn = document.querySelector('#create')
    
//     createBtn.onclick   = function() {
//         var name = document.querySelector('input[name="name"]').value;
//         var description = document.querySelector('input[name="description"]').value;
        
//         var formData = {
//             name: name,
//             description: description
//         }

//         createCourse(formData, function() {
//            getCourse(renderCode);
//         });
//     }
// }
var courseAPI = 'http://localhost:3000/courses';

function start() {
    getCourse(renderCode);

    handleCreateForm();

}

start();

//CRUD
function getCourse(callback) {
    fetch(courseAPI)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
}

function renderCode(courses) {
    var listCourseBlock = document.getElementById('list-course');

    var htmls = courses.map(function(course) {
        return `
            <li class="course-item-${course.id}">
                <h2 contenteditable = "true" class="course-item-heading-${course.id}">${course.name}</h2>
                <p contenteditable = "true" class="course-item-description-${course.id}">${course.description}</p>
                <button onclick = handleDeleteCourse(${course.id})>Delete</button>
                <button onclick = handleUpdateCourse(${course.id})>Update</button>
            </li>
        `
    })
    listCourseBlock.innerHTML = htmls.join(''); 
} 

// create
function createCourse(data,callback) {
    var options = {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(courseAPI, options) 
        .then(function(response){
            return response.json();
        })
        .then(callback)
}

function handleCreateForm() {
    var createBtn = document.querySelector('#create');

    createBtn.onclick = function() {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;

        var dataForm = {
            name: name,
            description: description
        };
        console.log(dataForm)
        createCourse(dataForm,function() {
            getCourse(renderCode);

        });
    }
}

// update
function updateCourse(id, newdata, callback) {
    var options = {
        method: 'PUT',
        headers:{
            'Content-Type':'application/json'
        }
        ,
        body: JSON.stringify(newdata)
    }
    fetch(courseAPI + '/' + id , options)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
}

function handleUpdateCourse(id) {

    var newName = document.querySelector(`.course-item-heading-${id}`).innerText;
    var newDescription = document.querySelector(`.course-item-description-${id}`).innerText;
    var newDataForm = {
        name: newName,
        description: newDescription
    };

    updateCourse(id,newDataForm,function() {
        console.log(newDataForm)
    })

}

// delete
function handleDeleteCourse(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json'
        }
    };
    fetch(courseAPI + '/' + id ,options)
        .then(function(response) {
            return response.json();
        })
        .then(function() {
            var courseItem = document.querySelector('.course-item-' + id);
            if(courseItem) {
                courseItem.remove();
            }
        });
}

