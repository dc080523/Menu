let itemCount = 0;
let totalAmount = 0;
let selectedItems = {};

function increaseItem(itemName, itemPrice) {
    if (!selectedItems[itemName]) {
        selectedItems[itemName] = { count: 0, price: itemPrice };
    }

    selectedItems[itemName].count += 1;
    itemCount += 1;

    totalAmount = 0;
    for (const item in selectedItems) {
        const { count, price } = selectedItems[item];
        let itemTotal = price * count;

        if (count >= 2) {
            itemTotal *= 0.90; 
        }

        totalAmount += itemTotal;
    }

    document.getElementById(`${itemName}-quantity`).innerText = selectedItems[itemName].count;
    updateOrderSummary();
}

function decreaseItem(itemName) {
    if (selectedItems[itemName]) {
        selectedItems[itemName].count -= 1;
        itemCount -= 1;

        if (selectedItems[itemName].count <= 0) {
            delete selectedItems[itemName];
        }

        document.getElementById(`${itemName}-quantity`).innerText = selectedItems[itemName] ? selectedItems[itemName].count : 0;

        totalAmount = 0;
        for (const item in selectedItems) {
            const { count, price } = selectedItems[item];
            let itemTotal = price * count;

            if (count >= 2) {
                itemTotal *= 0.90; 
            }

            totalAmount += itemTotal;
        }

        updateOrderSummary();
    }
}

function updateOrderSummary() {
    document.getElementById("item-count").innerText = itemCount;
    document.getElementById("total-amount").innerText = `₱${totalAmount.toFixed(2)}`;

    const breakdown = document.getElementById("order-breakdown");
    breakdown.innerHTML = ""; 

    for (const item in selectedItems) {
        const { count, price } = selectedItems[item];
        const itemTotal = price * count * (count >= 2 ? 0.90 : 1); 
        const promoMessage = count >= 2 ? " (10% off!)" : "";
        
        breakdown.innerHTML += `<div>${item} x${count}: ₱${itemTotal.toFixed(2)}${promoMessage}</div>`;
    }

    document.getElementById("order-section").style.display = itemCount > 0 ? "block" : "none";
}

function placeOrder() {
    alert("Order placed successfully!");
    resetOrder();
}

function cancelOrder() {
    if (confirm("Are you sure you want to cancel the order?")) {
        resetOrder();
        alert("Order has been canceled.");
    }
}

function resetOrder() {
    itemCount = 0;
    totalAmount = 0;
    selectedItems = {};
    updateOrderSummary();
}
