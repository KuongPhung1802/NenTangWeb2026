const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const addBtn = document.getElementById("addBtn");

const tableBody = document.getElementById("tableBody");
const stats = document.getElementById("stats");

const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");
const scoreHeader = document.getElementById("scoreHeader");

let students = [];
let sortAsc = true;

function getRank(score){

    if(score >= 8.5) return "Giỏi";
    if(score >= 7) return "Khá";
    if(score >= 5) return "Trung bình";
    return "Yếu";

}

function addStudent(){

    const name = nameInput.value.trim();
    const score = Number(scoreInput.value);

    if(name === ""){
        alert("Chưa nhập họ tên");
        return;
    }

    if(isNaN(score) || score < 0 || score > 10){
        alert("Điểm phải từ 0-10");
        return;
    }

    students.push({
        name: name,
        score: score
    });

    nameInput.value="";
    scoreInput.value="";
    nameInput.focus();

    applyFilters();
}

function renderTable(list){

    tableBody.innerHTML="";

    if(list.length === 0){

        tableBody.innerHTML =
        `<tr><td colspan="5">Không có kết quả</td></tr>`;

        return;
    }

    list.forEach((sv,index)=>{

        const tr = document.createElement("tr");

        if(sv.score < 5){
            tr.classList.add("low-score");
        }

        tr.innerHTML = `
        <td>${index+1}</td>
        <td>${sv.name}</td>
        <td>${sv.score}</td>
        <td>${getRank(sv.score)}</td>
        <td>
        <button data-index="${students.indexOf(sv)}" class="deleteBtn">
        Xóa
        </button>
        </td>
        `;

        tableBody.appendChild(tr);

    });

}

function updateStats(){

    const total = students.length;

    if(total === 0){
        stats.textContent = "Chưa có sinh viên";
        return;
    }

    let sum = 0;

    students.forEach(sv=>{
        sum += sv.score;
    });

    const avg = (sum/total).toFixed(2);

    stats.textContent =
    `Tổng sinh viên: ${total} | Điểm trung bình: ${avg}`;

}

function applyFilters(){

    let filtered = [...students];

    const keyword = searchInput.value.toLowerCase();

    filtered = filtered.filter(sv =>
        sv.name.toLowerCase().includes(keyword)
    );

    const filter = filterSelect.value;

    if(filter !== "all"){
        filtered = filtered.filter(sv =>
            getRank(sv.score) === filter
        );
    }

    filtered.sort((a,b)=>{

        if(sortAsc){
            return a.score - b.score;
        }else{
            return b.score - a.score;
        }

    });

    renderTable(filtered);

    updateStats();

}

addBtn.addEventListener("click", addStudent);

scoreInput.addEventListener("keyup",(e)=>{

    if(e.key === "Enter"){
        addStudent();
    }

});

searchInput.addEventListener("input", applyFilters);

filterSelect.addEventListener("change", applyFilters);

scoreHeader.addEventListener("click", ()=>{

    sortAsc = !sortAsc;

    applyFilters();

});

tableBody.addEventListener("click",(e)=>{

    if(e.target.classList.contains("deleteBtn")){

        const index = e.target.getAttribute("data-index");

        students.splice(index,1);

        applyFilters();

    }

});