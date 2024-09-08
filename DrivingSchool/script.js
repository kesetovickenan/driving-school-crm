let allCandidates = [];
const approvedCandidates = [];
const unapprovedCandidates = [];

document
  .querySelector("#check-btn")
  .addEventListener("click", function async() {
    let fullName = document.querySelector("#fullName").value;
    let age = document.querySelector("#age").value;
    let gender = document.querySelector("#gender").value;
    let successMessage = document.querySelector(".success-message");
    let errorMessage = document.querySelector(".error-message");
    let candidates = document.querySelector(".candidates");
    let totalNumber = document.querySelector(".total-number");
    let totalApproved = document.querySelector(".total-approved");
    let totalUnapproved = document.querySelector(".total-unapproved");

    if (allFieldsEntered(fullName, age, gender)) {
      addCandidate(fullName, age, gender, candidates);
      if (age >= 18) {
        approvedCandidates.push({ fullName, age, gender });
        successMessage.textContent = "Driver is eligible to take the test 🎉";
        errorMessage.textContent = "";
        fullName.textContent = "";
        age.textContent = "";
        gender.textContent = "";
      } else {
        unapprovedCandidates.push({ fullName, age, gender });
        successMessage.textContent = "";
        errorMessage.textContent = "The age requirement is 18 ⛔";
      }
    } else {
      successMessage.textContent = "";
      errorMessage.textContent = "Not all fields are entered ⛔";
    }

    totalNumber.textContent = `Number of candidates: ${allCandidates.length}`;
    totalApproved.textContent = `Accepted candidates: ${approvedCandidates.length}`;
    totalUnapproved.textContent = `Rejected candidates: ${unapprovedCandidates.length}`;
  });

function allFieldsEntered(fullName, age, gender) {
  return fullName !== "" && age !== "" && gender !== "";
}

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");
let successMessage = document.querySelector(".success-message");
let errorMessage = document.querySelector(".error-message");

const openModal = function () {
  console.log("Button clicked");
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  successMessage.textContent = "";
  errorMessage.textContent = "";
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener("click", openModal);
}

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (event) {
  console.log(event.key);

  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

function addCandidate(fullName, age, gender, candidatesTableBody) {
  let candidate = {
    fullName: fullName,
    age: age,
    gender: gender,
  };

  allCandidates.push(candidate);
  console.log(allCandidates);

  const row = document.createElement("tr");
  row.className = "border-b dark:bg-gray-800 dark:border-gray-700";

  row.innerHTML = `
    <th
      scope="row"
      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    >
      ${fullName}
    </th>
    <td class="px-6 py-4">${age}</td>
    <td class="px-6 py-4">${gender}</td>
    <td class="px-6 py-4">
      <button
        class="delete-btn bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Remove
      </button>
    </td>
  `;

  candidatesTableBody.appendChild(row);
  updateCounters();

  row.querySelector(".delete-btn").addEventListener("click", function () {
    const index = allCandidates.indexOf(candidate);
    if (index > -1) {
      allCandidates.splice(index, 1);
    }

    candidatesTableBody.removeChild(row);
    console.log(allCandidates);
    updateCounters();
  });
  function updateCounters() {
    const totalNumber = document.querySelector(".total-number");
    const totalApproved = document.querySelector(".total-approved");
    const totalUnapproved = document.querySelector(".total-unapproved");

    totalNumber.textContent = `Number of candidates: ${allCandidates.length}`;

    const approvedCandidates = allCandidates.filter((candidate) => true);
    const unapprovedCandidates =
      allCandidates.length - approvedCandidates.length;

    totalApproved.textContent = `Accepted candidates: ${approvedCandidates.length}`;
    totalUnapproved.textContent = `Rejected candidates: ${unapprovedCandidates}`;
  }
}

// async function fetchData() {
//   try {
//     const response = await fetch("https://dummyjson.com/users");
//     const data = await response.json();
//     console.log(data, "Fetched and displayed candidates");
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

// document.querySelector("#load-candidates").addEventListener("click", fetchData);

async function fetchData() {
  try {
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();
    const candidatesTableBody = document.querySelector("tbody.candidates");

    data.users.forEach((user) => {
      const fullName = `${user.firstName} ${user.lastName}`;
      const age = user.age;
      const gender = user.gender;

      addCandidate(fullName, age, gender, candidatesTableBody);
    });

    console.log(data, "Fetched and displayed candidates");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function updateCounters() {
  const totalCandidates = allCandidates.length;

  document.querySelector(
    ".total-number"
  ).textContent = `Number of candidates: ${totalCandidates}`;
}

document.querySelector("#load-candidates").addEventListener("click", fetchData);
