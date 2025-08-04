
const mainQueryBox = document.getElementById('select-box');
const mainQueryHeader = mainQueryBox.querySelector('.selected-option span');
const mainQueryOptionsBox = mainQueryBox.querySelector('.options');
const mainQueryOptions = mainQueryBox.querySelectorAll('.option');
let selectedValue = "";


const selectedInfo = document.querySelector('.custom-select-wrapper.selected-info');

const childQueryBox = document.getElementById('detail-select');
const childQueryHeader = childQueryBox.querySelector('.selected-option span');
const childQueryOptionsBox = childQueryBox.querySelector('.options');

const detailsMap = {
  Projects: ["Project 1", "Project 2", "Project 3"],
  Media: ["Media 1", "Media 2"],
  Career: ["Job 1", "Job 2", "Job 3"]
};


console.log(mainQueryBox, mainQueryHeader, mainQueryOptionsBox, mainQueryOptions);
mainQueryBox.addEventListener('click', () => {
    mainQueryOptionsBox.style.display =
    mainQueryOptionsBox.style.display === 'block' ? 'none' : 'block';
});

childQueryBox.addEventListener('click', (e) => {
    childQueryOptionsBox.style.display =
    childQueryOptionsBox.style.display === 'block' ? 'none' : 'block';
});



mainQueryOptions.forEach(option => {
  option.addEventListener('click', (e) => {
    e.stopPropagation(); 
    e.preventDefault();
    mainQueryOptions.forEach(o => o.classList.remove('selected'));
    option.classList.add('selected');

    mainQueryHeader.textContent = option.textContent.trim();
    selectedValue = option.getAttribute("data-value") || option.textContent.trim();

    setTimeout(() => {
      mainQueryOptionsBox.style.display = 'none';
    }, 100);


    // for next input
    selectedInfo.style.display = 'flex';
    selectedInfo.querySelector('span').textContent = selectedValue;
    
    childQueryOptionsBox.innerHTML = "";
    
    (detailsMap[selectedValue] || []).forEach((item,idx) => {
        const div = document.createElement('div');
        div.classList.add('option');
        // div.setAttribute('data-value',)
        div.innerHTML = `${item} <span class="checkmark"><i class="fas fa-check-circle"></i></span>`;
        
        div.addEventListener('click',(e)=>{
            e.stopPropagation();
            e.preventDefault();
            childQueryOptionsBox.querySelectorAll('.option').forEach(o=>o.classList.remove('selected'));
            div.classList.add('selected');
            childQueryHeader.textContent = item;
            setTimeout(() => {
                childQueryOptionsBox.style.display = 'none';
            }, 100);
            childQueryOptionsBox.style.display = 'none';

            console.log("Selected Detail:", item);
        });

        childQueryOptionsBox.appendChild(div);
    });
    
    console.log('Option selected:', mainQueryHeader.textContent);
  });
});


const form = document.getElementById('enquiryForm');
const name = document.getElementById('name');
const email = document.getElementById('email');
const mobile = document.getElementById('mobile');
const query = document.querySelector('#select-box .selected-option span');
const queryDetails = document.querySelector('#detail-select .selected-option span');
const subEmail = document.getElementById('subscribe-email')

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const mobileError = document.getElementById('mobileError');
const queryError = document.getElementById('queryError');
const detailError = document.getElementById('detailError');
const subEmailError = document.getElementById('subemailError');



function validateName() {
  if (name.value.trim() === '') {
    nameError.textContent = 'Name is required';
    return false;
  }
  const nameRegex = /\d/;
  if(nameRegex.test(name.value.trim())){
    nameError.textContent = "Name can't can be digit";
    return false;
  }
  nameError.textContent = '';
  return true;
}

function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.value.trim())) {
    emailError.textContent = 'Invalid email address';
    return false;
  }
  emailError.textContent = '';
  return true;
}

function validateSubEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(subEmail.value.trim())) {
    subEmailError.textContent = 'Invalid email address';
    return false;
  }
  subEmailError.textContent = '';
  return true;
}

function validateMobile() {
  const mobileRegex = /^\d{10}$/;
  if (!mobileRegex.test(mobile.value.trim())) {
    mobileError.textContent = 'Enter a 10-digit mobile number';
    return false;
  }
  mobileError.textContent = '';
  return true;
}

function validateQuery() {
  if (query.textContent.trim() === 'Query Type') {
    queryError.textContent = 'Please select a query type';
    return false;
  }else if (queryDetails.textContent.trim() === query.textContent.trim() ) {
    detailError.textContent = 'Please select query detail';
    return false;
  }
  detailError.textContent = '';
  queryError.textContent = '';
  return true;
}



name.onchange = validateName;
email.onchange = validateEmail;
mobile.onchange = validateMobile;
subEmail.onchange = validateSubEmail;


form.addEventListener('submit', (e) => {
    e.preventDefault(); 

    validateQuery(); 
    const isFormValid = 
    validateName() &&
    validateEmail() &&
    validateMobile() &&
    validateQuery()

    if (!isFormValid) {
        alert("Please fix the errors above.");
        return;
    }
    const submit = {
        name,email,mobile,query,queryDetails
    };
    console.log("Form Submitted:" ,submit);
    alert("Sent Successfully!!");
    e.target.reset()
});




//TOP Scroll Button Functionality
document.getElementById('top-button').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});


const enquiryBtn = document.getElementById('enquiry-form');
  const modal = document.getElementById('enquiryModal');
  const closeModal = document.getElementById('closeModal');
  const modalContainer = document.getElementById('enquiryFormContainer');
  
  const isMobile = () => window.innerWidth <= 1520;

  function openModal() {

    if (isMobile()) {
      modal.style.display = 'flex';
      modalContainer.appendChild(form);
    }
  }

  function closeModalFn() {
    modal.style.display = 'none';
   
  }

  enquiryBtn.addEventListener('click', openModal);
  closeModal.addEventListener('click', closeModalFn);

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModalFn();
    }
  });

  window.addEventListener('resize', () => {
    if (!isMobile()) {
      modal.style.display = 'none';
    }
  });
