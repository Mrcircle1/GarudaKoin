let points = 0;
let tapPower = 1;
let boostLevel = 1;
const boostCosts = [10, 20, 30, 40, 50];

function earnPoints() {
    points += tapPower;
    document.getElementById('points').innerText = `Points: ${points}`;
    saveData();
}

function showTask() {
    showPopup("Complete the following tasks to earn points:", 'task');
}

function showInvite() {
    const inviteCode = generateInviteCode();
    showPopup(`Invite friends using your code: ${inviteCode}\nEarn rewards for each referral!`);
}

function showWallet() {
    showPopup("Connect your TON wallet to manage your rewards.");
}

function showBoost() {
    showPopup("Choose a boost:", 'boost');
    updateBoostButton();
}

function visitLink(task, url) {
    window.open(url, '_blank');
    points += 10; // Reward points for visiting the link
    document.getElementById('points').innerText = `Points: ${points}`;
    saveData();
    closePopup();
}

function upgradeBoost(boostNumber) {
    if (boostNumber === 1) {
        if (points >= boostCosts[boostLevel - 1]) {
            points -= boostCosts[boostLevel - 1];
            tapPower += 1;
            boostLevel += 1;
            updateBoostButton();
            document.getElementById('points').innerText = `Points: ${points}`;
            saveData();
        } else {
            alert('Not enough points to purchase this upgrade.');
        }
    }
}

function selectBoost(boostNumber) {
    alert(`Boost ${boostNumber} selected!`);
    closePopup();
}

function showPopup(message, type) {
    document.getElementById('popup-text').innerText = message;
    if (type === 'task') {
        document.getElementById('task-options').classList.remove('hidden');
        document.getElementById('boost-options').classList.add('hidden');
    } else if (type === 'boost') {
        document.getElementById('boost-options').classList.remove('hidden');
        document.getElementById('task-options').classList.add('hidden');
    } else {
        document.getElementById('task-options').classList.add('hidden');
        document.getElementById('boost-options').classList.add('hidden');
    }
    document.getElementById('popup').style.display = 'flex'; // Show popup
}

function closePopup() {
    document.getElementById('popup').style.display = 'none'; // Hide popup
}

function updateBoostButton() {
    const boostButton = document.getElementById('boost1');
    if (boostLevel <= 5) {
        boostButton.innerText = `Boost 1: Level ${boostLevel} (Cost: ${boostCosts[boostLevel - 1]} points)`;
    } else {
        boostButton.innerText = 'Boost 1: Max Level Reached';
        boostButton.disabled = true;
    }
}

function saveData() {
    localStorage.setItem('tapSwapPoints', points);
    localStorage.setItem('tapSwapTapPower', tapPower);
    localStorage.setItem('tapSwapBoostLevel', boostLevel);
}

function loadData() {
    const savedPoints = localStorage.getItem('tapSwapPoints');
    if (savedPoints !== null) {
        points = parseInt(savedPoints, 10);
        document.getElementById('points').innerText = `Points: ${points}`;
    }
    const savedTapPower = localStorage.getItem('tapSwapTapPower');
    if (savedTapPower !== null) {
        tapPower = parseInt(savedTapPower, 10);
    }
    const savedBoostLevel = localStorage.getItem('tapSwapBoostLevel');
    if (savedBoostLevel !== null) {
        boostLevel = parseInt(savedBoostLevel, 10);
    }
    updateBoostButton();
}

function generateInviteCode() {
    let inviteCode = localStorage.getItem('tapSwapInviteCode');
    if (!inviteCode) {
        inviteCode = 'INV' + Math.floor(Math.random() * 1000000);
        localStorage.setItem('tapSwapInviteCode', inviteCode);
    }
    return inviteCode;
}

window.onload = loadData;
